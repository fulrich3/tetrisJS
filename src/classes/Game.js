// Import classes
import Playfield from "./Playfield.js";
import Tetromino from "./Tetromino.js";
import Player from "./Player.js";

export default class Game {
    constructor(htmlContainers){
        this.htmlContainers = htmlContainers;
        this.playfield = null;
        this.player = null;
        this.tetromino = null;

        this.interval = null;
        this.gameInterval = 1000;

        this.maxInterval = 1000;
        this.minInterval = 200;

        this.score = 0;
        this.level = 0;

        this.filledRows = 0;

        this.over = false;
    }

    init(){
        this.playfield = new Playfield( this );
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
        // this.startInterval();
        this.setGameInterval();
    }

    getScore(){
        return this.score;
    }

    getLevel(){
        return this.level;
    }

    isOver(){
        return this.over;
    }

    getMaxRowsForLevel(level){
        // return Math.max(100, this.level * 10 - 50);
        return (level + 1) * 10;
    }

    setLevel(value){
        this.level = value;
        
        let newGameInterval = Math.max(200,  1000 - (this.getLevel() + 1) * 40 );
        this.setGameInterval( newGameInterval );
    }

    getGameInterval(){
        return this.gameInterval;
    }

    setOver(value){
        this.over = value;
    }

    setGameInterval(value = this.maxInterval){
        this.gameInterval = value;

        console.log(this.gameInterval);

        clearInterval(this.interval);
        this.interval = setInterval(
            () => ( this.update() ), 
            this.gameInterval
        );
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


            if(this.isOver()){
                clearInterval(this.interval);
            }
    
            this.draw();
        }
    }

    // startInterval(){
    //     clearInterval(this.interval);
    //     this.interval = setInterval(
    //         () => ( this.update() ), 
    //         this.gameInterval
    //     );
    // }

    update(){
        this.lowerTetromino();
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
        // Render playfield
        this.htmlContainers.playfield.innerHTML = this.playfield.htmlRender();

        // Get score value and convert it to string
        let scoreString = this.getScore().toString();

        // Add leading zeroes
        // scoreString.padStart(6, '0');

        // Display score
        this.htmlContainers.score.innerHTML = scoreString;

        // Display level
        this.htmlContainers.level.innerHTML = this.getLevel();
    }
}