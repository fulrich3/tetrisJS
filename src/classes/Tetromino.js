const DATA_TETROMINOS = require("../data/tetrominos.json");

export default class Tetromino{
	constructor(gameInstance, shapeIndex){
		this.game = gameInstance;

		this.shapeIndex = shapeIndex;

		this.baseShape = DATA_TETROMINOS[this.shapeIndex].shape;
		this.shape = [];

		this.center = {
			x: DATA_TETROMINOS[this.shapeIndex].center.x,
			y: DATA_TETROMINOS[this.shapeIndex].center.y,
		}

		this.color=DATA_TETROMINOS[this.shapeIndex].color;

		this.x = 0;
		this.y = 0;

		this.rotation = 0;
	}

	init(){
		this.setShape(this.baseShape);
	}

	getWidth(){
		return this.shape[0].length;
	}

	getHeight(){
		return this.shape.length;
	}

	getBoundaries(){
		return {
			"top": this.y - this.center.y,
			"left": this.x - this.center.x,
			"bottom": this.y - this.center.y + this.getHeight(),
			"right": this.x - this.center.x + this.getWidth()
		}
	}

	getShapeValue(x,y){
		return this.shape[y][x];
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

	setCenter(value){
		this.center = value;
	}

	// Set new shape from an array
	setShape(value){
		this.shape = value;
	}

	// Other
	rotateClockWise(){
		var newShape = [];

		let shapeWidth = this.getWidth();
		let shapeHeight = this.getHeight();

		for(let y=0 ; y<shapeWidth; y++){
			var newRow = [];

			for(let x=0 ; x<shapeHeight; x++){
				let checkY = shapeHeight-1 - x,
				checkX = y;

				newRow.push( this.shape[checkY][checkX] );
			}

			newShape.push(newRow);
		}

		let newCenter = {
			x: this.center.y,
			y: this.center.x
		}

		var overflowLeft = this.x - this.center.x;
			
		if(overflowLeft < 0){
			this.setX( -overflowLeft );
		}

		var overflowRight = Math.abs(this.center.x - this.x);
			
		if(overflowRight > this.game.playfield.width){
			this.setX( overflowLeft );
		}

		this.setShape(newShape);
		this.setCenter(newCenter);
	}

	rotateCounterClockWise(){
		console.log("rotateCounterClockWise");

		var newShape = [];

		let shapeWidth = this.getWidth();
		let shapeHeight = this.getHeight();

		for(let y=0 ; y<shapeWidth; y++){
			var newRow = [];

			for(let x=0 ; x<shapeHeight; x++){
				let checkX = shapeWidth-1 - y,
				checkY = x;

				newRow.push( this.shape[checkY][checkX] );
			}

			newShape.push(newRow);
		}

		var overflowLeft = this.x - this.center.x;
			
		if(overflowLeft < 0){
			this.setX( -overflowLeft );
		}


		this.setShape(newShape);
		this.setCenter(newCenter);
	}

	// Move tetromino right
	moveRight(){
		if(this.x + (this.getWidth() - this.center.x) < this.game.playfield.width){
			this.setX( this.x + 1 );
		}
	}

	// Move tetromino left
	moveLeft(){
		if( this.x > 0 + Math.abs( (this.center.x - this.getWidth())) ){
			this.setX( this.x - 1 );
		}
	}
}