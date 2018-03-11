/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/zsKPTrrN
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(1080, 1920, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

///var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
var level =0;
var turn  =0;

var filter;
//var players[];
//game.stage.backgroundColor = '#182d3b';

var player = {health: 30};
var phase = 1; 
var turn  = "Player";
var damageMultiplier =1; 
var damageAdder  =0;
class myCard  {
  constructor(name) {
    this.name = name;
    this.ability = "Ability"; 
    this.counter = "Counter";
  }
}

class myPlayer  {
  constructor(name) {
    this.name = name;
    this.health = 30; 
    this.hand = [0,0,0,0,0];
  }
}

var p = new myPlayer("Enemy");
var e = new myPlayer("Player");

var discard =  [];
discard.push(new myCard("Sword"));
var Deck =  [];
Deck.push(new myCard("Sword"),new myCard("Sword"),0,0);

var button;
function preload() {
	game.load.image('Attack', 'Image1.jpg');
	game.load.image('Draw', 'Image2.jpg');
	game.load.image('Play', 'Image3.jpg');
    game.load.image('card0', 'card0.jpg');
	game.load.image('card1', 'card1.jpg');
	game.load.image('Char1', 'Char1.jpg');
	game.load.image('Char2', 'Char2.jpg');
	//card0.scale.setTo(.5 , .5);  
}

function create() {
	   button = game.add.button(50, 100, 'Char1', 0, this, 2, 1, 0);
	   button = game.add.button(850, 100, 'Char2', 0, this, 2, 1, 0);
       button = game.add.button(game.world.centerX - 100, 500, 'Attack', actionOnClick, this, 2, 1, 0);
	   button = game.add.button(game.world.centerX - 0, 500, 'Draw', drawCard, this, 2, 1, 0);
	   button = game.add.button(game.world.centerX + 100, 500, 'Play', playCard, this, 2, 1, 0);
	   drawCardButt = game.add.button(game.world.centerX + 100, 300, 'card0', drawCard, this, 2, 1, 0);
	   drawCardButt.scale.setTo(0.5, 0.5);
	   game.stage.backgroundColor = '#182d3b';
}

function actionOnClick () {
        phase +=1; 
		damageStep();
       // e.health -= damageAdder+damageMultiplier*Math.floor((Math.random() * 7)+1); 
		endTurn();
	   }

function endTurn(){
	if (turn == e.name){
		turn = p.name;
	}
	else {
		turn = e.name;
	}
}
function drawCard(){
	if (turn == e.name){
		if (e.hand[0] == 0){
			e.hand[0] =new myCard("Sword");
				alert("you drew the sword");
		}
	}
	else {
		alert("Not your turn suckker! ");
		}
	}
	
function playCard(){
	if (turn == e.name){
		if (e.hand[0] != 0)
			if (e.hand[0].name =="Sword"){
				damageMultiplier =2;
				alert("Card Played The Sword, Damage is now doubled this turn!" + damageMultiplier );
				discard.push(e.hand[0]);
				e.hand[0]  =0;
			}
		}
	else 
		alert("Not your Turn!");
	}



function damageStep(){
	if ((e.health >0) && (p.health > 0)){
		takendamage = damageAdder+damageMultiplier*Math.floor((Math.random() * 7)+1); 
		if (turn == e.name){
			p.health -=takendamage;
			alert(p.name + " took " + takendamage + " Damage");
		}
		else {
			e.health -=takendamage;
			alert(e.name + " took " + takendamage + " Damage");
		}
	}
	takendamage =0;
	damageAdder = 0; 
	damageMultiplier =1; 
}

function update() {
  var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
 var style2 = { font: "18px Times New Roman", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle",stroke : '#000000',strokeThickness: 0 };
  
    text = game.add.text(0, 0, "To End A Monarchy (TEAM)", style);
    text = game.add.text(0, 50, "Created by Sammy", style2);
    
  //  game.add.text( 160, 50, e.name, style2);
 //   game.add.text( 160, 70, "Health: " + e.health, style2);
   game.debug.text( e.name, 300, 100, 'rgb(255,255,255)');
    game.debug.text( "Health: " + e.health, 300, 150,  'rgb(255,255,255)');
     game.debug.text("Hand: " + e.hand[0].name /*+ e.hand[1]+ e.hand[2]*/, 300, 200,  'rgb(255,255,255)');
	 game.debug.text("Hand: " + e.hand[1].name /*+ e.hand[1]+ e.hand[2]*/, 300, 225,  'rgb(255,255,255)');
	  game.debug.text("Hand: " + e.hand[2].name /*+ e.hand[1]+ e.hand[2]*/, 300, 250,  'rgb(255,255,255)');
     // Enemy
     game.debug.text(p.name, 600, 100,  'rgb(255,255,255)');
     game.debug.text("Health: " + p.health, 600, 150, 'rgb(255,255,255)');
     // phase
        // game.add.text(360, 90, "phase: "+ phase  + " turn: " + turn, style2);
    game.debug.text("phase: "+ phase  + " turn: " + turn, 360, 350,  'rgb(255,255,255)');
	game.debug.text("Discard Pile: " + discard[discard.length-1].name, 360, 400,  'rgb(255,255,255)');
	if (e.health < 1) {
			    game.debug.text( "lost", 160, 140,  'rgb(255,255,255)');
						alert(p.name+"won!");
	}
	if	(p.health < 1){
			alert(e.name+"won!");
		game.debug.text( "lost", 460, 140,  'rgb(255,255,255)');
	}
}


function render() {
}
