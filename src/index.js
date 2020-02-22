// Import style
import "./style.css";

// Import classes
import Game from "./classes/Game";

var htmlContainerElement = document.querySelector("#root");

var game = new Game(htmlContainerElement);
game.init();