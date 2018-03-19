// create Canvas
var game = new Phaser.Game(1080, 1020, Phaser.AUTO, '', { preload : preload, create : create, update : update, render : render });

function preload()
{
    // load sprites / images
    game.forceSingleUpdate = true;
    game.load.image('Attack', 'Attack_Ready.png');
    game.load.image('Draw', 'Draw_Ready.png');
    game.load.image('Play', 'Image3.jpg');
    game.load.image('EndTurn', 'EndTurn_Ready.png');
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
// Declare some globals
var turn = "Player";
var filter;
// Draw heading!
var style = { font : "bold 32px Arial", fill : "#fff", boundsAlignH : "center", boundsAlignV : "middle" };
var style2 = { font : "18px Times New Roman", fill : "#fff", boundsAlignH : "center", boundsAlignV : "middle", stroke : '#000000', strokeThickness : 0 };
var player = { health : 30 };
var phase = 1;
var damageMultiplier = 1;
var damageMultiplierNextTurn = 1;
var damageAdder = 0;
var button; // This variable might be a mistake. as it is a global case sensetive reserved word. 

class myCard {
    constructor(name, myimage)
    {
        this.name = name;
        this.ability = "Ability";
        this.counter = "Counter";
        this.desc1 = "";
        this.desc2 = "";
        this.set = 6;
		this.handno =0; 
    }
    playThis()
    {
		// look for cards abilities
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
		// push card from hand to discard pile
		discard.push(e.hand[0]);
        this.destroyCard();
        //this = 0;
		// add dumb text
			testMessageBox("you played The " + this.name);
    }
	updateCard(){
		this.myimage.x = this.handno * 100 + 50;
		this.mybutton.x  = this.handno * 100 + 50;
	}
    createCard()
    {
        if (this.name == "Beast") {
            this.myimage = game.add.button( this.handno * 100 + 50, 780, 'card1', playCard, this, 2, 1, 0);
			     this.desc1= "This card Halves Enemies Health. Really OP";
				 this.desc2 = "The Beast represents the evil destructive nature that enters your life";
        }
        else if (this.name == "Sword") {
            this.myimage = game.add.button(this.handno * 100 + 50, 780, 'card3', playCard, this, 2, 1, 0);
			this.desc1= "This card Doubles the next attack damage";
			this.desc2 = "The Sword represents the ability to cut and divide Evil from Good.";
        }
        else if (this.name == "Queen") {
            this.myimage = game.add.button( this.handno * 100 + 50, 780, 'card5', playCard, this, 2, 1, 0);
			this.desc1= "This card Heals the player with a random dice roll (d20)";
			this.desc2 = "The Queen's Heart Represents the Nurturing nature that restores the soul from Corruption";
        }
        else {
            this.myimage = game.add.button( this.handno * 100 + 50, 780, 'card2', playCard, this, 2, 1, 0);
        }
		 //alert("you drew the " + this.name);
		 //this.myimage.x = handno * 100; 
        this.mybutton = game.add.button(this.myimage.x, this.myimage.y - 50, 'Play', playCard, this, 2, 1, 0);
		testMessageBox("you drew The " + this.name + "\n\n Effect: " + this.desc1+ "\n\n Lore: " +this.desc2);
       
    }
    destroyCard()
    {
        this.myimage.destroy();
        this.mybutton.destroy();
        //this.destroy();
    }
}

class myPlayer {
    constructor(name)
    {
        this.name = name;
        this.health = 30;
        this.hand = [ 0, 0, 0, 0, 0 ];
		//this.hand = [];
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
	// Create buttons 
    button = game.add.button(50, 100, 'Char1', 0, this, 2, 1, 0);
    button = game.add.button(850, 100, 'Char2', 0, this, 2, 1, 0);
    endButt = game.add.button(game.world.centerX - 0, 400, 'EndTurn', endTurn, this, 2, 1, 0);
    attackButt = game.add.button(game.world.centerX - 250, 400, 'Attack', actionOnClick, this, 2, 1, 0);
    drawButt = game.add.button(game.world.centerX - 500, 400, 'Draw', drawCard, this, 2, 1, 0);
    crownButt = game.add.button(875, 80, 'Crown', 0, this, 2, 1, 0);
    drawCardButt = game.add.button(game.world.centerX + 50, 580, 'card0', drawCard, this, 2, 1, 0);
	// scale them down
    drawCardButt.scale.setTo(0.5, 0.5);
    attackButt.scale.setTo(0.5, 0.5);
	drawButt.scale.setTo(0.5, 0.5);
	endButt.scale.setTo(0.5, 0.5);
	// create Text type
    text_heading1 = game.add.text(0, 0, "To End A Monarchy (TEAM)", style);
    text_heading2 = game.add.text(0, 50, "Created by Sammy", style2);
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
    //set the width and height passed
    //in the parameters
    back.width = w;
    back.height = h;

    //add the elements to the group
    msgBox.add(back);
    msgBox.add(closeButton);
    msgBox.add(text1);
    //set the close button
    //in the center horizontally
    //and near the bottom of the box vertically
    closeButton.x = back.width / 2 - closeButton.width / 2;
    closeButton.y = back.height - closeButton.height;
    //enable the button for input
    closeButton.inputEnabled = true;
    //add a listener to destroy the box when the button is pressed
    closeButton.events.onInputDown.add(this.hideBox, this);

    //set the message box in the center of the screen
    msgBox.x = game.width / 2 - msgBox.width / 2;
    msgBox.y = game.height / 2 - msgBox.height / 2;
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
			testMessageBox("Not your turn suckker! ");
			        }
    }
    else {
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
            e.hand[0] = 0;
        }
    }
    else
		testMessageBox("Not your Turn!");
	updateText();  //  update HP values to screen
}

function damageStep()
{
	updateText(); //  update HP values to screen
	 // Handles damage to players
    if ((e.health > 0) && (p.health > 0)) {
        takendamage = damageAdder + damageMultiplier * Math.floor((Math.random() * 6) + 1);
        if (turn == e.name) {
            p.health -= takendamage;
    
			testMessageBox("You Rolled The Dice \n"+ p.name + " took " + takendamage.toString() + " Damage");
        }
        else {
            e.health -= takendamage;
			testMessageBox("you Rolled the Dice \n"+ e.name + " took " + takendamage.toString() + " Damage");
        }
    }
	updateText();  //  update HP values to screen
    // reset counters
    takendamage = 0;
    damageAdder = 0;
    damageMultiplier = 1;
    e.drewcard = false;
	
	// tween the crown animation.
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
	updateText(); // update values for health
	    
	    // check if dead then display message
    if (e.health < 1) {
	  testMessageBox("You Lost sucka");
    }
    if (p.health < 1) {
		 testMessageBox("You won!");
    }
	
}

function update()
{
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