//****************************************
// Author: Chris Geirman (geirman@bigfoot.com)
// Creation Date: Sept. 29, 2000
// Purpose: This page supports factor_game.html
//****************************************

//*****************************************************
//                    Arrays
//*****************************************************
// All factors to 30
var f1 = [1]
var f2 = [1]
var f3 = [1]
var f4 = [1,2]
var f5 = [1]
var f6 = [1,2,3]
var f7 = [1]
var f8 = [1,2,4]
var f9 = [1,3]
var f10 = [1,2,5]
var f11 = [1]
var f12 = [1,2,3,4,6]
var f13 = [1]
var f14 = [1,2,7]
var f15 = [1,3,5]
var f16 = [1,2,4,8]
var f17 = [1]
var f18 = [1,2,3,6,9]
var f19 = [1]
var f20 = [1,2,4,5,10]
var f21 = [1,3,7]
var f22 = [1,2,11]
var f23 = [1]
var f24 = [1,2,3,4,6,8,12]
var f25 = [1,5]
var f26 = [1,2,13]
var f27 = [1,3,9]
var f28 = [1,2,4,7,14]
var f29 = [1]
var f30 = [1,2,3,5,6,10,15]


var taken = new Array(30);
taken[1] = false;
taken[2] = false;
taken[3] = false;
taken[4] = false;
taken[5] = false;
taken[6] = false;
taken[7] = false;
taken[8] = false;
taken[9] = false;
taken[10] = false;
taken[11] = false;
taken[12] = false;
taken[13] = false;
taken[14] = false;
taken[15] = false;
taken[16] = false;
taken[17] = false;
taken[18] = false;
taken[19] = false;
taken[20] = false;
taken[21] = false;
taken[22] = false;
taken[23] = false;
taken[24] = false;
taken[25] = false;
taken[26] = false;
taken[27] = false;
taken[28] = false;
taken[29] = false;
taken[30] = false;



//*****************************************************
//                    Images
//*****************************************************
var blank_1 = new Image(50,50); blank_1.src = "images/1.gif";
var green_1 = new Image(50,50); green_1.src = "images/1_green.gif";
var red_1 = new Image(50,50); red_1.src = "images/1_red.gif";

var blank_2 = new Image(50,50); blank_2.src = "images/2.gif";
var green_2 = new Image(50,50); green_2.src = "images/2_green.gif";
var red_2 = new Image(50,50); red_2.src = "images/2_red.gif";

var blank_3 = new Image(50,50); blank_3.src = "images/3.gif";
var green_3 = new Image(50,50); green_3.src = "images/3_green.gif";
var red_3 = new Image(50,50); red_3.src = "images/3_red.gif";

var blank_4 = new Image(50,50); blank_4.src = "images/4.gif";
var green_4 = new Image(50,50); green_4.src = "images/4_green.gif";
var red_4 = new Image(50,50); red_4.src = "images/4_red.gif";

var blank_5 = new Image(50,50); blank_5.src = "images/5.gif";
var green_5 = new Image(50,50); green_5.src = "images/5_green.gif";
var red_5 = new Image(50,50); red_5.src = "images/5_red.gif";

var blank_6 = new Image(50,50); blank_6.src = "images/6.gif";
var green_6 = new Image(50,50); green_6.src = "images/6_green.gif";
var red_6 = new Image(50,50); red_6.src = "images/6_red.gif";

var blank_7 = new Image(50,50); blank_7.src = "images/7.gif";
var green_7 = new Image(50,50); green_7.src = "images/7_green.gif";
var red_7 = new Image(50,50); red_7.src = "images/7_red.gif";

var blank_8 = new Image(50,50); blank_8.src = "images/8.gif";
var green_8 = new Image(50,50); green_8.src = "images/8_green.gif";
var red_8 = new Image(50,50); red_8.src = "images/8_red.gif";

var blank_9 = new Image(50,50); blank_9.src = "images/9.gif";
var green_9 = new Image(50,50); green_9.src = "images/9_green.gif";
var red_9 = new Image(50,50); red_9.src = "images/9_red.gif";

var blank_10 = new Image(50,50); blank_10.src = "images/10.gif";
var green_10 = new Image(50,50); green_10.src = "images/10_green.gif";
var red_10 = new Image(50,50); red_10.src = "images/10_red.gif";

var blank_11 = new Image(50,50); blank_11.src = "images/11.gif";
var green_11 = new Image(50,50); green_11.src = "images/11_green.gif";
var red_11 = new Image(50,50); red_11.src = "images/11_red.gif";

var blank_12 = new Image(50,50); blank_12.src = "images/12.gif";
var green_12 = new Image(50,50); green_12.src = "images/12_green.gif";
var red_12 = new Image(50,50); red_12.src = "images/12_red.gif";

