// Import classes
import Playfield from "./Playfield.js";
import Tetromino from "./Tetromino.js";
import Player from "./Player.js";

export default class Game {
    constructor(htmlContainerElement){
        this.htmlContainer = htmlContainerElement;
        this.playfield = null;
        this.player = null;
        this.tetromino = null;


        this.currentInterval = 1000;
    }

    init(){
        this.playfield = new Playfield();
        this.player = new Player( this );
        this.tetromino = new Tetromino( this, Math.floor(Math.random() * 7) );

        // Create playfield
        this.playfield.init();
        this.player.init();

        // Spawn new tetromino
        this.spawnTetromino();

        // Initial draw
        this.draw();

        // Start game
        this.start();
    }

    spawnTetromino(){
        // Then create new tetromino and bind it to playfield
        this.tetromino = new Tetromino( this, Math.floor(Math.random() * 7) );

        // Create tetromino
        this.playfield.setCurrentTetromino(this.tetromino);

        this.tetromino.init();

        let tetrominoStartX = this.playfield.getWidth() / 2 - Math.floor(this.tetromino.getSize() / 2);
        this.tetromino.setPos(tetrominoStartX,0);
    }

    lowerTetromino(){
        if(this.tetromino){
            let tetrominoHitBottom = this.tetromino.checkIfHitBottom();

            // Lower tetromino if hasn't hit bottom yet
            if(!tetrominoHitBottom){
                this.tetromino.setY( this.tetromino.y + 1 );
            }else{
                // Print to blocks array
                this.tetromino.printIntoPlayfield();

                // Destroy filled blocks of row
                this.playfield.clearFilledRows();

                // Spawn new tetromino
                this.spawnTetromino();
            }
    
            this.draw();
        }
    }

    start(){
        setInterval(
            () => ( this.lowerTetromino() ), 
            this.currentInterval
        );
    }

    input(actionName){
        if(this.tetromino){
            switch(actionName){
                case "right":
                    this.tetromino.moveRight();
                break;
                case "left":
                    this.tetromino.moveLeft();
                break;
                case "down":
                    this.lowerTetromino();
                break;
                case "rotateClockWise":
                    this.tetromino.rotateClockWise();
                break;
                // case "rotateCounterClockWise":
                //     this.tetromino.rotateCounterClockWise();
                // break;
            }
        }

        this.draw();
    }
    
    draw(){
        this.htmlContainer.innerHTML = this.playfield.htmlRender();
    }
}