/*
	Factors Game
	by Chris Geirman
	version: 3.0
	date: 8/21/2013

	TODOS
	- search for "CG" to find inline comments
	- allow users to change "Player #" to their real name

	TODOS COMPLETED
	9/6 - animateScores() doesn't animate, so figure that out.
	9/9 - add controls to reset the board (function exists, but isn't yet used)
	9/9 - add controls to change board size
	9/8 - notify when there are no more moves (game over)
	9/8 - when game is over, provide performance statistics
	9/3 - highlight the "taken" and "given" scores in the log so that they correspond to who received the points.
	9/10 - overload the log function such that I can pass just one argument, the log message. Use this whenever a user forfeits his turn and when game is initialized.
	?? - add rules, perhaps as a sliding drawer from the bottom of gameboard.

	BUGS:
	- if "reset" is hit or board is resized before all animations have complete, they continue regardless. (reduced setTimeout from 300ms to 100ms, mitigates well)
	- if "reset" is hit while player 2 is active, player 2 remains active
*/

$(function(){


var game = {

	/* Global Variables
	**************************************/	
	debug_output: false, // show/hide debug output via console.log()
	players: [], // array of players
	played: [], // array of numbers played, both taken and given.
	log: [], // game log of user actions
	active_player: 0, // active player ID, maps to players[active_player]
	active_opponent: (this.active_player) ? 0 : 1, // current opponent ID, maps to players[active_opponent];
	grid_size: 0, // stores the size of the grid (10x10 = 100)
	rules_shown: false, // tracks whether the rules tray is hidden or not

	/* Objects
	**************************************/
	Player: function(name) {

		this.score = {
			taken: 0,
			given: 0,
			received: 0,
			total: 0
		}

		this.name = name;

	},

	/* Game Play Functions
	**************************************/	
	init: function() {
		$("#modal .close").click(); // hide modal

		this.players = [];
		this.played = [];
		this.log = [];
		active_player = 0;
		// this.togglePlayer();
	},

	new: function(grid) {
		this.init();
		grid = grid || 10; // defaults to 10x10
		this.drawGameboard(grid);
		this.addPlayer("Player 1");
		this.addPlayer("Player 2");
		this.grid_size = grid*grid;
		this.updateUI();

	},

	reset: $("#btn-reset").on("click", function() {
		var grid = Math.sqrt(game.grid_size);
		game.new(grid);
	}),	

	decriment: $("#btn-decriment").on("click", function() {
		var grid = Math.sqrt(game.grid_size);
		game.new(--grid);	
	}),

	increment: $("#btn-increment").on("click", function() {
		var grid = Math.sqrt(game.grid_size);
		game.new(++grid);	
	}),

	move: $("#gameboard").delegate('td', 'click', function() {
		// calling the "game" scope directly rather than "this" because "this" is the object clicked
		
		var taken = parseInt($(this).text());
		var given = game.getFactors(taken); // CG: should I be calling the game scope directly? Maybe use apply/call?

		if (given.length){
			game.played.push(taken);
			game.played = game.played.concat(given);					
			game.assignScores(taken,given);
			game.animateScores(taken,given);
			game.logTurn(taken,given);
		} else {
			game.logTurn(taken);
		}
		
		game.togglePlayer();
		game.updateUI();
		game.isGameOver();		

	}),	

	addPlayer: function(name) {
		var player = new this.Player(name);
		this.players.push(player);
	},

	updateUI: function(){
		$("#s0").text(this.players[0].score.total);
		$("#s1").text(this.players[1].score.total);

		$("#players li:nth-child("+ parseInt(1+this.active_player) +")").addClass("selected");
		$("#players li:nth-child("+ parseInt(1+this.active_opponent) +")").removeClass("selected");	

		if(!this.log.length){
			$("#log").html("");
		}

	},

	assignScores: function(taken,given){
		var opponent = this.getOpponent();
		var player = this.getPlayer();
		var sumGiven = this.sumArray(given);
		
		player.score.taken += taken;
		player.score.given += sumGiven;
		player.score.total += taken;

		opponent.score.received += sumGiven;
		opponent.score.total += sumGiven;

		this.debug("From assignScores(), game.players", this.players);
	},

	animateScores: function(taken,given){
		// set the class for the selected number
		$("#"+taken).addClass("scored p"+game.active_player)

		// cascade animate adding the class for the factors given away
		for (var i = 0; i < given.length; i++) {
			(function(i,playerId){
				setTimeout(function(){
					$("#"+given[i]).addClass("scored given p"+playerId);
				}, 100*i)
			})(i,game.active_opponent);
		}


	},

	logTurn: function(taken, given) {
		var summary = {};
		summary.timestamp = new Date();
		summary.msg = "[<span class='p"+ this.active_player +"'><strong>"+ this.getPlayer().name +"</strong></span>] picks ";
		
		if(given != undefined){
			summary.msg += "<span class='log-score p"+ this.active_player +"'>"+ taken +"</span> and gives away <span class='log-score p"+ this.active_opponent +"'>"+ this.sumArray(given) +"</span> ("+ given +")";
		}else{
			summary.msg += "<strong>"+ taken +"</strong>  which has no available factors. Turn forfeited.";
		}

		this.log.push(summary);

		logEl = document.getElementById("log");
		var liEl = document.createElement("li");
		liEl.innerHTML = this.log[this.log.length-1].msg
		logEl.appendChild(liEl);
	},	

	drawGameboard: function(size){
		var tableEl = document.getElementById("gameboard");
		tableEl.innerHTML = ""; // remove any board previously drawn
		var value = 0;

		for(var tr = 0; tr < size; tr++){
		
			var trEl = document.createElement("tr");

			for(var td = 0; td < size; td++){

				var tdEl = document.createElement("td");
				tdEl.appendChild(document.createTextNode(++value));
				tdEl.id = value;
				trEl.appendChild(tdEl);

			}

			tableEl.appendChild(trEl);
		
		}
	},	

	isGameOver: function(){ // checks if there are anymore valid moves remaining.
		for(var i = this.grid_size; i >= 1; i--){
			if(!this.inArray(i, this.played) && this.getFactors(i).length){
				this.debug("From isOver()",i +" has factors and is playable.");
				return false;
			}
		}
		this.gameOver();
		return true;
	},

	gameOver: function(){ // display game over report
		var p1_taken = this.players[0].score.taken,
		    p1_given = this.players[0].score.given,
		    p2_taken = this.players[1].score.taken,
		    p2_given = this.players[1].score.given;

		$("#p1_taken").text(p1_taken);
		$("#p1_given").text(p1_given +" ("+ Math.round(100*(1-(p1_given/p1_taken))) +"% effective)");
		$("#p2_taken").text(p2_taken);
		$("#p2_given").text(p2_given +" ("+Math.round(100*(1-(p2_given/p2_taken))) +"% effective)");		
		$("#modal").fadeIn();

		this.debug("From gameOver(), getPlayer()", this.getPlayer());
		this.debug("From gameOver(), getOpponent()", this.getOpponent());
		this.debug("From gameOver()", "Game Over");

	},

	dismissModal: $("#modal .close").on("click", function() {
		$("#modal").hide();
	}),

	toggleRules: $("#rules-tab").on("click", function() {
		var tray$ = $("#rules-tray");
		var marginTop = (this.rules_shown) ? -(tray$.height()+40) : 0;
		this.rules_shown = (this.rules_shown) ? false : true;

		tray$.stop().animate({
			'marginTop': marginTop
		},300);
	}),


	/* Getters
	**************************************/	

	getOpponent: function() {
		this.debug("From getOpponent(), var active_opponent", this.active_opponent);
		return this.players[ this.active_opponent ];

	}, 

	getPlayer: function() {
		this.debug("From getPlayer(), var active_player", this.active_player);
		return this.players [ this.active_player ];
	},

	getFactors: function(num) {
		var factors = [],
			testNum = num;

		for(var i = 1; i < num; i++){
			testNum = num/i;

			// if true, i is a factor of num
			if(testNum === Math.floor(testNum)){
				
				// test if the factor (i) is still active
				if(!this.inArray(i, this.played)){
					factors.push(i);
				}
			}
		}


		// this.played.push(num);
		// this.played = this.played.concat(factors);

		this.debug("From getFactors()", "all available factors of "+ num + " are " + factors);	
		this.debug("From getFactors()", "all numbers played so far: "+ this.played);		
		return factors;
	},

	/* Helper Functions
	**************************************/

	sumArray: function(array){
		return array.reduce(function(x,y){ return x + y; })
	},

	togglePlayer: function() {
		// CG: is there a better way to toggle these?
		this.active_player = (this.active_player) ? 0 : 1;
		this.active_opponent = (this.active_player) ? 0 : 1;
	},

	inArray: function(obj, array) {
		for(var i = 0; i < array.length; i++){
			if(array[i] === obj){
				this.debug("From inArray()", array[i] +" === "+ obj);
				return true;
			}
		}
		this.debug("From inArray()", array[i] +" != "+ obj);
		return false;
	},

	debug: function(description,output) {
		if(this.debug_output){
			console.log("*** "+ description +" ***");
			console.log(output);
		}
	}


} // game

game.new();




}); // doc ready