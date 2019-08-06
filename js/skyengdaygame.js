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

/***/ "./src/animation.js":
/*!**************************!*\
  !*** ./src/animation.js ***!
  \**************************/
/*! exports provided: Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");


class Animation extends _sprite__WEBPACK_IMPORTED_MODULE_0__["Sprite"] {
    constructor({imageName, frames, speed, repeat = true, autorun = true, width = 64, height = 64}) {
        super({
            imageName: imageName,
            sourceX: frames[0].sx,
            sourceY: frames[0].sy,
            width: width,
            height: height
        });

        this.frames = frames;
        this.speed = speed;
        this.repeat = repeat;
        this.running = autorun;
        this.lastTime = 0;
        this.currentFrame = 0;
        this.totalFrames = this.frames.length;
    }

    setFrame(index) {
        this.currentFrame = index;
        this.sourceX = this.frames[index].sx;
        this.sourceY = this.frames[index].sy;
    }

    run() {
        if(!this.running){
            this.setFrame(0);
            this.running = true;
        }
    }

    stop() {
        this.running = false;
    }

    nextFrame() {
        if((this.currentFrame + 1) == this.totalFrames) {
            if(this.repeat) {
                this.setFrame(0);
                return;
            }
            this.stop();
            return;
        }
        this.setFrame(this.currentFrame + 1);
    }

    update(time) {
        if(!this.running) {
            return;
        }
        if(this.lastTime == 0) {
            this.lastTime = time;
            return;
        }
        if((time - this.lastTime) > this.speed) {
            this.nextFrame();
            this.lastTime = time;
        }
    }
}

/***/ }),

/***/ "./src/artifact.js":
/*!*************************!*\
  !*** ./src/artifact.js ***!
  \*************************/
/*! exports provided: Artifact */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Artifact", function() { return Artifact; });
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");


class Artifact {
    constructor(sprite, x, y, width, height, type) {
        this.collisionShape = {
            x: x, 
            y: y, 
            width: width, 
            height: height
        };
        this.sprite = sprite;   
        this.sprite.setXY(x, y);
        this.type = type;
    }

    update(time) {
        //console.log(this.sprite);
    }
}

/***/ }),

/***/ "./src/body.js":
/*!*********************!*\
  !*** ./src/body.js ***!
  \*********************/
/*! exports provided: Body */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Body", function() { return Body; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");
/* harmony import */ var _character_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./character-sheet */ "./src/character-sheet.js");



class Body {
    constructor({imageName, speed, x = 0, y = 0, stand = 'up'}) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.velocity = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"]('up', 0);
        this.lastTime = 0;
        this.animations = {};
        this.collisionShape = {x: 18, y: 15, width: 28, height: 49};

        const animationSheet = new _character_sheet__WEBPACK_IMPORTED_MODULE_1__["CharacterSheet"]({imageName: imageName});
        "walk-down,walk-up,walk-left,walk-right".split(",").forEach(name => {
            this.animations[name] = animationSheet.getAnimation(name);
        });
        this.stand(stand);
    }

    newAnimation(imageName){
        this.animations = {}
        const animationSheet = new _character_sheet__WEBPACK_IMPORTED_MODULE_1__["CharacterSheet"]({imageName: imageName});
        "walk-down,walk-up,walk-left,walk-right".split(",").forEach(name => {
            this.animations[name] = animationSheet.getAnimation(name);
        });
        this.stand(this.velocity.direction);
    }

    walk(direction) {
        this.velocity.setDirection(direction, this.speed);
        this.view = this.animations["walk-" + direction];
        this.view.run();
    }

    stand(direction) {
        this.velocity.setDirection(direction, 0);
        this.view = this.animations["walk-" + direction];
        this.view.stop();
    }

    update(time) {
        if(this.lastTime == 0) {
            this.lastTime = time;
            return;
        }

        this.x += (time - this.lastTime) * (this.velocity.x / 1000);
        this.y += (time - this.lastTime) * (this.velocity.y / 1000);
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x),Math.trunc(this.y));
        this.view.update(time);
    }
}

/***/ }),

/***/ "./src/camera.js":
/*!***********************!*\
  !*** ./src/camera.js ***!
  \***********************/
/*! exports provided: Camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return Camera; });
class Camera {
    constructor({width = 640, height = 640, limitX = 50000, limitY = 50000, scrollEdge = 200} = {}) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.limitX = limitX;
        this.limitY = limitY;
        this.watchObject = false;
        this.obj = null;
        this.scrollEdge = scrollEdge;
    }

    watch(obj) {
        this.watchObject = true;
        this.obj = obj;
    }

    update(time) {
        if(this.watchObject) {
            if(this.obj.x > (this.x + this.width - this.scrollEdge)) {
                this.x = Math.min(this.limitX, this.obj.x - this.width + this.scrollEdge);
            }

            if(this.obj.x < (this.x + this.scrollEdge)) {
                this.x = Math.max(0, this.obj.x - this.scrollEdge);
            }

            if(this.obj.y > (this.y + this.height - this.scrollEdge)) {
                this.y = Math.min(this.limitY, this.obj.y - this.height + this.scrollEdge);
            }

            if(this.obj.y < (this.y + this.scrollEdge)) {
                this.y = Math.max(0, this.obj.y - this.scrollEdge);
            }
        }
    }
}

/***/ }),

/***/ "./src/character-sheet.js":
/*!********************************!*\
  !*** ./src/character-sheet.js ***!
  \********************************/
/*! exports provided: CharacterSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterSheet", function() { return CharacterSheet; });
/* harmony import */ var _sprite_sheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite-sheet */ "./src/sprite-sheet.js");


class CharacterSheet extends _sprite_sheet__WEBPACK_IMPORTED_MODULE_0__["SpriteSheet"] {
    constructor({imageName}) {
        super({
            imageName: imageName,
            imageWidth: 832,
            imageHeight: 1344
        });
        this.sequences = this.getSequences();
    }

    getSequences() {
        const data = __webpack_require__(/*! ./maps/player.json */ "./src/maps/player.json");
        const sequences = {};
        data.layers.forEach(layer => {
            sequences[layer.name] = layer.data.filter(i => i > 0);
        });
        return sequences;
    }

    getAnimation(name, speed = 100, repeat = true, autorun = true) {
        return super.getAnimation(this.sequences[name], speed, repeat, autorun);
    }
}

/***/ }),

/***/ "./src/collider.js":
/*!*************************!*\
  !*** ./src/collider.js ***!
  \*************************/
/*! exports provided: Collider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collider", function() { return Collider; });
class Collider {
    constructor() {
        this.staticShapes = [];
        this.bodies = [];
    }

    addStaticShapes(data) {
        data.layers.forEach(layer => {
            if(layer.type == "objectgroup") {
                this.staticShapes.push(...layer.objects);
            }
        });
    }

    addKinematicBody(body) {
        this.bodies.push({
            x: body.x,
            y: body.y,
            obj: body
        });
    }

    update(time) {
        this.checkStatic(time);
    }

    checkStatic(time) {
        this.bodies.forEach(body => {
            let oldX = body.x;
            let oldY = body.y;
            let x = body.obj.x;
            let y = body.obj.y;
            //moving right
            if(x > oldX) {
                this.staticShapes.forEach(shape => {
                    if(
                        ((oldX - 1 + body.obj.collisionShape.x + body.obj.collisionShape.width) < shape.x) && 
                        ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x) && 
                        ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                        ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
                    ) {
                        x = Math.min(x + body.obj.collisionShape.x + body.obj.collisionShape.width, shape.x) 
                            - body.obj.collisionShape.x - body.obj.collisionShape.width;
                    }
                });
            }

            //moving left
            if(x < oldX) {
                this.staticShapes.forEach(shape => {
                    if(
                        ((oldX + 1 + body.obj.collisionShape.x) > (shape.x + shape.width)) && 
                        ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) && 
                        ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                        ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y)
                    ) {
                        x = Math.max(x + body.obj.collisionShape.x , shape.x + shape.width) 
                            - body.obj.collisionShape.x;
                    }
                });
            }            

            //moving down
            if(y > oldY) {
                this.staticShapes.forEach( shape => {
                    if(
                        ((oldY - 1 + body.obj.collisionShape.y + body.obj.collisionShape.height) < shape.y) &&
                        ((y + body.obj.collisionShape.y + body.obj.collisionShape.height) > shape.y) &&
                       ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                       ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
                    ) {
                        y = Math.min(y + body.obj.collisionShape.y + body.obj.collisionShape.height, shape.y) - body.obj.collisionShape.y - body.obj.collisionShape.height;

                    }
                });
            }

            //moving up
            if(y < oldY) {
                this.staticShapes.forEach( shape => {
                    if(
                        ((oldY + 1 + body.obj.collisionShape.y) > (shape.y + shape.height)) &&
                        ((y + body.obj.collisionShape.y) < (shape.y + shape.height)) &&
                       ((x + body.obj.collisionShape.x) < (shape.x + shape.width)) &&
                       ((x + body.obj.collisionShape.x + body.obj.collisionShape.width) > shape.x)
                    ) {
                        y = Math.max(y + body.obj.collisionShape.y, shape.y + shape.height) - body.obj.collisionShape.y;
                    }
                });
            }            

            body.x = x;
            body.y = y;
            body.obj.x = x;
            body.obj.y = y;

        });

    }
}

/***/ }),

/***/ "./src/control-state.js":
/*!******************************!*\
  !*** ./src/control-state.js ***!
  \******************************/
/*! exports provided: ControlState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlState", function() { return ControlState; });
class ControlState {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.use = false;
        this.keyMap = new Map([
            [37, 'left'],
            [39, 'right'],
            [38, 'up'],
            [40, 'down'],
            [32, 'use'],
            [49, 'one'],
            [50, 'two'],
            [51, 'three'],
            [52, 'four']
        ]);
        document.addEventListener('keydown', (event) => this.update(event, true));
        document.addEventListener('keyup', (event) => this.update(event, false));
    }

    update(event, pressed) {
        if(this.keyMap.has(event.keyCode)) {
            event.preventDefault();
            event.stopPropagation();
            this[this.keyMap.get(event.keyCode)] = pressed;
        }
    }
}

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen */ "./src/screen.js");
/* harmony import */ var _scenes_loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/loading */ "./src/scenes/loading.js");
/* harmony import */ var _scenes_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/menu */ "./src/scenes/menu.js");
/* harmony import */ var _scenes_level__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/level */ "./src/scenes/level.js");
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scene */ "./src/scene.js");
/* harmony import */ var _control_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./control-state */ "./src/control-state.js");







class Game {
    constructor({width = 640, height = 640} = {}) {
        this.screen = new _screen__WEBPACK_IMPORTED_MODULE_0__["Screen"](width,height);
        this.screen.loadImages({
			player: 'img/player.png',
			title: 'img/title.jpg',
            tiles: 'img/tiles.png' ,
            Zamurenko: 'img/Zamurenko.png',
            Stepan: 'img/Stepan.png'  ,
            Kononenko: 'img/Kononenko.png'  ,
            Ovcharenko: 'img/Ovcharenko.png'  ,
            Yamanov: 'img/Yamanov.png'  ,
            Smetnev: 'img/Smetnev.png'  ,
            Laryanovsky: 'img/Laryanovsky.png'  ,
            player2: 'img/player2.png'  ,
            Kudriavtcev: 'img/Kudriavtcev.png'  ,
            Solovev: 'img/Solovev.png'  ,
            Matveev: 'img/Matveev.png'  ,
            Yaunzem: 'img/Yaunzem.png'  ,
            Baryshnikova: 'img/Baryshnikova.png'  ,
            Kiyamova: 'img/Kiyamova.png',
            curator: 'img/curator.png',
            artifacts: 'img/artifacts.png',
            background: 'img/background.png',
            desk: 'img/desk.png',
            mission: 'img/mission.png',
            Competitor: 'img/Competitor.png',
            Volkova: 'img/Volkova_2.png',
            Titov: 'img/Titov.png',
            Kataev: 'img/Kataev.png',
            Andrzhevskaya: 'img/Andrzhevskaya_2.png',
            Kolodeznikova: 'img/Kolodeznikova_2.png',
            Sologub: 'img/Sologub_2.png',
            Tepikin: 'img/Tepikin_2.png',
            Pushkin: 'img/Pushkin_2.png',
            Lebedev: 'img/Lebedev_2.png',
            Kisel: 'img/Kisel_2.png',
            background2: 'img/background2.png',
        });
        this.control = new _control_state__WEBPACK_IMPORTED_MODULE_5__["ControlState"]();
        this.scenes = {
            loading: new _scenes_loading__WEBPACK_IMPORTED_MODULE_1__["Loading"](this),
            menu: new _scenes_menu__WEBPACK_IMPORTED_MODULE_2__["Menu"](this),
            level: new _scenes_level__WEBPACK_IMPORTED_MODULE_3__["Level"](this)
        };
        this.currentScene = this.scenes.loading;
        this.currentScene.init();
    }

    changeScene(status) {
        switch(status) {
            case _scene__WEBPACK_IMPORTED_MODULE_4__["Scene"].LOADED:
                return this.scenes.menu;
            case _scene__WEBPACK_IMPORTED_MODULE_4__["Scene"].START_GAME:
                return this.scenes.level;
            default:
                return this.scenes.menu;
        }
    }

    frame(time) {
        if(this.currentScene.status != _scene__WEBPACK_IMPORTED_MODULE_4__["Scene"].WORKING) {
            this.currentScene = this.changeScene(this.currentScene.status);
            this.currentScene.init();
        }
        this.currentScene.render(time);
        requestAnimationFrame(time => this.frame(time));
    }

    run() {
        requestAnimationFrame(time => this.frame(time));
    }
}

/***/ }),

/***/ "./src/image-loader.js":
/*!*****************************!*\
  !*** ./src/image-loader.js ***!
  \*****************************/
/*! exports provided: ImageLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return ImageLoader; });
class ImageLoader {
    constructor(imageFiles) {
        this.imageFiles = imageFiles;
        this.images = {};
    }

    load() {
        const promises = [];
        for (let name in this.imageFiles) {
            promises.push(this.loadImage(name, this.imageFiles[name]));
        }
        return Promise.all(promises);
    }

    loadImage(name, src) {
        return new Promise((resolve) => {
            const image = new Image();
            this.images[name] = image;
            image.onload = () => resolve(name);
            image.src = src;
        });
    }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


window.onload = () => {
    const skyengdaygame = new _game__WEBPACK_IMPORTED_MODULE_0__["Game"]();
    skyengdaygame.run();
};

/***/ }),

/***/ "./src/maps/office.json":
/*!******************************!*\
  !*** ./src/maps/office.json ***!
  \******************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

module.exports = {"height":37,"infinite":false,"layers":[{"data":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,52,52,52,52,52,52,52,41,41,41,41,41,1,1,1,1,1,1,1,1,52,52,52,52,52,52,52,41,41,41,41,41,1,1,1,1,1,1,1,1,52,52,52,52,52,52,52,41,41,41,41,41,1,1,1,1,1,1,1,1,52,52,52,52,52,52,52,41,41,41,41,41,1,1,1,1,1,1,1,1,52,52,52,52,52,52,52,41,41,41,41,41,1,1,1,1,1,1,1,1,52,52,52,52,52,52,52,41,41,41,41,41,1,1,1,1,1,1,1,1,52,52,52,52,52,52,52,41,41,41,41,41,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,53,53,53,53,53,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,53,53,53,53,53,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,53,53,53,53,53,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,53,53,53,53,53,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,53,53,53,53,53,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,51,51,51,51,51,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,51,52,52,52,51,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,51,52,52,52,51,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,51,52,52,52,51,1,1,1,1,1,1,1,1,53,53,53,53,53,53,53,51,52,52,52,51,1,1,1,1,1,1,1,1,54,54,54,54,52,52,52,51,52,52,52,51,1,1,1,1,1,1,1,1,54,54,54,54,52,52,54,51,51,51,51,51,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,55,56,55,55,55,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,55,56,56,56,56,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,55,56,55,55,55,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,1,54,54,54,54,54,54,1,1,1,1,1,1,1,54,54,54,54,54,54,54,54,54,54,54,54,54,1,1,1,1,1,1,1,54,54,54,54,54,54,54,54,54,54,54,54,54,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],"height":37,"id":8,"name":"Ландшафт","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,36,33,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,46,43,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":37,"id":14,"name":"Мебель3","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,33,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,24,0,35,36,33,34,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,45,46,43,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,36,33,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,46,43,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":37,"id":13,"name":"Мебель2","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,31,0,31,0,0,0,0,0,0,0,0,0,0,0,80,0,0,0,22,0,24,0,24,0,0,0,0,0,0,0,0,0,0,80,0,80,0,0,12,0,31,0,31,0,0,0,0,0,0,0,0,0,80,0,70,0,80,0,22,0,24,0,24,0,0,0,0,0,0,0,0,0,0,80,0,80,0,0,12,0,31,0,31,0,0,0,0,0,0,0,0,0,0,0,80,0,0,0,22,0,24,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,50,0,0,11,12,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0,0,0,0,23,13,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,21,22,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0,28,0,0,11,12,0,0,0,0,0,0,0,0,0,15,0,0,0,0,27,29,0,0,21,22,0,0,0,0,0,0,0,0,0,0,31,0,0,7,0,0,0,0,18,19,20,0,0,0,0,0,0,0,0,32,14,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,14,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,14,42,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,31,0,31,31,31,0,0,0,0,8,9,10,0,0,0,0,0,0,0,0,24,0,24,24,24,0,16,3,0,2,42,5,0,0,0,0,0,0,0,0,31,0,31,31,31,0,26,3,0,0,0,0,0,0,0,0,0,0,0,0,24,0,24,24,24,0,16,0,0,4,4,0,0,0,0,0,0,0,0,0,31,0,31,31,31,0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,24,24,24,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,31,0,31,31,31,0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,24,24,24,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,0,0,0,0,26,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,13,31,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,13,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,31,31,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,60,0,24,24,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":37,"id":11,"name":"Мебель","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,0,0,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,0,77,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,79,85,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":37,"id":12,"name":"Стены2","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,85,85,85,85,85,85,85,85,85,85,88,85,0,0,0,0,0,0,0,76,74,65,65,65,65,65,76,64,65,65,68,66,74,0,0,0,0,0,0,76,74,0,0,0,0,0,76,74,0,0,0,79,77,0,0,0,0,0,0,76,74,0,0,0,0,0,76,74,0,0,0,79,77,0,0,0,0,0,0,76,74,0,0,0,0,0,76,74,0,0,0,76,74,0,0,0,0,0,0,76,74,0,0,0,0,0,76,74,0,0,0,79,77,0,0,0,0,0,0,76,74,0,0,0,0,0,76,74,0,0,0,79,77,0,0,0,0,0,0,76,85,85,85,0,85,85,86,74,85,85,85,86,74,0,0,0,0,0,0,76,37,38,39,75,64,65,91,78,97,65,65,66,74,0,0,0,0,0,0,76,47,0,49,75,74,0,73,78,77,0,0,79,77,0,0,0,0,0,0,76,47,0,49,75,74,0,73,78,88,88,88,98,74,0,0,0,0,0,0,76,47,0,0,0,0,0,73,78,67,68,68,69,77,0,0,0,0,0,0,76,57,58,59,75,84,85,92,78,85,85,85,86,74,0,0,0,0,0,0,79,97,65,95,77,65,65,91,71,65,65,65,66,74,0,0,0,0,0,0,79,77,0,79,77,0,0,0,0,0,0,0,79,77,0,0,0,0,0,0,79,77,0,79,77,0,0,73,71,0,0,0,79,77,0,0,0,0,0,0,79,77,0,79,77,0,0,73,71,0,0,0,76,74,0,0,0,0,0,0,79,99,82,82,82,82,0,83,71,0,0,0,79,77,0,0,0,0,0,0,73,61,62,62,62,62,0,63,71,0,0,0,79,77,0,0,0,0,0,0,79,77,0,0,0,0,0,73,93,0,85,85,86,74,0,0,0,0,0,0,79,77,0,0,0,0,0,73,94,0,65,65,66,74,0,0,0,0,0,0,73,71,0,0,0,0,0,73,71,0,0,0,79,77,0,0,0,0,0,0,79,77,0,0,0,0,0,73,71,85,85,85,86,74,0,0,0,0,0,0,79,77,0,0,0,0,0,73,71,65,65,65,65,0,0,0,0,0,0,0,73,71,0,0,0,0,0,73,71,0,0,0,0,0,0,0,0,0,0,0,79,77,0,0,0,0,0,73,71,0,0,0,0,0,0,0,0,0,0,0,79,77,0,0,0,0,0,73,71,0,0,0,0,0,0,0,0,0,0,0,73,71,0,0,0,0,0,73,71,0,0,0,0,0,0,0,0,0,0,0,73,71,0,0,0,0,0,73,71,0,0,0,0,0,0,0,0,0,0,0,73,81,0,82,82,82,82,83,71,0,0,0,0,0,0,0,0,0,0,0,0,63,72,61,62,62,62,63,71,0,0,0,0,0,0,0,0,0,0,0,0,73,72,71,0,0,0,73,71,0,0,0,0,0,0,0,0,0,0,0,0,73,72,71,0,0,0,73,71,0,0,0,0,0,0,85,85,85,85,85,85,92,72,71,0,0,0,73,71,0,0,0,0,0,76,64,65,65,90,90,90,90,0,0,0,0,0,73,71,0,0,0,0,0,76,84,88,88,85,88,88,83,100,81,82,82,88,83,71,0,0,0,0,0,0,65,68,68,65,68,68,62,68,62,62,62,68,62,0,0,0,0,0,0],"height":37,"id":9,"name":"Стены","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0},{"draworder":"topdown","id":10,"name":"Слой объектов 1","objects":[{"height":8.66667,"id":1,"name":"","rotation":0,"type":"","visible":true,"width":329.333,"x":891,"y":59},{"height":828,"id":5,"name":"","rotation":0,"type":"","visible":true,"width":9,"x":891,"y":67.6667},{"height":1347.67,"id":6,"name":"","rotation":0,"type":"","visible":true,"width":8.66667,"x":891.333,"y":959.667},{"height":1408.25,"id":7,"name":"","rotation":0,"type":"","visible":true,"width":8.25,"x":1211.75,"y":67.5},{"height":8.25,"id":8,"name":"","rotation":0,"type":"","visible":true,"width":255.75,"x":956,"y":507.5},{"height":123.5,"id":10,"name":"","rotation":0,"type":"","visible":true,"width":8.25,"x":955.75,"y":516},{"height":7.25,"id":11,"name":"","rotation":0,"type":"","visible":true,"width":255.75,"x":955.5,"y":700.25},{"height":60.5,"id":13,"name":"","rotation":0,"type":"","visible":true,"width":8,"x":955.75,"y":707.25},{"height":8.66667,"id":15,"name":"","rotation":0,"type":"","visible":true,"width":251.667,"x":959.667,"y":827.667},{"height":7.81818,"id":16,"name":"","rotation":0,"type":"","visible":true,"width":60,"x":900.182,"y":1275.82},{"height":7.27273,"id":17,"name":"","rotation":0,"type":"","visible":true,"width":190.667,"x":1023.33,"y":1276.06},{"height":8,"id":18,"name":"","rotation":0,"type":"","visible":true,"width":311,"x":900.667,"y":1467.33},{"height":7.63636,"id":20,"name":"","rotation":0,"type":"","visible":true,"width":199.818,"x":443.818,"y":508},{"height":9,"id":21,"name":"","rotation":0,"type":"","visible":true,"width":192.5,"x":700,"y":507.5},{"height":188,"id":23,"name":"","rotation":0,"type":"","visible":true,"width":7.5,"x":699.5,"y":516},{"height":187.5,"id":24,"name":"","rotation":0,"type":"","visible":true,"width":7,"x":636,"y":515.5},{"height":1407,"id":25,"name":"","rotation":0,"type":"","visible":true,"width":9,"x":444,"y":516},{"height":319,"id":26,"name":"","rotation":0,"type":"","visible":true,"width":7.5,"x":636,"y":767.5},{"height":9,"id":27,"name":"","rotation":0,"type":"","visible":true,"width":183,"x":453,"y":827},{"height":67,"id":28,"name":"","rotation":0,"type":"","visible":true,"width":7,"x":699.667,"y":768.333},{"height":6.66667,"id":29,"name":"","rotation":0,"type":"","visible":true,"width":184,"x":707.333,"y":828.333},{"height":7.66667,"id":31,"name":"","rotation":0,"type":"","visible":true,"width":316,"x":452,"y":1148},{"height":8.66667,"id":32,"name":"","rotation":0,"type":"","visible":true,"width":59.6667,"x":832,"y":1147},{"height":7.66667,"id":33,"name":"","rotation":0,"type":"","visible":true,"width":59,"x":832,"y":1275.33},{"height":9.33333,"id":34,"name":"","rotation":0,"type":"","visible":true,"width":59.3333,"x":831.667,"y":1403},{"height":8.66667,"id":35,"name":"","rotation":0,"type":"","visible":true,"width":59.3333,"x":831.667,"y":1531.67},{"height":8.66667,"id":36,"name":"","rotation":0,"type":"","visible":true,"width":59,"x":832,"y":1659},{"height":9,"id":37,"name":"","rotation":0,"type":"","visible":true,"width":58.6667,"x":832.333,"y":1787.33},{"height":8.5,"id":40,"name":"","rotation":0,"type":"","visible":true,"width":62.5,"x":453,"y":1915},{"height":8,"id":41,"name":"","rotation":0,"type":"","visible":true,"width":319.333,"x":571.667,"y":1916},{"height":256.75,"id":42,"name":"","rotation":0,"type":"","visible":true,"width":8,"x":507.5,"y":1923.5},{"height":252,"id":43,"name":"","rotation":0,"type":"","visible":true,"width":8.5,"x":572,"y":1924},{"height":9.5,"id":45,"name":"","rotation":0,"type":"","visible":true,"width":448,"x":59,"y":2170.5},{"height":126.5,"id":46,"name":"","rotation":0,"type":"","visible":true,"width":7.5,"x":59.5,"y":2180},{"height":9.5,"id":47,"name":"","rotation":0,"type":"","visible":true,"width":824,"x":67,"y":2299},{"height":58.5,"id":48,"name":"","rotation":0,"type":"","visible":true,"width":8.5,"x":508,"y":2240},{"height":59,"id":53,"name":"","rotation":0,"type":"","visible":true,"width":8,"x":572,"y":2239.5},{"height":60,"id":54,"name":"","rotation":0,"type":"","visible":true,"width":23.6667,"x":1035,"y":1283.33},{"height":58.6667,"id":55,"name":"","rotation":0,"type":"","visible":true,"width":30,"x":1182.67,"y":1284},{"height":29.3333,"id":56,"name":"","rotation":0,"type":"","visible":true,"width":127.333,"x":1024,"y":1438},{"height":123.333,"id":57,"name":"","rotation":0,"type":"","visible":true,"width":28.6667,"x":900,"y":1283.33},{"height":56,"id":62,"name":"","rotation":0,"type":"","visible":true,"width":56,"x":1155.33,"y":1092},{"height":56,"id":63,"name":"","rotation":0,"type":"","visible":true,"width":56,"x":900,"y":1156},{"height":54.6667,"id":64,"name":"","rotation":0,"type":"","visible":true,"width":55.3333,"x":900,"y":1028},{"height":44.6667,"id":65,"name":"","rotation":0,"type":"","visible":true,"width":130.667,"x":1056.67,"y":837.333},{"height":46.6667,"id":66,"name":"","rotation":0,"type":"","visible":true,"width":129.333,"x":1054.67,"y":1229.33},{"height":63.3333,"id":67,"name":"","rotation":0,"type":"","visible":true,"width":64,"x":1056,"y":736},{"height":128.667,"id":68,"name":"","rotation":0,"type":"","visible":true,"width":64,"x":1056,"y":543.333},{"height":64,"id":71,"name":"","rotation":0,"type":"","visible":true,"width":28,"x":900,"y":95.3333},{"height":31.3333,"id":72,"name":"","rotation":0,"type":"","visible":true,"width":65.3333,"x":1024,"y":127.333},{"height":30.6667,"id":73,"name":"","rotation":0,"type":"","visible":true,"width":64.6667,"x":1151.33,"y":127.333},{"height":64,"id":85,"name":"","rotation":0,"type":"","visible":true,"width":27.3333,"x":901.333,"y":223.333},{"height":31.3333,"id":86,"name":"","rotation":0,"type":"","visible":true,"width":65.3333,"x":1024.67,"y":256.667},{"height":31.5,"id":97,"name":"","rotation":0,"type":"","visible":true,"width":64.5,"x":1151.5,"y":255.333},{"height":62.6667,"id":102,"name":"","rotation":0,"type":"","visible":true,"width":27.3333,"x":901.333,"y":352},{"height":32,"id":103,"name":"","rotation":0,"type":"","visible":true,"width":64,"x":1024,"y":382.666},{"height":31.3333,"id":104,"name":"","rotation":0,"type":"","visible":true,"width":64.6667,"x":1152.67,"y":384.667},{"height":123,"id":106,"name":"","rotation":0,"type":"","visible":true,"width":27.25,"x":864,"y":705},{"height":28.75,"id":107,"name":"","rotation":0,"type":"","visible":true,"width":96.5,"x":767.75,"y":799.75},{"height":56.75,"id":110,"name":"","rotation":0,"type":"","visible":true,"width":55.75,"x":707.75,"y":835},{"height":191.5,"id":111,"name":"","rotation":0,"type":"","visible":true,"width":64.5,"x":511.5,"y":896},{"height":31,"id":116,"name":"","rotation":0,"type":"","visible":true,"width":189,"x":578.5,"y":1280},{"height":31,"id":117,"name":"","rotation":0,"type":"","visible":true,"width":191,"x":577,"y":1408.5},{"height":31.5,"id":128,"name":"","rotation":0,"type":"","visible":true,"width":192,"x":575.5,"y":1537},{"height":32,"id":130,"name":"","rotation":0,"type":"","visible":true,"width":191,"x":576,"y":1664.5},{"height":32,"id":132,"name":"","rotation":0,"type":"","visible":true,"width":57,"x":454.5,"y":1279.5},{"height":31.5,"id":138,"name":"","rotation":0,"type":"","visible":true,"width":56.5,"x":453,"y":1407.5},{"height":160,"id":140,"name":"","rotation":0,"type":"","visible":true,"width":32.5,"x":639.5,"y":1951.5},{"height":31.5,"id":143,"name":"","rotation":0,"type":"","visible":true,"width":127.5,"x":703.333,"y":2048},{"height":32,"id":144,"name":"","rotation":0,"type":"","visible":true,"width":127.5,"x":706.667,"y":2174.83},{"height":59,"id":145,"name":"","rotation":0,"type":"","visible":true,"width":28.3333,"x":67.3333,"y":2180.67},{"height":30,"id":151,"name":"","rotation":0,"type":"","visible":true,"width":55,"x":455,"y":1536},{"height":29,"id":153,"name":"","rotation":0,"type":"","visible":true,"width":55,"x":455,"y":1665},{"height":33,"id":154,"name":"","rotation":0,"type":"","visible":true,"width":127.5,"x":512.5,"y":1791.5},{"height":11,"id":160,"name":"","rotation":0,"type":"","visible":true,"width":451,"x":444,"y":57},{"height":448,"id":162,"name":"","rotation":0,"type":"","visible":true,"width":9,"x":442,"y":67},{"height":9,"id":170,"name":"","rotation":0,"type":"","visible":true,"width":63,"x":960,"y":1275},{"height":9,"id":173,"name":"","rotation":0,"type":"","visible":true,"width":68,"x":637,"y":507}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextlayerid":15,"nextobjectid":176,"orientation":"orthogonal","renderorder":"left-up","tiledversion":"1.2.4","tileheight":64,"tilesets":[{"columns":10,"firstgid":1,"image":"../../dist/img/tiles.png","imageheight":640,"imagewidth":640,"margin":0,"name":"tileset","spacing":0,"tilecount":100,"tileheight":64,"tilewidth":64}],"tilewidth":64,"type":"map","version":1.2,"width":20};

/***/ }),

