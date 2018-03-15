/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/zsKPTrrN
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(1080, 1920, Phaser.AUTO, '', { preload : preload, create : create, update : update, render : render });

///var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload()
{
    // load sprites
    game.forceSingleUpdate = true;
    game.load.image('Attack', 'Image1.jpg');
    game.load.image('Draw', 'Image2.jpg');
    game.load.image('Play', 'Image3.jpg');
    game.load.image('EndTurn', 'Image4.jpg');
    game.load.image('card0', 'card0.jpg');
    game.load.image('card1', 'card1.jpg');
    game.load.image('Char1', 'Char1.jpg');
    game.load.image('Char2', 'Char2.jpg');
    game.load.image('Crown', 'crown.png');
}
var level = 0;
var turn = 0;

var filter;
//var players[];
//game.stage.backgroundColor = '#182d3b';

var player = { health : 30 };
var phase = 1;
var damageMultiplier = 1;
var damageAdder = 0;
var button;

class myCard {
    constructor(name, myimage)
    {
        this.name = name;
        this.ability = "Ability";
        this.counter = "Counter";
        //this.image =myimage;
        if (name != "Beast")
            //this.image = "card0";
            this.x = 0;
        this.y = 0;
        //myimage2 =
        //game.add.sprite(100, 100, "card0");
    }
}

class myPlayer {
    constructor(name)
    {
        this.name = name;
        this.health = 30;
        this.hand = [ 0, 0, 0, 0, 0 ];
    }
}

var p
    = new myPlayer("Enemy");
var e = new myPlayer("Player");
var turn = p.name;
var discard = [];

var Deck = [];

discard.push(new myCard("Sword", "card0"));
Deck.push(new myCard("Sword", "card0"), new myCard("Sword", "card0"), 0, 0);
function create()
{

    //
    button = game.add.button(50, 100, 'Char1', 0, this, 2, 1, 0);
    button = game.add.button(850, 100, 'Char2', 0, this, 2, 1, 0);
    button = game.add.button(game.world.centerX - 200, 500, 'EndTurn', endTurn, this, 2, 1, 0);
    button = game.add.button(game.world.centerX - 100, 500, 'Attack', actionOnClick, this, 2, 1, 0);
    button = game.add.button(game.world.centerX - 0, 500, 'Draw', drawCard, this, 2, 1, 0);
    button = game.add.button(game.world.centerX + 100, 500, 'Play', playCard, this, 2, 1, 0);
    crownButt = game.add.button(875, 80, 'Crown', 0, this, 2, 1, 0);
    drawCardButt = game.add.button(game.world.centerX + 50, 580, 'card0', drawCard, this, 2, 1, 0);
    drawCardButt.scale.setTo(0.5, 0.5);

    // set color of background
    game.stage.backgroundColor = '#182d3b';
    // prompt rules
    alert("Rules to play\nStep:1 Draw card, Step 2: (optional play card as active or ability) step 3: attack Step 4: end turn.");
}

function endTurn()
{
    if (turn == e.name) {
        turn = p.name;
        alert(" switched to p.name");
    }
    else {
        turn = e.name;
        alert(" switched to p.name");
    }
    alert("Turn ended");
}

function actionOnClick()
{
    phase += 1;
    damageStep();
    //endTurn();
}

function drawCard()
{
    if (turn == e.name) {
        if (e.hand[0] == 0) {
            e.hand[0] = new myCard("Sword", "card0");
            alert("you drew the sword");
        }
    }
    else {
        alert("Not your turn suckker! ");
    }
}

function playCard()
{
    if (turn == e.name) {
        if (e.hand[0] != 0)
            if (e.hand[0].name == "Sword") {
                damageMultiplier = 2;
                alert("Card Played The Sword, Damage is now doubled this turn!" + damageMultiplier);
                discard.push(e.hand[0]);
                e.hand[0] = 0;
            }
    }
    else
        alert("Not your Turn!");
}

function damageStep()
{
    /*
	    // check if dead
    if (e.health < 1) {
        game.debug.text("lost", 160, 140, 'rgb(255,255,255)');
        alert(p.name + "won!");
    }
    if (p.health < 1) {
        alert(e.name + "won!");
        game.debug.text("lost", 460, 140, 'rgb(255,255,255)');
    }

    // give crown to winner
    if (p.health <= e.health) {
        if (crownButt.x >= 75) {
            game.add.tween(crownButt).to({ x : 75 }, 2400, Phaser.Easing.Bounce.Out, true);
        }
    }
    else {
        if (crownButt.x <= 875) {
            crownButt.add.tween(crownButt).to({ x : 875 }, 2400, Phaser.Easing.Bounce.Out, true);
        }
    }*/
    ///////////////
    //// Handles damage to players
    ///////////////
    if ((e.health > 0) && (p.health > 0)) {
        takendamage = damageAdder + damageMultiplier * Math.floor((Math.random() * 6) + 1);
        if (turn == e.name) {
            p.health -= takendamage;
            alert(p.name + " took " + takendamage + " Damage");
        }
        else {
            e.health -= takendamage;
            alert(e.name + " took " + takendamage + " Damage");
        }
    }

    // reset counters
    takendamage = 0;
    damageAdder = 0;
    damageMultiplier = 1;
}

function update()
{
}

function render(){
    var style = { font : "bold 32px Arial", fill : "#fff", boundsAlignH : "center", boundsAlignV : "middle" };
    var style2 = { font : "18px Times New Roman", fill : "#fff", boundsAlignH : "center", boundsAlignV : "middle", stroke : '#000000', strokeThickness : 0 };

    text = game.add.text(0, 0, "To End A Monarchy (TEAM)", style);
    text = game.add.text(0, 50, "Created by Sammy", style2);

    //  game.add.text( 160, 50, e.name, style2);
    //   game.add.text( 160, 70, "Health: " + e.health, style2);
    game.debug.text(e.name, 300, 100, 'rgb(255,255,255)');
    game.debug.text("Health: " + e.health, 300, 150, 'rgb(255,255,255)');
    game.debug.text("Hand: " + e.hand[0].name /*+ e.hand[1]+ e.hand[2]*/, 300, 200, 'rgb(255,255,255)');
    game.debug.text("Hand: " + e.hand[1].name /*+ e.hand[1]+ e.hand[2]*/, 300, 225, 'rgb(255,255,255)');
    game.debug.text("Hand: " + e.hand[2].name /*+ e.hand[1]+ e.hand[2]*/, 300, 250, 'rgb(255,255,255)');
    // Enemy
    game.debug.text(p.name, 600, 100, 'rgb(255,255,255)');
    game.debug.text("Health: " + p.health, 600, 150, 'rgb(255,255,255)');
    // phase
    // game.add.text(360, 90, "phase: "+ phase  + " turn: " + turn, style2);
    game.debug.text("phase: " + phase + " turn: " + turn, 360, 350, 'rgb(255,255,255)');
    game.debug.text("Discard Pile: " + discard[discard.length - 1].name, 360, 400, 'rgb(255,255,255)');

    // draw cards
    //if ( e.hand[0].name !=0){
    //	 var image = game.add.image(100, 100, 'card1');
	}

