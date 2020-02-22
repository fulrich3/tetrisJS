const INPUT = require("../data/input.json");

export default class Player {
    constructor(game){
        // Reference to main game object
        this.game = game;
    }

    init(){
        window.addEventListener("keydown",  (event) => {
            let actionName = null;

            for (const [currentActionName,currentActionEventCode] of Object.entries(INPUT)) {
                if(currentActionEventCode == event.code){
                    actionName = currentActionName;
                }
            }

            if(actionName){
                this.game.input(actionName);
            }
        });
    }
}