/***/ "./src/maps/player.json":
/*!******************************!*\
  !*** ./src/maps/player.json ***!
  \******************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

module.exports = {"height":1,"infinite":false,"layers":[{"data":[105,106,107,108,109,110,111,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":1,"id":9,"name":"walk-up","opacity":1,"type":"tilelayer","visible":false,"width":20,"x":0,"y":0},{"data":[118,119,120,121,122,123,124,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":1,"id":10,"name":"walk-left","opacity":1,"type":"tilelayer","visible":false,"width":20,"x":0,"y":0},{"data":[131,132,133,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":1,"id":11,"name":"walk-down","opacity":1,"type":"tilelayer","visible":false,"width":20,"x":0,"y":0},{"data":[144,145,146,147,148,149,150,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":1,"id":12,"name":"walk-right","opacity":1,"type":"tilelayer","visible":true,"width":20,"x":0,"y":0}],"nextlayerid":13,"nextobjectid":1,"orientation":"orthogonal","renderorder":"left-up","tiledversion":"1.2.4","tileheight":64,"tilesets":[{"columns":13,"firstgid":1,"image":"../../dist/img/player.png","imageheight":1344,"imagewidth":832,"margin":0,"name":"player","spacing":0,"tilecount":273,"tileheight":64,"tilewidth":64}],"tilewidth":64,"type":"map","version":1.2,"width":20};

/***/ }),

/***/ "./src/npc.js":
/*!********************!*\
  !*** ./src/npc.js ***!
  \********************/
/*! exports provided: NPC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPC", function() { return NPC; });
/* harmony import */ var _body__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body */ "./src/body.js");


class NPC extends _body__WEBPACK_IMPORTED_MODULE_0__["Body"]{
    constructor(imageName, name, x, y, stand){
        super({
            imageName: imageName,
            speed: 150,
            x: x,
            y: y,
            stand: stand
        });
        this.name = name;
        this.imageName = imageName;
    }

    update(time) {
        super.update(time);
    }
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _body__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body */ "./src/body.js");


class Player extends _body__WEBPACK_IMPORTED_MODULE_0__["Body"] {
    constructor(control, screen, x, y, imageName) {
        super({imageName: imageName, speed: 150, x: x, y: y});
        this.control = control;
        this.screen = screen;
    }

    update(time) {
        if(this.control.up) {
            this.walk("up");
        } else if(this.control.down) {
            this.walk("down");
        } else if(this.control.left) {
            this.walk("left");
        } else if(this.control.right) {
            this.walk("right");
        } else {
            this.stand(this.velocity.direction);
        }

        super.update(time);
    }
}

/***/ }),

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
class Scene {
    constructor(game) {
        this.game = game;
        this.status = this.constructor.WORKING;
    }

    static get WORKING() { return 'WORKING'; }
    static get LOADED() { return 'LOADED'; }
    static get START_GAME() { return 'START_GAME'; }
    static get GAME_OVER() { return 'GAME_OVER'; }
    static get GAME_WIN() { return 'GAME_WIN'; }
    static get FINISHED() { return 'FINISHED'; }

    init() {
        this.status = this.constructor.WORKING;
    }

    finish(status) {
        this.status = status;
    }

    render(time) {
        
    }
}

/***/ }),

/***/ "./src/scenes/level.js":
/*!*****************************!*\
  !*** ./src/scenes/level.js ***!
  \*****************************/
/*! exports provided: Level */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Level", function() { return Level; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "./src/scene.js");
/* harmony import */ var _sprite_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sprite-sheet */ "./src/sprite-sheet.js");
/* harmony import */ var _character_sheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../character-sheet */ "./src/character-sheet.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../player */ "./src/player.js");
/* harmony import */ var _camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../camera */ "./src/camera.js");
/* harmony import */ var _teacher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../teacher */ "./src/teacher.js");
/* harmony import */ var _body__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../body */ "./src/body.js");
/* harmony import */ var _artifact__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../artifact */ "./src/artifact.js");
/* harmony import */ var _npc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../npc */ "./src/npc.js");
/* harmony import */ var _story__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../story */ "./src/story.js");
/* harmony import */ var _collider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../collider */ "./src/collider.js");












class Level extends _scene__WEBPACK_IMPORTED_MODULE_0__["Scene"] {
    constructor(game) {
        super(game);
        this.tiles = new _sprite_sheet__WEBPACK_IMPORTED_MODULE_1__["SpriteSheet"]({
            imageName: 'tiles',
            imageWidth: 640,
            imageHeight: 640
        });
        this.artifactstiles = new _sprite_sheet__WEBPACK_IMPORTED_MODULE_1__["SpriteSheet"]({
            imageName: 'artifacts',
            imageWidth: 640,
            imageHeight: 640
        });
        this.player = new _player__WEBPACK_IMPORTED_MODULE_3__["Player"](game.control, game.screen, 971, 1368, 'player2');
        this.collider = new _collider__WEBPACK_IMPORTED_MODULE_10__["Collider"]();

        this.npc = [
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('curator', 'Куратор', 1009.49, 1370.51, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Ovcharenko', 'Лиза Овчаренко', 989.5, 1278, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Matveev', 'Харитон', 991.5, 760.33, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Solovev', 'Гоша', 566.95, 1718.08, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Laryanovsky', 'Александр Ларьяновский', 656.87, 1470.45, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Smetnev', 'Денис Сметнев', 199.39, 2170.73, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kiyamova', 'Аниса', 504.56, 737.92, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Baryshnikova', 'Вита', 769.61, 2220.79, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Stepan', 'Степан', 507.02, 530.32, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Yamanov', 'Андрей Яманов', 1144.36, 877.85, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kudriavtcev', 'Глеб Кудрявцев', 604.46, 1345.49, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Yaunzem', 'Андрей Яунзем', 681.88, 1080.36, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Zamurenko', 'Костя Замуренко', 834.43, 1580.51, 'up'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kononenko', 'Саша Кононенко', 516, 1474, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Competitor', 'Вова Иванов', 1098, 75, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Volkova', 'Ирина Волкова', 1151, 445, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Titov', 'Максим Титов', 993, 636, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kataev', 'Алексей Катаев', 263, 2233, 'up'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Andrzhevskaya', 'Яна Андрежевская', 456, 855, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kolodeznikova', 'Яна Колодезникова', 580, 856, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Sologub', 'Глеб Сологуб', 1152, 1181, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Tepikin', 'Павел Тепикин', 960, 293, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Pushkin', 'Денис Пушкин', 803, 734, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Lebedev', 'Сергей Лебедев', 814, 1956, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kisel', 'Елена Кисель', 704, 961, 'right'),
        ];

        this.artifacts = [
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 1024, 382, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 1152, 382, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 1024, 256, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 1152, 255, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 1024, 127, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 1152, 127, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(2), 901, 352, 19, 31, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(2), 901, 223, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(2), 900, 95, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 454, 1279, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 578, 1280, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 642, 1280, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 706, 1280, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 454, 1407, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 578, 1407, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 642, 1407, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 706, 1407, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 454, 1536, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 578, 1536, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 642, 1536, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 706, 1536, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 454, 1665, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 578, 1665, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 642, 1665, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 706, 1665, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 512, 1791, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(3), 639, 1983, 19, 31, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(3), 639, 2047, 19, 31, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 703, 2048, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 767, 2048, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 703, 2174, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(1), 767, 2174, 30, 19, 'pc'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(4), 832, 705, 24, 22, 'coffee'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(5), 64, 2240, 25, 23, 'jurnal'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(6), 848, 1712, 22, 22, 'radio'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(7), 848, 1328, 27, 23, 'note'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(8), 900, 1240, 7, 14, 'cassette'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(9), 1056, 1215, 64, 1, 'mission'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(9), 1120, 1215, 64, 1, 'mission'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(10), 567, 1984, 1, 64, 'code'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(10), 567, 2048, 1, 64, 'code'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(11), 709, 576, 1, 64, 'task2'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(11), 886, 577, 1, 64, 'task3'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(12), 902, 1409, 13, 13, 'tapochki'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(12), 961, 1184, 64, 64, 'task1'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(5), 456, 704, 25, 23, 'jurnalAnis'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(14), 128, 2240, 64, 64, 'sofa'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(15), 192, 2240, 64, 64, 'sofa'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(14), 320, 2240, 64, 64, 'sofa'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(15), 384, 2240, 64, 64, 'sofa'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(16), 705, 759, 64, 64, 'water'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(17), 800, 1098, 64, 64, 'trash'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(100), 848, 1328, 27, 23, 'note2'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(100), 642, 427, 27, 23, 'final'),
            new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(100), 640, 258, 27, 23, 'final2'),
        ];

        this.story = new _story__WEBPACK_IMPORTED_MODULE_9__["Story"]({
            player: this.player,
            control: game.control,
            npc: this.npc,
            artifacts: this.artifacts,
            collider: this.collider
        });
    }

    init() {
        super.init();
        const mapData = __webpack_require__(/*! ../maps/office.json */ "./src/maps/office.json");
        this.map = this.game.screen.createMap('level', mapData, this.tiles);
        this.mainCamera = new _camera__WEBPACK_IMPORTED_MODULE_4__["Camera"]({
            width: this.game.screen.width,
            height: this.game.screen.height,
            limitX: this.map.width - this.game.screen.width,
            limitY: this.map.height - this.game.screen.height
        });
        this.mainCamera.watch(this.player);
        this.game.screen.setCamera(this.mainCamera);
        this.collider.addStaticShapes(mapData);
        this.collider.addKinematicBody(this.player);

        this.story.init();
    }

    update(time) {
        if(this.story.newPlayer) {
            this.player.newAnimation('player');
            this.story.newPlayer = false;
        }                
        this.npc.forEach(npc => {
            npc.update(time);
        });
        this.story.update(time);
        this.player.update(time);
        this.collider.update(time);
        this.mainCamera.update(time);
    }

    render(time) {
        this.update(time);
        this.game.screen.drawSprite(this.map); 
        this.artifacts.forEach(artifact => {
            this.game.screen.drawSprite(artifact.sprite);
        });
        this.npc.forEach(npc => {
            this.game.screen.drawSprite(npc.view);
            this.game.screen.printName(npc);
        });
        this.game.screen.drawSprite(this.player.view);

        if(this.story.looking && !this.story.lookDesk && !this.story.lookMission) {
            this.game.screen.printSay(this.story.diaologs[this.story.status]);
        }
        this.game.screen.printTask(this.story.currentTask);
        if(this.story.lookDesk) {
            this.game.screen.drawImage(0, 0, 'desk');
        }
        if(this.story.lookMission) {
            this.game.screen.drawImage(0, 0, 'mission');
        }
        if(this.story.find && !this.story.findEnd) {
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 527, 1344, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 557, 1190, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 714, 1174, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 778, 1031, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 834, 915, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 906, 715, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 907, 489, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 1102, 303, 27, 23, ''));
            this.artifacts.push(new _artifact__WEBPACK_IMPORTED_MODULE_7__["Artifact"](this.artifactstiles.getSprite(13), 1103, 108, 27, 23, ''));
            this.story.find = false;
            this.story.findEnd = true;
        }
        if(this.story.lookChristy && !this.story.lookChristy_) {
            var video = document.createElement('video');
            video.src="video/Christy.mp4";
            video.autoplay = true;
            video.setAttribute("width", 320);
            video.setAttribute("height", 240);
            video.setAttribute("id", "aaa");
            document.body.appendChild(video);
            this.story.lookChristy = false;
            this.story.lookChristy_ = true;
            setTimeout(function(){
                document.getElementById('aaa').remove();
            },13000);
        }
        if(this.story.lookSasha && !this.story.lookSasha_) {
            var video = document.createElement('video');
            video.src="video/Sasha.mp4";
            video.autoplay = true;
            video.setAttribute("width", 320);
            video.setAttribute("height", 240);
            video.setAttribute("id", "bbb");
            document.body.appendChild(video);
            this.story.lookSasha = false;
            this.story.lookSasha_ = true;
            setTimeout(function(){
                document.getElementById('bbb').remove();
            },11000);
        }
        if(this.story.lookNatasha && !this.story.lookNatasha_) {
            var video = document.createElement('video');
            video.src="video/Nata.mp4";
            video.autoplay = true;
            video.setAttribute("width", 320);
            video.setAttribute("height", 240);
            video.setAttribute("id", "ccc");
            document.body.appendChild(video);
            this.story.lookNatasha = false;
            this.story.lookNatasha_ = true;
            setTimeout(function(){
                document.getElementById('ccc').remove();
            },7000);
        }
        if(this.story.lookLeader && !this.story.lookLeader_) {
            var video = document.createElement('video');
            video.src="video/Capitan.mp4";
            video.autoplay = true;
            video.setAttribute("width", 320);
            video.setAttribute("height", 240);
            video.setAttribute("id", "ddd");
            document.body.appendChild(video);
            this.story.lookLeader = false;
            this.story.lookLeader_ = true;
            setTimeout(function(){
                document.getElementById('ddd').remove();
            },35000);
        }
        if(this.story.lookUs && !this.story.lookUs_) {
            var video = document.createElement('video');
            video.src="video/main.mp4";
            video.autoplay = true;
            video.setAttribute("width", 320);
            video.setAttribute("height", 240);
            video.setAttribute("id", "eee");
            document.body.appendChild(video);
            this.story.lookUs = false;
            this.story.lookUs_ = true;
            setTimeout(function(){
                document.getElementById('eee').remove();
            },23000);
        }
        if(this.story.lookMain && !this.story.lookMain_) {
            var video = document.createElement('video');
            video.src="video/main2.mp4";
            video.autoplay = true;
            video.setAttribute("width", 320);
            video.setAttribute("height", 240);
            video.setAttribute("id", "fff");
            document.body.appendChild(video);
            this.story.lookMain = false;
            this.story.lookMain_ = true;
            setTimeout(function(){
                document.getElementById('fff').remove();
            },81000);
        }
        if(this.story.music && !this.story.music_) {
            var audio = document.createElement('video');
            audio.src="audio/main.mp3";
            audio.setAttribute("id", "ggg");
            document.body.appendChild(audio);
            audio.play();
            this.story.music = false;
            this.story.music_ = true;
            setTimeout(function(){
                document.getElementById('ggg').remove();
            },224000);
        }

        super.render(time);
    }
}

/***/ }),

/***/ "./src/scenes/loading.js":
/*!*******************************!*\
  !*** ./src/scenes/loading.js ***!
  \*******************************/
/*! exports provided: Loading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loading", function() { return Loading; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "./src/scene.js");


class Loading extends _scene__WEBPACK_IMPORTED_MODULE_0__["Scene"] {
    constructor(game) {
        super(game);
        this.loadedAt = 0;
    }

    init() {
        super.init();
        this.loadedAt = 0;
    }

    update(time) {
        if(this.loadedAt == 0 && this.game.screen.isImagesLoaded == true) {
            this.loadedAt = time;
        }
        if(this.loadedAt != 0 && (time - this.loadedAt) > 500) {
            this.finish(_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"].LOADED);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#369AD9');
        this.game.screen.print(50, 70, "Loading...");
        super.render(time);
    }
}

/***/ }),

/***/ "./src/scenes/menu.js":
/*!****************************!*\
  !*** ./src/scenes/menu.js ***!
  \****************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "./src/scene.js");


class Menu extends _scene__WEBPACK_IMPORTED_MODULE_0__["Scene"] {
    constructor(game) {
        super(game);
    }

    init() {
        super.init();
    }

    update(time) {
        if(this.game.control.use) {
            this.finish(_scene__WEBPACK_IMPORTED_MODULE_0__["Scene"].START_GAME);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImage(0, 0, 'title');
        this.game.screen.print(250, 500, "Нажмите пробел");
        super.render(time);
    }
}

/***/ }),

/***/ "./src/screen.js":
/*!***********************!*\
  !*** ./src/screen.js ***!
  \***********************/
/*! exports provided: Screen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Screen", function() { return Screen; });
/* harmony import */ var _image_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-loader */ "./src/image-loader.js");
/* harmony import */ var _tile_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile-map */ "./src/tile-map.js");



class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas(width, height);
        this.context = this.canvas.getContext('2d');
        this.images = {};
        this.isImagesLoaded = false;
        this.camera = null;
        this.isCameraSet = false;
    }

    setCamera(camera) {
        this.camera = camera;
        this.isCameraSet = true;
    }

    loadImages(imageFiles) {
        const loader = new _image_loader__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"](imageFiles);
        loader.load().then((names) => {
            this.images = Object.assign(this.images, loader.images);
            this.isImagesLoaded = true;
        });
    }

    createCanvas(width, height) {
        let elements = document.getElementsByTagName('canvas');
        let canvas = elements[0] || document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;        
        return canvas;
    }

    createMap(name, mapData, tileset) {
        const mapImage = document.createElement('canvas');
        mapImage.width = mapData.width * mapData.tilewidth;
        mapImage.height = mapData.height * mapData.tileheight;
        const mapContext = mapImage.getContext('2d');
        const hitboxes = [];
        let row, col;
        mapData.layers.forEach(layer => {
            if(layer.type == 'tilelayer') {
                row = 0;
                col = 0;
                layer.data.forEach(index => {
                    if(index > 0) {
                        mapContext.drawImage(this.images[tileset.imageName],
                            tileset.getSourceX(index), tileset.getSourceY(index),
                            mapData.tilewidth, mapData.tileheight,
                            col * mapData.tilewidth, row * mapData.tileheight,
                            mapData.tilewidth, mapData.tileheight
                            );
                    }
                    col++;
                    if(col > (mapData.width - 1)) {
                        col = 0;
                        row++;
                    }
                });
            }
            if(layer.type == 'objectgroup') {
                hitboxes.push(...layer.objects.map(obj => ({
                    x1: obj.x, 
                    x2: obj.x + obj.width, 
                    y1: obj.y, 
                    y2: obj.y + obj.height
                })));
            }
        });

        this.images[name] = mapImage;
        return new _tile_map__WEBPACK_IMPORTED_MODULE_1__["TileMap"]({
            imageName: name,
            sourceX: 0,
            sourceY: 0,
            width: mapImage.width,
            height: mapImage.height,
            hitboxes: hitboxes
        });
    }

    fill(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    print(x, y, text) {
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "22px Georgia";
        this.context.fillText(text, x, y);
    }

    printTask(text) {
        this.drawImage(0, 570, 'background2');
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "16px Georgia";
        this.context.fillText("Задача: " + text, 30, 612);
    }

    printName(player) {
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "14px Georgia";
        var name = {
            x: player.x - this.camera.x - (player.name.split(' ')[0].length * 3 - player.collisionShape.width),
            y: player.y - this.camera.y,
            text: player.name.split(' ')[0]
        };
        var subname = {};
        if(player.name.split(' ').length > 1) {
            subname.x =  player.x - this.camera.x - (player.name.split(' ')[1].length * 3 - player.collisionShape.width);
            subname.y = player.y - this.camera.y;
            subname.text = player.name.split(' ')[1]
        } else {
            subname = null;
        }
        if(subname != null) this.context.fillText(subname.text, subname.x, subname.y - 10);
        this.context.fillText(name.text, name.x, name.y);
    }
    printSay(text, mode) {
        this.drawImage(0, 0, 'background');
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "16px Georgia";
        this.context.fillText(text[0], 40, 55);
        if(text.length > 1) this.context.fillText(text[1], 40, 75);
        if(text.length > 2) this.context.fillText(text[2], 40, 95);
        if(!mode) this.context.fillText("<Пробел> для продолжения", 385, 109);
        else this.context.fillText("<Цифра> для ответа", 395, 109);
    }

    drawImage(x, y, imageName) {
        this.context.drawImage(this.images[imageName], x, y);
    }

    drawSprite(sprite) {

        let spriteX = sprite.x;
        let spriteY = sprite.y;

        if(this.isCameraSet) {
            spriteX -= this.camera.x;
            spriteY -= this.camera.y;
        }

        if(
            (spriteX >= this.width) ||
            (spriteY >= this.height) || 
            ((spriteX + sprite.width) <= 0) ||
            ((spriteY + sprite.height) <= 0)
        ) {
            return;
        }

        let sourceX = sprite.sourceX + Math.abs(Math.min(0, spriteX));
        let sourceY = sprite.sourceY + Math.abs(Math.min(0, spriteY));
        let width = Math.min(this.width, spriteX + sprite.width) - Math.max(0, spriteX);
        let height = Math.min(this.height, spriteY + sprite.height) - Math.max(0, spriteY);

        this.context.drawImage(this.images[sprite.imageName],
            sourceX, 
            sourceY, 
            width, 
            height,
            Math.max(0, spriteX), 
            Math.max(0, spriteY), 
            width, 
            height);
    }
}

/***/ }),

/***/ "./src/sprite-sheet.js":
/*!*****************************!*\
  !*** ./src/sprite-sheet.js ***!
  \*****************************/
/*! exports provided: SpriteSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpriteSheet", function() { return SpriteSheet; });
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation */ "./src/animation.js");



class SpriteSheet {
    constructor({imageName, imageWidth, imageHeight, spriteWidth = 64, spriteHeight = 64}) {
        this.imageName = imageName;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
    }

    getAnimation(indexes, speed, repeat = true, autorun = true) {
        return new _animation__WEBPACK_IMPORTED_MODULE_1__["Animation"]({
            imageName: this.imageName,
            frames: indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})),
            speed: speed,
            repeat: repeat,
            autorun: autorun,
            width: this.spriteWidth,
            height: this.spriteHeight
        });
    }

    getSprite(index) {
        return new _sprite__WEBPACK_IMPORTED_MODULE_0__["Sprite"]({
            imageName: this.imageName,
            sourceX: this.getSourceX(index),
            sourceY: this.getSourceY(index),
            width: this.spriteWidth,
            height: this.spriteHeight
        });
    }

    getSourceX(index) {
        return (--index * this.spriteWidth) % this.imageWidth;
    }

    getSourceY(index) {
        return Math.trunc((--index * this.spriteWidth) / this.imageWidth) * this.spriteHeight;
    }
}

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: Sprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return Sprite; });
class Sprite {
    constructor({imageName, sourceX, sourceY, width = 64, height = 64}) {
        this.imageName = imageName;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
}

/***/ }),

/***/ "./src/story.js":
/*!**********************!*\
  !*** ./src/story.js ***!
  \**********************/
/*! exports provided: Story */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Story", function() { return Story; });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");


class Story {
    constructor({player, control, npc, artifacts, collider}) {
        this.player = player;
        this.control = control;
        this.npc = npc;
        this.artifacts = artifacts;
        this.collider = collider;
    }

