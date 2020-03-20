const DATA_TETROMINOS = require("../data/tetrominos.json");

export default class Tetromino{
	constructor(gameInstance, shapeIndex){
		this.game = gameInstance;

		this.shapeIndex = shapeIndex;

		this.baseShape = DATA_TETROMINOS[this.shapeIndex].shape;
		this.shape = [];

		this.color=DATA_TETROMINOS[this.shapeIndex].color;

		this.x = 0;
		this.y = 0;

		this.rotation = 0;
	}

	init(){
		this.setShape(this.baseShape);
	}

	getPos(){
		return {
			x: this.x,
			y: this.y
		}
	}

	getSize(){
		return this.shape.length;
	}

	getBoundaries(){
		return {
			"top": this.y,
			"left": this.x,
			"bottom": this.y + this.getSize(),
			"right": this.x + this.getSize()
		}
	}

	getShapeValue(x,y){
		return this.shape[y][x];
	}

	getShapeIndex(){
		return this.shapeIndex;
	}

	setX(val){
		this.x=val;
	}

	setY(val){
		this.y=val;
	}

	setPos(x,y){
		this.setX(x);
		this.setY(y);
	}

	// Set new shape from an array
	setShape(value){
		this.shape = value;
	}

	// Other
	rotateClockWise(){
		console.log("rotateClockWise");

		var newShape = [];

		let shapeWidth = this.getSize();
		let shapeHeight = this.getSize();

		for(let y=0 ; y<shapeWidth; y++){
			var newRow = [];

			for(let x=0 ; x<shapeHeight; x++){
				let checkY = shapeHeight-1 - x,
				checkX = y;

				newRow.push( this.shape[checkY][checkX] );
			}

			newShape.push(newRow);
		}

		// Check for collision detection. 
		// If new shape collides with blocks or playfield boundaries, don't apply the change
		var applyChange = true;

		let newWidth = newShape[0].length,
		newHeight = newShape.length;

		// Boundaries detection

		// Sides
		if( this.getPos().x < 0 || this.getBoundaries().right > this.game.playfield.width){
			for(let yy = 0 ; yy<newHeight ; yy++){
				for(let xx = 0 ; xx<newWidth ; xx++){
					// console.log( newShape[yy][xx] );

					let scanX = this.getPos().x + xx;

					if( scanX >= 0 && scanX < this.game.playfield.width ){
						continue;
					}else{
						if ( newShape[yy][xx] === 1 ){
							applyChange = false;
							break;
						}
					}
				}

				if(!applyChange)
					break;
			}
		}

		// Bottom
		if( this.getPos().y + this.getSize() >= this.game.playfield.height-1 ){
			for(let yy = 0 ; yy<newHeight ; yy++){
				for(let xx = 0 ; xx<newWidth ; xx++){

					if ( newShape[yy][xx] === 1
					&& this.getPos().y + yy >= this.game.playfield.height-1 ){
						applyChange = false;
						break;
					}
				}
			}
		}

		// Collision with other blocks
		// Blocks detection
		for(let yy = 0 ; yy<this.getSize() ; yy++){
			for(let xx = 0 ; xx<this.getSize() ; xx++){
				if( newShape[yy][xx] === 1 ){
					let checkX = this.getPos().x + xx,
					checkY = this.getPos().y + yy;
	
					if( this.game.playfield.getGridValue(checkX, checkY) !== null ){
						applyChange = false;
					}
				}
			}
		}

		if(applyChange){
			this.setShape(newShape);
		}
	}

	// Move tetromino right
	moveRight(){
		let clear = true;

		// Blocks detection
		for(let yy = 0 ; yy<this.getSize() ; yy++){
			for(let xx = 0 ; xx<this.getSize() ; xx++){
				if( this.getShapeValue( xx , yy ) === 1 ){
					let checkX = this.getPos().x + xx + 1,
					checkY = this.getPos().y + yy;
	
					if( this.game.playfield.getGridValue(checkX, checkY) !== null ){
						clear = false;
					}
				}
			}
		}

		// Checks if shape collides with blocks / playfield boundary
		if( this.getPos().x + this.getSize() >= this.game.playfield.width ){
			// Boundary detection
			let xx = this.getSize() - (this.getPos().x + this.getSize() - this.game.playfield.width + 1);

			for(let yy=0 ; yy<this.getSize() ; yy++){
				if( this.getShapeValue( xx , yy ) == 1){
					clear = false;
					break;
				}
			}
		}

		if(clear){
			this.setX( this.x + 1 );
		}
	}

	// Move tetromino left
	moveLeft(){
		let clear = true;

		// Blocks detection
		for(let yy = 0 ; yy<this.getSize() ; yy++){
			for(let xx = 0 ; xx<this.getSize() ; xx++){
				if( this.getShapeValue( xx , yy ) === 1 ){
					let checkX = this.getPos().x + xx - 1,
					checkY = this.getPos().y + yy;
	
					if( this.game.playfield.getGridValue(checkX, checkY) !== null ){
						clear = false;
					}
				}
			}
		}

		// Checks if shape collides with blocks / playfield boundary
		if( this.getPos().x <= 0 ){
			// Boundary detection
			let xx = Math.abs(this.getPos().x);

			for(let yy=0 ; yy<this.getSize() ; yy++){
				if( this.getShapeValue( xx , yy ) == 1 ){
					clear = false;
					break;
				}
			}
		}

		if( clear ){
			this.setX( this.x - 1 );
		}
	}

	checkIfHitBottom(){
		// Boundaries detection
		if( this.getPos().y + this.getSize() >= this.game.playfield.height-1 ){

			for(let yy = 0 ; yy<this.getSize() ; yy++){
				for(let xx = 0 ; xx<this.getSize() ; xx++){

					if( this.getShapeValue( xx , yy ) === 1 
					&& this.getPos().y + yy >= this.game.playfield.height-1 ){
						return true;
					}
				}
			}
		}

		// Blocks detection
		for(let yy = 0 ; yy<this.getSize() ; yy++){
			for(let xx = 0 ; xx<this.getSize() ; xx++){
				if( this.getShapeValue( xx , yy ) === 1 ){
					let checkX = this.getPos().x + xx,
					checkY = this.getPos().y + yy + 1;
	
					if( this.game.playfield.getGridValue(checkX, checkY) !== null ){
						return true;
					}
				}
			}
		}

		return false;
	}

	printIntoPlayfield(){
		for(let yy = 0 ; yy<this.getSize() ; yy++){
			for(let xx = 0 ; xx<this.getSize() ; xx++){

				if( this.getShapeValue( xx , yy ) === 1){
					let printX = this.getPos().x + xx,
					printY = this.getPos().y + yy;

					this.game.playfield.setBlockValue(printX, printY, this.getShapeIndex() );
				}
			}
		}
	}
}