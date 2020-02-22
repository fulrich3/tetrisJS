const DATA_TETROMINOS = require("../data/tetrominos.json");

export default class Tetromino{
	constructor(shapeIndex){
		this.shapeIndex = shapeIndex;

		this.shape = DATA_TETROMINOS[this.shapeIndex].shape;

		this.center = {
			x: DATA_TETROMINOS[this.shapeIndex].center.x,
			y: DATA_TETROMINOS[this.shapeIndex].center.y,
		}

		this.color=DATA_TETROMINOS[this.shapeIndex].color;

		this.x=0;
		this.y=0;

		this.rotation = 0;
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

	getShapeValue(x,y){
		return this.shape[y][x];
	}

}