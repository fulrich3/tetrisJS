// Import style
import "./style.css";

// Import classes
import Game from "./classes/Game";

var htmlContainers = {
    playfield: document.querySelector("#playfield"),
    score: document.querySelector("#score"),
    level: document.querySelector("#level"),
}

var game = new Game(htmlContainers);
game.init();