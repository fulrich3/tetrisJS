const DATA_TETROMINOS = require("../data/tetrominos.json");

export default class Playfield{
	constructor(game){
		this.game = game;
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
				newRow.push(null);
			}

			this.grid.push(newRow);
		}
	}

	getWidth(){
		return this.width;
	}

	getHeight(){
		return this.height;
	}

	getGridValue(x,y){
		return this.grid[y][x];
	}

	setCurrentTetromino(tetromino){
		this.currentTetromino = tetromino;
	}

	setBlockValue(x,y,value){
		this.grid[y][x] = value;
	}

	clearFilledRows(){
		let filledRowsNumber = 0;
		let occupiedRowsNumber = 0;

		for(let y = 0 ; y<this.getHeight() ; y++){
			// Start with clear variable set as true
			let rowIsFilled = true;
			let rowIsOccupied = false;

			for(let x = 0 ; x<this.getWidth() ; x++){
				if( this.getGridValue(x,y) === null ){
					rowIsFilled = false;
				}

				if(this.getGridValue(x,y) !== null){
					rowIsOccupied=true;
				}
			}

			if(rowIsFilled){
				this.grid.splice(y,1);
				// y++;

				var newRow = [];
		
				for(var x=0; x<this.getWidth(); x++){
					newRow.push(null);
				}
	
				// Add new empty row on top of the grid
				this.grid.unshift(newRow);

				// Increment filled rows number variable
				filledRowsNumber++;
			}

			if(rowIsOccupied){
				occupiedRowsNumber++;
			}
		}

		let scoreIncreaseValue = 0;

		if(filledRowsNumber>3){
			scoreIncreaseValue = 1200;
		}else{
			switch(filledRowsNumber){
				case 1:
					scoreIncreaseValue = 40;
				break;
				case 2:
					scoreIncreaseValue = 100;
				break;
				case 3:
					scoreIncreaseValue = 300;
				break;
			}
		}

		this.game.score += scoreIncreaseValue * (this.game.level + 1)

		this.game.filledRows += filledRowsNumber;

		if(this.game.filledRows >= this.game.getMaxRowsForLevel(this.game.level)){
			this.game.setLevel( this.game.getLevel() + 1 );
		}

		// Check for game over

		if(occupiedRowsNumber >= this.getHeight()){
			this.game.setOver(true);
		}
	}

	htmlRender(){
		let htmlString = "";
		let htmlToOutput = "";

		if(!this.game.isOver()){
			let render = [];

			for(let y=0; y<this.height ; y++){
				let newRow = [];
				
				for(let x=0; x<this.width ; x++){
					newRow.push(null);
				}

				render.push(newRow);
			}

			// Draw playfield's blocks
			for(var y=0; y<this.height; y++){
				for(var x=0; x<this.width; x++){
					let currentPlayfieldBlockValue = this.grid[y][x];
					
					if(currentPlayfieldBlockValue !== null)
						render[y][x] = currentPlayfieldBlockValue;
				}
			}

			// Draw current tetromino if there is one
			if(this.currentTetromino && this.currentTetromino.shape){
				let tetromino = this.currentTetromino;

				for(let y=0 ; y<this.currentTetromino.shape.length ; y++){
					let currentRow = this.currentTetromino.shape[y];

					for(let x=0 ; x<currentRow.length ; x++){
						let currentX = tetromino.x + x,
						currentY = tetromino.y  + y;

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
		}else{
			for(var y=0; y<this.getHeight(); y++){
				htmlString += "<div>"

				if(y == Math.floor( this.getHeight() / 2 )){
					htmlString += "<span class='red'>Game over!</span>";
				}
				else{
					for(var x=0; x<this.getWidth(); x++){
						htmlToOutput = "<span class='red'>░░</span>"
						
						htmlString += htmlToOutput;
					}
				}

				htmlString +="</div>";
			}
		}

		return htmlString;
	}
}