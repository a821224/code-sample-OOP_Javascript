// JavaScript Document
/**
 * Tic Tac Tac
 * (OOP Javascript, HTML 5 Canvas)
 * Author: Lance Newby
 * 2/2/2013
 **/

// Debug by dumping vars to console
var DEBUG = false;
	
// Enum for type of players
var Players = {human : 0, computer : 1}
// Set the DEFAULT PLAYER as human to start the game
var currentPlayer = Players.human;
var player = Array();

window.onload = function () {
	/*var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0,0,80,80);*/
	
	// Create new player
	player = [new Player("Human",Players.human,"#0000FF"),new Player("Computer",Players.computer,"#00FF00")];
	
	// Create Game Baard
	var gameBoard = new GameBoard();
}


// Used for DEBUGGING ONLY!!!
function __alert(msg){
	console.log(msg);
}
		

// Class Objects
function Player(n,t,c){
	this.name=n;
	this.color=c;
	this.type=t; // Player.human or Player.computer
	this.moves = new Array();
	
	// Debug
	if(DEBUG) {__alert(n);__alert(t);__alert(c);}
}

/** 
 * Square Object for each square in the 3x3 game board
 **/
var Square = (function(){
	/** 
	 * CONSTRUCTOR
	 * @param: id - id attribute for the square
	 *   parent_id - id attribute of parent element
	 **/
	function Square(id, parent_id, classes){
		// Get the new squares parent row DIV element from the DOM
		var parent = document.querySelector("#"+parent_id);
		
		/**
		 * PROPERTIES
		 **/
		this.canvas = document.createElement("canvas"); // canvas for one of 9 game squares.
		this.canvas.setAttribute("id",id); // set id for the squares canvas
		this.canvas.setAttribute("width",80); // set width for the squares canvas
		this.canvas.setAttribute("height",80); // set height for the squares canvas
		this.canvas.setAttribute("class",typeof classes === 'string' ? classes : ''); // add any classes to the squares canvas
		parent.appendChild(this.canvas); // Final display the new square
		
		// Store passed parameters in corresponding object properties
		this.parent_id = parent_id; // the parent row DIV id for the square.
		this.id = id; // id of name game square.
		this.classes = classes; // class(es) for styling the game square.
		this.owner = null; // Store which player owners this square.
		
		// Add event listeners to canvas
		this.canvas.addEventListener("click",this,false);
		this.canvas.addEventListener("mouseover",this,false); 
		this.canvas.addEventListener("mouseup",this,false); 
		this.canvas.addEventListener("mousedown",this,false);
		this.canvas.addEventListener("mouseout",this,false);
		
		// Debug
		if(DEBUG) {__alert(parent_id);__alert(id);__alert(classes);__alert(this.owner);}
	}
	
	// Methods //
	Square.prototype = {
		handleEvent : function(e){
			switch (e.type){
				case "click" : 
					// If the square is not owned
					if( this.owner == null ){
						// Set the new owner
						this.owner = currentPlayer;
						
						// Set the canvas color for the player
						var ctx = this.canvas.getContext("2d");
						ctx.fillStyle = player[currentPlayer].color;
						ctx.fillRect(0,0,80,80);
						
						// Start the opponents turn
						currentPlayer = currentPlayer == Players.human ? Players.computer : Players.human;
					}
					
					// Debug
					if(DEBUG) {__alert(this.owner);__alert(currentPlayer);__alert("click");}
				break;
				
				case "mouseover" :
					// Debug
					if(DEBUG) {__alert("mouseover");}
				break;
				case "mouseup" :
					// Debug
					if(DEBUG) {__alert("mouseover");}
				break;
				case "mousedown" :
					// Debug
					if(DEBUG) {__alert("mousedown");}
				break;
				case "mouseout" :
					// Debug
					if(DEBUG) {__alert("mouseout");}
				break;
			}
		},
		addClass : function(){
			
		}
	}
	
	return Square;
})();

/** 
 * GameBoard Object
 **/
var GameBoard = (function(){
	
	/** 
	 * Constructor - Create a 3x3 Tic Tac Toe game board.
	 **/
	function GameBoard (){
		// Create main container for game board
		this.container = document.createElement("div");
		this.container.setAttribute("id","gameBoard");
		if(document.body != null){ document.body.appendChild(this.container); } // place the newly create game board on the page
		
		// Create 3 div rows and add 3 playing squares to each row.
		this.row = new Array();
		this.square = new Array();
		
		for(var i=0; i<3; i++){
			this.row[i] = document.createElement("div");
			this.row[i].setAttribute("id","row"+i);
			this.row[i].setAttribute("class","row");
			this.container.appendChild(this.row[i]);
			
			for(var j=0+3*i; j<3+3*i; j++){
				this.square[j] = new Square('square'+j,"row"+i,'square');
			}
		}
	}
	
	// Methods
	GameBoard.prototype = {
		
		
	}
	
	return GameBoard;
})();
