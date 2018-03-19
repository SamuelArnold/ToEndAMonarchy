
/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/zsKPTrrN
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(1080, 1020, Phaser.AUTO, '', { preload : preload, create : create, update : update, render : render });

///var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload()
{
    // load sprites
    game.forceSingleUpdate = true;
    game.load.image('Attack', 'Image1.jpg');
    game.load.image('Draw', 'Image2.jpg');
    game.load.image('Play', 'Image3.jpg');
    game.load.image('EndTurn', 'Image4.jpg');
    game.load.image('card0', 'card0.jpg'); // Back
    game.load.image('card1', 'card1.jpg');
    game.load.image('card2', 'card2.jpg');
    game.load.image('card3', 'card3.jpg');
    game.load.image('card5', 'card5.jpg'); // Queen Set 0
    game.load.image('Char1', 'Char1.jpg');
    game.load.image('Char2', 'Char2.jpg');
    game.load.image('Crown', 'crown.png');

    game.load.image("closeButton", "okButton.jpg");
    game.load.image("boxBack", "textBoxBack.jpg");
}
var level = 0;
var turn = "Player";

var filter;
//var players[];
//game.stage.backgroundColor = '#182d3b';
// Draw heading!
	var style = { font : "bold 32px Arial", fill : "#fff", boundsAlignH : "center", boundsAlignV : "middle" };
    var style2 = { font : "18px Times New Roman", fill : "#fff", boundsAlignH : "center", boundsAlignV : "middle", stroke : '#000000', strokeThickness : 0 };

var player = { health : 30 };
var phase = 1;
var damageMultiplier = 1;
var damageMultiplierNextTurn = 1;
var damageAdder = 0;
var button;

class myCard {
    constructor(name, myimage)
    {
        this.name = name;
        this.ability = "Ability";
        this.counter = "Counter";
        this.desc1 = "";
        this.desc2 = "";
        this.set = 6;
    }
    playThis()
    {
        if (this.name == "Sword") {
            damageMultiplier = 2;
        }

        if (this.name == "Beast") {
            if (turn == e.name)
                p.health = Math.round(p.health / 2);
   
        }
        if (this.name == "Queen") {
            if (turn == e.name)
                e.health = e.health + Math.floor((Math.random() * 20) + 1);
        }
			testMessageBox("you played The " + this.name);
    }
    createCard()
    {
        if (this.name == "Beast") {
            this.myimage = game.add.button(game.world.centerX + 50, 780, 'card1', playCard, this, 2, 1, 0);
			     this.desc1= "This card Halves Enemies Health. Really OP";
				 this.desc2 = "The Beast represents the evil destructive nature that enters your life";
        }
        else if (this.name == "Sword") {
            this.myimage = game.add.button(game.world.centerX + 50, 780, 'card3', playCard, this, 2, 1, 0);
			this.desc1= "This card Doubles the next attack damage";
			this.desc2 = "The Sword represents the ability to cut and divide Evil from Good.";
        }
        else if (this.name == "Queen") {
            this.myimage = game.add.button(game.world.centerX + 50, 780, 'card5', playCard, this, 2, 1, 0);
			this.desc1= "This card Heals the player with a random dice roll (d20)";
			this.desc2 = "The Queen's Heart Represents the Nurturing nature that restores the soul from Corruption";
        }
        else {
            this.myimage = game.add.button(game.world.centerX + 50, 780, 'card2', playCard, this, 2, 1, 0);
        }
		 //alert("you drew the " + this.name);
        this.button = game.add.button(this.myimage.x, this.myimage.y - 50, 'Play', playCard, this, 2, 1, 0);
		testMessageBox("you drew The " + this.name + "\n\n Effect: " + this.desc1+ "\n\n Lore: " +this.desc2);
       
    }
    destroyCard()
    {
        this.myimage.destroy();
        this.button.destroy();
        //this.destroy();
    }
}

class myPlayer {
    constructor(name)
    {
        this.name = name;
        this.health = 30;
        this.hand = [ 0, 0, 0, 0, 0 ];
        this.drewcard = false;
        this.attacked = false;
    }
}

var p = new myPlayer("Enemy");
var e = new myPlayer("Player");
var turn = e.name;
var discard = [];
var Deck = [];

discard.push(new myCard("Sword", "card0"));
Deck.push(new myCard("Queen", "card1"), new myCard("Sword", "card1"), new myCard("Beast", "card1"), new myCard("Beast", "card1"), new myCard("Sword", "card1"));
var text1 = 0;
      var text2 =0;
      var   text3 = 0;
	 var   text4 = 0;
	 var   text5 = 0;