    init(){
        this.newPlayer = false;
        this.tapochki = false;
        this.block = false;
        this.looking = true;
        this.lookDesk = false;
        this.lookMission = false;
        this.beside = null;
        this.status = 0;
        this.oldStatus = 0;
        this.subStatus = 0;
        this.lastStatus = -1;
        this.lastTime = 0;
        this.finish = false;
        this.currentTask = '';
        this.diaologs = [
            ["Куратор: Привет!"],//0
            [//1
                "Куратор: Ты новый сотрудник в компании Skyeng," ,
                "многого еще не знаешь и тебе предстоит всему научиться."
            ],
            [//2
                "Куратор: Первый шаг, без которого ",
                "ты не двинешься дальше это традиция SkyHome",
            ],
            [//3
                "(?) Вокруг разные предметы в комнате, нужно выбрать верный"
            ],
            [//4
                "Тапочки: нажмите <space> для взаимодействия."
            ],
            [//5
                "Лиза: Ты что-то забыл!"
            ],
            [//6
                "Игрок: Я пойду поищу получше!"
            ],
            [//7
                "Лиза: Эй, будь проще!"
            ],
            [//8
                "(?) Подумай, что мешает тебе из одежды?"
            ],
            [//9
                "(?) Нужно заменить смокинг на обычную одежду."
            ],
            [//10
                "(?) Перед началом работы можно выпить чашечку кофе на кухне."
            ],
            [//11
                "Кофе: нажмите <space> для взаимодействия."
            ],
            [//12
                "(?) Теперь можно идти к куратору за заданиями."
            ],
            [//13
                "Куратор: Я думаю ты отлично впишешься в наш коллектив, но для начала, ",
                "познакомся с нашими основателями и управляющим партнером найди ",
                "каждого из них по подсказкам."
            ],
            [//14
                "Куратор: Вот список, ты должен подходить к каждому из них согласно ",
                "подсказке и после возвращаться ко мне, все понятно?"
            ],
            [//15
                "Игрок: Ясно, думаю справлюсь)"
            ],
            [//16
                "Куратор: Ок. Тогда начнем."
            ],
            [//17
                "Куратор: Про этого человека тебе расскажет Глеб Кудрявцев, ",
                "найди его и расспроси о нем. "
            ],
            [//18
                "Куратор: Наш дом не слишком большой, ",
                "поэтому тебе не составит труда сделать это."
            ],
            [//19
                "Куратор: Чтобы намекнуть, напомни Глебу историю с Алексеем ",
                "Ивановым, он давал ему интервью."
            ],
            [//20
                "Игрок: Привет, Глеб! Я новенький и должен найти по подсказкам ",
                "всех из этого списка. Мне нужно узнать про человека, о котором ",
                "ты говорил с ведущим канала PonchikNews Алексеем Ивановым."
            ],
            [//21
                "Глеб: Привет! Ну ты вспомнил......Мы много о ком беседовали, ",
                "но я думаю так будет интереснее) Этот человек суперглубокий ",
                "технический мозг. Думаю этим все сказано."
            ],
            [//22
                "Игрок: Хм....спасибо, но почти все они учились в МФТИ.....пока"
            ],
            [//23
                "Глеб: Эй, тестируй на проде, здесь все так делают!"
            ],
            [//24
                "Андрей: Молодец новичок, хотя я думаю тебе просто повезло. ",
                "Посмотрим дойдешь ли ты до конца."
            ],
            [//25
                "(?) Нужно вернуться к куратору."
            ],
            [//26
                "Куратор: Молодец! Следующую подсказку ищи в статье ",
                "http://pulse.rbc.ru/."
            ],
            [//27
                "Игрок: И так, мне пригодится компьютер..."
            ],
            [//28
                "Игрок: Хм... Требует пароль от WiFi, уточню у куратора."
            ],
            [//29
                "Игрок: А где мне узнать пароль о Wi-Fi?"
            ],
            [//30
                "Куратор: Все просто, найди человека, который его придумал."
            ],
            [//31
                "Игрок: Андрей, привет! Мне нужен доступ в интернет и я ",
                "не знаю пароль, мне говорили, что ты его придумал."
            ],
            [//32
                "Андрей: Привет! Так и есть. Но если я просто отвечу, будет ",
                "не интересно. Мы все развиваемся и поэтому, вот задание от меня."
            ],
            [//33
                "Андрей: Вспомни или узнай фразу, главы Российского футбольного ",
                "союза Виталия Мутко, сказанную им  на заседании исполкома ФИФА ",
                "в 2010 году - это и будет ответ на твой вопрос."
            ],
            [//34
                "Игрок: Да... Вспомнил! Это \"letmespeakfrommyheart\"."
            ],
            [//35
                "Игрок: Пошел быстрей к компьютеру."
            ],
            [//36
                "Информация на Pulse: Этот человек очень любит спорт, ",
                "он очень следит за своим здоровьем, весь его рацион ",
                "сбалансирован, у него все системно и по часам."
            ],
            [//37
                "Харитон: Труд — облагораживает человека. Давайте скорее катить!"
            ],
            [//38
                "(?) Нужно вернуться к куратору."
            ],
            [//39
                "Куратор: Ты хорошо справляешься! Любишь читать и развиваться? ",
                "Найди бизнес журнал “Жажда” , возможно в нем будет что-то ",
                "интересное. Последний раз видела его в библиотеке."
            ],
            [//40
                "Журнал Жажда: Сооснователь Skyeng: Мое главное хобби – моя работа, ",
                "серьезно. Она для меня сейчас на первом месте. Кроме того, увлекает ",
                "постоянное развитие – как мое личное, так и Skyeng."
            ],
            [//41
                "Гоша: В бизнесе, как в любви — чем больше говоришь, ",
                "тем крепче отношения."
            ],
            [//42
                "(?) Нужно вернуться к куратору."
            ],
            [//43
                "Куратор: Хороший темп!" 
            ],
            [//44
                "Куратор: Я прочитал одну статью про гадание на кофейной гуще, ",
                "оно популярно в некоторых кругах. А ты когда пил кофе ",
                "ничего не заметил на стенах кухни?"
            ],
            [//45
                "Игрок: Нет, пойду посмотрю внимательней."
            ],
            [//46
                //"Надпись на доске...готовит вкуснее, чем 80% московских заведений"
                ""
            ],
            [//47
                "Александр: За всё, что со мной происходит, отвечаю только я, ",
                "даже если я на это не могу повлиять и не могу предвидеть"
            ],
            [//48
                "(?) Нужно вернуться к куратору."
            ],
            [//50
                "Куратор: После того как появились компьютеры, я перестал ",
                "пользоваться радио, свои плейлисты и все такое... "
            ],
            [//51
                "Куратор: Но сегодня повтор радиопрограммы ",
                "«Новая экономика. Студенты», послушай, может ты узнаешь, ",
                "что-то, что поможет тебе дальше. Обычно оно лежит в переговорке."
            ],
            [//52
                "Радио: Пшшшшш помехи в радио. потом голос... во-первых, ",
                "у меня пропали всяческие хобби. Серьёзно. Если до этого я ",
                "занимался самбо, занимался скалолазанием... пшшшшшш."
            ],
            [//53
                "Игрок: Да уж, с таким радио лучше все таки плейлисты... ",
                "о чем там говорилось... самбо и скалолазание..."
            ],
            [//54
                "Денис: Я думаю, что если ты студент, и ты хочешь, чтобы в ",
                "будущем у тебя действительно был успех, тогда бери на себя эту ",
                "ответственность, иди туда, где тебе скажут: "
            ],
            [//55
                "«Это твоя задача. Ты должен с ней справиться и потом показать, ",
                "что получилось»"
            ],
            [//56
                "(?) Нужно вернуться к куратору."
            ],
            [//57
                "Куратор: Ты познакомился поближе с основателями Skyeng и теперь ",
                "можешь увидеть их историю, наши ребята записали ее в видеостудии ",
                "к Skyeng Day. "
            ],
            [//58
                "Куратор: Минутку... Что? Тебя срочно вызывает Денис Сметнев, ",
                "срочно иди к нему!",
            ],
            [//59
                "Денис: У меня есть клиент на 19:00 в четверг, но нет преподавателя! ",
                "Кто-то поставил его в расписание, хотя все должно быть согласовано. ",
                "Это не первая странность за последнее время... ну это потом. "
            ],
            [//60
                "Денис: Найди Гошу, он сможет помочь решить этот вопрос!",
            ],
            [//61
                "Игрок: Денису срочно нужен преподаватель в четверг 19.00, что можно ",
                "сделать?",
            ],
            [//62
                "Гоша: Главное работать, а не стоять на месте. Где там мой список из ",
                "HeadHunter... Все готово. Cкажи Денису и продолжай работать",
            ],
            [//63
                "Игрок: Гоша нашел преподавателя, все в порядке",
            ],
            [//64
                "Дениc: Отлично. Где там мой блокнот... ",
            ],
            [//65
                "Игрок: Видимо я здесь больше не нужен и пора вернуться к куратору, ",
                "он что-то говорил про запись.",
            ],
            [//66
                "Игрок: Я выполнил задание Дениса, ты говорил о записи...",
            ],
            [//67
                "Куратор: Да, ты теперь можешь посмотреть ее. Иди в видеостудию, ",
                "я предупредил насчет тебя Степана.",
            ],
            [//68
                "Игрок: Привет, Степан!",
            ],
            [//69
                "Степа: Куда же подевалась эта кассета? Я всегда прошу не трогать ",
                "чужие вещи!",
            ],
            [//70
                "(?) Возможно, ее спрятали или украли. Разберись в чем дело.",
            ],
            [//71
                "И только сейчас я вспомнил про слухи, которые слышал в коридорах, ",
                "что где-то в компании ходит конкурент и всем осложняет жизнь. Нужно ",
                "найти его во чтобы то ни стало!",
            ],
            [//72
                "Игрок: Степан, ты можешь подсказать, у тебя есть догадки кто мог ",
                "взять кассету?",
            ],
            [//73
                "Степан: Даже не знаю... У нас ведется журнал кто когда снимает студию. ",
                "Он у Анисы Киямовой, можешь начать с этого...",
            ],
            [//74
                "Игрок: Думаю это то что надо, спасибо!",
            ],
            [//75
                "Игрок: Привет, Аниса! Степан сказал, что у тебя журнал куда все ",
                "записываются, чтобы снять студию. Можно взглянуть на него?",
            ],
            [//76
                "Аниса: Привет! Я не знакома с тобой, очень много вещей в последнее ",
                "время попадает не в те руки. Расскажи о миссии компании, только ",
                "преданный делу человек знает ее наизусть.",
            ],
            [//77
                "(?) На столе лежит журнал, но Аниса не доверяет тебе так как видит впервые, ",
                "она просит подтвердить тебя, что ты сотрудник скаенг и рассказать ей ",
                "миссию компании, так как конкурент ее точно не знает.",
            ],
            [//78
                "Я видел надписи на стенах в лаунже, возможно одна из них это то, ",
                "что мне нужно.",
            ],
            [//79
                "Делаем развитие привлекательным. ",
                "Приводим к результатам, которыми хочется гордиться.",
            ],
            [//79
                "(!) Нужно вернуться к Анисе.",
            ],
            [//80
                "Игрок: Аниса, я узнал миссию компании. ",
            ],
            [//81
                "Аниса: Хорошо, он на столе, можешь его взять.",
            ],
            [//82
                "Журнал: 3-е последних, кто брал ключ:",
            ],
            [//83
                "Вита Барышникова 16.00 - 18.00",
                "Костя Замуренко 14.00 - 15.30",
                "Саша Кононенко 11.00 - 13.00",
            ],
            [//84
                "Вероятно нужно поговорить с каждым из них и сначала я пойду к Вите ",
                "Барышниковой, так как она была последней в тот день и узнаю ",
                "видела ли она кассету",
            ],
            [//85
                "Игрок: Вита, привет! Видел твои видео о Skyng Home, они просто супер. ",
                "Мне нужна твоя помощь, пропала кассета с записями истории ",
                "основателей, может ты видела ее?",
            ],
            [//86
                "Вита: Воу, полегче =) Привет! Конечно помогу. Знаю, что ты уже ",
                "познакомился с основателями и миссией компании, но это еще не все.",
            ],
            [//87
                "Тебе нужно изучить ее принципы, они записаны в моем блокноте, но я ",
                "забыла его в одной из переговорок, изучи их и ответь на мои вопросы ",
                "о школе, тогда я отвечу на твои =)",
            ],
            [//88
                "Однажды, в февральскую субботу 2019г, мы собрались в офисе и обсудили,",
                "что привело нас к текущей точке развития. Проанализировали, что позволяет",
                "нам развиваться такими темпами. И сформулировали наши принципы работы.",
            ],
            [//89
                "1. Сохраняем единство",
                "2. Обеспечиваем прозрачность",
                "3. Воспитываем самоходность"
            ],
            [//90
                "4. Ценим full stack",
                "5. Даем честную обратную связь",
                "6. Руководствуемся пользой",
            ],
            [//57
                "7. Нанимаем людей сильнее себя",
                "8. Считаем всё, чем управляем",
                "9. Ставим высокую планку",
            ],
            [//57
                "10. Держим скорость",
                "11. Постоянно обмениваемся опытом",
            ],
            [//57
                "Мне нужно вернутся к Вите, чтобы ответить на её вопросы.",
            ],
            [//57
                "Игрок: Я нашел его, вероятно ты забыла в одной из переговорок.",
            ],
            [//57
                "Вита: Да... Так и есть... Очень много работы и совсем замоталась... ",
                "Ну что ж, приступим. Теперь проверим, что ты уже знаешь о компании.",
            ],
            [//57
                "Когда начала свое существование школа?",
                "1) 16 февраля 1990, 2) 22 мая 1989",
                "3) август 2012, 4) 24 августа 1971."
            ],
            [//57
                "Сколько учителей в Skyeng?",
                "1) Думаю 10 точно есть, 2) 50 вполне достаточно, ",
                "3) 100 - уверен это больше чем у конкурентов, 4) 7210."
            ],
            [//57
                "Сколько учеников в Skyeng?",
                "1) ВИП, дай Бог ему здоровья!, 2) Спасибо учителям, что приводят ",
                "своих родных, 3) 72700, 4) Если посчитать всех кто работает в Google..."
            ],
            [//57
                "Как проходят занятия в Skyeng?",
                "1) На уникальной платформе Vimbox, 2) Учителя выезжают на дом, ",
                "3)В Кремле,4)Вчера разослали сканы учебника, сегодня в скайпе попробуем."
            ],
            [//57
                "Как учат слова в Skyeng?",
                "1) Гоша звонит ученикам и опрашивает их, 2) во сне, ",
                "3) Приложение Skyeng, 4) Ученики пишут каждое слово 100 раз."
            ],
            [//57
                "Какова цель по выручке компании в 2019 году?",
                "1) Увеличить выручку компании до 4 392,2 млн. руб. ",
                "(план Excellent 4 700 млн. р.), 2) нет цели, 3) и так сойдет"
            ],
            [//57
                "Кого благодарить за Skyeng?",
                "1) учителя из Чувашии, 2) Англичан, 3) Американцев, ",
                "4) основателей Skyeng (Георгий, Александр, Харитон, Денис, Андрей)"
            ],
            [//57
                "Вита: Ты делаешь успехи! Насчет кассеты... Нет ее не было, ",
                "когда я пришла. Вероятно, кто-то другой взял ее... ",
            ],
            [//57
                "Игрок: Спасибо тебе! И передохни =)",
            ],
            [//57
                "Вита: Лучший способ отдохнуть - взяться за интересную ",
                "задачку =) Погнали!",
            ],
            [//57
                "(!) Теперь можно идти к Косте он следующий в списке.",
            ],
            [//106
                "Игрок: Костя, привет!",
            ],
            [//57
                "Костя: Привет. Слышал как ты помог Денису, ты большой молодец, ",
                "так держать!",
            ],
            [//57
                "Игрок: Спасибо =) Стараюсь. Мне очень нужна твоя помощь. ",
                "Кто-то взял кассету из видеокомнаты, может ты видел... ",
            ],
            [//57
                "Костя: Ого, уже был в видеостудии =) Вижу, что осваиваешься ",
                "и многое узнал за этот день. Если угадаешь, что больше всего я ",
                "\"люблю\" в нашей стране, то отвечу кто брал кассету.",
            ],
            [//57
                "Она отправит без труда",
                "В любые страны, города.",
                "Слова, стихи, подарки",
            ],
            [//57
                "и красочные марки.",
                "Всегда все вовремя доставит",
                "Ей Костя очень доверяет",
            ],
            [//57
                "И ждут ее все, как Миссии",
                "Любимая наша ... России!",
            ],
            [//57
                "Игрок: Так это же наша любимая Почта России.",
            ],
            [//57
                "Костя: Да, ты ответил верно... ",
            ],
            [//57
                "Костя: Больше месяца Почта России морозила мою посылку, и в ",
                "конце концов без объяснения причин отправляет её обратно. ",
                "Никаких уведомлений, сообщений, звонков. ",
            ],
            [//57
                "Костя: Не первый раз они факапят, но каждый раз я ",
                "на что-то надеюсь",
            ],
            [//57
                "Костя: Ах да... Твой вопрос... Конечно, я видел, кто взял ",
                "кассету. Перед тем как я начал подготовку к съемке, из ",
                "комнаты выходила Саша Кононенко и несла ее вруках. Уточни у нее.",
            ],
            [//57
                "Игрок: Отлично! Теперь я точно получу ответ.",
            ],
            [//119
                "Игрок: Саша привет! Костя сказал, что уходя ты забирала ",
                "кассету с видео-историей основателей. Можно ее посмотреть.",
            ],
            [//57
                "Саша: Привет! Конечно, но и ты помоги мне. Мы командой ",
                "Skyeng писали ценности компании на кухне и забыли забрать, ",
                "принеси мне список, а я пока найду кассету.",
            ],
            [//57
                "Игрок: Хорошо, спасибо.",
            ],
            [//57
                "Главные ценности компании: развитие, гибкость, ",
                "уважение, удовольствие.",
            ],
            [//123
                "Саша: Отлично, а то совсем нет времени на подготовку... ",
                "Ты очень помог. Но пока тебя не было, я хотела пересмотреть ",
                "запись и ее не оказалось на моем столе.",
            ],
            [//57
                "Саша: В офисе давно не все гладко... Видимо конкурент добрался и ",
                "сюда. Нужно срочно узнать кто это. Еще я слышала, что к SkyengDay ",
                "ребята записали поздравления, но они тоже куда-то пропали. "
            ],
            [//57
                "Саша: Праздник не состоится, если не найти кассету и все ",
                "поздравления... Когда он забирал кассету, то в спешке опрокинул ",
                "чернила на моем столе, очень люблю ручку с чернилами для подписи."
            ],
            [//57
                "Саша: Ищи его по отметинам на предметах!",
            ],
            [//57
                "Игрок: Я найду его во чтобы то ни стало!",
            ],
            [//128
                "Игрок: На твоей руке чернила, это ты украл кассету из ",
                "Сашиного кабинета! Ты конкурент, мешающий нам развиваться!",
            ],
            [//57
                "Конкурент: ахахах поймал меня,ну и что? Тебе все равно не ",
                "найти кассету и поздравления!"
            ],
            [//57
                "Конкурент: Ваши стены слишком одинаковы, чтобы отыскать ее в ",
                "стене, а нелепые спортивные поздравления, которыми вы хотели ",
                "повеселить всех, можно найти только случайно!"
            ],
            [//57
                "(!) Нажмите <space>, чтобы подобрать касету.",
            ],
            [//57
                "(!) Верните касету Саше.",
            ],
            [//57
                "Саша: Спасибо большое. А сейчас отправляйся к куратору, ",
                "у нее к тебе разговор был."
            ],
            [//135
                "Куратор: Это просто невероятно! Ты нашел конкурент и запись. ",
                "Но это еще не все. Если хочешь узнать больше о создателях этой ",
                "игры, найди их поздравления. ",
            ],
            [//57
                "Куратор: В первую очередь я бы поискала в корзине с мусором. ",
                "Эта девушка очень любит рисовать и всегд стремится к совершенству, ",
                "поэтому многое может выбросить, даже шедевры. ",
            ],
            [//137
                "Корзина: Нажмите <space> для взаимодействия.",
            ],
            [//57
                "(!) Вернуться к куратору.",
            ],
            [//139
                "Куратор: Один из этих ребят очень любит коды и говоломки. ",
                "С тех пор, как он увидел фомрулы на доске, где каждый в офисе ",
                "любит оставлять послания, она не выходит у него из головы. ",
            ],
            [//140
                "Доска: Нажмите <space> для взаимодействия ",
            ],
            [//
                "001100010100101001011001010110010110001000101011010100100101101",
                "101011101010100010100110101001010011000100011110001010100011000",
                "10010011100101011101010000",
            ],
            [//57
                "(!) Вернуться к куратору.",
            ],
            [//143
                "Куратор: Эта девушка очен любит воду и этим все сказано =). ",
            ],
            [//144
                "Бутль с водой: Нажмите <space> для взаимодействия ",
            ],
            [//57
                "(!) Вернуться к куратору.",
            ],
            [//146
                "Куратор: Он поднимает тяжести с раннего детства, но в этот ",
                "раз - это \"новый рекорд\" жима лежа. ",
            ],
            [//147
                "Диван: Нажмите <space> для взаимодействия ",
            ],
            [//57
                "(!) Вернуться к куратору.",
            ],
            [//149
                "Куратор: Ты даже не представляешь, что сделал для нас. ",
                "Вот подарок, который будет уникальным только для тебя. ",
            ],
            [//57
                "Куратор: Это золотая карта на пожизненный пропуск к  ",
                "любому фестивалю от Skyeng без ограничений.",
            ],
            [//57
                "Куратор: А сейчас беги скорее к комнате SkyengDay, ",
                "чтобы увидеть финальное поздравления ребят и посетить ",
                "лучшую вечеринку года! ",
            ],
            [//152
                "",
            ],
        ]
    }

    update(time) {
        new Promise((resolve, reject) => {
            var temp;
            this.npc.forEach(npc => {
                if (this.player.x + 64 < npc.x || npc.x+64 < this.player.x || this.player.y + 64 < npc.y || npc.y + 64 < this.player.y)
                    temp = null;
                else {
                    resolve(npc.imageName);
                }
            });
            resolve(null);
        }).then(beside => {
            this.beside = beside;
        });
        new Promise((resolve, reject) => {
            var temp;
            this.artifacts.forEach(artifact => {
                if (this.player.x + 64 < artifact.collisionShape.x || 
                    artifact.collisionShape.x + artifact.collisionShape.width < this.player.x || 
                    this.player.y + 64 < artifact.collisionShape.y || 
                    artifact.collisionShape.y + artifact.collisionShape.height < this.player.y)
                    temp = null;
                else {
                    resolve(artifact.type);
                }
            });
        }).then(type => {
            this.beside = type;
        });
        
        if(this.beside == "Ovcharenko" && this.status == 4 && this.lastStatus == 3){
            this.looking = true;
            this.status = 5;
        }
        if(this.beside == "tapochki" && this.status == 4) {
            this.looking = true;
        }
        if(this.beside == "Ovcharenko" && this.status == 7) {
            this.looking = true;
        }
        if(this.beside == "task1" && this.status == 10){
            this.looking = true;
        }
        if(this.beside == "coffee" && this.status == 11){
            this.looking = true;
            this.npc.forEach(npc => {
                if(npc.imageName == 'curator'){
                    npc.x = 1069;
                    npc.y = 1038;
                }
            });
        }
        if(this.beside == "curator" && this.status == 13){
            this.looking = true;
        }
        if(this.beside == "Kudriavtcev" && this.status == 20){
            this.looking = true;
        }
        if(this.beside == "Yaunzem" && this.status == 24){
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 26){
            this.looking = true;
        }
        if(this.beside == "pc" && this.status == 28){
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 29){
            this.looking = true;
        }
        if(this.beside == "Yamanov" && this.status == 31){
            this.looking = true;
        }
        if(this.beside == "pc" && this.status == 36){
            this.looking = true;
        }
        if(this.beside == "Matveev" && this.status == 37) {
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 39) {
            this.looking = true;
        }
        if(this.beside == "jurnal" && this.status == 40) {
            this.looking = true;
        }
        if(this.beside == "Solovev" && this.status == 41) {
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 43) {
            this.looking = true;
        }
        if(this.beside == "task2" && this.status == 46) {
            this.lookDesk = true;
            this.looking = true;
        }
        if(this.beside == "Laryanovsky" && this.status == 47) {
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 49) {
            this.looking = true;
        }
        if(this.beside == "radio" && this.status == 51) {
            this.looking = true;
        }
        if(this.beside == "Smetnev" && this.status == 53) {
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 56) {
            this.looking = true;
        }
        if(this.beside == "Smetnev" && this.status == 58) {
            this.looking = true;
        }
        if(this.beside == "Solovev" && this.status == 60) {
            this.looking = true;
        }
        if(this.beside == "Smetnev" && this.status == 62) {
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 65) {
            this.looking = true;
        }
        if(this.beside == "Kiyamova" && this.status == 74) {
            this.looking = true;
        }
        if(this.beside == "Kiyamova" && this.status == 80) {
            this.looking = true;
        }
        if(this.beside == "Kiyamova" && this.status == 82) {
            if(this.beside == "jurnalAnis") {
                this.tapochki = true;
                this.artifacts.forEach((artifact, i, arr) => {
                    if(artifact.type == "jurnalAnis")
                        delete this.artifacts[i];
                });
            }
        }
        if(this.beside == "Baryshnikova" && this.status == 85) {
            this.looking = true;
        }
        if(this.beside == "Baryshnikova" && this.status == 94) {
            this.looking = true;
        }
        if(this.beside == "Stepan" && this.status == 67) {
            this.looking = true;
        }
        if(this.beside == "Zamurenko" && this.status == 107) {
            this.looking = true;
        }
        if(this.beside == "Kononenko" && this.status == 120) {
            this.looking = true;
        }
        if(this.beside == "Kononenko" && this.status == 124) {
            this.looking = true;
        }
        if(this.beside == "mission" && this.status == 78) {
            this.looking = true;
            this.lookMission = true;
        }
        if(this.beside == "note" && this.status == 88) {
            this.looking = true;
        }
        if(this.beside == "task3" && this.status == 123) {
            this.looking = true;
        }
        if(this.beside == "Competitor" && this.status == 129) {
            this.looking = true;
        }
        if(this.beside == "cassette" && this.status == 132) {
            this.looking = true;
            this.lookMain = true;
        }
        if(this.beside == "Kononenko" && this.status == 134) {
            this.looking = true;
        }
        if(this.beside == "curator" && this.status == 135) {
            this.looking = true;
        }
        if(this.beside == "trash" && this.status == 137) {
            this.looking = true;
            this.lookChristy = true;
        }
        if(this.beside == "curator" && this.status == 139) {
            this.looking = true;
        }
        if(this.beside == "code" && this.status == 140) {
            this.looking = true;
            this.lookSasha = true;
        }
        if(this.beside == "curator" && this.status == 143) {
            this.looking = true;
        }
        if(this.beside == "water" && this.status == 144) {
            this.looking = true;
            this.lookNatasha = true;
        }
        if(this.beside == "curator" && this.status == 146) {
            this.looking = true;
        }
        if(this.beside == "sofa" && this.status == 147) {
            this.looking = true;
            this.lookLeader = true;
        }
        if(this.beside == "curator" && this.status == 149) {
            this.looking = true;
        }
        if(this.beside == "final" && this.status == 152) {
            this.lookUs = true;
        }
        if(this.beside == "final2" && this.status == 152) {
            this.music = true;
        }
        if(this.looking) {
            this.control.up = false;
            this.control.right = false;
            this.control.down = false;
            this.control.left = false;
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.use && (this.status < 96 || this.status > 102)) {
            if(this.beside == "tapochki") {
                this.tapochki = true;
                this.artifacts.forEach((artifact, i, arr) => {
                    if(artifact.type == "tapochki")
                        delete this.artifacts[i];
                });
                delete this.collider.staticShapes[this.collider.staticShapes.length - 2];
            }
            if(this.beside == "jurnal") {
                this.tapochki = true;
                this.artifacts.forEach((artifact, i, arr) => {
                    if(artifact.type == "jurnal")
                        delete this.artifacts[i];
                });
                this.npc.forEach(npc => {
                    if(npc.imageName == 'curator'){
                        npc.x = 770;
                        npc.y = 1793;
                    }
                });
            }
            if(this.beside == "note") {
                this.tapochki = true;
                this.artifacts.forEach((artifact, i, arr) => {
                    if(artifact.type == "note")
                        delete this.artifacts[i];
                });
            }
            if(this.beside == "cassette") {
                this.tapochki = true;
                this.artifacts.forEach((artifact, i, arr) => {
                    if(artifact.type == "cassette")
                        delete this.artifacts[i];
                });
            }

            this.lastStatus = this.status;
            this.status++;
            this.subStatus++;
            this.lastTime = new Date();
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.three && this.status == 96) {
            this.lastStatus = this.status;
            this.status++;
            this.lastTime = new Date();
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.four && this.status == 97) {
            this.lastStatus = this.status;
            this.status++;
            this.lastTime = new Date();
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.three && this.status == 98) {
            this.lastStatus = this.status;
            this.status++;
            this.lastTime = new Date();
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.one && this.status == 99) {
            this.lastStatus = this.status;
            this.status++;
            this.lastTime = new Date();
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.three && this.status == 100) {
            this.lastStatus = this.status;
            this.status++;
            this.lastTime = new Date();
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.one && this.status == 101) {
            this.lastStatus = this.status;
            this.status++;
            this.lastTime = new Date();
        }
        if(this.looking && (new Date()) - this.lastTime > 500 && this.control.four && this.status == 102) {
            this.lastStatus = this.status;
            this.status++;
            this.lastTime = new Date();
        }

        if(this.beside == "curator" && this.status == 4){
            this.looking = false;
            this.lastStatus = 3;
            this.currentTask = "Найди нужный предмет для продолжения."
        }
        if(this.beside == "Ovcharenko" && this.status == 7 && this.lastStatus == 6){
            this.looking = false;
            this.status = 4;
            this.currentTask = "Найди нужный предмет для продолжения."
        }
        if(this.beside == "tapochki" && this.status == 5) {
            this.looking = false;
            this.status = 7;
            this.currentTask = "Продолжай движение дальше."
        }
        if(this.beside == "Ovcharenko" && this.status == 10){
            this.newPlayer = true;
            this.looking = false;
            this.currentTask = "Продолжай движение дальше."
        }
        if(this.beside == "task1" && this.status == 11){
            this.looking = false;
            this.currentTask = "Отправляйся на кухню и выпей чашечку кофе."
        }
        if(this.beside == "coffee" && this.status == 13){
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 20){
            this.looking = false;
            this.currentTask = "Отправляйся к Глебу Кудрявцеву."
        }
        if(this.beside == "Kudriavtcev" && this.status == 24){
            this.looking = false;
            this.currentTask = "Этот человек суперглубокий технический мозг. Найди его.";
        }
        if(this.beside == "Yaunzem" && this.status == 26){
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 28){
            this.looking = false;
            this.currentTask = "Найти компьютер."
        }
        if(this.beside == "pc" && this.status == 29){
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 31){
            this.looking = false;
            this.currentTask = "Найди того, кто придумал пароль Wi-Fi."
        }
        if(this.beside == "Yamanov" && this.status == 36){
            this.looking = false;
            this.currentTask = "Вернись к компьютеру."
        }
        if(this.beside == "pc" && this.status == 37){
            this.looking = false;
            this.currentTask = "Этот человек следит за здоровьем,у него все системно и по часам."
        }
        if(this.beside == "Matveev" && this.status == 39) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 40) {
            this.looking = false;
            this.currentTask = "Найди журнал в библиотеке."
        }
        if(this.beside == "jurnal" && this.status == 41) {
            this.looking = false;
            this.currentTask = "Его главное хобби - это работа. Она для него на первом месте."
        }
        if(this.beside == "Solovev" && this.status == 43) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 46) {
            this.looking = false;
            this.currentTask = "Найди надпись на кухне."
        }
        if(this.beside == "task2" && this.status == 47) {
            this.lookDesk = false;
            this.looking = false;
            this.currentTask = "... готовит вкуснее, чем 80% московский заведений."
        }
        if(this.beside == "Laryanovsky" && this.status == 49) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 51) {
            this.looking = false;
            this.currentTask = "Найди радио в переговорке."
        }
        if(this.beside == "curator" && this.status == 58) {
            this.looking = false;
            this.currentTask = "Подойти к Денису Сметневу."
        }
        if(this.beside == "curator" && this.status == 67) {
            this.looking = false;
            this.currentTask = "Подойти к оператору Степану, он в видеостудии."
        }
        if(this.beside == "Solovev" && this.status == 62) {
            this.looking = false;
            this.currentTask = "Вернись к Денису Сметневу."
        }
        if(this.beside == "Smetnev" && this.status == 56) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "Smetnev" && this.status == 60) {
            this.looking = false;
            this.currentTask = "Подойти к Гоше."
        }
        if(this.beside == "Smetnev" && this.status == 65) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "Kiyamova" && this.status == 78) {
            this.looking = false;
            this.currentTask = "Найди миссию компании в лаунже."
        }
        if(this.beside == "Kiyamova" && this.status == 85) {
            this.looking = false;
            this.currentTask = "Отправляйся к Вите Барышниковой."
        }
        if(this.beside == "Baryshnikova" && this.status == 88) {
            this.looking = false;
            this.currentTask = "Найди блокнот в переговорке."
        }
        if(this.beside == "Baryshnikova" && this.status == 107) {
            this.looking = false;
            this.currentTask = "Отправлйся к Константину Замуренко."
        }
        if(this.beside == "Stepan" && this.status == 74) {
            this.looking = false;
            this.currentTask = "Подойти к Анисе Киямовой."
        }
        if(this.beside == "Zamurenko" && this.status == 120) {
            this.looking = false;
            this.currentTask = "Подойти к Саше Кононенко."
        }
        if(this.beside == "Kononenko" && this.status == 123) {
            this.looking = false;
            this.currentTask = "Найди главные ценности компании на кухне."
        }
        if(this.beside == "Kononenko" && this.status == 129) {
            this.looking = false;
            this.currentTask = "Найди конкурента."
            this.find = true;
        }
        if(this.beside == "mission" && this.status == 79) {
            this.lookMission = false;
        }
        if(this.beside == "mission" && this.status == 80) {
            this.looking = false;
            this.currentTask = "Вернись к Анисе."
        }
        if(this.beside == "note2" && this.status == 94) {
            this.looking = false;
            this.currentTask = "Вернись к Вите." //???
        }
        if(this.beside == "task3" && this.status == 124) {
            this.looking = false;
            this.currentTask = "Вернись к Саше Кононенко."
        }
        if(this.beside == "Competitor" && this.status == 132) {
            this.looking = false;
            this.currentTask = "Найди кассету."
            this.findEnd = true;
        }
        if(this.beside == "task1" && this.status == 134) {
            this.looking = false;
            this.currentTask = "Вернись к Саше Кононенко."
        }
        if(this.beside == "Kononenko" && this.status == 135) {
            this.looking = false;
            this.currentTask = "Подойти к куратору."
        }
        if(this.beside == "curator" && this.status == 137) {
            this.looking = false;
            this.currentTask = "Найди корзину для мусора."
        }
        if(this.beside == "radio" && this.status == 53) {
            this.looking = false;
            this.currentTask = "Этот человек ранее занимался самбо и скалолазаньем."
        }
        if(this.beside == "trash" && this.status == 139) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 140) {
            this.looking = false;
            this.currentTask = "Найди доску, котору ты ни разу не смотрел."
        }
        if(this.beside == "code" && this.status == 143) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 144) {
            this.looking = false;
            this.currentTask = "Найди кулер с водой."
        }
        if(this.beside == "water" && this.status == 146) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 147) {
            this.looking = false;
            this.currentTask = "Найди удобный диван в библиотеке."
        }
        if(this.beside == "sofa" && this.status == 149) {
            this.looking = false;
            this.currentTask = "Вернись к куратору."
        }
        if(this.beside == "curator" && this.status == 152) {
            this.looking = false;
            this.currentTask = "Найди комнату SkyengDay."
            delete this.collider.staticShapes[this.collider.staticShapes.length - 1];
        }
    }
}

/***/ }),

/***/ "./src/teacher.js":
/*!************************!*\
  !*** ./src/teacher.js ***!
  \************************/
/*! exports provided: Teacher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Teacher", function() { return Teacher; });
/* harmony import */ var _body__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body */ "./src/body.js");


class Teacher extends _body__WEBPACK_IMPORTED_MODULE_0__["Body"] {
    constructor(x, y, direction) {
        super({imageName: 'teacher', speed: 0, x: x, y: y});
        this.stand(direction);
    }

    say() {

    }

    update(time) {
        super.update(time);
    }
}

/***/ }),

/***/ "./src/tile-map.js":
/*!*************************!*\
  !*** ./src/tile-map.js ***!
  \*************************/
