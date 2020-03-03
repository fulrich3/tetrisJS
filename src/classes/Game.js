// Import classes
import Playfield from "./Playfield.js";
import Tetromino from "./Tetromino.js";
import Player from "./Player.js";

export default class Game {
    constructor(htmlContainerElement){
        this.htmlContainer = htmlContainerElement;
        this.playfield = new Playfield();
        this.player = new Player( this );
        // this.tetromino = new Tetromino( this, Math.floor(Math.random() * 7) );
        this.tetromino = new Tetromino( this, 1 );

        this.currentInterval = 1000;
    }

    init(){
        // Create playfield
        this.playfield.init();
        this.player.init();
        
        // Create tetromino
        this.playfield.setCurrentTetromino(this.tetromino);
        this.tetromino.setPos(5,2);
        this.tetromino.init();

        // Initial draw
        this.draw();

        // Start game
        this.start();
    }

    lowerTetromino(){
        this.tetromino.setY( this.tetromino.y + 1 );
        this.draw();
    }

    start(){
        setInterval(
            () => ( this.lowerTetromino() ), 
            this.currentInterval
        );
    }

    input(actionName){
        switch(actionName){
            case "right":
                this.tetromino.moveRight();
            break;
            case "left":
                this.tetromino.moveLeft();
            break;
            case "down":
                this.tetromino.setY( this.tetromino.y + 1 );
            break;
            case "rotateClockWise":
                this.tetromino.rotateClockWise();
            break;
            // case "rotateCounterClockWise":
            //     this.tetromino.rotateCounterClockWise();
            // break;
        }

        this.draw();
    }
    
    draw(){
        this.htmlContainer.innerHTML = this.playfield.htmlRender();
    }
}