function create()
{
    button = game.add.button(50, 100, 'Char1', 0, this, 2, 1, 0);
    button = game.add.button(850, 100, 'Char2', 0, this, 2, 1, 0);
    button = game.add.button(game.world.centerX - 200, 500, 'EndTurn', endTurn, this, 2, 1, 0);
    button = game.add.button(game.world.centerX - 100, 500, 'Attack', actionOnClick, this, 2, 1, 0);
    button = game.add.button(game.world.centerX - 0, 500, 'Draw', drawCard, this, 2, 1, 0);
    crownButt = game.add.button(875, 80, 'Crown', 0, this, 2, 1, 0);
    drawCardButt = game.add.button(game.world.centerX + 50, 580, 'card0', drawCard, this, 2, 1, 0);
    drawCardButt.scale.setTo(0.5, 0.5);


	
    text_heading1 = game.add.text(0, 0, "To End A Monarchy (TEAM)", style);
    text_heading2 = game.add.text(0, 50, "Created by Sammy", style2);
	//createText();
	// set color of background
    game.stage.backgroundColor = '#182d3b';
    // prompt rules
    testMessageBox("Rules to play\nStep:1 Draw card \nStep 2: (optional play card as active or ability)\nStep 3: attack \nStep 4: end turn.");
    // alert("Rules to play\nStep:1 Draw card \nStep 2: (optional play card as active or ability)\nStep 3: attack \nStep 4: end turn.");
	text1 = game.add.text( 300, 100, e.name, style2);
    text2 = game.add.text( 300, 150, "Health: " + e.health, style2);
    text3 = game.add.text( 300, 200, e.hand[0].name, style2);
	text4 = game.add.text( 600, 100, p.name, style2);
	text5 = game.add.text( 600, 150, "Health: " + p.health, style2);
	
}

function endTurn()
{
    if (turn == e.name) {
        e.drewcard = false;
        e.attacked = false;
        turn = p.name;
        enemyTurn();
        //alert(" switched to p.name");
		  testMessageBox("Enemies Turn");
    }
    else {
        turn = e.name;
        //alert("Not your turn!");
		testMessageBox("Not your turn!");
		
    }
    // alert("Turn ended");
}

function actionOnClick()
{
    phase += 1;
    if (e.attacked == false) {
        damageStep();
        e.attacked = true;
    }
    else
		testMessageBox("Already Attacked!");
        //alert("Already Attacked!");
    //endTurn();
}

function getNextFreeCard()
{
    for (var i; i < e.hand[10]; i++) {
        if (e.hand[i] == 0)
            return e.hand[i];
    }
    return 0;
}

function testMessageBox(mytext)
{
    //call this line of code when you want to show the message box
    //message, width and height
    this.showMessageBox(mytext, game.width * .7, game.height * .5);
}

function showMessageBox(text, w = 300, h = 300)
{
    //just in case the message box already exists
    //destroy it
    if (this.msgBox) {
        this.msgBox.destroy();
    }
    //make a group to hold all the elements
    var msgBox = game.add.group();
    //make the back of the message box
    var back = game.add.sprite(0, 0, "boxBack");
    //make the close button
    var closeButton = game.add.sprite(0, 0, "closeButton");
    //make a text field
    var text1 = game.add.text(0, 0, text);
    //set the textfeild to wrap if the text is too long
    text1.wordWrap = true;
    //make the width of the wrap 90% of the width
    //of the message box
    text1.wordWrapWidth = w * .9;
    //
    //
    //set the width and height passed
    //in the parameters
    back.width = w;
    back.height = h;
    //
    //
    //
    //add the elements to the group
    msgBox.add(back);
    msgBox.add(closeButton);
    msgBox.add(text1);
    //
    //set the close button
    //in the center horizontally
    //and near the bottom of the box vertically
    closeButton.x = back.width / 2 - closeButton.width / 2;
    closeButton.y = back.height - closeButton.height;
    //enable the button for input
    closeButton.inputEnabled = true;
    //add a listener to destroy the box when the button is pressed
    closeButton.events.onInputDown.add(this.hideBox, this);
    //
    //
    //set the message box in the center of the screen
    msgBox.x = game.width / 2 - msgBox.width / 2;
    msgBox.y = game.height / 2 - msgBox.height / 2;
    //
    //set the text in the middle of the message box
    text1.x = back.width / 2 - text1.width / 2;
    text1.y = back.height / 2 - text1.height / 2;
    //make a state reference to the messsage box
    this.msgBox = msgBox;
}
function hideBox()
{
    this.msgBox.destroy();  //destroy the box when the button is pressed
}

function drawCard()
{
    if (e.drewcard == false) {
        if (turn == e.name) {
            if (e.hand[0] == 0) {
                e.hand[0] = Deck[0];
                Deck.shift();
                e.hand[0].createCard();
                e.drewcard = true;
            }
        }
        else {
            //alert("Not your turn suckker! ");
			testMessageBox("Not your turn suckker! ");
			
        }
    }
    else {
      //  alert("You already Drew! ");
		testMessageBox("You already Drew! ");
    }
		updateText();
}
function enemyTurn()
{
    damageStep();
    turn = e.name;
}
function playCard()
{
    if (turn == e.name) {
        if (e.hand[0] != 0) {

            e.hand[0].playThis();
            discard.push(e.hand[0]);
            e.hand[0].destroyCard();
            e.hand[0] = 0;
        }
    }
    else
		testMessageBox("Not your Turn!");
       // alert("Not your Turn!");
	updateText();
}

