const DATA_TETROMINOS = require("../data/tetrominos.json");

export default class Playfield{
	constructor(){
		this.width = 10;
		this.height = 24;
		this.drawBorderWidth = 2;
		this.grid = [];

		this.currentTetromino = null;
	}

	init(){
		for(var y=0; y<this.height; y++){
			var newRow = [];

			for(var x=0; x<this.width; x++){
				newRow.push(0);
			}

			this.grid.push(newRow);
		}
	}

	setCurrentTetromino(tetromino){
		this.currentTetromino = tetromino;
	}

	htmlRender(){
		var htmlString = "";
		var htmlToOutput = "";

		let render = [];

		for(let y=0; y<this.height ; y++){
			let newRow = [];
			
			for(let x=0; x<this.width ; x++){
				newRow.push(null);
			}

			render.push(newRow);
		}

		// Draw current tetromino if there is one
		if(this.currentTetromino && this.currentTetromino.shape){
			let tetromino = this.currentTetromino;

			for(let y=0 ; y<this.currentTetromino.shape.length ; y++){
				let currentRow = this.currentTetromino.shape[y];

				for(let x=0 ; x<currentRow.length ; x++){
					let currentX = tetromino.x - tetromino.center.x + x,
					currentY = tetromino.y - tetromino.center.y + y;

					// Check if teromino part is in bound of playfield
					let xInBounds = (currentX >= 0 && currentX < this.width),
					yInBounds = (currentY >= 0 && currentY < this.height);

					if(xInBounds && yInBounds && tetromino.shape[y][x] != 0){
						render[currentY][currentX] = tetromino.shapeIndex;
					}
				}
			}
		}

		for(var y=0; y<this.height; y++){
			htmlString += "<div>"

			for(var x=0; x<this.width; x++){
				var currentValue = render[y][x];

				if(currentValue!=null){
					let colorClass = DATA_TETROMINOS[currentValue].color;

					htmlToOutput = "<span class='"+colorClass+"'>░░</span>"
				}else{
					htmlToOutput = "<span class='darkgray'>**</span>";
				}
				
				htmlString += htmlToOutput;
			}

			htmlString +="</div>";
		}


		return htmlString;
	}
}