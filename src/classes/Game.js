// Import classes
import Playfield from "./Playfield.js";
import Tetromino from "./Tetromino.js";
import Player from "./Player.js";

export default class Game {
    constructor(htmlContainerElement){
        this.htmlContainer = htmlContainerElement;
        this.playfield = new Playfield();
    }

    init(){
        // Create playfield
        this.playfield.init();
        
        // Create tetromino
        var tetromino = new Tetromino( Math.floor(Math.random() * 7) );
        tetromino.setX(4);
        tetromino.setY(0);
        
        // Create a test tetromino
        this.playfield.setCurrentTetromino(tetromino);
    }
    
    update(){
        this.htmlContainer.innerHTML = this.playfield.htmlRender();
    }
}