function damageStep()
{


    // give crown to winner

    ///////////////
    //// Handles damage to players
    ///////////////
	updateText();
    if ((e.health > 0) && (p.health > 0)) {
        takendamage = damageAdder + damageMultiplier * Math.floor((Math.random() * 6) + 1);
        if (turn == e.name) {
            p.health -= takendamage;
          // alert(p.name + " took " + takendamage + " Damage");
			testMessageBox(p.name + " took " + takendamage.toString() + " Damage");
        }
        else {
            e.health -= takendamage;
           // alert(e.name + " took " + takendamage + " Damage");
			testMessageBox(e.name + " took " + takendamage.toString() + " Damage");
        }
    }
	updateText();
    // reset counters
    takendamage = 0;
    damageAdder = 0;
    damageMultiplier = 1;
    e.drewcard = false;
    if (p.health < e.health) {
        if (crownButt.x >= 75) {
            game.add.tween(crownButt).to({ x : 75 }, 2400, Phaser.Easing.Bounce.Out, true);
        }
    }
    else {
        if (crownButt.x <= 875) {
            game.add.tween(crownButt).to({ x : 875 }, 2400, Phaser.Easing.Bounce.Out, true);
        }
    }
	updateText();
	    
	    // check if dead
    if (e.health < 1) {
        //game.debug.text("lost", 160, 140, 'rgb(255,255,255)');
      //  alert(p.name + "won!");
	  testMessageBox("You Lost sucka");
    }
    if (p.health < 1) {
		 testMessageBox("You won!");
       // alert(e.name + "won!");
       // game.debug.text("lost", 460, 140, 'rgb(255,255,255)');
    }
	
}

function update()
{
}

function createText(){	
      text1 =game.add.text( 300, 100, e.name, style2);
      text2= game.add.text( 300, 150, "Health: " + e.health.toString(), style2);
   // game.debug.text(e.name, 300, 100, 'rgb(255,255,255)');
  //  game.debug.text("Health: " + e.health, 300, 150, 'rgb(255,255,255)');
        text3 = game.add.text( 300, 200, e.hand[0].name, style2);
   // game.debug.text("Hand: " + e.hand[0].name /*+ e.hand[1]+ e.hand[2]*/, 300, 200, 'rgb(255,255,255)');
   // game.debug.text("Hand: " + e.hand[1].name /*+ e.hand[1]+ e.hand[2]*/, 300, 225, 'rgb(255,255,255)');
   // game.debug.text("Hand: " + e.hand[2].name /*+ e.hand[1]+ e.hand[2]*/, 300, 250, 'rgb(255,255,255)');
   
    // Enemy
	   text4 = game.add.text( 600, 100, p.name, style2);
	   text5 = game.add.text( 600, 150, "Health: " + p.health.toString(), style2);
    //game.debug.text(p.name, 600, 100, 'rgb(255,255,255)');
    //game.debug.text("Health: " + p.health, 600, 150, 'rgb(255,255,255)');
    // phase
    // game.add.text(360, 90, "phase: "+ phase  + " turn: " + turn, style2);
    //game.debug.text("phase: " + phase + " turn: " + turn, 360, 350, 'rgb(255,255,255)');
    //game.debug.text("Discard Pile: " + discard[discard.length - 1].name, 360, 400, 'rgb(255,255,255)');	
}
function updateText(){	
      text1.setText(e.name);
      text2.setText("Health: " + e.health);
   // game.debug.text(e.name, 300, 100, 'rgb(255,255,255)');
  //  game.debug.text("Health: " + e.health, 300, 150, 'rgb(255,255,255)');
    //    text3.setText(e.hand[0].name);
   // game.debug.text("Hand: " + e.hand[0].name /*+ e.hand[1]+ e.hand[2]*/, 300, 200, 'rgb(255,255,255)');
   // game.debug.text("Hand: " + e.hand[1].name /*+ e.hand[1]+ e.hand[2]*/, 300, 225, 'rgb(255,255,255)');
   // game.debug.text("Hand: " + e.hand[2].name /*+ e.hand[1]+ e.hand[2]*/, 300, 250, 'rgb(255,255,255)');
   
    // Enemy
	   text4.setText(p.name);
	   text5.setText("Health: " + p.health);
    //game.debug.text(p.name, 600, 100, 'rgb(255,255,255)');
    //game.debug.text("Health: " + p.health, 600, 150, 'rgb(255,255,255)');
    // phase
    // game.add.text(360, 90, "phase: "+ phase  + " turn: " + turn, style2);
    //game.debug.text("phase: " + phase + " turn: " + turn, 360, 350, 'rgb(255,255,255)');
    //game.debug.text("Discard Pile: " + discard[discard.length - 1].name, 360, 400, 'rgb(255,255,255)');	
}


function render()
{

}