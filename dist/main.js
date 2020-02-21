/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/Playfield.js":
/*!**********************************!*\
  !*** ./src/classes/Playfield.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Playfield; });\nclass Playfield {\n  constructor() {\n    this.width = 10;\n    this.height = 24;\n    this.drawBorderWidth = 2;\n    this.grid = [];\n    this.currentTetromino = null;\n  }\n\n  init() {\n    for (var y = 0; y < this.height; y++) {\n      var newRow = [];\n\n      for (var x = 0; x < this.width; x++) {\n        newRow.push(0);\n      }\n\n      this.grid.push(newRow);\n    }\n  }\n\n  setCurrentTetromino(tetromino) {\n    this.currentTetromino = tetromino;\n  }\n\n  htmlReturnRender() {\n    var htmlString = \"\";\n    var htmlToOutput = \"\";\n\n    for (var y = 0; y < this.height + this.drawBorderWidth; y++) {\n      htmlString += \"<div>\";\n\n      for (var x = 0; x < this.width + this.drawBorderWidth * 2; x++) {\n        htmlToOutput = \"<span class='darkgray'>**</span>\";\n\n        if (x < this.drawBorderWidth || x > this.width + this.drawBorderWidth * 2 - this.drawBorderWidth - 1 || y > this.height - 1) {\n          htmlString += \"<span>░░</span>\";\n        } else {\n          if (this.currentTetromino && x > this.drawBorderWidth) {\n            var canCheckX = x - this.drawBorderWidth - this.currentTetromino.getBoundaries().left >= 0 && x - this.drawBorderWidth - this.currentTetromino.getBoundaries().left <= this.currentTetromino.getWidth(),\n                canCheckY = y - this.currentTetromino.getBoundaries().top >= 0 && y - this.currentTetromino.getBoundaries().top <= this.currentTetromino.getHeight();\n\n            if (canCheckX && canCheckY) {\n              if (this.currentTetromino.getShapeValue(y - this.currentTetromino.getBoundaries().top, x - this.currentTetromino.getBoundaries().left) == 1) {\n                htmlToOutput = \"<span class='\" + this.currentTetromino.color + \"'>░░</span>\";\n              }\n            }\n          }\n\n          htmlString += htmlToOutput;\n        }\n      }\n\n      htmlString += \"</div>\";\n    }\n\n    return htmlString;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/classes/Playfield.js?");

/***/ }),

/***/ "./src/classes/Tetromino.js":
/*!**********************************!*\
  !*** ./src/classes/Tetromino.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tetromino; });\nconst DATA_TETROMINOS = __webpack_require__(/*! ../data/tetrominos.json */ \"./src/data/tetrominos.json\");\n\nclass Tetromino {\n  constructor(shapeIndex) {\n    this.shapeIndex = shapeIndex;\n    this.shape = DATA_TETROMINOS[this.shapeIndex].shape;\n    this.center = {\n      x: DATA_TETROMINOS[this.shapeIndex].center.x,\n      y: DATA_TETROMINOS[this.shapeIndex].center.y\n    };\n    this.color = DATA_TETROMINOS[this.shapeIndex].color;\n    this.x = 0;\n    this.y = 0;\n    this.rotation = 0;\n  }\n\n  getWidth() {\n    return this.shape[0].length;\n  }\n\n  getHeight() {\n    return this.shape.length;\n  }\n\n  getBoundaries() {\n    return {\n      \"top\": this.y - this.center.y,\n      \"left\": this.x - this.center.x,\n      \"bottom\": this.y - this.center.y + this.getHeight(),\n      \"right\": this.x - this.center.x + this.getWidth()\n    };\n  }\n\n  setX(val) {\n    this.x = val;\n  }\n\n  setY(val) {\n    this.y = val;\n  }\n\n  setPos(x, y) {\n    setX(x);\n    setY(y);\n  }\n\n  getShapeValue(x, y) {\n    return this.shape[y][x];\n  }\n\n}\n\n//# sourceURL=webpack:///./src/classes/Tetromino.js?");

/***/ }),

/***/ "./src/data/tetrominos.json":
/*!**********************************!*\
  !*** ./src/data/tetrominos.json ***!
  \**********************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"[{\\\"shape\\\":[[1,1],[1,1]],\\\"center\\\":{\\\"x\\\":1,\\\"y\\\":1},\\\"color\\\":\\\"red\\\"},{\\\"shape\\\":[[1],[1],[1],[1]],\\\"center\\\":{\\\"x\\\":0,\\\"y\\\":2},\\\"color\\\":\\\"blue\\\"},{\\\"shape\\\":[[1,0],[1,0],[1,1]],\\\"center\\\":{\\\"x\\\":1,\\\"y\\\":2},\\\"color\\\":\\\"orange\\\"},{\\\"shape\\\":[[0,1],[0,1],[1,1]],\\\"center\\\":{\\\"x\\\":1,\\\"y\\\":2},\\\"color\\\":\\\"yellow\\\"},{\\\"shape\\\":[[1,0],[1,1],[1,0]],\\\"center\\\":{\\\"x\\\":1,\\\"y\\\":2},\\\"color\\\":\\\"green\\\"},{\\\"shape\\\":[[1,0],[1,1],[0,1]],\\\"center\\\":{\\\"x\\\":1,\\\"y\\\":2},\\\"color\\\":\\\"purple\\\"},{\\\"shape\\\":[[0,1],[1,1],[1,0]],\\\"center\\\":{\\\"x\\\":1,\\\"y\\\":2},\\\"color\\\":\\\"cyan\\\"}]\");\n\n//# sourceURL=webpack:///./src/data/tetrominos.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _classes_Playfield_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Playfield.js */ \"./src/classes/Playfield.js\");\n/* harmony import */ var _classes_Tetromino_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Tetromino.js */ \"./src/classes/Tetromino.js\");\n// Import style\n // Import classes\n\n\n\nvar htmlContainerElement = document.querySelector(\"#root\");\nvar playfield = new _classes_Playfield_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nplayfield.init(); // var tetromino = new Tetromino( Math.floor(Math.random() * 7) );\n\nvar tetromino = new _classes_Tetromino_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](5);\ntetromino.setX(5);\ntetromino.setY(3);\nconsole.log(tetromino.getBoundaries());\nconsole.log(tetromino.getWidth());\nconsole.log(tetromino.getHeight());\nplayfield.setCurrentTetromino(tetromino);\nhtmlContainerElement.innerHTML = playfield.htmlReturnRender();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.css?");

/***/ })

/******/ });