var blank_13 = new Image(50,50); blank_13.src = "images/13.gif";
var green_13 = new Image(50,50); green_13.src = "images/13_green.gif";
var red_13 = new Image(50,50); red_13.src = "images/13_red.gif";

var blank_14 = new Image(50,50); blank_14.src = "images/14.gif";
var green_14 = new Image(50,50); green_14.src = "images/14_green.gif";
var red_14 = new Image(50,50); red_14.src = "images/14_red.gif";

var blank_15 = new Image(50,50); blank_15.src = "images/15.gif";
var green_15 = new Image(50,50); green_15.src = "images/15_green.gif";
var red_15 = new Image(50,50); red_15.src = "images/15_red.gif";

var blank_16 = new Image(50,50); blank_16.src = "images/16.gif";
var green_16 = new Image(50,50); green_16.src = "images/16_green.gif";
var red_16 = new Image(50,50); red_16.src = "images/16_red.gif";

var blank_17 = new Image(50,50); blank_17.src = "images/17.gif";
var green_17 = new Image(50,50); green_17.src = "images/17_green.gif";
var red_17 = new Image(50,50); red_17.src = "images/17_red.gif";

var blank_18 = new Image(50,50); blank_18.src = "images/18.gif";
var green_18 = new Image(50,50); green_18.src = "images/18_green.gif";
var red_18 = new Image(50,50); red_18.src = "images/18_red.gif";

var blank_19 = new Image(50,50); blank_19.src = "images/19.gif";
var green_19 = new Image(50,50); green_19.src = "images/19_green.gif";
var red_19 = new Image(50,50); red_19.src = "images/19_red.gif";

var blank_20 = new Image(50,50); blank_20.src = "images/20.gif";
var green_20 = new Image(50,50); green_20.src = "images/20_green.gif";
var red_20 = new Image(50,50); red_20.src = "images/20_red.gif";

var blank_21 = new Image(50,50); blank_21.src = "images/21.gif";
var green_21 = new Image(50,50); green_21.src = "images/21_green.gif";
var red_21 = new Image(50,50); red_21.src = "images/21_red.gif";

var blank_22 = new Image(50,50); blank_22.src = "images/22.gif";
var green_22 = new Image(50,50); green_22.src = "images/22_green.gif";
var red_22 = new Image(50,50); red_22.src = "images/22_red.gif";

var blank_23 = new Image(50,50); blank_23.src = "images/23.gif";
var green_23 = new Image(50,50); green_23.src = "images/23_green.gif";
var red_23 = new Image(50,50); red_23.src = "images/23_red.gif";

var blank_24 = new Image(50,50); blank_24.src = "images/24.gif";
var green_24 = new Image(50,50); green_24.src = "images/24_green.gif";
var red_24 = new Image(50,50); red_24.src = "images/24_red.gif";

var blank_25 = new Image(50,50); blank_25.src = "images/25.gif";
var green_25 = new Image(50,50); green_25.src = "images/25_green.gif";
var red_25 = new Image(50,50); red_25.src = "images/25_red.gif";

var blank_26 = new Image(50,50); blank_26.src = "images/26.gif";
var green_26 = new Image(50,50); green_26.src = "images/26_green.gif";
var red_26 = new Image(50,50); red_26.src = "images/26_red.gif";

var blank_27 = new Image(50,50); blank_27.src = "images/27.gif";
var green_27 = new Image(50,50); green_27.src = "images/27_green.gif";
var red_27 = new Image(50,50); red_27.src = "images/27_red.gif";

var blank_28 = new Image(50,50); blank_28.src = "images/28.gif";
var green_28 = new Image(50,50); green_28.src = "images/28_green.gif";
var red_28 = new Image(50,50); red_28.src = "images/28_red.gif";

var blank_29 = new Image(50,50); blank_29.src = "images/29.gif";
var green_29 = new Image(50,50); green_29.src = "images/29_green.gif";
var red_29 = new Image(50,50); red_29.src = "images/29_red.gif";

var blank_30 = new Image(50,50); blank_30.src = "images/30.gif";
var green_30 = new Image(50,50); green_30.src = "images/30_green.gif";
var red_30 = new Image(50,50); red_30.src = "images/30_red.gif";

var player1_off = new Image(195,30); player1_off.src = "images/fg_east1_player1.jpg";
var player1_on = new Image(195,30); player1_on.src = "images/fg_east1_player1on.jpg";
var player2_off = new Image(195,30); player2_off.src = "images/fg_east3_player2.jpg";
var player2_on = new Image(195,30); player2_on.src = "images/fg_east3_player2on.jpg";