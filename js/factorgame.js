/*
	Factors Game
	by Chris Geirman
	version: 2.0
	date: 2/11/2013
*/
$(function() {

var tblMarkup, cell_counter, sqroot, player_colors, player_scores, active_player, current_round;

// initializes the game
function new_game(num) {
	reset_vars(num);
	drawboard(sqroot);
	togglePlayer();
	updateScoreboard();

}
new_game(100);

function reset_vars(num){
	tblMarkup = "",
	cell_counter = 1,	
	sqroot = Math.round(Math.sqrt(num)),

	// first spot in the arrays are unused
	player_colors = ["","#f00","#00f"],
	player_scores = [0,0,0],

	// starts wtih player 2 because new_game() will start by toggling
	active_player = 2, 
	current_round = 1;	
}

// builds the table rows/cols, then outputs
function drawboard(sqroot){
		for (var i = 0; i < sqroot; i++) {
		tblMarkup += '<tr>';

		for(var j = 0; j < sqroot; j++){
			tblMarkup += '<td id="' + cell_counter +'">' + cell_counter++ + '</td>';
		};

		tblMarkup += '</tr>';
	};
	$('#game_board').html(tblMarkup);	
}

// resize the game board
$('#board-size').change(function(){
	if(player_scores[1] > 0){
		if(!confirm("There's a game in progress, are you sure you want to restart?")){
			return false;
		}
	}
	var size = parseInt($(this).val());
	new_game(size);
});

// reset button handler
$('#reset').click(function(){
	$('#board-size').change();
});

// given a number, determine it's proper factors, 
// returning only those not already scored
function factor(num) {
	var factors = []
		temp1 = num;

	for(i = 1; i < num; i++){
		temp1 = num/i;

		if(temp1 === Math.floor(temp1)){
			var cell = $('#' + i);
			if(cell.hasClass("")){
				factors.push(i);
			}
		}
	}
	console.log(factors);
	return factors;
}

// bind click event to the table, delegate to the td
$('table').delegate('td','click', function(){

	var target = $(this),
		factors = factor(target.text());

	if(target.hasClass("") && factors.length > 0){
		addScore(active_player,target.text())
		target.css({
			backgroundColor: player_colors[active_player],
			fontWeight: 900
		}).addClass("scored");

		// toggle player and give away all the factored points to them
		togglePlayer();

		for(i=0; i < factors.length; i++){

			var cell = $('#' + factors[i]);
			
			cell.animate({
				backgroundColor: player_colors[active_player],
				color: "#fff"
			}, 1000)
			.addClass("scored");

			addScore(active_player,factors[i]);

		}

		updateScoreboard();
	}else{
		alert("Sorry! You picked a number with no active factors and must forfeit your turn.");
		togglePlayer();
	}

});

function addScore(playerId,points){
	player_scores[playerId] += parseInt(points);
}

function updateScoreboard(){
	var s1 = $('#s1');
	var s2 = $('#s2');
	s1.text(player_scores[1]);
	s2.text(player_scores[2]);
}

function togglePlayer(){
	onArgs = {	fontSize: '30px', opacity: 1	}
	offArgs = {	fontSize: '20px', opacity: 0.35	}

	if(active_player == 1){
		active_player = 2;
		$("#players li:first-child").animate(offArgs);
		$("#players li:nth-child(2)").animate(onArgs);
	}else{
		active_player = 1;
		$("#players li:first-child").animate(onArgs);
		$("#players li:nth-child(2)").animate(offArgs);		
	}
}


}); // doc ready