/*! exports provided: TileMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileMap", function() { return TileMap; });
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");


class TileMap extends _sprite__WEBPACK_IMPORTED_MODULE_0__["Sprite"] {
    constructor(props) {
        super(props);
        this.hitboxes = props.hitboxes || [];
    }
}

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
class Vector {
    constructor(direction, speed) {
        this.setDirection(direction, speed);
    }

    setDirection(direction, speed) {
        this.direction = direction;
        this.speed = speed;
        this.x = 0;
        this.y = 0;
        switch(direction) {
            case "up":
                this.y = -speed;
            break;

            case "down":
                this.y = speed;
            break;

            case "right":
                this.x = speed;
            break;

            case "left":
                this.x = -speed;
            break;
            
        }
    }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXJ0aWZhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbWVyYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyLXNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb2xsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbC1zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtbG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbnBjLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9sb2FkaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGUtc2hlZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RlYWNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbGUtbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBa0M7O0FBRTNCLHdCQUF3Qiw4Q0FBTTtBQUNyQyxpQkFBaUIsaUZBQWlGO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQy9EQTtBQUFBO0FBQUE7QUFBZ0M7O0FBRXpCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUFBO0FBQUE7QUFBa0M7QUFDaUI7O0FBRTVDO0FBQ1AsaUJBQWlCLDZDQUE2QztBQUM5RDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsOENBQU07QUFDbEM7QUFDQTtBQUNBLCtCQUErQjs7QUFFL0IsbUNBQW1DLCtEQUFjLEVBQUUscUJBQXFCO0FBQ3hFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLCtEQUFjLEVBQUUscUJBQXFCO0FBQ3hFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNyREE7QUFBQTtBQUFPO0FBQ1AsaUJBQWlCLDRFQUE0RSxLQUFLO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDckNBO0FBQUE7QUFBQTtBQUE2Qzs7QUFFdEMsNkJBQTZCLHlEQUFXO0FBQy9DLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyxrREFBb0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDbkdBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUM3QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFrQztBQUNTO0FBQ047QUFDRTtBQUNQO0FBQ2U7O0FBRXhDO0FBQ1AsaUJBQWlCLDBCQUEwQixLQUFLO0FBQ2hELDBCQUEwQiw4Q0FBTTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDJCQUEyQiwyREFBWTtBQUN2QztBQUNBLHlCQUF5Qix1REFBTztBQUNoQyxzQkFBc0IsaURBQUk7QUFDMUIsdUJBQXVCLG1EQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsNENBQUs7QUFDdEI7QUFDQSxpQkFBaUIsNENBQUs7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1Qyw0Q0FBSztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDL0VBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUFBO0FBQThCOztBQUU5QjtBQUNBLDhCQUE4QiwwQ0FBSTtBQUNsQztBQUNBLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUFBO0FBQUE7QUFBOEI7O0FBRXZCLGtCQUFrQiwwQ0FBSTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFBQTtBQUE4Qjs7QUFFdkIscUJBQXFCLDBDQUFJO0FBQ2hDO0FBQ0EsZUFBZSw2Q0FBNkM7QUFDNUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLGtCQUFrQjtBQUM1Qyx5QkFBeUIsaUJBQWlCO0FBQzFDLDZCQUE2QixxQkFBcUI7QUFDbEQsNEJBQTRCLG9CQUFvQjtBQUNoRCwyQkFBMkIsbUJBQW1CO0FBQzlDLDJCQUEyQixtQkFBbUI7O0FBRTlDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUM7QUFDYTtBQUNNO0FBQ2pCO0FBQ0E7QUFDRTtBQUNOO0FBQ1E7QUFDVjtBQUNJO0FBQ007O0FBRWhDLG9CQUFvQiw0Q0FBSztBQUNoQztBQUNBO0FBQ0EseUJBQXlCLHlEQUFXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxrQ0FBa0MseURBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDBCQUEwQiw4Q0FBTTtBQUNoQyw0QkFBNEIsbURBQVE7O0FBRXBDO0FBQ0EsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25COztBQUVBO0FBQ0EsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCOztBQUVBLHlCQUF5Qiw0Q0FBSztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQU8sQ0FBQyxtREFBcUI7QUFDckQ7QUFDQSw4QkFBOEIsOENBQU07QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxrREFBUTtBQUM1QyxvQ0FBb0Msa0RBQVE7QUFDNUMsb0NBQW9DLGtEQUFRO0FBQzVDLG9DQUFvQyxrREFBUTtBQUM1QyxvQ0FBb0Msa0RBQVE7QUFDNUMsb0NBQW9DLGtEQUFRO0FBQzVDLG9DQUFvQyxrREFBUTtBQUM1QyxvQ0FBb0Msa0RBQVE7QUFDNUMsb0NBQW9DLGtEQUFRO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNqU0E7QUFBQTtBQUFBO0FBQWlDOztBQUUxQixzQkFBc0IsNENBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0Q0FBSztBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQUE7QUFBaUM7O0FBRTFCLG1CQUFtQiw0Q0FBSztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsNENBQUs7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFBNEM7QUFDUDs7QUFFOUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQix5REFBVztBQUN0QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxtQkFBbUIsaURBQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDM0tBO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBQ007O0FBRWpDO0FBQ1AsaUJBQWlCLHdFQUF3RTtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVM7QUFDNUI7QUFDQSwyQ0FBMkMsdURBQXVEO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSxtQkFBbUIsOENBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDekNBO0FBQUE7QUFBTztBQUNQLGlCQUFpQixxREFBcUQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBQTtBQUFrQzs7QUFFM0I7QUFDUCxpQkFBaUIsMENBQTBDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDbm5DQTtBQUFBO0FBQUE7QUFBOEI7O0FBRXZCLHNCQUFzQiwwQ0FBSTtBQUNqQztBQUNBLGVBQWUsMkNBQTJDO0FBQzFEO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDZkE7QUFBQTtBQUFBO0FBQWtDOztBQUUzQixzQkFBc0IsOENBQU07QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNQQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImpzL3NreWVuZ2RheWdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb24gZXh0ZW5kcyBTcHJpdGUge1xyXG4gICAgY29uc3RydWN0b3Ioe2ltYWdlTmFtZSwgZnJhbWVzLCBzcGVlZCwgcmVwZWF0ID0gdHJ1ZSwgYXV0b3J1biA9IHRydWUsIHdpZHRoID0gNjQsIGhlaWdodCA9IDY0fSkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiBpbWFnZU5hbWUsXHJcbiAgICAgICAgICAgIHNvdXJjZVg6IGZyYW1lc1swXS5zeCxcclxuICAgICAgICAgICAgc291cmNlWTogZnJhbWVzWzBdLnN5LFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLnJlcGVhdCA9IHJlcGVhdDtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBhdXRvcnVuO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEZyYW1lID0gMDtcclxuICAgICAgICB0aGlzLnRvdGFsRnJhbWVzID0gdGhpcy5mcmFtZXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZyYW1lKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSBpbmRleDtcclxuICAgICAgICB0aGlzLnNvdXJjZVggPSB0aGlzLmZyYW1lc1tpbmRleF0uc3g7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VZID0gdGhpcy5mcmFtZXNbaW5kZXhdLnN5O1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBpZighdGhpcy5ydW5uaW5nKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRGcmFtZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0RnJhbWUoKSB7XHJcbiAgICAgICAgaWYoKHRoaXMuY3VycmVudEZyYW1lICsgMSkgPT0gdGhpcy50b3RhbEZyYW1lcykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGcmFtZSgwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEZyYW1lKHRoaXMuY3VycmVudEZyYW1lICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBpZighdGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sYXN0VGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aW1lIC0gdGhpcy5sYXN0VGltZSkgPiB0aGlzLnNwZWVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEZyYW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7U3ByaXRlfSBmcm9tICcuL3Nwcml0ZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXJ0aWZhY3Qge1xyXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25TaGFwZSA9IHtcclxuICAgICAgICAgICAgeDogeCwgXHJcbiAgICAgICAgICAgIHk6IHksIFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsIFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7ICAgXHJcbiAgICAgICAgdGhpcy5zcHJpdGUuc2V0WFkoeCwgeSk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zcHJpdGUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XHJcbmltcG9ydCB7IENoYXJhY3RlclNoZWV0IH0gZnJvbSBcIi4vY2hhcmFjdGVyLXNoZWV0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQm9keSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lLCBzcGVlZCwgeCA9IDAsIHkgPSAwLCBzdGFuZCA9ICd1cCd9KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcigndXAnLCAwKTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvblNoYXBlID0ge3g6IDE4LCB5OiAxNSwgd2lkdGg6IDI4LCBoZWlnaHQ6IDQ5fTtcclxuXHJcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uU2hlZXQgPSBuZXcgQ2hhcmFjdGVyU2hlZXQoe2ltYWdlTmFtZTogaW1hZ2VOYW1lfSk7XHJcbiAgICAgICAgXCJ3YWxrLWRvd24sd2Fsay11cCx3YWxrLWxlZnQsd2Fsay1yaWdodFwiLnNwbGl0KFwiLFwiKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbnNbbmFtZV0gPSBhbmltYXRpb25TaGVldC5nZXRBbmltYXRpb24obmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdGFuZChzdGFuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3QW5pbWF0aW9uKGltYWdlTmFtZSl7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25zID0ge31cclxuICAgICAgICBjb25zdCBhbmltYXRpb25TaGVldCA9IG5ldyBDaGFyYWN0ZXJTaGVldCh7aW1hZ2VOYW1lOiBpbWFnZU5hbWV9KTtcclxuICAgICAgICBcIndhbGstZG93bix3YWxrLXVwLHdhbGstbGVmdCx3YWxrLXJpZ2h0XCIuc3BsaXQoXCIsXCIpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSA9IGFuaW1hdGlvblNoZWV0LmdldEFuaW1hdGlvbihuYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0YW5kKHRoaXMudmVsb2NpdHkuZGlyZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICB3YWxrKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkuc2V0RGlyZWN0aW9uKGRpcmVjdGlvbiwgdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gdGhpcy5hbmltYXRpb25zW1wid2Fsay1cIiArIGRpcmVjdGlvbl07XHJcbiAgICAgICAgdGhpcy52aWV3LnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YW5kKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkuc2V0RGlyZWN0aW9uKGRpcmVjdGlvbiwgMCk7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gdGhpcy5hbmltYXRpb25zW1wid2Fsay1cIiArIGRpcmVjdGlvbl07XHJcbiAgICAgICAgdGhpcy52aWV3LnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIGlmKHRoaXMubGFzdFRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy54ICs9ICh0aW1lIC0gdGhpcy5sYXN0VGltZSkgKiAodGhpcy52ZWxvY2l0eS54IC8gMTAwMCk7XHJcbiAgICAgICAgdGhpcy55ICs9ICh0aW1lIC0gdGhpcy5sYXN0VGltZSkgKiAodGhpcy52ZWxvY2l0eS55IC8gMTAwMCk7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy52aWV3LnNldFhZKE1hdGgudHJ1bmModGhpcy54KSxNYXRoLnRydW5jKHRoaXMueSkpO1xyXG4gICAgICAgIHRoaXMudmlldy51cGRhdGUodGltZSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuICAgIGNvbnN0cnVjdG9yKHt3aWR0aCA9IDY0MCwgaGVpZ2h0ID0gNjQwLCBsaW1pdFggPSA1MDAwMCwgbGltaXRZID0gNTAwMDAsIHNjcm9sbEVkZ2UgPSAyMDB9ID0ge30pIHtcclxuICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubGltaXRYID0gbGltaXRYO1xyXG4gICAgICAgIHRoaXMubGltaXRZID0gbGltaXRZO1xyXG4gICAgICAgIHRoaXMud2F0Y2hPYmplY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9iaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxFZGdlID0gc2Nyb2xsRWRnZTtcclxuICAgIH1cclxuXHJcbiAgICB3YXRjaChvYmopIHtcclxuICAgICAgICB0aGlzLndhdGNoT2JqZWN0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9iaiA9IG9iajtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIGlmKHRoaXMud2F0Y2hPYmplY3QpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5vYmoueCA+ICh0aGlzLnggKyB0aGlzLndpZHRoIC0gdGhpcy5zY3JvbGxFZGdlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gTWF0aC5taW4odGhpcy5saW1pdFgsIHRoaXMub2JqLnggLSB0aGlzLndpZHRoICsgdGhpcy5zY3JvbGxFZGdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5vYmoueCA8ICh0aGlzLnggKyB0aGlzLnNjcm9sbEVkZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSBNYXRoLm1heCgwLCB0aGlzLm9iai54IC0gdGhpcy5zY3JvbGxFZGdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5vYmoueSA+ICh0aGlzLnkgKyB0aGlzLmhlaWdodCAtIHRoaXMuc2Nyb2xsRWRnZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IE1hdGgubWluKHRoaXMubGltaXRZLCB0aGlzLm9iai55IC0gdGhpcy5oZWlnaHQgKyB0aGlzLnNjcm9sbEVkZ2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm9iai55IDwgKHRoaXMueSArIHRoaXMuc2Nyb2xsRWRnZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IE1hdGgubWF4KDAsIHRoaXMub2JqLnkgLSB0aGlzLnNjcm9sbEVkZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tICcuL3Nwcml0ZS1zaGVldCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhcmFjdGVyU2hlZXQgZXh0ZW5kcyBTcHJpdGVTaGVldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lfSkge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiBpbWFnZU5hbWUsXHJcbiAgICAgICAgICAgIGltYWdlV2lkdGg6IDgzMixcclxuICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IDEzNDRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlcXVlbmNlcyA9IHRoaXMuZ2V0U2VxdWVuY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VxdWVuY2VzKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXF1aXJlKCcuL21hcHMvcGxheWVyLmpzb24nKTtcclxuICAgICAgICBjb25zdCBzZXF1ZW5jZXMgPSB7fTtcclxuICAgICAgICBkYXRhLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICAgICAgc2VxdWVuY2VzW2xheWVyLm5hbWVdID0gbGF5ZXIuZGF0YS5maWx0ZXIoaSA9PiBpID4gMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNlcXVlbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbmltYXRpb24obmFtZSwgc3BlZWQgPSAxMDAsIHJlcGVhdCA9IHRydWUsIGF1dG9ydW4gPSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldEFuaW1hdGlvbih0aGlzLnNlcXVlbmNlc1tuYW1lXSwgc3BlZWQsIHJlcGVhdCwgYXV0b3J1bik7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29sbGlkZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0aWNTaGFwZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmJvZGllcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFN0YXRpY1NoYXBlcyhkYXRhKSB7XHJcbiAgICAgICAgZGF0YS5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgICAgICAgIGlmKGxheWVyLnR5cGUgPT0gXCJvYmplY3Rncm91cFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpY1NoYXBlcy5wdXNoKC4uLmxheWVyLm9iamVjdHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkS2luZW1hdGljQm9keShib2R5KSB7XHJcbiAgICAgICAgdGhpcy5ib2RpZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHg6IGJvZHkueCxcclxuICAgICAgICAgICAgeTogYm9keS55LFxyXG4gICAgICAgICAgICBvYmo6IGJvZHlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tTdGF0aWModGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTdGF0aWModGltZSkge1xyXG4gICAgICAgIHRoaXMuYm9kaWVzLmZvckVhY2goYm9keSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvbGRYID0gYm9keS54O1xyXG4gICAgICAgICAgICBsZXQgb2xkWSA9IGJvZHkueTtcclxuICAgICAgICAgICAgbGV0IHggPSBib2R5Lm9iai54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IGJvZHkub2JqLnk7XHJcbiAgICAgICAgICAgIC8vbW92aW5nIHJpZ2h0XHJcbiAgICAgICAgICAgIGlmKHggPiBvbGRYKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpY1NoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgKChvbGRYIC0gMSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS53aWR0aCkgPCBzaGFwZS54KSAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh4ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLndpZHRoKSA+IHNoYXBlLngpICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55KSA8IChzaGFwZS55ICsgc2hhcGUuaGVpZ2h0KSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh5ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLmhlaWdodCkgPiBzaGFwZS55KVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gTWF0aC5taW4oeCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS53aWR0aCwgc2hhcGUueCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnggLSBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9tb3ZpbmcgbGVmdFxyXG4gICAgICAgICAgICBpZih4IDwgb2xkWCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aWNTaGFwZXMuZm9yRWFjaChzaGFwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgob2xkWCArIDEgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS54KSA+IChzaGFwZS54ICsgc2hhcGUud2lkdGgpKSAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh4ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCkgPCAoc2hhcGUueCArIHNoYXBlLndpZHRoKSkgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgoeSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnkpIDwgKHNoYXBlLnkgKyBzaGFwZS5oZWlnaHQpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUuaGVpZ2h0KSA+IHNoYXBlLnkpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLm1heCh4ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCAsIHNoYXBlLnggKyBzaGFwZS53aWR0aCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vbW92aW5nIGRvd25cclxuICAgICAgICAgICAgaWYoeSA+IG9sZFkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGljU2hhcGVzLmZvckVhY2goIHNoYXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgKChvbGRZIC0gMSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS5oZWlnaHQpIDwgc2hhcGUueSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh5ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLmhlaWdodCkgPiBzaGFwZS55KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICgoeCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLngpIDwgKHNoYXBlLnggKyBzaGFwZS53aWR0aCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgKCh4ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLndpZHRoKSA+IHNoYXBlLngpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLm1pbih5ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLmhlaWdodCwgc2hhcGUueSkgLSBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55IC0gYm9keS5vYmouY29sbGlzaW9uU2hhcGUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9tb3ZpbmcgdXBcclxuICAgICAgICAgICAgaWYoeSA8IG9sZFkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGljU2hhcGVzLmZvckVhY2goIHNoYXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgKChvbGRZICsgMSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnkpID4gKHNoYXBlLnkgKyBzaGFwZS5oZWlnaHQpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55KSA8IChzaGFwZS55ICsgc2hhcGUuaGVpZ2h0KSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAoKHggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS54KSA8IChzaGFwZS54ICsgc2hhcGUud2lkdGgpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICgoeCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS53aWR0aCkgPiBzaGFwZS54KVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gTWF0aC5tYXgoeSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnksIHNoYXBlLnkgKyBzaGFwZS5oZWlnaHQpIC0gYm9keS5vYmouY29sbGlzaW9uU2hhcGUueTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgYm9keS54ID0geDtcclxuICAgICAgICAgICAgYm9keS55ID0geTtcclxuICAgICAgICAgICAgYm9keS5vYmoueCA9IHg7XHJcbiAgICAgICAgICAgIGJvZHkub2JqLnkgPSB5O1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgQ29udHJvbFN0YXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudXAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51c2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmtleU1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICAgICAgICBbMzcsICdsZWZ0J10sXHJcbiAgICAgICAgICAgIFszOSwgJ3JpZ2h0J10sXHJcbiAgICAgICAgICAgIFszOCwgJ3VwJ10sXHJcbiAgICAgICAgICAgIFs0MCwgJ2Rvd24nXSxcclxuICAgICAgICAgICAgWzMyLCAndXNlJ10sXHJcbiAgICAgICAgICAgIFs0OSwgJ29uZSddLFxyXG4gICAgICAgICAgICBbNTAsICd0d28nXSxcclxuICAgICAgICAgICAgWzUxLCAndGhyZWUnXSxcclxuICAgICAgICAgICAgWzUyLCAnZm91ciddXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4gdGhpcy51cGRhdGUoZXZlbnQsIHRydWUpKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4gdGhpcy51cGRhdGUoZXZlbnQsIGZhbHNlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGV2ZW50LCBwcmVzc2VkKSB7XHJcbiAgICAgICAgaWYodGhpcy5rZXlNYXAuaGFzKGV2ZW50LmtleUNvZGUpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzW3RoaXMua2V5TWFwLmdldChldmVudC5rZXlDb2RlKV0gPSBwcmVzc2VkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjcmVlbiB9IGZyb20gJy4vc2NyZWVuJztcclxuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gJy4vc2NlbmVzL2xvYWRpbmcnO1xyXG5pbXBvcnQgeyBNZW51IH0gZnJvbSAnLi9zY2VuZXMvbWVudSc7XHJcbmltcG9ydCB7IExldmVsIH0gZnJvbSAnLi9zY2VuZXMvbGV2ZWwnO1xyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgeyBDb250cm9sU3RhdGUgfSBmcm9tICcuL2NvbnRyb2wtc3RhdGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgY29uc3RydWN0b3Ioe3dpZHRoID0gNjQwLCBoZWlnaHQgPSA2NDB9ID0ge30pIHtcclxuICAgICAgICB0aGlzLnNjcmVlbiA9IG5ldyBTY3JlZW4od2lkdGgsaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnNjcmVlbi5sb2FkSW1hZ2VzKHtcclxuXHRcdFx0cGxheWVyOiAnaW1nL3BsYXllci5wbmcnLFxyXG5cdFx0XHR0aXRsZTogJ2ltZy90aXRsZS5qcGcnLFxyXG4gICAgICAgICAgICB0aWxlczogJ2ltZy90aWxlcy5wbmcnICxcclxuICAgICAgICAgICAgWmFtdXJlbmtvOiAnaW1nL1phbXVyZW5rby5wbmcnLFxyXG4gICAgICAgICAgICBTdGVwYW46ICdpbWcvU3RlcGFuLnBuZycgICxcclxuICAgICAgICAgICAgS29ub25lbmtvOiAnaW1nL0tvbm9uZW5rby5wbmcnICAsXHJcbiAgICAgICAgICAgIE92Y2hhcmVua286ICdpbWcvT3ZjaGFyZW5rby5wbmcnICAsXHJcbiAgICAgICAgICAgIFlhbWFub3Y6ICdpbWcvWWFtYW5vdi5wbmcnICAsXHJcbiAgICAgICAgICAgIFNtZXRuZXY6ICdpbWcvU21ldG5ldi5wbmcnICAsXHJcbiAgICAgICAgICAgIExhcnlhbm92c2t5OiAnaW1nL0xhcnlhbm92c2t5LnBuZycgICxcclxuICAgICAgICAgICAgcGxheWVyMjogJ2ltZy9wbGF5ZXIyLnBuZycgICxcclxuICAgICAgICAgICAgS3VkcmlhdnRjZXY6ICdpbWcvS3VkcmlhdnRjZXYucG5nJyAgLFxyXG4gICAgICAgICAgICBTb2xvdmV2OiAnaW1nL1NvbG92ZXYucG5nJyAgLFxyXG4gICAgICAgICAgICBNYXR2ZWV2OiAnaW1nL01hdHZlZXYucG5nJyAgLFxyXG4gICAgICAgICAgICBZYXVuemVtOiAnaW1nL1lhdW56ZW0ucG5nJyAgLFxyXG4gICAgICAgICAgICBCYXJ5c2huaWtvdmE6ICdpbWcvQmFyeXNobmlrb3ZhLnBuZycgICxcclxuICAgICAgICAgICAgS2l5YW1vdmE6ICdpbWcvS2l5YW1vdmEucG5nJyxcclxuICAgICAgICAgICAgY3VyYXRvcjogJ2ltZy9jdXJhdG9yLnBuZycsXHJcbiAgICAgICAgICAgIGFydGlmYWN0czogJ2ltZy9hcnRpZmFjdHMucG5nJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2ltZy9iYWNrZ3JvdW5kLnBuZycsXHJcbiAgICAgICAgICAgIGRlc2s6ICdpbWcvZGVzay5wbmcnLFxyXG4gICAgICAgICAgICBtaXNzaW9uOiAnaW1nL21pc3Npb24ucG5nJyxcclxuICAgICAgICAgICAgQ29tcGV0aXRvcjogJ2ltZy9Db21wZXRpdG9yLnBuZycsXHJcbiAgICAgICAgICAgIFZvbGtvdmE6ICdpbWcvVm9sa292YV8yLnBuZycsXHJcbiAgICAgICAgICAgIFRpdG92OiAnaW1nL1RpdG92LnBuZycsXHJcbiAgICAgICAgICAgIEthdGFldjogJ2ltZy9LYXRhZXYucG5nJyxcclxuICAgICAgICAgICAgQW5kcnpoZXZza2F5YTogJ2ltZy9BbmRyemhldnNrYXlhXzIucG5nJyxcclxuICAgICAgICAgICAgS29sb2Rlem5pa292YTogJ2ltZy9Lb2xvZGV6bmlrb3ZhXzIucG5nJyxcclxuICAgICAgICAgICAgU29sb2d1YjogJ2ltZy9Tb2xvZ3ViXzIucG5nJyxcclxuICAgICAgICAgICAgVGVwaWtpbjogJ2ltZy9UZXBpa2luXzIucG5nJyxcclxuICAgICAgICAgICAgUHVzaGtpbjogJ2ltZy9QdXNoa2luXzIucG5nJyxcclxuICAgICAgICAgICAgTGViZWRldjogJ2ltZy9MZWJlZGV2XzIucG5nJyxcclxuICAgICAgICAgICAgS2lzZWw6ICdpbWcvS2lzZWxfMi5wbmcnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kMjogJ2ltZy9iYWNrZ3JvdW5kMi5wbmcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY29udHJvbCA9IG5ldyBDb250cm9sU3RhdGUoKTtcclxuICAgICAgICB0aGlzLnNjZW5lcyA9IHtcclxuICAgICAgICAgICAgbG9hZGluZzogbmV3IExvYWRpbmcodGhpcyksXHJcbiAgICAgICAgICAgIG1lbnU6IG5ldyBNZW51KHRoaXMpLFxyXG4gICAgICAgICAgICBsZXZlbDogbmV3IExldmVsKHRoaXMpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IHRoaXMuc2NlbmVzLmxvYWRpbmc7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVNjZW5lKHN0YXR1cykge1xyXG4gICAgICAgIHN3aXRjaChzdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSBTY2VuZS5MT0FERUQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXMubWVudTtcclxuICAgICAgICAgICAgY2FzZSBTY2VuZS5TVEFSVF9HQU1FOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzLmxldmVsO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzLm1lbnU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZyYW1lKHRpbWUpIHtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTY2VuZS5zdGF0dXMgIT0gU2NlbmUuV09SS0lORykge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IHRoaXMuY2hhbmdlU2NlbmUodGhpcy5jdXJyZW50U2NlbmUuc3RhdHVzKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5yZW5kZXIodGltZSk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWUgPT4gdGhpcy5mcmFtZSh0aW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lID0+IHRoaXMuZnJhbWUodGltZSkpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGltYWdlRmlsZXMpIHtcclxuICAgICAgICB0aGlzLmltYWdlRmlsZXMgPSBpbWFnZUZpbGVzO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZCgpIHtcclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG5hbWUgaW4gdGhpcy5pbWFnZUZpbGVzKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkSW1hZ2UobmFtZSwgdGhpcy5pbWFnZUZpbGVzW25hbWVdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKG5hbWUsIHNyYykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlc1tuYW1lXSA9IGltYWdlO1xyXG4gICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKG5hbWUpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNreWVuZ2RheWdhbWUgPSBuZXcgR2FtZSgpO1xyXG4gICAgc2t5ZW5nZGF5Z2FtZS5ydW4oKTtcclxufTsiLCJpbXBvcnQgeyBCb2R5IH0gZnJvbSBcIi4vYm9keVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5QQyBleHRlbmRzIEJvZHl7XHJcbiAgICBjb25zdHJ1Y3RvcihpbWFnZU5hbWUsIG5hbWUsIHgsIHksIHN0YW5kKXtcclxuICAgICAgICBzdXBlcih7XHJcbiAgICAgICAgICAgIGltYWdlTmFtZTogaW1hZ2VOYW1lLFxyXG4gICAgICAgICAgICBzcGVlZDogMTUwLFxyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICBzdGFuZDogc3RhbmRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKHRpbWUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQm9keSB9IGZyb20gJy4vYm9keSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgQm9keSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sLCBzY3JlZW4sIHgsIHksIGltYWdlTmFtZSkge1xyXG4gICAgICAgIHN1cGVyKHtpbWFnZU5hbWU6IGltYWdlTmFtZSwgc3BlZWQ6IDE1MCwgeDogeCwgeTogeX0pO1xyXG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XHJcbiAgICAgICAgdGhpcy5zY3JlZW4gPSBzY3JlZW47XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2wudXApIHtcclxuICAgICAgICAgICAgdGhpcy53YWxrKFwidXBcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuY29udHJvbC5kb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FsayhcImRvd25cIik7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuY29udHJvbC5sZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FsayhcImxlZnRcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuY29udHJvbC5yaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLndhbGsoXCJyaWdodFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0YW5kKHRoaXMudmVsb2NpdHkuZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBTY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHRoaXMuY29uc3RydWN0b3IuV09SS0lORztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFdPUktJTkcoKSB7IHJldHVybiAnV09SS0lORyc7IH1cclxuICAgIHN0YXRpYyBnZXQgTE9BREVEKCkgeyByZXR1cm4gJ0xPQURFRCc7IH1cclxuICAgIHN0YXRpYyBnZXQgU1RBUlRfR0FNRSgpIHsgcmV0dXJuICdTVEFSVF9HQU1FJzsgfVxyXG4gICAgc3RhdGljIGdldCBHQU1FX09WRVIoKSB7IHJldHVybiAnR0FNRV9PVkVSJzsgfVxyXG4gICAgc3RhdGljIGdldCBHQU1FX1dJTigpIHsgcmV0dXJuICdHQU1FX1dJTic7IH1cclxuICAgIHN0YXRpYyBnZXQgRklOSVNIRUQoKSB7IHJldHVybiAnRklOSVNIRUQnOyB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHRoaXMuY29uc3RydWN0b3IuV09SS0lORztcclxuICAgIH1cclxuXHJcbiAgICBmaW5pc2goc3RhdHVzKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRpbWUpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSAnLi4vc2NlbmUnO1xyXG5pbXBvcnQgeyBTcHJpdGVTaGVldCB9IGZyb20gJy4uL3Nwcml0ZS1zaGVldCc7XHJcbmltcG9ydCB7IENoYXJhY3RlclNoZWV0IH0gZnJvbSAnLi4vY2hhcmFjdGVyLXNoZWV0JztcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi4vcGxheWVyJztcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi4vY2FtZXJhJztcclxuaW1wb3J0IHsgVGVhY2hlciB9IGZyb20gJy4uL3RlYWNoZXInO1xyXG5pbXBvcnQgeyBCb2R5IH0gZnJvbSAnLi4vYm9keSc7XHJcbmltcG9ydCB7IEFydGlmYWN0IH0gZnJvbSAnLi4vYXJ0aWZhY3QnO1xyXG5pbXBvcnQgeyBOUEMgfSBmcm9tICcuLi9ucGMnO1xyXG5pbXBvcnQgeyBTdG9yeSB9IGZyb20gJy4uL3N0b3J5JztcclxuaW1wb3J0IHsgQ29sbGlkZXIgfSBmcm9tICcuLi9jb2xsaWRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgTGV2ZWwgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICAgICAgdGhpcy50aWxlcyA9IG5ldyBTcHJpdGVTaGVldCh7XHJcbiAgICAgICAgICAgIGltYWdlTmFtZTogJ3RpbGVzJyxcclxuICAgICAgICAgICAgaW1hZ2VXaWR0aDogNjQwLFxyXG4gICAgICAgICAgICBpbWFnZUhlaWdodDogNjQwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnRpZmFjdHN0aWxlcyA9IG5ldyBTcHJpdGVTaGVldCh7XHJcbiAgICAgICAgICAgIGltYWdlTmFtZTogJ2FydGlmYWN0cycsXHJcbiAgICAgICAgICAgIGltYWdlV2lkdGg6IDY0MCxcclxuICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IDY0MFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihnYW1lLmNvbnRyb2wsIGdhbWUuc2NyZWVuLCA5NzEsIDEzNjgsICdwbGF5ZXIyJyk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlciA9IG5ldyBDb2xsaWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLm5wYyA9IFtcclxuICAgICAgICAgICAgbmV3IE5QQygnY3VyYXRvcicsICfQmtGD0YDQsNGC0L7RgCcsIDEwMDkuNDksIDEzNzAuNTEsICdsZWZ0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ092Y2hhcmVua28nLCAn0JvQuNC30LAg0J7QstGH0LDRgNC10L3QutC+JywgOTg5LjUsIDEyNzgsICdsZWZ0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ01hdHZlZXYnLCAn0KXQsNGA0LjRgtC+0L0nLCA5OTEuNSwgNzYwLjMzLCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdTb2xvdmV2JywgJ9CT0L7RiNCwJywgNTY2Ljk1LCAxNzE4LjA4LCAncmlnaHQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnTGFyeWFub3Zza3knLCAn0JDQu9C10LrRgdCw0L3QtNGAINCb0LDRgNGM0Y/QvdC+0LLRgdC60LjQuScsIDY1Ni44NywgMTQ3MC40NSwgJ3JpZ2h0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ1NtZXRuZXYnLCAn0JTQtdC90LjRgSDQodC80LXRgtC90LXQsicsIDE5OS4zOSwgMjE3MC43MywgJ2Rvd24nKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnS2l5YW1vdmEnLCAn0JDQvdC40YHQsCcsIDUwNC41NiwgNzM3LjkyLCAncmlnaHQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnQmFyeXNobmlrb3ZhJywgJ9CS0LjRgtCwJywgNzY5LjYxLCAyMjIwLjc5LCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdTdGVwYW4nLCAn0KHRgtC10L/QsNC9JywgNTA3LjAyLCA1MzAuMzIsICdkb3duJyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ1lhbWFub3YnLCAn0JDQvdC00YDQtdC5INCv0LzQsNC90L7QsicsIDExNDQuMzYsIDg3Ny44NSwgJ2xlZnQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnS3VkcmlhdnRjZXYnLCAn0JPQu9C10LEg0JrRg9C00YDRj9Cy0YbQtdCyJywgNjA0LjQ2LCAxMzQ1LjQ5LCAnZG93bicpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdZYXVuemVtJywgJ9CQ0L3QtNGA0LXQuSDQr9GD0L3Qt9C10LwnLCA2ODEuODgsIDEwODAuMzYsICdyaWdodCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdaYW11cmVua28nLCAn0JrQvtGB0YLRjyDQl9Cw0LzRg9GA0LXQvdC60L4nLCA4MzQuNDMsIDE1ODAuNTEsICd1cCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdLb25vbmVua28nLCAn0KHQsNGI0LAg0JrQvtC90L7QvdC10L3QutC+JywgNTE2LCAxNDc0LCAncmlnaHQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnQ29tcGV0aXRvcicsICfQktC+0LLQsCDQmNCy0LDQvdC+0LInLCAxMDk4LCA3NSwgJ2Rvd24nKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnVm9sa292YScsICfQmNGA0LjQvdCwINCS0L7Qu9C60L7QstCwJywgMTE1MSwgNDQ1LCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdUaXRvdicsICfQnNCw0LrRgdC40Lwg0KLQuNGC0L7QsicsIDk5MywgNjM2LCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdLYXRhZXYnLCAn0JDQu9C10LrRgdC10Lkg0JrQsNGC0LDQtdCyJywgMjYzLCAyMjMzLCAndXAnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnQW5kcnpoZXZza2F5YScsICfQr9C90LAg0JDQvdC00YDQtdC20LXQstGB0LrQsNGPJywgNDU2LCA4NTUsICdyaWdodCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdLb2xvZGV6bmlrb3ZhJywgJ9Cv0L3QsCDQmtC+0LvQvtC00LXQt9C90LjQutC+0LLQsCcsIDU4MCwgODU2LCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdTb2xvZ3ViJywgJ9CT0LvQtdCxINCh0L7Qu9C+0LPRg9CxJywgMTE1MiwgMTE4MSwgJ2Rvd24nKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnVGVwaWtpbicsICfQn9Cw0LLQtdC7INCi0LXQv9C40LrQuNC9JywgOTYwLCAyOTMsICdkb3duJyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ1B1c2hraW4nLCAn0JTQtdC90LjRgSDQn9GD0YjQutC40L0nLCA4MDMsIDczNCwgJ3JpZ2h0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0xlYmVkZXYnLCAn0KHQtdGA0LPQtdC5INCb0LXQsdC10LTQtdCyJywgODE0LCAxOTU2LCAnZG93bicpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdLaXNlbCcsICfQldC70LXQvdCwINCa0LjRgdC10LvRjCcsIDcwNCwgOTYxLCAncmlnaHQnKSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLmFydGlmYWN0cyA9IFtcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCAxMDI0LCAzODIsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgMTE1MiwgMzgyLCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDEwMjQsIDI1NiwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCAxMTUyLCAyNTUsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgMTAyNCwgMTI3LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDExNTIsIDEyNywgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDIpLCA5MDEsIDM1MiwgMTksIDMxLCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDIpLCA5MDEsIDIyMywgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDIpLCA5MDAsIDk1LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDQ1NCwgMTI3OSwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA1NzgsIDEyODAsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNjQyLCAxMjgwLCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDcwNiwgMTI4MCwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA0NTQsIDE0MDcsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNTc4LCAxNDA3LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDY0MiwgMTQwNywgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA3MDYsIDE0MDcsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNDU0LCAxNTM2LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDU3OCwgMTUzNiwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA2NDIsIDE1MzYsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNzA2LCAxNTM2LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDQ1NCwgMTY2NSwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA1NzgsIDE2NjUsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNjQyLCAxNjY1LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDcwNiwgMTY2NSwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA1MTIsIDE3OTEsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgzKSwgNjM5LCAxOTgzLCAxOSwgMzEsICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMyksIDYzOSwgMjA0NywgMTksIDMxLCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA3MDMsIDIwNDgsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNzY3LCAyMDQ4LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDcwMywgMjE3NCwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA3NjcsIDIxNzQsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSg0KSwgODMyLCA3MDUsIDI0LCAyMiwgJ2NvZmZlZScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoNSksIDY0LCAyMjQwLCAyNSwgMjMsICdqdXJuYWwnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDYpLCA4NDgsIDE3MTIsIDIyLCAyMiwgJ3JhZGlvJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSg3KSwgODQ4LCAxMzI4LCAyNywgMjMsICdub3RlJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSg4KSwgOTAwLCAxMjQwLCA3LCAxNCwgJ2Nhc3NldHRlJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSg5KSwgMTA1NiwgMTIxNSwgNjQsIDEsICdtaXNzaW9uJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSg5KSwgMTEyMCwgMTIxNSwgNjQsIDEsICdtaXNzaW9uJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMCksIDU2NywgMTk4NCwgMSwgNjQsICdjb2RlJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMCksIDU2NywgMjA0OCwgMSwgNjQsICdjb2RlJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMSksIDcwOSwgNTc2LCAxLCA2NCwgJ3Rhc2syJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMSksIDg4NiwgNTc3LCAxLCA2NCwgJ3Rhc2szJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMiksIDkwMiwgMTQwOSwgMTMsIDEzLCAndGFwb2Noa2knKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEyKSwgOTYxLCAxMTg0LCA2NCwgNjQsICd0YXNrMScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoNSksIDQ1NiwgNzA0LCAyNSwgMjMsICdqdXJuYWxBbmlzJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxNCksIDEyOCwgMjI0MCwgNjQsIDY0LCAnc29mYScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTUpLCAxOTIsIDIyNDAsIDY0LCA2NCwgJ3NvZmEnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDE0KSwgMzIwLCAyMjQwLCA2NCwgNjQsICdzb2ZhJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxNSksIDM4NCwgMjI0MCwgNjQsIDY0LCAnc29mYScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTYpLCA3MDUsIDc1OSwgNjQsIDY0LCAnd2F0ZXInKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDE3KSwgODAwLCAxMDk4LCA2NCwgNjQsICd0cmFzaCcpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTAwKSwgODQ4LCAxMzI4LCAyNywgMjMsICdub3RlMicpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTAwKSwgNjQyLCA0MjcsIDI3LCAyMywgJ2ZpbmFsJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMDApLCA2NDAsIDI1OCwgMjcsIDIzLCAnZmluYWwyJyksXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9yeSA9IG5ldyBTdG9yeSh7XHJcbiAgICAgICAgICAgIHBsYXllcjogdGhpcy5wbGF5ZXIsXHJcbiAgICAgICAgICAgIGNvbnRyb2w6IGdhbWUuY29udHJvbCxcclxuICAgICAgICAgICAgbnBjOiB0aGlzLm5wYyxcclxuICAgICAgICAgICAgYXJ0aWZhY3RzOiB0aGlzLmFydGlmYWN0cyxcclxuICAgICAgICAgICAgY29sbGlkZXI6IHRoaXMuY29sbGlkZXJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHN1cGVyLmluaXQoKTtcclxuICAgICAgICBjb25zdCBtYXBEYXRhID0gcmVxdWlyZSgnLi4vbWFwcy9vZmZpY2UuanNvbicpO1xyXG4gICAgICAgIHRoaXMubWFwID0gdGhpcy5nYW1lLnNjcmVlbi5jcmVhdGVNYXAoJ2xldmVsJywgbWFwRGF0YSwgdGhpcy50aWxlcyk7XHJcbiAgICAgICAgdGhpcy5tYWluQ2FtZXJhID0gbmV3IENhbWVyYSh7XHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmdhbWUuc2NyZWVuLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZ2FtZS5zY3JlZW4uaGVpZ2h0LFxyXG4gICAgICAgICAgICBsaW1pdFg6IHRoaXMubWFwLndpZHRoIC0gdGhpcy5nYW1lLnNjcmVlbi53aWR0aCxcclxuICAgICAgICAgICAgbGltaXRZOiB0aGlzLm1hcC5oZWlnaHQgLSB0aGlzLmdhbWUuc2NyZWVuLmhlaWdodFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubWFpbkNhbWVyYS53YXRjaCh0aGlzLnBsYXllcik7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5zZXRDYW1lcmEodGhpcy5tYWluQ2FtZXJhKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmFkZFN0YXRpY1NoYXBlcyhtYXBEYXRhKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmFkZEtpbmVtYXRpY0JvZHkodGhpcy5wbGF5ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLnN0b3J5LmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubmV3UGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm5ld0FuaW1hdGlvbigncGxheWVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubmV3UGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLm5wYy5mb3JFYWNoKG5wYyA9PiB7XHJcbiAgICAgICAgICAgIG5wYy51cGRhdGUodGltZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdG9yeS51cGRhdGUodGltZSk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIHRoaXMubWFpbkNhbWVyYS51cGRhdGUodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRpbWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmRyYXdTcHJpdGUodGhpcy5tYXApOyBcclxuICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKGFydGlmYWN0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5kcmF3U3ByaXRlKGFydGlmYWN0LnNwcml0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ucGMuZm9yRWFjaChucGMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmRyYXdTcHJpdGUobnBjLnZpZXcpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50TmFtZShucGMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd1Nwcml0ZSh0aGlzLnBsYXllci52aWV3KTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zdG9yeS5sb29raW5nICYmICF0aGlzLnN0b3J5Lmxvb2tEZXNrICYmICF0aGlzLnN0b3J5Lmxvb2tNaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4ucHJpbnRTYXkodGhpcy5zdG9yeS5kaWFvbG9nc1t0aGlzLnN0b3J5LnN0YXR1c10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50VGFzayh0aGlzLnN0b3J5LmN1cnJlbnRUYXNrKTtcclxuICAgICAgICBpZih0aGlzLnN0b3J5Lmxvb2tEZXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd0ltYWdlKDAsIDAsICdkZXNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubG9va01pc3Npb24pIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5kcmF3SW1hZ2UoMCwgMCwgJ21pc3Npb24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zdG9yeS5maW5kICYmICF0aGlzLnN0b3J5LmZpbmRFbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCA1MjcsIDEzNDQsIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCA1NTcsIDExOTAsIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCA3MTQsIDExNzQsIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCA3NzgsIDEwMzEsIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCA4MzQsIDkxNSwgMjcsIDIzLCAnJykpO1xyXG4gICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5wdXNoKG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMyksIDkwNiwgNzE1LCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgOTA3LCA0ODksIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCAxMTAyLCAzMDMsIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCAxMTAzLCAxMDgsIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5maW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkuZmluZEVuZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubG9va0NocmlzdHkgJiYgIXRoaXMuc3RvcnkubG9va0NocmlzdHlfKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNyYz1cInZpZGVvL0NocmlzdHkubXA0XCI7XHJcbiAgICAgICAgICAgIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgMzIwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIDI0MCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYWFhXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rQ2hyaXN0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tDaHJpc3R5XyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYWEnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwxMzAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubG9va1Nhc2hhICYmICF0aGlzLnN0b3J5Lmxvb2tTYXNoYV8pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgdmlkZW8uc3JjPVwidmlkZW8vU2FzaGEubXA0XCI7XHJcbiAgICAgICAgICAgIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgMzIwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIDI0MCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiYmJiXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rU2FzaGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rU2FzaGFfID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JiYicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LDExMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zdG9yeS5sb29rTmF0YXNoYSAmJiAhdGhpcy5zdG9yeS5sb29rTmF0YXNoYV8pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgdmlkZW8uc3JjPVwidmlkZW8vTmF0YS5tcDRcIjtcclxuICAgICAgICAgICAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCAzMjApO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgMjQwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjY2NcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tOYXRhc2hhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubG9va05hdGFzaGFfID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NjYycpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LDcwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0b3J5Lmxvb2tMZWFkZXIgJiYgIXRoaXMuc3RvcnkubG9va0xlYWRlcl8pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgdmlkZW8uc3JjPVwidmlkZW8vQ2FwaXRhbi5tcDRcIjtcclxuICAgICAgICAgICAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCAzMjApO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgMjQwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZGRcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tMZWFkZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rTGVhZGVyXyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZGQnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwzNTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubG9va1VzICYmICF0aGlzLnN0b3J5Lmxvb2tVc18pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgdmlkZW8uc3JjPVwidmlkZW8vbWFpbi5tcDRcIjtcclxuICAgICAgICAgICAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCAzMjApO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgMjQwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZWVcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tVcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tVc18gPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWVlJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sMjMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0b3J5Lmxvb2tNYWluICYmICF0aGlzLnN0b3J5Lmxvb2tNYWluXykge1xyXG4gICAgICAgICAgICB2YXIgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgICAgICB2aWRlby5zcmM9XCJ2aWRlby9tYWluMi5tcDRcIjtcclxuICAgICAgICAgICAgdmlkZW8uYXV0b3BsYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCAzMjApO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgMjQwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJmZmZcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tNYWluID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubG9va01haW5fID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZmZicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LDgxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zdG9yeS5tdXNpYyAmJiAhdGhpcy5zdG9yeS5tdXNpY18pIHtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgYXVkaW8uc3JjPVwiYXVkaW8vbWFpbi5tcDNcIjtcclxuICAgICAgICAgICAgYXVkaW8uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJnZ2dcIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXVkaW8pO1xyXG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubXVzaWMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5tdXNpY18gPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2dnJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sMjI0MDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1cGVyLnJlbmRlcih0aW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSAnLi4vc2NlbmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRBdCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRBdCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBpZih0aGlzLmxvYWRlZEF0ID09IDAgJiYgdGhpcy5nYW1lLnNjcmVlbi5pc0ltYWdlc0xvYWRlZCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkQXQgPSB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvYWRlZEF0ICE9IDAgJiYgKHRpbWUgLSB0aGlzLmxvYWRlZEF0KSA+IDUwMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmlzaChTY2VuZS5MT0FERUQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodGltZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZmlsbCgnIzM2OUFEOScpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4ucHJpbnQoNTAsIDcwLCBcIkxvYWRpbmcuLi5cIik7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKHRpbWUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tICcuLi9zY2VuZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVudSBleHRlbmRzIFNjZW5lIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgICAgICBzdXBlcihnYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHN1cGVyLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZS5jb250cm9sLnVzZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmlzaChTY2VuZS5TVEFSVF9HQU1FKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRpbWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmRyYXdJbWFnZSgwLCAwLCAndGl0bGUnKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50KDI1MCwgNTAwLCBcItCd0LDQttC80LjRgtC1INC/0YDQvtCx0LXQu1wiKTtcclxuICAgICAgICBzdXBlci5yZW5kZXIodGltZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vaW1hZ2UtbG9hZGVyJ1xyXG5pbXBvcnQgeyBUaWxlTWFwIH0gZnJvbSAnLi90aWxlLW1hcCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NyZWVuIHtcclxuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0ge307XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhU2V0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2FtZXJhKGNhbWVyYSkge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuaXNDYW1lcmFTZXQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJbWFnZXMoaW1hZ2VGaWxlcykge1xyXG4gICAgICAgIGNvbnN0IGxvYWRlciA9IG5ldyBJbWFnZUxvYWRlcihpbWFnZUZpbGVzKTtcclxuICAgICAgICBsb2FkZXIubG9hZCgpLnRoZW4oKG5hbWVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzID0gT2JqZWN0LmFzc2lnbih0aGlzLmltYWdlcywgbG9hZGVyLmltYWdlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpO1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBlbGVtZW50c1swXSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjYW52YXM7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWFwKG5hbWUsIG1hcERhdGEsIHRpbGVzZXQpIHtcclxuICAgICAgICBjb25zdCBtYXBJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIG1hcEltYWdlLndpZHRoID0gbWFwRGF0YS53aWR0aCAqIG1hcERhdGEudGlsZXdpZHRoO1xyXG4gICAgICAgIG1hcEltYWdlLmhlaWdodCA9IG1hcERhdGEuaGVpZ2h0ICogbWFwRGF0YS50aWxlaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IG1hcENvbnRleHQgPSBtYXBJbWFnZS5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGNvbnN0IGhpdGJveGVzID0gW107XHJcbiAgICAgICAgbGV0IHJvdywgY29sO1xyXG4gICAgICAgIG1hcERhdGEubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgICAgICBpZihsYXllci50eXBlID09ICd0aWxlbGF5ZXInKSB7XHJcbiAgICAgICAgICAgICAgICByb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICAgICAgICAgIGxheWVyLmRhdGEuZm9yRWFjaChpbmRleCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcENvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW3RpbGVzZXQuaW1hZ2VOYW1lXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuZ2V0U291cmNlWChpbmRleCksIHRpbGVzZXQuZ2V0U291cmNlWShpbmRleCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBEYXRhLnRpbGV3aWR0aCwgbWFwRGF0YS50aWxlaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sICogbWFwRGF0YS50aWxld2lkdGgsIHJvdyAqIG1hcERhdGEudGlsZWhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcERhdGEudGlsZXdpZHRoLCBtYXBEYXRhLnRpbGVoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbCA+IChtYXBEYXRhLndpZHRoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobGF5ZXIudHlwZSA9PSAnb2JqZWN0Z3JvdXAnKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRib3hlcy5wdXNoKC4uLmxheWVyLm9iamVjdHMubWFwKG9iaiA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHgxOiBvYmoueCwgXHJcbiAgICAgICAgICAgICAgICAgICAgeDI6IG9iai54ICsgb2JqLndpZHRoLCBcclxuICAgICAgICAgICAgICAgICAgICB5MTogb2JqLnksIFxyXG4gICAgICAgICAgICAgICAgICAgIHkyOiBvYmoueSArIG9iai5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZXNbbmFtZV0gPSBtYXBJbWFnZTtcclxuICAgICAgICByZXR1cm4gbmV3IFRpbGVNYXAoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHNvdXJjZVg6IDAsXHJcbiAgICAgICAgICAgIHNvdXJjZVk6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiBtYXBJbWFnZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBtYXBJbWFnZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIGhpdGJveGVzOiBoaXRib3hlc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbGwoY29sb3IpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmludCh4LCB5LCB0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gXCIyMnB4IEdlb3JnaWFcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpbnRUYXNrKHRleHQpIHtcclxuICAgICAgICB0aGlzLmRyYXdJbWFnZSgwLCA1NzAsICdiYWNrZ3JvdW5kMicpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiMTZweCBHZW9yZ2lhXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFwi0JfQsNC00LDRh9CwOiBcIiArIHRleHQsIDMwLCA2MTIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaW50TmFtZShwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIjE0cHggR2VvcmdpYVwiO1xyXG4gICAgICAgIHZhciBuYW1lID0ge1xyXG4gICAgICAgICAgICB4OiBwbGF5ZXIueCAtIHRoaXMuY2FtZXJhLnggLSAocGxheWVyLm5hbWUuc3BsaXQoJyAnKVswXS5sZW5ndGggKiAzIC0gcGxheWVyLmNvbGxpc2lvblNoYXBlLndpZHRoKSxcclxuICAgICAgICAgICAgeTogcGxheWVyLnkgLSB0aGlzLmNhbWVyYS55LFxyXG4gICAgICAgICAgICB0ZXh0OiBwbGF5ZXIubmFtZS5zcGxpdCgnICcpWzBdXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgc3VibmFtZSA9IHt9O1xyXG4gICAgICAgIGlmKHBsYXllci5uYW1lLnNwbGl0KCcgJykubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBzdWJuYW1lLnggPSAgcGxheWVyLnggLSB0aGlzLmNhbWVyYS54IC0gKHBsYXllci5uYW1lLnNwbGl0KCcgJylbMV0ubGVuZ3RoICogMyAtIHBsYXllci5jb2xsaXNpb25TaGFwZS53aWR0aCk7XHJcbiAgICAgICAgICAgIHN1Ym5hbWUueSA9IHBsYXllci55IC0gdGhpcy5jYW1lcmEueTtcclxuICAgICAgICAgICAgc3VibmFtZS50ZXh0ID0gcGxheWVyLm5hbWUuc3BsaXQoJyAnKVsxXVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1Ym5hbWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdWJuYW1lICE9IG51bGwpIHRoaXMuY29udGV4dC5maWxsVGV4dChzdWJuYW1lLnRleHQsIHN1Ym5hbWUueCwgc3VibmFtZS55IC0gMTApO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChuYW1lLnRleHQsIG5hbWUueCwgbmFtZS55KTtcclxuICAgIH1cclxuICAgIHByaW50U2F5KHRleHQsIG1vZGUpIHtcclxuICAgICAgICB0aGlzLmRyYXdJbWFnZSgwLCAwLCAnYmFja2dyb3VuZCcpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiMTZweCBHZW9yZ2lhXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRleHRbMF0sIDQwLCA1NSk7XHJcbiAgICAgICAgaWYodGV4dC5sZW5ndGggPiAxKSB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dFsxXSwgNDAsIDc1KTtcclxuICAgICAgICBpZih0ZXh0Lmxlbmd0aCA+IDIpIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0WzJdLCA0MCwgOTUpO1xyXG4gICAgICAgIGlmKCFtb2RlKSB0aGlzLmNvbnRleHQuZmlsbFRleHQoXCI80J/RgNC+0LHQtdC7PiDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLCAzODUsIDEwOSk7XHJcbiAgICAgICAgZWxzZSB0aGlzLmNvbnRleHQuZmlsbFRleHQoXCI80KbQuNGE0YDQsD4g0LTQu9GPINC+0YLQstC10YLQsFwiLCAzOTUsIDEwOSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0ltYWdlKHgsIHksIGltYWdlTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZXNbaW1hZ2VOYW1lXSwgeCwgeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1Nwcml0ZShzcHJpdGUpIHtcclxuXHJcbiAgICAgICAgbGV0IHNwcml0ZVggPSBzcHJpdGUueDtcclxuICAgICAgICBsZXQgc3ByaXRlWSA9IHNwcml0ZS55O1xyXG5cclxuICAgICAgICBpZih0aGlzLmlzQ2FtZXJhU2V0KSB7XHJcbiAgICAgICAgICAgIHNwcml0ZVggLT0gdGhpcy5jYW1lcmEueDtcclxuICAgICAgICAgICAgc3ByaXRlWSAtPSB0aGlzLmNhbWVyYS55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoXHJcbiAgICAgICAgICAgIChzcHJpdGVYID49IHRoaXMud2lkdGgpIHx8XHJcbiAgICAgICAgICAgIChzcHJpdGVZID49IHRoaXMuaGVpZ2h0KSB8fCBcclxuICAgICAgICAgICAgKChzcHJpdGVYICsgc3ByaXRlLndpZHRoKSA8PSAwKSB8fFxyXG4gICAgICAgICAgICAoKHNwcml0ZVkgKyBzcHJpdGUuaGVpZ2h0KSA8PSAwKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlWCA9IHNwcml0ZS5zb3VyY2VYICsgTWF0aC5hYnMoTWF0aC5taW4oMCwgc3ByaXRlWCkpO1xyXG4gICAgICAgIGxldCBzb3VyY2VZID0gc3ByaXRlLnNvdXJjZVkgKyBNYXRoLmFicyhNYXRoLm1pbigwLCBzcHJpdGVZKSk7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5taW4odGhpcy53aWR0aCwgc3ByaXRlWCArIHNwcml0ZS53aWR0aCkgLSBNYXRoLm1heCgwLCBzcHJpdGVYKTtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5taW4odGhpcy5oZWlnaHQsIHNwcml0ZVkgKyBzcHJpdGUuaGVpZ2h0KSAtIE1hdGgubWF4KDAsIHNwcml0ZVkpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW3Nwcml0ZS5pbWFnZU5hbWVdLFxyXG4gICAgICAgICAgICBzb3VyY2VYLCBcclxuICAgICAgICAgICAgc291cmNlWSwgXHJcbiAgICAgICAgICAgIHdpZHRoLCBcclxuICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICBNYXRoLm1heCgwLCBzcHJpdGVYKSwgXHJcbiAgICAgICAgICAgIE1hdGgubWF4KDAsIHNwcml0ZVkpLCBcclxuICAgICAgICAgICAgd2lkdGgsIFxyXG4gICAgICAgICAgICBoZWlnaHQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAnLi9zcHJpdGUnO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tICcuL2FuaW1hdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlU2hlZXQge1xyXG4gICAgY29uc3RydWN0b3Ioe2ltYWdlTmFtZSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIHNwcml0ZVdpZHRoID0gNjQsIHNwcml0ZUhlaWdodCA9IDY0fSkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VXaWR0aCA9IGltYWdlV2lkdGg7XHJcbiAgICAgICAgdGhpcy5pbWFnZUhlaWdodCA9IGltYWdlSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aDtcclxuICAgICAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHNwcml0ZUhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbmltYXRpb24oaW5kZXhlcywgc3BlZWQsIHJlcGVhdCA9IHRydWUsIGF1dG9ydW4gPSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6IHRoaXMuaW1hZ2VOYW1lLFxyXG4gICAgICAgICAgICBmcmFtZXM6IGluZGV4ZXMubWFwKGluZGV4ID0+ICh7c3g6IHRoaXMuZ2V0U291cmNlWChpbmRleCksIHN5OiB0aGlzLmdldFNvdXJjZVkoaW5kZXgpfSkpLFxyXG4gICAgICAgICAgICBzcGVlZDogc3BlZWQsXHJcbiAgICAgICAgICAgIHJlcGVhdDogcmVwZWF0LFxyXG4gICAgICAgICAgICBhdXRvcnVuOiBhdXRvcnVuLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5zcHJpdGVXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNwcml0ZUhlaWdodFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNwcml0ZShpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3ByaXRlKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiB0aGlzLmltYWdlTmFtZSxcclxuICAgICAgICAgICAgc291cmNlWDogdGhpcy5nZXRTb3VyY2VYKGluZGV4KSxcclxuICAgICAgICAgICAgc291cmNlWTogdGhpcy5nZXRTb3VyY2VZKGluZGV4KSxcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3ByaXRlV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5zcHJpdGVIZWlnaHRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTb3VyY2VYKGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuICgtLWluZGV4ICogdGhpcy5zcHJpdGVXaWR0aCkgJSB0aGlzLmltYWdlV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U291cmNlWShpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnRydW5jKCgtLWluZGV4ICogdGhpcy5zcHJpdGVXaWR0aCkgLyB0aGlzLmltYWdlV2lkdGgpICogdGhpcy5zcHJpdGVIZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHtpbWFnZU5hbWUsIHNvdXJjZVgsIHNvdXJjZVksIHdpZHRoID0gNjQsIGhlaWdodCA9IDY0fSkge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VOYW1lID0gaW1hZ2VOYW1lO1xyXG4gICAgICAgIHRoaXMuc291cmNlWCA9IHNvdXJjZVg7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VZID0gc291cmNlWTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFhZKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yeSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7cGxheWVyLCBjb250cm9sLCBucGMsIGFydGlmYWN0cywgY29sbGlkZXJ9KSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcclxuICAgICAgICB0aGlzLm5wYyA9IG5wYztcclxuICAgICAgICB0aGlzLmFydGlmYWN0cyA9IGFydGlmYWN0cztcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gY29sbGlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIHRoaXMubmV3UGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50YXBvY2hraSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmxvY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9va0Rlc2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvb2tNaXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iZXNpZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLm9sZFN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5zdWJTdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdFN0YXR1cyA9IC0xO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZmluaXNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9ICcnO1xyXG4gICAgICAgIHRoaXMuZGlhb2xvZ3MgPSBbXHJcbiAgICAgICAgICAgIFtcItCa0YPRgNCw0YLQvtGAOiDQn9GA0LjQstC10YIhXCJdLC8vMFxyXG4gICAgICAgICAgICBbLy8xXHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQotGLINC90L7QstGL0Lkg0YHQvtGC0YDRg9C00L3QuNC6INCyINC60L7QvNC/0LDQvdC40LggU2t5ZW5nLFwiICxcclxuICAgICAgICAgICAgICAgIFwi0LzQvdC+0LPQvtCz0L4g0LXRidC1INC90LUg0LfQvdCw0LXRiNGMINC4INGC0LXQsdC1INC/0YDQtdC00YHRgtC+0LjRgiDQstGB0LXQvNGDINC90LDRg9GH0LjRgtGM0YHRjy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8yXHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQn9C10YDQstGL0Lkg0YjQsNCzLCDQsdC10Lcg0LrQvtGC0L7RgNC+0LPQviBcIixcclxuICAgICAgICAgICAgICAgIFwi0YLRiyDQvdC1INC00LLQuNC90LXRiNGM0YHRjyDQtNCw0LvRjNGI0LUg0Y3RgtC+INGC0YDQsNC00LjRhtC40Y8gU2t5SG9tZVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8zXHJcbiAgICAgICAgICAgICAgICBcIig/KSDQktC+0LrRgNGD0LMg0YDQsNC30L3Ri9C1INC/0YDQtdC00LzQtdGC0Ysg0LIg0LrQvtC80L3QsNGC0LUsINC90YPQttC90L4g0LLRi9Cx0YDQsNGC0Ywg0LLQtdGA0L3Ri9C5XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNFxyXG4gICAgICAgICAgICAgICAgXCLQotCw0L/QvtGH0LrQuDog0L3QsNC20LzQuNGC0LUgPHNwYWNlPiDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRjy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81XHJcbiAgICAgICAgICAgICAgICBcItCb0LjQt9CwOiDQotGLINGH0YLQvi3RgtC+INC30LDQsdGL0LshXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNlxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQryDQv9C+0LnQtNGDINC/0L7QuNGJ0YMg0L/QvtC70YPRh9GI0LUhXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vN1xyXG4gICAgICAgICAgICAgICAgXCLQm9C40LfQsDog0K3QuSwg0LHRg9C00Ywg0L/RgNC+0YnQtSFcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84XHJcbiAgICAgICAgICAgICAgICBcIig/KSDQn9C+0LTRg9C80LDQuSwg0YfRgtC+INC80LXRiNCw0LXRgiDRgtC10LHQtSDQuNC3INC+0LTQtdC20LTRiz9cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy85XHJcbiAgICAgICAgICAgICAgICBcIig/KSDQndGD0LbQvdC+INC30LDQvNC10L3QuNGC0Ywg0YHQvNC+0LrQuNC90LMg0L3QsCDQvtCx0YvRh9C90YPRjiDQvtC00LXQttC00YMuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTBcclxuICAgICAgICAgICAgICAgIFwiKD8pINCf0LXRgNC10LQg0L3QsNGH0LDQu9C+0Lwg0YDQsNCx0L7RgtGLINC80L7QttC90L4g0LLRi9C/0LjRgtGMINGH0LDRiNC10YfQutGDINC60L7RhNC1INC90LAg0LrRg9GF0L3QtS5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xMVxyXG4gICAgICAgICAgICAgICAgXCLQmtC+0YTQtTog0L3QsNC20LzQuNGC0LUgPHNwYWNlPiDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRjy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xMlxyXG4gICAgICAgICAgICAgICAgXCIoPykg0KLQtdC/0LXRgNGMINC80L7QttC90L4g0LjQtNGC0Lgg0Log0LrRg9GA0LDRgtC+0YDRgyDQt9CwINC30LDQtNCw0L3QuNGP0LzQuC5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xM1xyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0K8g0LTRg9C80LDRjiDRgtGLINC+0YLQu9C40YfQvdC+INCy0L/QuNGI0LXRiNGM0YHRjyDQsiDQvdCw0Ygg0LrQvtC70LvQtdC60YLQuNCyLCDQvdC+INC00LvRjyDQvdCw0YfQsNC70LAsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQv9C+0LfQvdCw0LrQvtC80YHRjyDRgSDQvdCw0YjQuNC80Lgg0L7RgdC90L7QstCw0YLQtdC70Y/QvNC4INC4INGD0L/RgNCw0LLQu9GP0Y7RidC40Lwg0L/QsNGA0YLQvdC10YDQvtC8INC90LDQudC00LggXCIsXHJcbiAgICAgICAgICAgICAgICBcItC60LDQttC00L7Qs9C+INC40Lcg0L3QuNGFINC/0L4g0L/QvtC00YHQutCw0LfQutCw0LwuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTRcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCS0L7RgiDRgdC/0LjRgdC+0LosINGC0Ysg0LTQvtC70LbQtdC9INC/0L7QtNGF0L7QtNC40YLRjCDQuiDQutCw0LbQtNC+0LzRgyDQuNC3INC90LjRhSDRgdC+0LPQu9Cw0YHQvdC+IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQv9C+0LTRgdC60LDQt9C60LUg0Lgg0L/QvtGB0LvQtSDQstC+0LfQstGA0LDRidCw0YLRjNGB0Y8g0LrQviDQvNC90LUsINCy0YHQtSDQv9C+0L3Rj9GC0L3Qvj9cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNVxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQr9GB0L3Qviwg0LTRg9C80LDRjiDRgdC/0YDQsNCy0LvRjtGB0YwpXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTZcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCe0LouINCi0L7Qs9C00LAg0L3QsNGH0L3QtdC8LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE3XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQn9GA0L4g0Y3RgtC+0LPQviDRh9C10LvQvtCy0LXQutCwINGC0LXQsdC1INGA0LDRgdGB0LrQsNC20LXRgiDQk9C70LXQsSDQmtGD0LTRgNGP0LLRhtC10LIsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvdCw0LnQtNC4INC10LPQviDQuCDRgNCw0YHRgdC/0YDQvtGB0Lgg0L4g0L3QtdC8LiBcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xOFxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0J3QsNGIINC00L7QvCDQvdC1INGB0LvQuNGI0LrQvtC8INCx0L7Qu9GM0YjQvtC5LCBcIixcclxuICAgICAgICAgICAgICAgIFwi0L/QvtGN0YLQvtC80YMg0YLQtdCx0LUg0L3QtSDRgdC+0YHRgtCw0LLQuNGCINGC0YDRg9C00LAg0YHQtNC10LvQsNGC0Ywg0Y3RgtC+LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE5XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQp9GC0L7QsdGLINC90LDQvNC10LrQvdGD0YLRjCwg0L3QsNC/0L7QvNC90Lgg0JPQu9C10LHRgyDQuNGB0YLQvtGA0LjRjiDRgSDQkNC70LXQutGB0LXQtdC8IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQmNCy0LDQvdC+0LLRi9C8LCDQvtC9INC00LDQstCw0Lsg0LXQvNGDINC40L3RgtC10YDQstGM0Y4uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjBcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0J/RgNC40LLQtdGCLCDQk9C70LXQsSEg0K8g0L3QvtCy0LXQvdGM0LrQuNC5INC4INC00L7Qu9C20LXQvSDQvdCw0LnRgtC4INC/0L4g0L/QvtC00YHQutCw0LfQutCw0LwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItCy0YHQtdGFINC40Lcg0Y3RgtC+0LPQviDRgdC/0LjRgdC60LAuINCc0L3QtSDQvdGD0LbQvdC+INGD0LfQvdCw0YLRjCDQv9GA0L4g0YfQtdC70L7QstC10LrQsCwg0L4g0LrQvtGC0L7RgNC+0LwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGC0Ysg0LPQvtCy0L7RgNC40Lsg0YEg0LLQtdC00YPRidC40Lwg0LrQsNC90LDQu9CwIFBvbmNoaWtOZXdzINCQ0LvQtdC60YHQtdC10Lwg0JjQstCw0L3QvtCy0YvQvC5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8yMVxyXG4gICAgICAgICAgICAgICAgXCLQk9C70LXQsTog0J/RgNC40LLQtdGCISDQndGDINGC0Ysg0LLRgdC/0L7QvNC90LjQuy4uLi4uLtCc0Ysg0LzQvdC+0LPQviDQviDQutC+0Lwg0LHQtdGB0LXQtNC+0LLQsNC70LgsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvdC+INGPINC00YPQvNCw0Y4g0YLQsNC6INCx0YPQtNC10YIg0LjQvdGC0LXRgNC10YHQvdC10LUpINCt0YLQvtGCINGH0LXQu9C+0LLQtdC6INGB0YPQv9C10YDQs9C70YPQsdC+0LrQuNC5IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgtC10YXQvdC40YfQtdGB0LrQuNC5INC80L7Qt9CzLiDQlNGD0LzQsNGOINGN0YLQuNC8INCy0YHQtSDRgdC60LDQt9Cw0L3Qvi5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8yMlxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQpdC8Li4uLtGB0L/QsNGB0LjQsdC+LCDQvdC+INC/0L7Rh9GC0Lgg0LLRgdC1INC+0L3QuCDRg9GH0LjQu9C40YHRjCDQsiDQnNCk0KLQmC4uLi4u0L/QvtC60LBcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8yM1xyXG4gICAgICAgICAgICAgICAgXCLQk9C70LXQsTog0K3QuSwg0YLQtdGB0YLQuNGA0YPQuSDQvdCwINC/0YDQvtC00LUsINC30LTQtdGB0Ywg0LLRgdC1INGC0LDQuiDQtNC10LvQsNGO0YIhXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjRcclxuICAgICAgICAgICAgICAgIFwi0JDQvdC00YDQtdC5OiDQnNC+0LvQvtC00LXRhiDQvdC+0LLQuNGH0L7Quiwg0YXQvtGC0Y8g0Y8g0LTRg9C80LDRjiDRgtC10LHQtSDQv9GA0L7RgdGC0L4g0L/QvtCy0LXQt9C70L4uIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQn9C+0YHQvNC+0YLRgNC40Lwg0LTQvtC50LTQtdGI0Ywg0LvQuCDRgtGLINC00L4g0LrQvtC90YbQsC5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8yNVxyXG4gICAgICAgICAgICAgICAgXCIoPykg0J3Rg9C20L3QviDQstC10YDQvdGD0YLRjNGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8yNlxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0JzQvtC70L7QtNC10YYhINCh0LvQtdC00YPRjtGJ0YPRjiDQv9C+0LTRgdC60LDQt9C60YMg0LjRidC4INCyINGB0YLQsNGC0YzQtSBcIixcclxuICAgICAgICAgICAgICAgIFwiaHR0cDovL3B1bHNlLnJiYy5ydS8uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjdcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0Jgg0YLQsNC6LCDQvNC90LUg0L/RgNC40LPQvtC00LjRgtGB0Y8g0LrQvtC80L/RjNGO0YLQtdGALi4uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjhcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0KXQvC4uLiDQotGA0LXQsdGD0LXRgiDQv9Cw0YDQvtC70Ywg0L7RgiBXaUZpLCDRg9GC0L7Rh9C90Y4g0YMg0LrRg9GA0LDRgtC+0YDQsC5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8yOVxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQkCDQs9C00LUg0LzQvdC1INGD0LfQvdCw0YLRjCDQv9Cw0YDQvtC70Ywg0L4gV2ktRmk/XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzBcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCS0YHQtSDQv9GA0L7RgdGC0L4sINC90LDQudC00Lgg0YfQtdC70L7QstC10LrQsCwg0LrQvtGC0L7RgNGL0Lkg0LXQs9C+INC/0YDQuNC00YPQvNCw0LsuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzFcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JDQvdC00YDQtdC5LCDQv9GA0LjQstC10YIhINCc0L3QtSDQvdGD0LbQtdC9INC00L7RgdGC0YPQvyDQsiDQuNC90YLQtdGA0L3QtdGCINC4INGPIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvdC1INC30L3QsNGOINC/0LDRgNC+0LvRjCwg0LzQvdC1INCz0L7QstC+0YDQuNC70LgsINGH0YLQviDRgtGLINC10LPQviDQv9GA0LjQtNGD0LzQsNC7LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzMyXHJcbiAgICAgICAgICAgICAgICBcItCQ0L3QtNGA0LXQuTog0J/RgNC40LLQtdGCISDQotCw0Log0Lgg0LXRgdGC0YwuINCd0L4g0LXRgdC70Lgg0Y8g0L/RgNC+0YHRgtC+INC+0YLQstC10YfRgywg0LHRg9C00LXRgiBcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QtSDQuNC90YLQtdGA0LXRgdC90L4uINCc0Ysg0LLRgdC1INGA0LDQt9Cy0LjQstCw0LXQvNGB0Y8g0Lgg0L/QvtGN0YLQvtC80YMsINCy0L7RgiDQt9Cw0LTQsNC90LjQtSDQvtGCINC80LXQvdGPLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzMzXHJcbiAgICAgICAgICAgICAgICBcItCQ0L3QtNGA0LXQuTog0JLRgdC/0L7QvNC90Lgg0LjQu9C4INGD0LfQvdCw0Lkg0YTRgNCw0LfRgywg0LPQu9Cw0LLRiyDQoNC+0YHRgdC40LnRgdC60L7Qs9C+INGE0YPRgtCx0L7Qu9GM0L3QvtCz0L4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItGB0L7RjtC30LAg0JLQuNGC0LDQu9C40Y8g0JzRg9GC0LrQviwg0YHQutCw0LfQsNC90L3Rg9GOINC40LwgINC90LAg0LfQsNGB0LXQtNCw0L3QuNC4INC40YHQv9C+0LvQutC+0LzQsCDQpNCY0KTQkCBcIixcclxuICAgICAgICAgICAgICAgIFwi0LIgMjAxMCDQs9C+0LTRgyAtINGN0YLQviDQuCDQsdGD0LTQtdGCINC+0YLQstC10YIg0L3QsCDRgtCy0L7QuSDQstC+0L/RgNC+0YEuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzRcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JTQsC4uLiDQktGB0L/QvtC80L3QuNC7ISDQrdGC0L4gXFxcImxldG1lc3BlYWtmcm9tbXloZWFydFxcXCIuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzVcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0J/QvtGI0LXQuyDQsdGL0YHRgtGA0LXQuSDQuiDQutC+0LzQv9GM0Y7RgtC10YDRgy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8zNlxyXG4gICAgICAgICAgICAgICAgXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDQvdCwIFB1bHNlOiDQrdGC0L7RgiDRh9C10LvQvtCy0LXQuiDQvtGH0LXQvdGMINC70Y7QsdC40YIg0YHQv9C+0YDRgiwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC+0L0g0L7Rh9C10L3RjCDRgdC70LXQtNC40YIg0LfQsCDRgdCy0L7QuNC8INC30LTQvtGA0L7QstGM0LXQvCwg0LLQtdGB0Ywg0LXQs9C+INGA0LDRhtC40L7QvSBcIixcclxuICAgICAgICAgICAgICAgIFwi0YHQsdCw0LvQsNC90YHQuNGA0L7QstCw0L0sINGDINC90LXQs9C+INCy0YHQtSDRgdC40YHRgtC10LzQvdC+INC4INC/0L4g0YfQsNGB0LDQvC5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8zN1xyXG4gICAgICAgICAgICAgICAgXCLQpdCw0YDQuNGC0L7QvTog0KLRgNGD0LQg4oCUINC+0LHQu9Cw0LPQvtGA0LDQttC40LLQsNC10YIg0YfQtdC70L7QstC10LrQsC4g0JTQsNCy0LDQudGC0LUg0YHQutC+0YDQtdC1INC60LDRgtC40YLRjCFcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8zOFxyXG4gICAgICAgICAgICAgICAgXCIoPykg0J3Rg9C20L3QviDQstC10YDQvdGD0YLRjNGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8zOVxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0KLRiyDRhdC+0YDQvtGI0L4g0YHQv9GA0LDQstC70Y/QtdGI0YzRgdGPISDQm9GO0LHQuNGI0Ywg0YfQuNGC0LDRgtGMINC4INGA0LDQt9Cy0LjQstCw0YLRjNGB0Y8/IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQndCw0LnQtNC4INCx0LjQt9C90LXRgSDQttGD0YDQvdCw0Lsg4oCc0JbQsNC20LTQsOKAnSAsINCy0L7Qt9C80L7QttC90L4g0LIg0L3QtdC8INCx0YPQtNC10YIg0YfRgtC+LdGC0L4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItC40L3RgtC10YDQtdGB0L3QvtC1LiDQn9C+0YHQu9C10LTQvdC40Lkg0YDQsNC3INCy0LjQtNC10LvQsCDQtdCz0L4g0LIg0LHQuNCx0LvQuNC+0YLQtdC60LUuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDBcclxuICAgICAgICAgICAgICAgIFwi0JbRg9GA0L3QsNC7INCW0LDQttC00LA6INCh0L7QvtGB0L3QvtCy0LDRgtC10LvRjCBTa3llbmc6INCc0L7QtSDQs9C70LDQstC90L7QtSDRhdC+0LHQsdC4IOKAkyDQvNC+0Y8g0YDQsNCx0L7RgtCwLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YHQtdGA0YzQtdC30L3Qvi4g0J7QvdCwINC00LvRjyDQvNC10L3RjyDRgdC10LnRh9Cw0YEg0L3QsCDQv9C10YDQstC+0Lwg0LzQtdGB0YLQtS4g0JrRgNC+0LzQtSDRgtC+0LPQviwg0YPQstC70LXQutCw0LXRgiBcIixcclxuICAgICAgICAgICAgICAgIFwi0L/QvtGB0YLQvtGP0L3QvdC+0LUg0YDQsNC30LLQuNGC0LjQtSDigJMg0LrQsNC6INC80L7QtSDQu9C40YfQvdC+0LUsINGC0LDQuiDQuCBTa3llbmcuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDFcclxuICAgICAgICAgICAgICAgIFwi0JPQvtGI0LA6INCSINCx0LjQt9C90LXRgdC1LCDQutCw0Log0LIg0LvRjtCx0LLQuCDigJQg0YfQtdC8INCx0L7Qu9GM0YjQtSDQs9C+0LLQvtGA0LjRiNGMLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YLQtdC8INC60YDQtdC/0YfQtSDQvtGC0L3QvtGI0LXQvdC40Y8uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDJcclxuICAgICAgICAgICAgICAgIFwiKD8pINCd0YPQttC90L4g0LLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDNcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCl0L7RgNC+0YjQuNC5INGC0LXQvNC/IVwiIFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy80NFxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0K8g0L/RgNC+0YfQuNGC0LDQuyDQvtC00L3RgyDRgdGC0LDRgtGM0Y4g0L/RgNC+INCz0LDQtNCw0L3QuNC1INC90LAg0LrQvtGE0LXQudC90L7QuSDQs9GD0YnQtSwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC+0L3QviDQv9C+0L/Rg9C70Y/RgNC90L4g0LIg0L3QtdC60L7RgtC+0YDRi9GFINC60YDRg9Cz0LDRhS4g0JAg0YLRiyDQutC+0LPQtNCwINC/0LjQuyDQutC+0YTQtSBcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QuNGH0LXQs9C+INC90LUg0LfQsNC80LXRgtC40Lsg0L3QsCDRgdGC0LXQvdCw0YUg0LrRg9GF0L3QuD9cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy80NVxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQndC10YIsINC/0L7QudC00YMg0L/QvtGB0LzQvtGC0YDRjiDQstC90LjQvNCw0YLQtdC70YzQvdC10LkuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDZcclxuICAgICAgICAgICAgICAgIC8vXCLQndCw0LTQv9C40YHRjCDQvdCwINC00L7RgdC60LUuLi7Qs9C+0YLQvtCy0LjRgiDQstC60YPRgdC90LXQtSwg0YfQtdC8IDgwJSDQvNC+0YHQutC+0LLRgdC60LjRhSDQt9Cw0LLQtdC00LXQvdC40LlcIlxyXG4gICAgICAgICAgICAgICAgXCJcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy80N1xyXG4gICAgICAgICAgICAgICAgXCLQkNC70LXQutGB0LDQvdC00YA6INCX0LAg0LLRgdGRLCDRh9GC0L4g0YHQviDQvNC90L7QuSDQv9GA0L7QuNGB0YXQvtC00LjRgiwg0L7RgtCy0LXRh9Cw0Y4g0YLQvtC70YzQutC+INGPLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0LTQsNC20LUg0LXRgdC70Lgg0Y8g0L3QsCDRjdGC0L4g0L3QtSDQvNC+0LPRgyDQv9C+0LLQu9C40Y/RgtGMINC4INC90LUg0LzQvtCz0YMg0L/RgNC10LTQstC40LTQtdGC0YxcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy80OFxyXG4gICAgICAgICAgICAgICAgXCIoPykg0J3Rg9C20L3QviDQstC10YDQvdGD0YLRjNGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81MFxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0J/QvtGB0LvQtSDRgtC+0LPQviDQutCw0Log0L/QvtGP0LLQuNC70LjRgdGMINC60L7QvNC/0YzRjtGC0LXRgNGLLCDRjyDQv9C10YDQtdGB0YLQsNC7IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQv9C+0LvRjNC30L7QstCw0YLRjNGB0Y8g0YDQsNC00LjQviwg0YHQstC+0Lgg0L/Qu9C10LnQu9C40YHRgtGLINC4INCy0YHQtSDRgtCw0LrQvtC1Li4uIFwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzUxXHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQndC+INGB0LXQs9C+0LTQvdGPINC/0L7QstGC0L7RgCDRgNCw0LTQuNC+0L/RgNC+0LPRgNCw0LzQvNGLIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLCq9Cd0L7QstCw0Y8g0Y3QutC+0L3QvtC80LjQutCwLiDQodGC0YPQtNC10L3RgtGLwrssINC/0L7RgdC70YPRiNCw0LksINC80L7QttC10YIg0YLRiyDRg9C30L3QsNC10YjRjCwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGH0YLQvi3RgtC+LCDRh9GC0L4g0L/QvtC80L7QttC10YIg0YLQtdCx0LUg0LTQsNC70YzRiNC1LiDQntCx0YvRh9C90L4g0L7QvdC+INC70LXQttC40YIg0LIg0L/QtdGA0LXQs9C+0LLQvtGA0LrQtS5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81MlxyXG4gICAgICAgICAgICAgICAgXCLQoNCw0LTQuNC+OiDQn9GI0YjRiNGI0Ygg0L/QvtC80LXRhdC4INCyINGA0LDQtNC40L4uINC/0L7RgtC+0Lwg0LPQvtC70L7RgS4uLiDQstC+LdC/0LXRgNCy0YvRhSwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGDINC80LXQvdGPINC/0YDQvtC/0LDQu9C4INCy0YHRj9GH0LXRgdC60LjQtSDRhdC+0LHQsdC4LiDQodC10YDRjNGR0LfQvdC+LiDQldGB0LvQuCDQtNC+INGN0YLQvtCz0L4g0Y8gXCIsXHJcbiAgICAgICAgICAgICAgICBcItC30LDQvdC40LzQsNC70YHRjyDRgdCw0LzQsdC+LCDQt9Cw0L3QuNC80LDQu9GB0Y8g0YHQutCw0LvQvtC70LDQt9Cw0L3QuNC10LwuLi4g0L/RiNGI0YjRiNGI0YguXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTNcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JTQsCDRg9C2LCDRgSDRgtCw0LrQuNC8INGA0LDQtNC40L4g0LvRg9GH0YjQtSDQstGB0LUg0YLQsNC60Lgg0L/Qu9C10LnQu9C40YHRgtGLLi4uIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQviDRh9C10Lwg0YLQsNC8INCz0L7QstC+0YDQuNC70L7RgdGMLi4uINGB0LDQvNCx0L4g0Lgg0YHQutCw0LvQvtC70LDQt9Cw0L3QuNC1Li4uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTRcclxuICAgICAgICAgICAgICAgIFwi0JTQtdC90LjRgTog0K8g0LTRg9C80LDRjiwg0YfRgtC+INC10YHQu9C4INGC0Ysg0YHRgtGD0LTQtdC90YIsINC4INGC0Ysg0YXQvtGH0LXRiNGMLCDRh9GC0L7QsdGLINCyIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQsdGD0LTRg9GJ0LXQvCDRgyDRgtC10LHRjyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQsdGL0Lsg0YPRgdC/0LXRhSwg0YLQvtCz0LTQsCDQsdC10YDQuCDQvdCwINGB0LXQsdGPINGN0YLRgyBcIixcclxuICAgICAgICAgICAgICAgIFwi0L7RgtCy0LXRgtGB0YLQstC10L3QvdC+0YHRgtGMLCDQuNC00Lgg0YLRg9C00LAsINCz0LTQtSDRgtC10LHQtSDRgdC60LDQttGD0YI6IFwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU1XHJcbiAgICAgICAgICAgICAgICBcIsKr0K3RgtC+INGC0LLQvtGPINC30LDQtNCw0YfQsC4g0KLRiyDQtNC+0LvQttC10L0g0YEg0L3QtdC5INGB0L/RgNCw0LLQuNGC0YzRgdGPINC4INC/0L7RgtC+0Lwg0L/QvtC60LDQt9Cw0YLRjCwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGH0YLQviDQv9C+0LvRg9GH0LjQu9C+0YHRjMK7XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTZcclxuICAgICAgICAgICAgICAgIFwiKD8pINCd0YPQttC90L4g0LLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCi0Ysg0L/QvtC30L3QsNC60L7QvNC40LvRgdGPINC/0L7QsdC70LjQttC1INGBINC+0YHQvdC+0LLQsNGC0LXQu9GP0LzQuCBTa3llbmcg0Lgg0YLQtdC/0LXRgNGMIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvNC+0LbQtdGI0Ywg0YPQstC40LTQtdGC0Ywg0LjRhSDQuNGB0YLQvtGA0LjRjiwg0L3QsNGI0Lgg0YDQtdCx0Y/RgtCwINC30LDQv9C40YHQsNC70Lgg0LXQtSDQsiDQstC40LTQtdC+0YHRgtGD0LTQuNC4IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQuiBTa3llbmcgRGF5LiBcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81OFxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0JzQuNC90YPRgtC60YMuLi4g0KfRgtC+PyDQotC10LHRjyDRgdGA0L7Rh9C90L4g0LLRi9C30YvQstCw0LXRgiDQlNC10L3QuNGBINCh0LzQtdGC0L3QtdCyLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YHRgNC+0YfQvdC+INC40LTQuCDQuiDQvdC10LzRgyFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTlcclxuICAgICAgICAgICAgICAgIFwi0JTQtdC90LjRgTog0KMg0LzQtdC90Y8g0LXRgdGC0Ywg0LrQu9C40LXQvdGCINC90LAgMTk6MDAg0LIg0YfQtdGC0LLQtdGA0LMsINC90L4g0L3QtdGCINC/0YDQtdC/0L7QtNCw0LLQsNGC0LXQu9GPISBcIixcclxuICAgICAgICAgICAgICAgIFwi0JrRgtC+LdGC0L4g0L/QvtGB0YLQsNCy0LjQuyDQtdCz0L4g0LIg0YDQsNGB0L/QuNGB0LDQvdC40LUsINGF0L7RgtGPINCy0YHQtSDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YHQvtCz0LvQsNGB0L7QstCw0L3Qvi4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItCt0YLQviDQvdC1INC/0LXRgNCy0LDRjyDRgdGC0YDQsNC90L3QvtGB0YLRjCDQt9CwINC/0L7RgdC70LXQtNC90LXQtSDQstGA0LXQvNGPLi4uINC90YMg0Y3RgtC+INC/0L7RgtC+0LwuIFwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzYwXHJcbiAgICAgICAgICAgICAgICBcItCU0LXQvdC40YE6INCd0LDQudC00Lgg0JPQvtGI0YMsINC+0L0g0YHQvNC+0LbQtdGCINC/0L7QvNC+0YfRjCDRgNC10YjQuNGC0Ywg0Y3RgtC+0YIg0LLQvtC/0YDQvtGBIVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82MVxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQlNC10L3QuNGB0YMg0YHRgNC+0YfQvdC+INC90YPQttC10L0g0L/RgNC10L/QvtC00LDQstCw0YLQtdC70Ywg0LIg0YfQtdGC0LLQtdGA0LMgMTkuMDAsINGH0YLQviDQvNC+0LbQvdC+IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgdC00LXQu9Cw0YLRjD9cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNjJcclxuICAgICAgICAgICAgICAgIFwi0JPQvtGI0LA6INCT0LvQsNCy0L3QvtC1INGA0LDQsdC+0YLQsNGC0YwsINCwINC90LUg0YHRgtC+0Y/RgtGMINC90LAg0LzQtdGB0YLQtS4g0JPQtNC1INGC0LDQvCDQvNC+0Lkg0YHQv9C40YHQvtC6INC40LcgXCIsXHJcbiAgICAgICAgICAgICAgICBcIkhlYWRIdW50ZXIuLi4g0JLRgdC1INCz0L7RgtC+0LLQvi4gQ9C60LDQttC4INCU0LXQvdC40YHRgyDQuCDQv9GA0L7QtNC+0LvQttCw0Lkg0YDQsNCx0L7RgtCw0YLRjFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82M1xyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQk9C+0YjQsCDQvdCw0YjQtdC7INC/0YDQtdC/0L7QtNCw0LLQsNGC0LXQu9GPLCDQstGB0LUg0LIg0L/QvtGA0Y/QtNC60LVcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNjRcclxuICAgICAgICAgICAgICAgIFwi0JTQtdC90LhjOiDQntGC0LvQuNGH0L3Qvi4g0JPQtNC1INGC0LDQvCDQvNC+0Lkg0LHQu9C+0LrQvdC+0YIuLi4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzY1XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCS0LjQtNC40LzQviDRjyDQt9C00LXRgdGMINCx0L7Qu9GM0YjQtSDQvdC1INC90YPQttC10L0g0Lgg0L/QvtGA0LAg0LLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvtC9INGH0YLQvi3RgtC+INCz0L7QstC+0YDQuNC7INC/0YDQviDQt9Cw0L/QuNGB0YwuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzY2XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCvINCy0YvQv9C+0LvQvdC40Lsg0LfQsNC00LDQvdC40LUg0JTQtdC90LjRgdCwLCDRgtGLINCz0L7QstC+0YDQuNC7INC+INC30LDQv9C40YHQuC4uLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82N1xyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0JTQsCwg0YLRiyDRgtC10L/QtdGA0Ywg0LzQvtC20LXRiNGMINC/0L7RgdC80L7RgtGA0LXRgtGMINC10LUuINCY0LTQuCDQsiDQstC40LTQtdC+0YHRgtGD0LTQuNGOLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0Y8g0L/RgNC10LTRg9C/0YDQtdC00LjQuyDQvdCw0YHRh9C10YIg0YLQtdCx0Y8g0KHRgtC10L/QsNC90LAuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzY4XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCf0YDQuNCy0LXRgiwg0KHRgtC10L/QsNC9IVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82OVxyXG4gICAgICAgICAgICAgICAgXCLQodGC0LXQv9CwOiDQmtGD0LTQsCDQttC1INC/0L7QtNC10LLQsNC70LDRgdGMINGN0YLQsCDQutCw0YHRgdC10YLQsD8g0K8g0LLRgdC10LPQtNCwINC/0YDQvtGI0YMg0L3QtSDRgtGA0L7Qs9Cw0YLRjCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YfRg9C20LjQtSDQstC10YnQuCFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzBcclxuICAgICAgICAgICAgICAgIFwiKD8pINCS0L7Qt9C80L7QttC90L4sINC10LUg0YHQv9GA0Y/RgtCw0LvQuCDQuNC70Lgg0YPQutGA0LDQu9C4LiDQoNCw0LfQsdC10YDQuNGB0Ywg0LIg0YfQtdC8INC00LXQu9C+LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83MVxyXG4gICAgICAgICAgICAgICAgXCLQmCDRgtC+0LvRjNC60L4g0YHQtdC50YfQsNGBINGPINCy0YHQv9C+0LzQvdC40Lsg0L/RgNC+INGB0LvRg9GF0LgsINC60L7RgtC+0YDRi9C1INGB0LvRi9GI0LDQuyDQsiDQutC+0YDQuNC00L7RgNCw0YUsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRh9GC0L4g0LPQtNC1LdGC0L4g0LIg0LrQvtC80L/QsNC90LjQuCDRhdC+0LTQuNGCINC60L7QvdC60YPRgNC10L3RgiDQuCDQstGB0LXQvCDQvtGB0LvQvtC20L3Rj9C10YIg0LbQuNC30L3RjC4g0J3Rg9C20L3QviBcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QsNC50YLQuCDQtdCz0L4g0LLQviDRh9GC0L7QsdGLINGC0L4g0L3QuCDRgdGC0LDQu9C+IVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83MlxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQodGC0LXQv9Cw0L0sINGC0Ysg0LzQvtC20LXRiNGMINC/0L7QtNGB0LrQsNC30LDRgtGMLCDRgyDRgtC10LHRjyDQtdGB0YLRjCDQtNC+0LPQsNC00LrQuCDQutGC0L4g0LzQvtCzIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQstC30Y/RgtGMINC60LDRgdGB0LXRgtGDP1wiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83M1xyXG4gICAgICAgICAgICAgICAgXCLQodGC0LXQv9Cw0L06INCU0LDQttC1INC90LUg0LfQvdCw0Y4uLi4g0KMg0L3QsNGBINCy0LXQtNC10YLRgdGPINC20YPRgNC90LDQuyDQutGC0L4g0LrQvtCz0LTQsCDRgdC90LjQvNCw0LXRgiDRgdGC0YPQtNC40Y4uIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQntC9INGDINCQ0L3QuNGB0Ysg0JrQuNGP0LzQvtCy0L7QuSwg0LzQvtC20LXRiNGMINC90LDRh9Cw0YLRjCDRgSDRjdGC0L7Qs9C+Li4uXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzc0XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCU0YPQvNCw0Y4g0Y3RgtC+INGC0L4g0YfRgtC+INC90LDQtNC+LCDRgdC/0LDRgdC40LHQviFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzVcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0J/RgNC40LLQtdGCLCDQkNC90LjRgdCwISDQodGC0LXQv9Cw0L0g0YHQutCw0LfQsNC7LCDRh9GC0L4g0YMg0YLQtdCx0Y8g0LbRg9GA0L3QsNC7INC60YPQtNCwINCy0YHQtSBcIixcclxuICAgICAgICAgICAgICAgIFwi0LfQsNC/0LjRgdGL0LLQsNGO0YLRgdGPLCDRh9GC0L7QsdGLINGB0L3Rj9GC0Ywg0YHRgtGD0LTQuNGOLiDQnNC+0LbQvdC+INCy0LfQs9C70Y/QvdGD0YLRjCDQvdCwINC90LXQs9C+P1wiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83NlxyXG4gICAgICAgICAgICAgICAgXCLQkNC90LjRgdCwOiDQn9GA0LjQstC10YIhINCvINC90LUg0LfQvdCw0LrQvtC80LAg0YEg0YLQvtCx0L7QuSwg0L7Rh9C10L3RjCDQvNC90L7Qs9C+INCy0LXRidC10Lkg0LIg0L/QvtGB0LvQtdC00L3QtdC1IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQstGA0LXQvNGPINC/0L7Qv9Cw0LTQsNC10YIg0L3QtSDQsiDRgtC1INGA0YPQutC4LiDQoNCw0YHRgdC60LDQttC4INC+INC80LjRgdGB0LjQuCDQutC+0LzQv9Cw0L3QuNC4LCDRgtC+0LvRjNC60L4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0YDQtdC00LDQvdC90YvQuSDQtNC10LvRgyDRh9C10LvQvtCy0LXQuiDQt9C90LDQtdGCINC10LUg0L3QsNC40LfRg9GB0YLRjC5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzdcclxuICAgICAgICAgICAgICAgIFwiKD8pINCd0LAg0YHRgtC+0LvQtSDQu9C10LbQuNGCINC20YPRgNC90LDQuywg0L3QviDQkNC90LjRgdCwINC90LUg0LTQvtCy0LXRgNGP0LXRgiDRgtC10LHQtSDRgtCw0Log0LrQsNC6INCy0LjQtNC40YIg0LLQv9C10YDQstGL0LUsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvtC90LAg0L/RgNC+0YHQuNGCINC/0L7QtNGC0LLQtdGA0LTQuNGC0Ywg0YLQtdCx0Y8sINGH0YLQviDRgtGLINGB0L7RgtGA0YPQtNC90LjQuiDRgdC60LDQtdC90LMg0Lgg0YDQsNGB0YHQutCw0LfQsNGC0Ywg0LXQuSBcIixcclxuICAgICAgICAgICAgICAgIFwi0LzQuNGB0YHQuNGOINC60L7QvNC/0LDQvdC40LgsINGC0LDQuiDQutCw0Log0LrQvtC90LrRg9GA0LXQvdGCINC10LUg0YLQvtGH0L3QviDQvdC1INC30L3QsNC10YIuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzc4XHJcbiAgICAgICAgICAgICAgICBcItCvINCy0LjQtNC10Lsg0L3QsNC00L/QuNGB0Lgg0L3QsCDRgdGC0LXQvdCw0YUg0LIg0LvQsNGD0L3QttC1LCDQstC+0LfQvNC+0LbQvdC+INC+0LTQvdCwINC40Lcg0L3QuNGFINGN0YLQviDRgtC+LCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YfRgtC+INC80L3QtSDQvdGD0LbQvdC+LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83OVxyXG4gICAgICAgICAgICAgICAgXCLQlNC10LvQsNC10Lwg0YDQsNC30LLQuNGC0LjQtSDQv9GA0LjQstC70LXQutCw0YLQtdC70YzQvdGL0LwuIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQn9GA0LjQstC+0LTQuNC8INC6INGA0LXQt9GD0LvRjNGC0LDRgtCw0LwsINC60L7RgtC+0YDRi9C80Lgg0YXQvtGH0LXRgtGB0Y8g0LPQvtGA0LTQuNGC0YzRgdGPLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83OVxyXG4gICAgICAgICAgICAgICAgXCIoISkg0J3Rg9C20L3QviDQstC10YDQvdGD0YLRjNGB0Y8g0Log0JDQvdC40YHQtS5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vODBcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JDQvdC40YHQsCwg0Y8g0YPQt9C90LDQuyDQvNC40YHRgdC40Y4g0LrQvtC80L/QsNC90LjQuC4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzgxXHJcbiAgICAgICAgICAgICAgICBcItCQ0L3QuNGB0LA6INCl0L7RgNC+0YjQviwg0L7QvSDQvdCwINGB0YLQvtC70LUsINC80L7QttC10YjRjCDQtdCz0L4g0LLQt9GP0YLRjC5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vODJcclxuICAgICAgICAgICAgICAgIFwi0JbRg9GA0L3QsNC7OiAzLdC1INC/0L7RgdC70LXQtNC90LjRhSwg0LrRgtC+INCx0YDQsNC7INC60LvRjtGHOlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84M1xyXG4gICAgICAgICAgICAgICAgXCLQktC40YLQsCDQkdCw0YDRi9GI0L3QuNC60L7QstCwIDE2LjAwIC0gMTguMDBcIixcclxuICAgICAgICAgICAgICAgIFwi0JrQvtGB0YLRjyDQl9Cw0LzRg9GA0LXQvdC60L4gMTQuMDAgLSAxNS4zMFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQodCw0YjQsCDQmtC+0L3QvtC90LXQvdC60L4gMTEuMDAgLSAxMy4wMFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84NFxyXG4gICAgICAgICAgICAgICAgXCLQktC10YDQvtGP0YLQvdC+INC90YPQttC90L4g0L/QvtCz0L7QstC+0YDQuNGC0Ywg0YEg0LrQsNC20LTRi9C8INC40Lcg0L3QuNGFINC4INGB0L3QsNGH0LDQu9CwINGPINC/0L7QudC00YMg0Log0JLQuNGC0LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcItCR0LDRgNGL0YjQvdC40LrQvtCy0L7QuSwg0YLQsNC6INC60LDQuiDQvtC90LAg0LHRi9C70LAg0L/QvtGB0LvQtdC00L3QtdC5INCyINGC0L7RgiDQtNC10L3RjCDQuCDRg9C30L3QsNGOIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQstC40LTQtdC70LAg0LvQuCDQvtC90LAg0LrQsNGB0YHQtdGC0YNcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vODVcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JLQuNGC0LAsINC/0YDQuNCy0LXRgiEg0JLQuNC00LXQuyDRgtCy0L7QuCDQstC40LTQtdC+INC+IFNreW5nIEhvbWUsINC+0L3QuCDQv9GA0L7RgdGC0L4g0YHRg9C/0LXRgC4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItCc0L3QtSDQvdGD0LbQvdCwINGC0LLQvtGPINC/0L7QvNC+0YnRjCwg0L/RgNC+0L/QsNC70LAg0LrQsNGB0YHQtdGC0LAg0YEg0LfQsNC/0LjRgdGP0LzQuCDQuNGB0YLQvtGA0LjQuCBcIixcclxuICAgICAgICAgICAgICAgIFwi0L7RgdC90L7QstCw0YLQtdC70LXQuSwg0LzQvtC20LXRgiDRgtGLINCy0LjQtNC10LvQsCDQtdC1P1wiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84NlxyXG4gICAgICAgICAgICAgICAgXCLQktC40YLQsDog0JLQvtGDLCDQv9C+0LvQtdCz0YfQtSA9KSDQn9GA0LjQstC10YIhINCa0L7QvdC10YfQvdC+INC/0L7QvNC+0LPRgy4g0JfQvdCw0Y4sINGH0YLQviDRgtGLINGD0LbQtSBcIixcclxuICAgICAgICAgICAgICAgIFwi0L/QvtC30L3QsNC60L7QvNC40LvRgdGPINGBINC+0YHQvdC+0LLQsNGC0LXQu9GP0LzQuCDQuCDQvNC40YHRgdC40LXQuSDQutC+0LzQv9Cw0L3QuNC4LCDQvdC+INGN0YLQviDQtdGJ0LUg0L3QtSDQstGB0LUuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzg3XHJcbiAgICAgICAgICAgICAgICBcItCi0LXQsdC1INC90YPQttC90L4g0LjQt9GD0YfQuNGC0Ywg0LXQtSDQv9GA0LjQvdGG0LjQv9GLLCDQvtC90Lgg0LfQsNC/0LjRgdCw0L3RiyDQsiDQvNC+0LXQvCDQsdC70L7QutC90L7RgtC1LCDQvdC+INGPIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQt9Cw0LHRi9C70LAg0LXQs9C+INCyINC+0LTQvdC+0Lkg0LjQtyDQv9C10YDQtdCz0L7QstC+0YDQvtC6LCDQuNC30YPRh9C4INC40YUg0Lgg0L7RgtCy0LXRgtGMINC90LAg0LzQvtC4INCy0L7Qv9GA0L7RgdGLIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQviDRiNC60L7Qu9C1LCDRgtC+0LPQtNCwINGPINC+0YLQstC10YfRgyDQvdCwINGC0LLQvtC4ID0pXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzg4XHJcbiAgICAgICAgICAgICAgICBcItCe0LTQvdCw0LbQtNGLLCDQsiDRhNC10LLRgNCw0LvRjNGB0LrRg9GOINGB0YPQsdCx0L7RgtGDIDIwMTnQsywg0LzRiyDRgdC+0LHRgNCw0LvQuNGB0Ywg0LIg0L7RhNC40YHQtSDQuCDQvtCx0YHRg9C00LjQu9C4LFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRh9GC0L4g0L/RgNC40LLQtdC70L4g0L3QsNGBINC6INGC0LXQutGD0YnQtdC5INGC0L7Rh9C60LUg0YDQsNC30LLQuNGC0LjRjy4g0J/RgNC+0LDQvdCw0LvQuNC30LjRgNC+0LLQsNC70LgsINGH0YLQviDQv9C+0LfQstC+0LvRj9C10YJcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QsNC8INGA0LDQt9Cy0LjQstCw0YLRjNGB0Y8g0YLQsNC60LjQvNC4INGC0LXQvNC/0LDQvNC4LiDQmCDRgdGE0L7RgNC80YPQu9C40YDQvtCy0LDQu9C4INC90LDRiNC4INC/0YDQuNC90YbQuNC/0Ysg0YDQsNCx0L7RgtGLLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84OVxyXG4gICAgICAgICAgICAgICAgXCIxLiDQodC+0YXRgNCw0L3Rj9C10Lwg0LXQtNC40L3RgdGC0LLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCIyLiDQntCx0LXRgdC/0LXRh9C40LLQsNC10Lwg0L/RgNC+0LfRgNCw0YfQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIjMuINCS0L7RgdC/0LjRgtGL0LLQsNC10Lwg0YHQsNC80L7RhdC+0LTQvdC+0YHRgtGMXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vOTBcclxuICAgICAgICAgICAgICAgIFwiNC4g0KbQtdC90LjQvCBmdWxsIHN0YWNrXCIsXHJcbiAgICAgICAgICAgICAgICBcIjUuINCU0LDQtdC8INGH0LXRgdGC0L3Rg9GOINC+0LHRgNCw0YLQvdGD0Y4g0YHQstGP0LfRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCI2LiDQoNGD0LrQvtCy0L7QtNGB0YLQstGD0LXQvNGB0Y8g0L/QvtC70YzQt9C+0LlcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwiNy4g0J3QsNC90LjQvNCw0LXQvCDQu9GO0LTQtdC5INGB0LjQu9GM0L3QtdC1INGB0LXQsdGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIjguINCh0YfQuNGC0LDQtdC8INCy0YHRkSwg0YfQtdC8INGD0L/RgNCw0LLQu9GP0LXQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCI5LiDQodGC0LDQstC40Lwg0LLRi9GB0L7QutGD0Y4g0L/Qu9Cw0L3QutGDXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIjEwLiDQlNC10YDQttC40Lwg0YHQutC+0YDQvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCIxMS4g0J/QvtGB0YLQvtGP0L3QvdC+INC+0LHQvNC10L3QuNCy0LDQtdC80YHRjyDQvtC/0YvRgtC+0LxcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JzQvdC1INC90YPQttC90L4g0LLQtdGA0L3Rg9GC0YHRjyDQuiDQktC40YLQtSwg0YfRgtC+0LHRiyDQvtGC0LLQtdGC0LjRgtGMINC90LAg0LXRkSDQstC+0L/RgNC+0YHRiy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0K8g0L3QsNGI0LXQuyDQtdCz0L4sINCy0LXRgNC+0Y/RgtC90L4g0YLRiyDQt9Cw0LHRi9C70LAg0LIg0L7QtNC90L7QuSDQuNC3INC/0LXRgNC10LPQvtCy0L7RgNC+0LouXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCS0LjRgtCwOiDQlNCwLi4uINCi0LDQuiDQuCDQtdGB0YLRjC4uLiDQntGH0LXQvdGMINC80L3QvtCz0L4g0YDQsNCx0L7RgtGLINC4INGB0L7QstGB0LXQvCDQt9Cw0LzQvtGC0LDQu9Cw0YHRjC4uLiBcIixcclxuICAgICAgICAgICAgICAgIFwi0J3RgyDRh9GC0L4g0LYsINC/0YDQuNGB0YLRg9C/0LjQvC4g0KLQtdC/0LXRgNGMINC/0YDQvtCy0LXRgNC40LwsINGH0YLQviDRgtGLINGD0LbQtSDQt9C90LDQtdGI0Ywg0L4g0LrQvtC80L/QsNC90LjQuC5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQvtCz0LTQsCDQvdCw0YfQsNC70LAg0YHQstC+0LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40LUg0YjQutC+0LvQsD9cIixcclxuICAgICAgICAgICAgICAgIFwiMSkgMTYg0YTQtdCy0YDQsNC70Y8gMTk5MCwgMikgMjIg0LzQsNGPIDE5ODlcIixcclxuICAgICAgICAgICAgICAgIFwiMykg0LDQstCz0YPRgdGCIDIwMTIsIDQpIDI0INCw0LLQs9GD0YHRgtCwIDE5NzEuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0KHQutC+0LvRjNC60L4g0YPRh9C40YLQtdC70LXQuSDQsiBTa3llbmc/XCIsXHJcbiAgICAgICAgICAgICAgICBcIjEpINCU0YPQvNCw0Y4gMTAg0YLQvtGH0L3QviDQtdGB0YLRjCwgMikgNTAg0LLQv9C+0LvQvdC1INC00L7RgdGC0LDRgtC+0YfQvdC+LCBcIixcclxuICAgICAgICAgICAgICAgIFwiMykgMTAwIC0g0YPQstC10YDQtdC9INGN0YLQviDQsdC+0LvRjNGI0LUg0YfQtdC8INGDINC60L7QvdC60YPRgNC10L3RgtC+0LIsIDQpIDcyMTAuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0KHQutC+0LvRjNC60L4g0YPRh9C10L3QuNC60L7QsiDQsiBTa3llbmc/XCIsXHJcbiAgICAgICAgICAgICAgICBcIjEpINCS0JjQnywg0LTQsNC5INCR0L7QsyDQtdC80YMg0LfQtNC+0YDQvtCy0YzRjyEsIDIpINCh0L/QsNGB0LjQsdC+INGD0YfQuNGC0LXQu9GP0LwsINGH0YLQviDQv9GA0LjQstC+0LTRj9GCIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgdCy0L7QuNGFINGA0L7QtNC90YvRhSwgMykgNzI3MDAsIDQpINCV0YHQu9C4INC/0L7RgdGH0LjRgtCw0YLRjCDQstGB0LXRhSDQutGC0L4g0YDQsNCx0L7RgtCw0LXRgiDQsiBHb29nbGUuLi5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtCw0Log0L/RgNC+0YXQvtC00Y/RgiDQt9Cw0L3Rj9GC0LjRjyDQsiBTa3llbmc/XCIsXHJcbiAgICAgICAgICAgICAgICBcIjEpINCd0LAg0YPQvdC40LrQsNC70YzQvdC+0Lkg0L/Qu9Cw0YLRhNC+0YDQvNC1IFZpbWJveCwgMikg0KPRh9C40YLQtdC70Y8g0LLRi9C10LfQttCw0Y7RgiDQvdCwINC00L7QvCwgXCIsXHJcbiAgICAgICAgICAgICAgICBcIjMp0JIg0JrRgNC10LzQu9C1LDQp0JLRh9C10YDQsCDRgNCw0LfQvtGB0LvQsNC70Lgg0YHQutCw0L3RiyDRg9GH0LXQsdC90LjQutCwLCDRgdC10LPQvtC00L3RjyDQsiDRgdC60LDQudC/0LUg0L/QvtC/0YDQvtCx0YPQtdC8LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0LDQuiDRg9GH0LDRgiDRgdC70L7QstCwINCyIFNreWVuZz9cIixcclxuICAgICAgICAgICAgICAgIFwiMSkg0JPQvtGI0LAg0LfQstC+0L3QuNGCINGD0YfQtdC90LjQutCw0Lwg0Lgg0L7Qv9GA0LDRiNC40LLQsNC10YIg0LjRhSwgMikg0LLQviDRgdC90LUsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCIzKSDQn9GA0LjQu9C+0LbQtdC90LjQtSBTa3llbmcsIDQpINCj0YfQtdC90LjQutC4INC/0LjRiNGD0YIg0LrQsNC20LTQvtC1INGB0LvQvtCy0L4gMTAwINGA0LDQty5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtCw0LrQvtCy0LAg0YbQtdC70Ywg0L/QviDQstGL0YDRg9GH0LrQtSDQutC+0LzQv9Cw0L3QuNC4INCyIDIwMTkg0LPQvtC00YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcIjEpINCj0LLQtdC70LjRh9C40YLRjCDQstGL0YDRg9GH0LrRgyDQutC+0LzQv9Cw0L3QuNC4INC00L4gNCAzOTIsMiDQvNC70L0uINGA0YPQsS4gXCIsXHJcbiAgICAgICAgICAgICAgICBcIijQv9C70LDQvSBFeGNlbGxlbnQgNCA3MDAg0LzQu9C9LiDRgC4pLCAyKSDQvdC10YIg0YbQtdC70LgsIDMpINC4INGC0LDQuiDRgdC+0LnQtNC10YJcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0LPQviDQsdC70LDQs9C+0LTQsNGA0LjRgtGMINC30LAgU2t5ZW5nP1wiLFxyXG4gICAgICAgICAgICAgICAgXCIxKSDRg9GH0LjRgtC10LvRjyDQuNC3INCn0YPQstCw0YjQuNC4LCAyKSDQkNC90LPQu9C40YfQsNC9LCAzKSDQkNC80LXRgNC40LrQsNC90YbQtdCyLCBcIixcclxuICAgICAgICAgICAgICAgIFwiNCkg0L7RgdC90L7QstCw0YLQtdC70LXQuSBTa3llbmcgKNCT0LXQvtGA0LPQuNC5LCDQkNC70LXQutGB0LDQvdC00YAsINCl0LDRgNC40YLQvtC9LCDQlNC10L3QuNGBLCDQkNC90LTRgNC10LkpXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JLQuNGC0LA6INCi0Ysg0LTQtdC70LDQtdGI0Ywg0YPRgdC/0LXRhdC4ISDQndCw0YHRh9C10YIg0LrQsNGB0YHQtdGC0YsuLi4g0J3QtdGCINC10LUg0L3QtSDQsdGL0LvQviwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC60L7Qs9C00LAg0Y8g0L/RgNC40YjQu9CwLiDQktC10YDQvtGP0YLQvdC+LCDQutGC0L4t0YLQviDQtNGA0YPQs9C+0Lkg0LLQt9GP0Lsg0LXQtS4uLiBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0KHQv9Cw0YHQuNCx0L4g0YLQtdCx0LUhINCYINC/0LXRgNC10LTQvtGF0L3QuCA9KVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQktC40YLQsDog0JvRg9GH0YjQuNC5INGB0L/QvtGB0L7QsSDQvtGC0LTQvtGF0L3Rg9GC0YwgLSDQstC30Y/RgtGM0YHRjyDQt9CwINC40L3RgtC10YDQtdGB0L3Rg9GOIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQt9Cw0LTQsNGH0LrRgyA9KSDQn9C+0LPQvdCw0LvQuCFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwiKCEpINCi0LXQv9C10YDRjCDQvNC+0LbQvdC+INC40LTRgtC4INC6INCa0L7RgdGC0LUg0L7QvSDRgdC70LXQtNGD0Y7RidC40Lkg0LIg0YHQv9C40YHQutC1LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xMDZcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JrQvtGB0YLRjywg0L/RgNC40LLQtdGCIVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0YHRgtGPOiDQn9GA0LjQstC10YIuINCh0LvRi9GI0LDQuyDQutCw0Log0YLRiyDQv9C+0LzQvtCzINCU0LXQvdC40YHRgywg0YLRiyDQsdC+0LvRjNGI0L7QuSDQvNC+0LvQvtC00LXRhiwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGC0LDQuiDQtNC10YDQttCw0YLRjCFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0KHQv9Cw0YHQuNCx0L4gPSkg0KHRgtCw0YDQsNGO0YHRjC4g0JzQvdC1INC+0YfQtdC90Ywg0L3Rg9C20L3QsCDRgtCy0L7RjyDQv9C+0LzQvtGJ0YwuIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQmtGC0L4t0YLQviDQstC30Y/QuyDQutCw0YHRgdC10YLRgyDQuNC3INCy0LjQtNC10L7QutC+0LzQvdCw0YLRiywg0LzQvtC20LXRgiDRgtGLINCy0LjQtNC10LsuLi4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0L7RgdGC0Y86INCe0LPQviwg0YPQttC1INCx0YvQuyDQsiDQstC40LTQtdC+0YHRgtGD0LTQuNC4ID0pINCS0LjQttGDLCDRh9GC0L4g0L7RgdCy0LDQuNCy0LDQtdGI0YzRgdGPIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQuCDQvNC90L7Qs9C+0LUg0YPQt9C90LDQuyDQt9CwINGN0YLQvtGCINC00LXQvdGMLiDQldGB0LvQuCDRg9Cz0LDQtNCw0LXRiNGMLCDRh9GC0L4g0LHQvtC70YzRiNC1INCy0YHQtdCz0L4g0Y8gXCIsXHJcbiAgICAgICAgICAgICAgICBcIlxcXCLQu9GO0LHQu9GOXFxcIiDQsiDQvdCw0YjQtdC5INGB0YLRgNCw0L3QtSwg0YLQviDQvtGC0LLQtdGH0YMg0LrRgtC+INCx0YDQsNC7INC60LDRgdGB0LXRgtGDLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQntC90LAg0L7RgtC/0YDQsNCy0LjRgiDQsdC10Lcg0YLRgNGD0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQkiDQu9GO0LHRi9C1INGB0YLRgNCw0L3Riywg0LPQvtGA0L7QtNCwLlwiLFxyXG4gICAgICAgICAgICAgICAgXCLQodC70L7QstCwLCDRgdGC0LjRhdC4LCDQv9C+0LTQsNGA0LrQuFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQuCDQutGA0LDRgdC+0YfQvdGL0LUg0LzQsNGA0LrQuC5cIixcclxuICAgICAgICAgICAgICAgIFwi0JLRgdC10LPQtNCwINCy0YHQtSDQstC+0LLRgNC10LzRjyDQtNC+0YHRgtCw0LLQuNGCXCIsXHJcbiAgICAgICAgICAgICAgICBcItCV0Lkg0JrQvtGB0YLRjyDQvtGH0LXQvdGMINC00L7QstC10YDRj9C10YJcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0Jgg0LbQtNGD0YIg0LXQtSDQstGB0LUsINC60LDQuiDQnNC40YHRgdC40LhcIixcclxuICAgICAgICAgICAgICAgIFwi0JvRjtCx0LjQvNCw0Y8g0L3QsNGI0LAgLi4uINCg0L7RgdGB0LjQuCFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0KLQsNC6INGN0YLQviDQttC1INC90LDRiNCwINC70Y7QsdC40LzQsNGPINCf0L7Rh9GC0LAg0KDQvtGB0YHQuNC4LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0YHRgtGPOiDQlNCwLCDRgtGLINC+0YLQstC10YLQuNC7INCy0LXRgNC90L4uLi4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0L7RgdGC0Y86INCR0L7Qu9GM0YjQtSDQvNC10YHRj9GG0LAg0J/QvtGH0YLQsCDQoNC+0YHRgdC40Lgg0LzQvtGA0L7Qt9C40LvQsCDQvNC+0Y4g0L/QvtGB0YvQu9C60YMsINC4INCyIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQutC+0L3RhtC1INC60L7QvdGG0L7QsiDQsdC10Lcg0L7QsdGK0Y/RgdC90LXQvdC40Y8g0L/RgNC40YfQuNC9INC+0YLQv9GA0LDQstC70Y/QtdGCINC10ZEg0L7QsdGA0LDRgtC90L4uIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQndC40LrQsNC60LjRhSDRg9Cy0LXQtNC+0LzQu9C10L3QuNC5LCDRgdC+0L7QsdGJ0LXQvdC40LksINC30LLQvtC90LrQvtCyLiBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQvtGB0YLRjzog0J3QtSDQv9C10YDQstGL0Lkg0YDQsNC3INC+0L3QuCDRhNCw0LrQsNC/0Y/Rgiwg0L3QviDQutCw0LbQtNGL0Lkg0YDQsNC3INGPIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvdCwINGH0YLQvi3RgtC+INC90LDQtNC10Y7RgdGMXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0L7RgdGC0Y86INCQ0YUg0LTQsC4uLiDQotCy0L7QuSDQstC+0L/RgNC+0YEuLi4g0JrQvtC90LXRh9C90L4sINGPINCy0LjQtNC10LssINC60YLQviDQstC30Y/QuyBcIixcclxuICAgICAgICAgICAgICAgIFwi0LrQsNGB0YHQtdGC0YMuINCf0LXRgNC10LQg0YLQtdC8INC60LDQuiDRjyDQvdCw0YfQsNC7INC/0L7QtNCz0L7RgtC+0LLQutGDINC6INGB0YrQtdC80LrQtSwg0LjQtyBcIixcclxuICAgICAgICAgICAgICAgIFwi0LrQvtC80L3QsNGC0Ysg0LLRi9GF0L7QtNC40LvQsCDQodCw0YjQsCDQmtC+0L3QvtC90LXQvdC60L4g0Lgg0L3QtdGB0LvQsCDQtdC1INCy0YDRg9C60LDRhS4g0KPRgtC+0YfQvdC4INGDINC90LXQtS5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0J7RgtC70LjRh9C90L4hINCi0LXQv9C10YDRjCDRjyDRgtC+0YfQvdC+INC/0L7Qu9GD0YfRgyDQvtGC0LLQtdGCLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xMTlcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0KHQsNGI0LAg0L/RgNC40LLQtdGCISDQmtC+0YHRgtGPINGB0LrQsNC30LDQuywg0YfRgtC+INGD0YXQvtC00Y8g0YLRiyDQt9Cw0LHQuNGA0LDQu9CwIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQutCw0YHRgdC10YLRgyDRgSDQstC40LTQtdC+LdC40YHRgtC+0YDQuNC10Lkg0L7RgdC90L7QstCw0YLQtdC70LXQuS4g0JzQvtC20L3QviDQtdC1INC/0L7RgdC80L7RgtGA0LXRgtGMLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQodCw0YjQsDog0J/RgNC40LLQtdGCISDQmtC+0L3QtdGH0L3Qviwg0L3QviDQuCDRgtGLINC/0L7QvNC+0LPQuCDQvNC90LUuINCc0Ysg0LrQvtC80LDQvdC00L7QuSBcIixcclxuICAgICAgICAgICAgICAgIFwiU2t5ZW5nINC/0LjRgdCw0LvQuCDRhtC10L3QvdC+0YHRgtC4INC60L7QvNC/0LDQvdC40Lgg0L3QsCDQutGD0YXQvdC1INC4INC30LDQsdGL0LvQuCDQt9Cw0LHRgNCw0YLRjCwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0YDQuNC90LXRgdC4INC80L3QtSDRgdC/0LjRgdC+0LosINCwINGPINC/0L7QutCwINC90LDQudC00YMg0LrQsNGB0YHQtdGC0YMuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCl0L7RgNC+0YjQviwg0YHQv9Cw0YHQuNCx0L4uXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCT0LvQsNCy0L3Ri9C1INGG0LXQvdC90L7RgdGC0Lgg0LrQvtC80L/QsNC90LjQuDog0YDQsNC30LLQuNGC0LjQtSwg0LPQuNCx0LrQvtGB0YLRjCwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGD0LLQsNC20LXQvdC40LUsINGD0LTQvtCy0L7Qu9GM0YHRgtCy0LjQtS5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTIzXHJcbiAgICAgICAgICAgICAgICBcItCh0LDRiNCwOiDQntGC0LvQuNGH0L3Qviwg0LAg0YLQviDRgdC+0LLRgdC10Lwg0L3QtdGCINCy0YDQtdC80LXQvdC4INC90LAg0L/QvtC00LPQvtGC0L7QstC60YMuLi4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItCi0Ysg0L7Rh9C10L3RjCDQv9C+0LzQvtCzLiDQndC+INC/0L7QutCwINGC0LXQsdGPINC90LUg0LHRi9C70L4sINGPINGF0L7RgtC10LvQsCDQv9C10YDQtdGB0LzQvtGC0YDQtdGC0YwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC30LDQv9C40YHRjCDQuCDQtdC1INC90LUg0L7QutCw0LfQsNC70L7RgdGMINC90LAg0LzQvtC10Lwg0YHRgtC+0LvQtS5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0KHQsNGI0LA6INCSINC+0YTQuNGB0LUg0LTQsNCy0L3QviDQvdC1INCy0YHQtSDQs9C70LDQtNC60L4uLi4g0JLQuNC00LjQvNC+INC60L7QvdC60YPRgNC10L3RgiDQtNC+0LHRgNCw0LvRgdGPINC4IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgdGO0LTQsC4g0J3Rg9C20L3QviDRgdGA0L7Rh9C90L4g0YPQt9C90LDRgtGMINC60YLQviDRjdGC0L4uINCV0YnQtSDRjyDRgdC70YvRiNCw0LvQsCwg0YfRgtC+INC6IFNreWVuZ0RheSBcIixcclxuICAgICAgICAgICAgICAgIFwi0YDQtdCx0Y/RgtCwINC30LDQv9C40YHQsNC70Lgg0L/QvtC30LTRgNCw0LLQu9C10L3QuNGPLCDQvdC+INC+0L3QuCDRgtC+0LbQtSDQutGD0LTQsC3RgtC+INC/0YDQvtC/0LDQu9C4LiBcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQodCw0YjQsDog0J/RgNCw0LfQtNC90LjQuiDQvdC1INGB0L7RgdGC0L7QuNGC0YHRjywg0LXRgdC70Lgg0L3QtSDQvdCw0LnRgtC4INC60LDRgdGB0LXRgtGDINC4INCy0YHQtSBcIixcclxuICAgICAgICAgICAgICAgIFwi0L/QvtC30LTRgNCw0LLQu9C10L3QuNGPLi4uINCa0L7Qs9C00LAg0L7QvSDQt9Cw0LHQuNGA0LDQuyDQutCw0YHRgdC10YLRgywg0YLQviDQsiDRgdC/0LXRiNC60LUg0L7Qv9GA0L7QutC40L3Rg9C7IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRh9C10YDQvdC40LvQsCDQvdCwINC80L7QtdC8INGB0YLQvtC70LUsINC+0YfQtdC90Ywg0LvRjtCx0LvRjiDRgNGD0YfQutGDINGBINGH0LXRgNC90LjQu9Cw0LzQuCDQtNC70Y8g0L/QvtC00L/QuNGB0LguXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0KHQsNGI0LA6INCY0YnQuCDQtdCz0L4g0L/QviDQvtGC0LzQtdGC0LjQvdCw0Lwg0L3QsCDQv9GA0LXQtNC80LXRgtCw0YUhXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCvINC90LDQudC00YMg0LXQs9C+INCy0L4g0YfRgtC+0LHRiyDRgtC+INC90Lgg0YHRgtCw0LvQviFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTI4XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCd0LAg0YLQstC+0LXQuSDRgNGD0LrQtSDRh9C10YDQvdC40LvQsCwg0Y3RgtC+INGC0Ysg0YPQutGA0LDQuyDQutCw0YHRgdC10YLRgyDQuNC3IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQodCw0YjQuNC90L7Qs9C+INC60LDQsdC40L3QtdGC0LAhINCi0Ysg0LrQvtC90LrRg9GA0LXQvdGCLCDQvNC10YjQsNGO0YnQuNC5INC90LDQvCDRgNCw0LfQstC40LLQsNGC0YzRgdGPIVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0L3QutGD0YDQtdC90YI6INCw0YXQsNGF0LDRhSDQv9C+0LnQvNCw0Lsg0LzQtdC90Y8s0L3RgyDQuCDRh9GC0L4/INCi0LXQsdC1INCy0YHQtSDRgNCw0LLQvdC+INC90LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC90LDQudGC0Lgg0LrQsNGB0YHQtdGC0YMg0Lgg0L/QvtC30LTRgNCw0LLQu9C10L3QuNGPIVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0L7QvdC60YPRgNC10L3Rgjog0JLQsNGI0Lgg0YHRgtC10L3RiyDRgdC70LjRiNC60L7QvCDQvtC00LjQvdCw0LrQvtCy0YssINGH0YLQvtCx0Ysg0L7RgtGL0YHQutCw0YLRjCDQtdC1INCyIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgdGC0LXQvdC1LCDQsCDQvdC10LvQtdC/0YvQtSDRgdC/0L7RgNGC0LjQstC90YvQtSDQv9C+0LfQtNGA0LDQstC70LXQvdC40Y8sINC60L7RgtC+0YDRi9C80Lgg0LLRiyDRhdC+0YLQtdC70LggXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0L7QstC10YHQtdC70LjRgtGMINCy0YHQtdGFLCDQvNC+0LbQvdC+INC90LDQudGC0Lgg0YLQvtC70YzQutC+INGB0LvRg9GH0LDQudC90L4hXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwiKCEpINCd0LDQttC80LjRgtC1IDxzcGFjZT4sINGH0YLQvtCx0Ysg0L/QvtC00L7QsdGA0LDRgtGMINC60LDRgdC10YLRgy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwiKCEpINCS0LXRgNC90LjRgtC1INC60LDRgdC10YLRgyDQodCw0YjQtS5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0KHQsNGI0LA6INCh0L/QsNGB0LjQsdC+INCx0L7Qu9GM0YjQvtC1LiDQkCDRgdC10LnRh9Cw0YEg0L7RgtC/0YDQsNCy0LvRj9C50YHRjyDQuiDQutGD0YDQsNGC0L7RgNGDLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YMg0L3QtdC1INC6INGC0LXQsdC1INGA0LDQt9Cz0L7QstC+0YAg0LHRi9C7LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzEzNVxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0K3RgtC+INC/0YDQvtGB0YLQviDQvdC10LLQtdGA0L7Rj9GC0L3QviEg0KLRiyDQvdCw0YjQtdC7INC60L7QvdC60YPRgNC10L3RgiDQuCDQt9Cw0L/QuNGB0YwuIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQndC+INGN0YLQviDQtdGJ0LUg0L3QtSDQstGB0LUuINCV0YHQu9C4INGF0L7Rh9C10YjRjCDRg9C30L3QsNGC0Ywg0LHQvtC70YzRiNC1INC+INGB0L7Qt9C00LDRgtC10LvRj9GFINGN0YLQvtC5IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQuNCz0YDRiywg0L3QsNC50LTQuCDQuNGFINC/0L7Qt9C00YDQsNCy0LvQtdC90LjRjy4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQkiDQv9C10YDQstGD0Y4g0L7Rh9C10YDQtdC00Ywg0Y8g0LHRiyDQv9C+0LjRgdC60LDQu9CwINCyINC60L7RgNC30LjQvdC1INGBINC80YPRgdC+0YDQvtC8LiBcIixcclxuICAgICAgICAgICAgICAgIFwi0K3RgtCwINC00LXQstGD0YjQutCwINC+0YfQtdC90Ywg0LvRjtCx0LjRgiDRgNC40YHQvtCy0LDRgtGMINC4INCy0YHQtdCz0LQg0YHRgtGA0LXQvNC40YLRgdGPINC6INGB0L7QstC10YDRiNC10L3RgdGC0LLRgywgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0L7RjdGC0L7QvNGDINC80L3QvtCz0L7QtSDQvNC+0LbQtdGCINCy0YvQsdGA0L7RgdC40YLRjCwg0LTQsNC20LUg0YjQtdC00LXQstGA0YsuIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xMzdcclxuICAgICAgICAgICAgICAgIFwi0JrQvtGA0LfQuNC90LA6INCd0LDQttC80LjRgtC1IDxzcGFjZT4g0LTQu9GPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Y8uXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIighKSDQktC10YDQvdGD0YLRjNGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTM5XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQntC00LjQvSDQuNC3INGN0YLQuNGFINGA0LXQsdGP0YIg0L7Rh9C10L3RjCDQu9GO0LHQuNGCINC60L7QtNGLINC4INCz0L7QstC+0LvQvtC80LrQuC4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItChINGC0LXRhSDQv9C+0YAsINC60LDQuiDQvtC9INGD0LLQuNC00LXQuyDRhNC+0LzRgNGD0LvRiyDQvdCwINC00L7RgdC60LUsINCz0LTQtSDQutCw0LbQtNGL0Lkg0LIg0L7RhNC40YHQtSBcIixcclxuICAgICAgICAgICAgICAgIFwi0LvRjtCx0LjRgiDQvtGB0YLQsNCy0LvRj9GC0Ywg0L/QvtGB0LvQsNC90LjRjywg0L7QvdCwINC90LUg0LLRi9GF0L7QtNC40YIg0YMg0L3QtdCz0L4g0LjQtyDQs9C+0LvQvtCy0YsuIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNDBcclxuICAgICAgICAgICAgICAgIFwi0JTQvtGB0LrQsDog0J3QsNC20LzQuNGC0LUgPHNwYWNlPiDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRjyBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vXHJcbiAgICAgICAgICAgICAgICBcIjAwMTEwMDAxMDEwMDEwMTAwMTAxMTAwMTAxMDExMDAxMDExMDAwMTAwMDEwMTAxMTAxMDEwMDEwMDEwMTEwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCIxMDEwMTExMDEwMTAxMDAwMTAxMDAxMTAxMDEwMDEwMTAwMTEwMDAxMDAwMTExMTAwMDEwMTAxMDAwMTEwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiMTAwMTAwMTExMDAxMDEwMTExMDEwMTAwMDBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwiKCEpINCS0LXRgNC90YPRgtGM0YHRjyDQuiDQutGD0YDQsNGC0L7RgNGDLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNDNcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCt0YLQsCDQtNC10LLRg9GI0LrQsCDQvtGH0LXQvSDQu9GO0LHQuNGCINCy0L7QtNGDINC4INGN0YLQuNC8INCy0YHQtSDRgdC60LDQt9Cw0L3QviA9KS4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE0NFxyXG4gICAgICAgICAgICAgICAgXCLQkdGD0YLQu9GMINGBINCy0L7QtNC+0Lk6INCd0LDQttC80LjRgtC1IDxzcGFjZT4g0LTQu9GPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Y8gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIighKSDQktC10YDQvdGD0YLRjNGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTQ2XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQntC9INC/0L7QtNC90LjQvNCw0LXRgiDRgtGP0LbQtdGB0YLQuCDRgSDRgNCw0L3QvdC10LPQviDQtNC10YLRgdGC0LLQsCwg0L3QviDQsiDRjdGC0L7RgiBcIixcclxuICAgICAgICAgICAgICAgIFwi0YDQsNC3IC0g0Y3RgtC+IFxcXCLQvdC+0LLRi9C5INGA0LXQutC+0YDQtFxcXCIg0LbQuNC80LAg0LvQtdC20LAuIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNDdcclxuICAgICAgICAgICAgICAgIFwi0JTQuNCy0LDQvTog0J3QsNC20LzQuNGC0LUgPHNwYWNlPiDQtNC70Y8g0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0LjRjyBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwiKCEpINCS0LXRgNC90YPRgtGM0YHRjyDQuiDQutGD0YDQsNGC0L7RgNGDLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNDlcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCi0Ysg0LTQsNC20LUg0L3QtSDQv9GA0LXQtNGB0YLQsNCy0LvRj9C10YjRjCwg0YfRgtC+INGB0LTQtdC70LDQuyDQtNC70Y8g0L3QsNGBLiBcIixcclxuICAgICAgICAgICAgICAgIFwi0JLQvtGCINC/0L7QtNCw0YDQvtC6LCDQutC+0YLQvtGA0YvQuSDQsdGD0LTQtdGCINGD0L3QuNC60LDQu9GM0L3Ri9C8INGC0L7Qu9GM0LrQviDQtNC70Y8g0YLQtdCx0Y8uIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0K3RgtC+INC30L7Qu9C+0YLQsNGPINC60LDRgNGC0LAg0L3QsCDQv9C+0LbQuNC30L3QtdC90L3Ri9C5INC/0YDQvtC/0YPRgdC6INC6ICBcIixcclxuICAgICAgICAgICAgICAgIFwi0LvRjtCx0L7QvNGDINGE0LXRgdGC0LjQstCw0LvRjiDQvtGCIFNreWVuZyDQsdC10Lcg0L7Qs9GA0LDQvdC40YfQtdC90LjQuS5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCQINGB0LXQudGH0LDRgSDQsdC10LPQuCDRgdC60L7RgNC10LUg0Log0LrQvtC80L3QsNGC0LUgU2t5ZW5nRGF5LCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YfRgtC+0LHRiyDRg9Cy0LjQtNC10YLRjCDRhNC40L3QsNC70YzQvdC+0LUg0L/QvtC30LTRgNCw0LLQu9C10L3QuNGPINGA0LXQsdGP0YIg0Lgg0L/QvtGB0LXRgtC40YLRjCBcIixcclxuICAgICAgICAgICAgICAgIFwi0LvRg9GH0YjRg9GOINCy0LXRh9C10YDQuNC90LrRgyDQs9C+0LTQsCEgXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE1MlxyXG4gICAgICAgICAgICAgICAgXCJcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wO1xyXG4gICAgICAgICAgICB0aGlzLm5wYy5mb3JFYWNoKG5wYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIueCArIDY0IDwgbnBjLnggfHwgbnBjLngrNjQgPCB0aGlzLnBsYXllci54IHx8IHRoaXMucGxheWVyLnkgKyA2NCA8IG5wYy55IHx8IG5wYy55ICsgNjQgPCB0aGlzLnBsYXllci55KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShucGMuaW1hZ2VOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfSkudGhlbihiZXNpZGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJlc2lkZSA9IGJlc2lkZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wO1xyXG4gICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKGFydGlmYWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci54ICsgNjQgPCBhcnRpZmFjdC5jb2xsaXNpb25TaGFwZS54IHx8IFxyXG4gICAgICAgICAgICAgICAgICAgIGFydGlmYWN0LmNvbGxpc2lvblNoYXBlLnggKyBhcnRpZmFjdC5jb2xsaXNpb25TaGFwZS53aWR0aCA8IHRoaXMucGxheWVyLnggfHwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueSArIDY0IDwgYXJ0aWZhY3QuY29sbGlzaW9uU2hhcGUueSB8fCBcclxuICAgICAgICAgICAgICAgICAgICBhcnRpZmFjdC5jb2xsaXNpb25TaGFwZS55ICsgYXJ0aWZhY3QuY29sbGlzaW9uU2hhcGUuaGVpZ2h0IDwgdGhpcy5wbGF5ZXIueSlcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJ0aWZhY3QudHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLnRoZW4odHlwZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVzaWRlID0gdHlwZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk92Y2hhcmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSA0ICYmIHRoaXMubGFzdFN0YXR1cyA9PSAzKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRhcG9jaGtpXCIgJiYgdGhpcy5zdGF0dXMgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk92Y2hhcmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSA3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazFcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY29mZmVlXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTEpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5wYy5mb3JFYWNoKG5wYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihucGMuaW1hZ2VOYW1lID09ICdjdXJhdG9yJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbnBjLnggPSAxMDY5O1xyXG4gICAgICAgICAgICAgICAgICAgIG5wYy55ID0gMTAzODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDEzKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLdWRyaWF2dGNldlwiICYmIHRoaXMuc3RhdHVzID09IDIwKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJZYXVuemVtXCIgJiYgdGhpcy5zdGF0dXMgPT0gMjQpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAyNil7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwicGNcIiAmJiB0aGlzLnN0YXR1cyA9PSAyOCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDI5KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJZYW1hbm92XCIgJiYgdGhpcy5zdGF0dXMgPT0gMzEpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInBjXCIgJiYgdGhpcy5zdGF0dXMgPT0gMzYpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk1hdHZlZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSAzNykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAzOSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImp1cm5hbFwiICYmIHRoaXMuc3RhdHVzID09IDQwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU29sb3ZldlwiICYmIHRoaXMuc3RhdHVzID09IDQxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDQzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazJcIiAmJiB0aGlzLnN0YXR1cyA9PSA0Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tEZXNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJMYXJ5YW5vdnNreVwiICYmIHRoaXMuc3RhdHVzID09IDQ3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDQ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwicmFkaW9cIiAmJiB0aGlzLnN0YXR1cyA9PSA1MSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA1Mykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA1Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA1OCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNvbG92ZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA2MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA2Mikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA2NSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIktpeWFtb3ZhXCIgJiYgdGhpcy5zdGF0dXMgPT0gNzQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLaXlhbW92YVwiICYmIHRoaXMuc3RhdHVzID09IDgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiS2l5YW1vdmFcIiAmJiB0aGlzLnN0YXR1cyA9PSA4Mikge1xyXG4gICAgICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImp1cm5hbEFuaXNcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXBvY2hraSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKChhcnRpZmFjdCwgaSwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJ0aWZhY3QudHlwZSA9PSBcImp1cm5hbEFuaXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXJ0aWZhY3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJCYXJ5c2huaWtvdmFcIiAmJiB0aGlzLnN0YXR1cyA9PSA4NSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIkJhcnlzaG5pa292YVwiICYmIHRoaXMuc3RhdHVzID09IDk0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU3RlcGFuXCIgJiYgdGhpcy5zdGF0dXMgPT0gNjcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJaYW11cmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMDcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLb25vbmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjApIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLb25vbmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJtaXNzaW9uXCIgJiYgdGhpcy5zdGF0dXMgPT0gNzgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTWlzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwibm90ZVwiICYmIHRoaXMuc3RhdHVzID09IDg4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazNcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjMpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJDb21wZXRpdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTI5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY2Fzc2V0dGVcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMzIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTWFpbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiS29ub25lbmtvXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDEzNSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRyYXNoXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9va0NocmlzdHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjb2RlXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9va1Nhc2hhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwid2F0ZXJcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNDQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTmF0YXNoYSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDE0Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInNvZmFcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNDcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTGVhZGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiZmluYWxcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNTIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29rVXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImZpbmFsMlwiICYmIHRoaXMuc3RhdHVzID09IDE1Mikge1xyXG4gICAgICAgICAgICB0aGlzLm11c2ljID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb29raW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC51cCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wucmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLmRvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLmxlZnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb29raW5nICYmIChuZXcgRGF0ZSgpKSAtIHRoaXMubGFzdFRpbWUgPiA1MDAgJiYgdGhpcy5jb250cm9sLnVzZSAmJiAodGhpcy5zdGF0dXMgPCA5NiB8fCB0aGlzLnN0YXR1cyA+IDEwMikpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJ0YXBvY2hraVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcG9jaGtpID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLmZvckVhY2goKGFydGlmYWN0LCBpLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcnRpZmFjdC50eXBlID09IFwidGFwb2Noa2lcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXJ0aWZhY3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5jb2xsaWRlci5zdGF0aWNTaGFwZXNbdGhpcy5jb2xsaWRlci5zdGF0aWNTaGFwZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJqdXJuYWxcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXBvY2hraSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKChhcnRpZmFjdCwgaSwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJ0aWZhY3QudHlwZSA9PSBcImp1cm5hbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5hcnRpZmFjdHNbaV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubnBjLmZvckVhY2gobnBjID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihucGMuaW1hZ2VOYW1lID09ICdjdXJhdG9yJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wYy54ID0gNzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucGMueSA9IDE3OTM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJub3RlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFwb2Noa2kgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMuZm9yRWFjaCgoYXJ0aWZhY3QsIGksIGFycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFydGlmYWN0LnR5cGUgPT0gXCJub3RlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFydGlmYWN0c1tpXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY2Fzc2V0dGVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXBvY2hraSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKChhcnRpZmFjdCwgaSwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJ0aWZhY3QudHlwZSA9PSBcImNhc3NldHRlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFydGlmYWN0c1tpXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5zdWJTdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9va2luZyAmJiAobmV3IERhdGUoKSkgLSB0aGlzLmxhc3RUaW1lID4gNTAwICYmIHRoaXMuY29udHJvbC50aHJlZSAmJiB0aGlzLnN0YXR1cyA9PSA5Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9va2luZyAmJiAobmV3IERhdGUoKSkgLSB0aGlzLmxhc3RUaW1lID4gNTAwICYmIHRoaXMuY29udHJvbC5mb3VyICYmIHRoaXMuc3RhdHVzID09IDk3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cysrO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb29raW5nICYmIChuZXcgRGF0ZSgpKSAtIHRoaXMubGFzdFRpbWUgPiA1MDAgJiYgdGhpcy5jb250cm9sLnRocmVlICYmIHRoaXMuc3RhdHVzID09IDk4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cysrO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb29raW5nICYmIChuZXcgRGF0ZSgpKSAtIHRoaXMubGFzdFRpbWUgPiA1MDAgJiYgdGhpcy5jb250cm9sLm9uZSAmJiB0aGlzLnN0YXR1cyA9PSA5OSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9va2luZyAmJiAobmV3IERhdGUoKSkgLSB0aGlzLmxhc3RUaW1lID4gNTAwICYmIHRoaXMuY29udHJvbC50aHJlZSAmJiB0aGlzLnN0YXR1cyA9PSAxMDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzKys7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvb2tpbmcgJiYgKG5ldyBEYXRlKCkpIC0gdGhpcy5sYXN0VGltZSA+IDUwMCAmJiB0aGlzLmNvbnRyb2wub25lICYmIHRoaXMuc3RhdHVzID09IDEwMSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9va2luZyAmJiAobmV3IERhdGUoKSkgLSB0aGlzLmxhc3RUaW1lID4gNTAwICYmIHRoaXMuY29udHJvbC5mb3VyICYmIHRoaXMuc3RhdHVzID09IDEwMikge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA0KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFN0YXR1cyA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0L3Rg9C20L3Ri9C5INC/0YDQtdC00LzQtdGCINC00LvRjyDQv9GA0L7QtNC+0LvQttC10L3QuNGPLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiT3ZjaGFyZW5rb1wiICYmIHRoaXMuc3RhdHVzID09IDcgJiYgdGhpcy5sYXN0U3RhdHVzID09IDYpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSA0O1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC90YPQttC90YvQuSDQv9GA0LXQtNC80LXRgiDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRjy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRhcG9jaGtpXCIgJiYgdGhpcy5zdGF0dXMgPT0gNSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSA3O1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQn9GA0L7QtNC+0LvQttCw0Lkg0LTQstC40LbQtdC90LjQtSDQtNCw0LvRjNGI0LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJPdmNoYXJlbmtvXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTApe1xyXG4gICAgICAgICAgICB0aGlzLm5ld1BsYXllciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQn9GA0L7QtNC+0LvQttCw0Lkg0LTQstC40LbQtdC90LjQtSDQtNCw0LvRjNGI0LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJ0YXNrMVwiICYmIHRoaXMuc3RhdHVzID09IDExKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCe0YLQv9GA0LDQstC70Y/QudGB0Y8g0L3QsCDQutGD0YXQvdGOINC4INCy0YvQv9C10Lkg0YfQsNGI0LXRh9C60YMg0LrQvtGE0LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjb2ZmZWVcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMyl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDIwKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCe0YLQv9GA0LDQstC70Y/QudGB0Y8g0Log0JPQu9C10LHRgyDQmtGD0LTRgNGP0LLRhtC10LLRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIkt1ZHJpYXZ0Y2V2XCIgJiYgdGhpcy5zdGF0dXMgPT0gMjQpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0K3RgtC+0YIg0YfQtdC70L7QstC10Log0YHRg9C/0LXRgNCz0LvRg9Cx0L7QutC40Lkg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDQvNC+0LfQsy4g0J3QsNC50LTQuCDQtdCz0L4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiWWF1bnplbVwiICYmIHRoaXMuc3RhdHVzID09IDI2KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMjgpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50YLQuCDQutC+0LzQv9GM0Y7RgtC10YAuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJwY1wiICYmIHRoaXMuc3RhdHVzID09IDI5KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMzEpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDRgtC+0LPQviwg0LrRgtC+INC/0YDQuNC00YPQvNCw0Lsg0L/QsNGA0L7Qu9GMIFdpLUZpLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiWWFtYW5vdlwiICYmIHRoaXMuc3RhdHVzID09IDM2KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60L7QvNC/0YzRjtGC0LXRgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwicGNcIiAmJiB0aGlzLnN0YXR1cyA9PSAzNyl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQrdGC0L7RgiDRh9C10LvQvtCy0LXQuiDRgdC70LXQtNC40YIg0LfQsCDQt9C00L7RgNC+0LLRjNC10Lws0YMg0L3QtdCz0L4g0LLRgdC1INGB0LjRgdGC0LXQvNC90L4g0Lgg0L/QviDRh9Cw0YHQsNC8LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiTWF0dmVldlwiICYmIHRoaXMuc3RhdHVzID09IDM5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDQwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC20YPRgNC90LDQuyDQsiDQsdC40LHQu9C40L7RgtC10LrQtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImp1cm5hbFwiICYmIHRoaXMuc3RhdHVzID09IDQxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQldCz0L4g0LPQu9Cw0LLQvdC+0LUg0YXQvtCx0LHQuCAtINGN0YLQviDRgNCw0LHQvtGC0LAuINCe0L3QsCDQtNC70Y8g0L3QtdCz0L4g0L3QsCDQv9C10YDQstC+0Lwg0LzQtdGB0YLQtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNvbG92ZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA0Mykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA0Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQvdCw0LTQv9C40YHRjCDQvdCwINC60YPRhdC90LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJ0YXNrMlwiICYmIHRoaXMuc3RhdHVzID09IDQ3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va0Rlc2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcIi4uLiDQs9C+0YLQvtCy0LjRgiDQstC60YPRgdC90LXQtSwg0YfQtdC8IDgwJSDQvNC+0YHQutC+0LLRgdC60LjQuSDQt9Cw0LLQtdC00LXQvdC40LkuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJMYXJ5YW5vdnNreVwiICYmIHRoaXMuc3RhdHVzID09IDQ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDUxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INGA0LDQtNC40L4g0LIg0L/QtdGA0LXQs9C+0LLQvtGA0LrQtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA1OCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J/QvtC00L7QudGC0Lgg0Log0JTQtdC90LjRgdGDINCh0LzQtdGC0L3QtdCy0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gNjcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCf0L7QtNC+0LnRgtC4INC6INC+0L/QtdGA0LDRgtC+0YDRgyDQodGC0LXQv9Cw0L3Rgywg0L7QvSDQsiDQstC40LTQtdC+0YHRgtGD0LTQuNC4LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU29sb3ZldlwiICYmIHRoaXMuc3RhdHVzID09IDYyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQlNC10L3QuNGB0YMg0KHQvNC10YLQvdC10LLRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA1Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA2MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J/QvtC00L7QudGC0Lgg0Log0JPQvtGI0LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJTbWV0bmV2XCIgJiYgdGhpcy5zdGF0dXMgPT0gNjUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLaXlhbW92YVwiICYmIHRoaXMuc3RhdHVzID09IDc4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC80LjRgdGB0LjRjiDQutC+0LzQv9Cw0L3QuNC4INCyINC70LDRg9C90LbQtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIktpeWFtb3ZhXCIgJiYgdGhpcy5zdGF0dXMgPT0gODUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCe0YLQv9GA0LDQstC70Y/QudGB0Y8g0Log0JLQuNGC0LUg0JHQsNGA0YvRiNC90LjQutC+0LLQvtC5LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiQmFyeXNobmlrb3ZhXCIgJiYgdGhpcy5zdGF0dXMgPT0gODgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0LHQu9C+0LrQvdC+0YIg0LIg0L/QtdGA0LXQs9C+0LLQvtGA0LrQtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIkJhcnlzaG5pa292YVwiICYmIHRoaXMuc3RhdHVzID09IDEwNykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J7RgtC/0YDQsNCy0LvQudGB0Y8g0Log0JrQvtC90YHRgtCw0L3RgtC40L3RgyDQl9Cw0LzRg9GA0LXQvdC60L4uXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJTdGVwYW5cIiAmJiB0aGlzLnN0YXR1cyA9PSA3NCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J/QvtC00L7QudGC0Lgg0Log0JDQvdC40YHQtSDQmtC40Y/QvNC+0LLQvtC5LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiWmFtdXJlbmtvXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTIwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQn9C+0LTQvtC50YLQuCDQuiDQodCw0YjQtSDQmtC+0L3QvtC90LXQvdC60L4uXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLb25vbmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjMpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0LPQu9Cw0LLQvdGL0LUg0YbQtdC90L3QvtGB0YLQuCDQutC+0LzQv9Cw0L3QuNC4INC90LAg0LrRg9GF0L3QtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIktvbm9uZW5rb1wiICYmIHRoaXMuc3RhdHVzID09IDEyOSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQutC+0L3QutGD0YDQtdC90YLQsC5cIlxyXG4gICAgICAgICAgICB0aGlzLmZpbmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIm1pc3Npb25cIiAmJiB0aGlzLnN0YXR1cyA9PSA3OSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tNaXNzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwibWlzc2lvblwiICYmIHRoaXMuc3RhdHVzID09IDgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQkNC90LjRgdC1LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwibm90ZTJcIiAmJiB0aGlzLnN0YXR1cyA9PSA5NCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0JLQuNGC0LUuXCIgLy8/Pz9cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJ0YXNrM1wiICYmIHRoaXMuc3RhdHVzID09IDEyNCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0KHQsNGI0LUg0JrQvtC90L7QvdC10L3QutC+LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiQ29tcGV0aXRvclwiICYmIHRoaXMuc3RhdHVzID09IDEzMikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQutCw0YHRgdC10YLRgy5cIlxyXG4gICAgICAgICAgICB0aGlzLmZpbmRFbmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRhc2sxXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQodCw0YjQtSDQmtC+0L3QvtC90LXQvdC60L4uXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLb25vbmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMzUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCf0L7QtNC+0LnRgtC4INC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC60L7RgNC30LjQvdGDINC00LvRjyDQvNGD0YHQvtGA0LAuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJyYWRpb1wiICYmIHRoaXMuc3RhdHVzID09IDUzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQrdGC0L7RgiDRh9C10LvQvtCy0LXQuiDRgNCw0L3QtdC1INC30LDQvdC40LzQsNC70YHRjyDRgdCw0LzQsdC+INC4INGB0LrQsNC70L7Qu9Cw0LfQsNC90YzQtdC8LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidHJhc2hcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC00L7RgdC60YMsINC60L7RgtC+0YDRgyDRgtGLINC90Lgg0YDQsNC30YMg0L3QtSDRgdC80L7RgtGA0LXQuy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImNvZGVcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNDMpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC60YPQu9C10YAg0YEg0LLQvtC00L7QuS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIndhdGVyXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQ2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDE0Nykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDRg9C00L7QsdC90YvQuSDQtNC40LLQsNC9INCyINCx0LjQsdC70LjQvtGC0LXQutC1LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwic29mYVwiICYmIHRoaXMuc3RhdHVzID09IDE0OSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNTIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0LrQvtC80L3QsNGC0YMgU2t5ZW5nRGF5LlwiXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbGxpZGVyLnN0YXRpY1NoYXBlc1t0aGlzLmNvbGxpZGVyLnN0YXRpY1NoYXBlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCb2R5IH0gZnJvbSBcIi4vYm9keVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRlYWNoZXIgZXh0ZW5kcyBCb2R5IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHtpbWFnZU5hbWU6ICd0ZWFjaGVyJywgc3BlZWQ6IDAsIHg6IHgsIHk6IHl9KTtcclxuICAgICAgICB0aGlzLnN0YW5kKGRpcmVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2F5KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUaWxlTWFwIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGl0Ym94ZXMgPSBwcm9wcy5oaXRib3hlcyB8fCBbXTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aW9uLCBzcGVlZCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGRpcmVjdGlvbiwgc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpcmVjdGlvbihkaXJlY3Rpb24sIHNwZWVkKSB7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBzd2l0Y2goZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gLXNwZWVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBzcGVlZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHNwZWVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSAtc3BlZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9