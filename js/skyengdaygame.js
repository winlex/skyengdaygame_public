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
/* harmony import */ var _scenes_finish__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scenes/finish */ "./src/scenes/finish.js");








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
            level: new _scenes_level__WEBPACK_IMPORTED_MODULE_3__["Level"](this),
            finish: new _scenes_finish__WEBPACK_IMPORTED_MODULE_6__["Finish"](this)
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
            case _scene__WEBPACK_IMPORTED_MODULE_4__["Scene"].FINISHED:
                return this.scenes.finish;
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

/***/ "./src/scenes/finish.js":
/*!******************************!*\
  !*** ./src/scenes/finish.js ***!
  \******************************/
/*! exports provided: Finish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Finish", function() { return Finish; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "./src/scene.js");


class Finish extends _scene__WEBPACK_IMPORTED_MODULE_0__["Scene"] {
    constructor(game) {
        super(game);
    }

    init() {
        super.init();
    }

    update(time) {
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#3497da');
        this.game.screen.print(260, 250, "Конец игры!");
        this.game.screen.print(225, 300, "Над игрой работали:");
        this.game.screen.print(165, 340, "Александр Фролков - сценарист");
        this.game.screen.print(65, 360, "Алекандр Гурин - разработчик, помощьник дизайнера");
        this.game.screen.print(165, 380, "Кристина Прохорова - дизайнер");
        super.render(time);
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
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Competitor', 'Вова Иванов', 1098, 90, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Volkova', 'Ирина Волкова', 1151, 445, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Titov', 'Максим Титов', 993, 636, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kataev', 'Алексей Катаев', 83, 2173, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Andrzhevskaya', 'Яна Андрежевская', 456, 855, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kolodeznikova', 'Яна Колодезникова', 560, 856, 'left'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Sologub', 'Глеб Сологуб', 1152, 1023, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Tepikin', 'Павел Тепикин', 960, 293, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Pushkin', 'Денис Пушкин', 803, 734, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Lebedev', 'Сергей Лебедев', 814, 1956, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kisel', 'Елена Кисель', 704, 961, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kudriavtcev', '', 640, 172, 'down'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Kudriavtcev', '', 640, 339, 'up'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Yaunzem', '', 565, 267, 'right'),
            new _npc__WEBPACK_IMPORTED_MODULE_8__["NPC"]('Yaunzem', '', 710, 256, 'left'),
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
            [//153
                "Ира: Довольный клиент — лучшая бизнес-стратегия.",
            ],
            [//154
                "Максим: Customer Service is an ATTITUDE, not a department.",
            ],
            [//155
                "Алексей:   Пришла бабка к врачу, а врач тоже бабка.",
            ],
            [//156
                "Яна: Работа не волк. Работа — ворк.",
            ],
            [//157
                "Яна: #skyengteam – команда, которая изобрела обучение английскому заново 🌍.",
            ],
            [//158
                "Глеб: Все планируют, а я пикирую.",
            ],
            [//159
                "Павел: Everything is designed. Few things are designed well.",
            ],
            [//160
                "Денис: Чем больше узел, тем больше узел.",
            ],
            [//161
                "Сергей: Slow internet connection. Loading...",
            ],
            [//162
                "Елена: Keep Going, no Matter WHAT.",
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
        if(this.beside == "Volkova" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 153;
            this.subStatus = 1;
        }
        if(this.beside == "Titov" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 154;
            this.subStatus = 1;
        }
        if(this.beside == "Kataev" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 155;
            this.subStatus = 1;
        }
        if(this.beside == "Andrzhevskaya" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 156;
            this.subStatus = 1;
        }
        if(this.beside == "Kolodeznikova" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 157;
            this.subStatus = 1;
        }
        if(this.beside == "Sologub" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 158;
            this.subStatus = 1;
        }
        if(this.beside == "Tepikin" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 159;
            this.subStatus = 1;
        }
        if(this.beside == "Pushkin" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 160;
            this.subStatus = 1;
        }
        if(this.beside == "Lebedev" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 161;
            this.subStatus = 1;
        }
        if(this.beside == "Kisel" && this.subStatus == 0) {
            this.looking = true;
            this.oldStatus = this.status;
            this.status = 162;
            this.subStatus = 1;
        }
        if(this.beside == null && this.subStatus != 0) {
            this.subStatus = 0;
        }
        if(this.looking || this.block) {
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
            if(this.subStatus == 1) this.subStatus++;
            else this.status++;
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
        if((this.beside == "Volkova" || 
            this.beside == "Titov" || 
            this.beside == "Kataev" || 
            this.beside == "Andrzhevskaya" || 
            this.beside == "Kolodeznikova" || 
            this.beside == "Sologub" || 
            this.beside == "Tepikin" || 
            this.beside == "Pushkin" || 
            this.beside == "Lebedev" || 
            this.beside == "Kisel") && this.subStatus == 2) {
                this.looking = false;
                this.status = this.oldStatus;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXJ0aWZhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbWVyYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcmFjdGVyLXNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb2xsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbC1zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2UtbG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbnBjLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvZmluaXNoLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lcy9sb2FkaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZXMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGUtc2hlZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RlYWNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbGUtbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy92ZWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBa0M7O0FBRTNCLHdCQUF3Qiw4Q0FBTTtBQUNyQyxpQkFBaUIsaUZBQWlGO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQy9EQTtBQUFBO0FBQUE7QUFBZ0M7O0FBRXpCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUFBO0FBQUE7QUFBa0M7QUFDaUI7O0FBRTVDO0FBQ1AsaUJBQWlCLDZDQUE2QztBQUM5RDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsOENBQU07QUFDbEM7QUFDQTtBQUNBLCtCQUErQjs7QUFFL0IsbUNBQW1DLCtEQUFjLEVBQUUscUJBQXFCO0FBQ3hFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLCtEQUFjLEVBQUUscUJBQXFCO0FBQ3hFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNyREE7QUFBQTtBQUFPO0FBQ1AsaUJBQWlCLDRFQUE0RSxLQUFLO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDckNBO0FBQUE7QUFBQTtBQUE2Qzs7QUFFdEMsNkJBQTZCLHlEQUFXO0FBQy9DLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyxrREFBb0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDbkdBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUM3QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBQ1M7QUFDTjtBQUNFO0FBQ1A7QUFDZTtBQUNOOztBQUVsQztBQUNQLGlCQUFpQiwwQkFBMEIsS0FBSztBQUNoRCwwQkFBMEIsOENBQU07QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCwyQkFBMkIsMkRBQVk7QUFDdkM7QUFDQSx5QkFBeUIsdURBQU87QUFDaEMsc0JBQXNCLGlEQUFJO0FBQzFCLHVCQUF1QixtREFBSztBQUM1Qix3QkFBd0IscURBQU07QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQiw0Q0FBSztBQUN0QjtBQUNBLGlCQUFpQiw0Q0FBSztBQUN0QjtBQUNBLGlCQUFpQiw0Q0FBSztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLDRDQUFLO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNuRkE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBOEI7O0FBRTlCO0FBQ0EsOEJBQThCLDBDQUFJO0FBQ2xDO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQUE7QUFBQTtBQUE4Qjs7QUFFdkIsa0JBQWtCLDBDQUFJO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUFBO0FBQThCOztBQUV2QixxQkFBcUIsMENBQUk7QUFDaEM7QUFDQSxlQUFlLDZDQUE2QztBQUM1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUFBO0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsa0JBQWtCO0FBQzVDLHlCQUF5QixpQkFBaUI7QUFDMUMsNkJBQTZCLHFCQUFxQjtBQUNsRCwyQkFBMkIsbUJBQW1COztBQUU5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBQTtBQUFpQzs7QUFFMUIscUJBQXFCLDRDQUFLO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpQztBQUNhO0FBQ007QUFDakI7QUFDQTtBQUNFO0FBQ047QUFDUTtBQUNWO0FBQ0k7QUFDTTs7QUFFaEMsb0JBQW9CLDRDQUFLO0FBQ2hDO0FBQ0E7QUFDQSx5QkFBeUIseURBQVc7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGtDQUFrQyx5REFBVztBQUM3QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsMEJBQTBCLDhDQUFNO0FBQ2hDLDRCQUE0QixtREFBUTs7QUFFcEM7QUFDQSxnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25CLGdCQUFnQix3Q0FBRztBQUNuQixnQkFBZ0Isd0NBQUc7QUFDbkIsZ0JBQWdCLHdDQUFHO0FBQ25COztBQUVBO0FBQ0EsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCLGdCQUFnQixrREFBUTtBQUN4QixnQkFBZ0Isa0RBQVE7QUFDeEIsZ0JBQWdCLGtEQUFRO0FBQ3hCOztBQUVBLHlCQUF5Qiw0Q0FBSztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQU8sQ0FBQyxtREFBcUI7QUFDckQ7QUFDQSw4QkFBOEIsOENBQU07QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxrREFBUTtBQUM1QyxvQ0FBb0Msa0RBQVE7QUFDNUMsb0NBQW9DLGtEQUFRO0FBQzVDLG9DQUFvQyxrREFBUTtBQUM1QyxvQ0FBb0Msa0RBQVE7QUFDNUMsb0NBQW9DLGtEQUFRO0FBQzVDLG9DQUFvQyxrREFBUTtBQUM1QyxvQ0FBb0Msa0RBQVE7QUFDNUMsb0NBQW9DLGtEQUFRO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNyU0E7QUFBQTtBQUFBO0FBQWlDOztBQUUxQixzQkFBc0IsNENBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0Q0FBSztBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQUE7QUFBaUM7O0FBRTFCLG1CQUFtQiw0Q0FBSztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsNENBQUs7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUN2QkE7QUFBQTtBQUFBO0FBQUE7QUFBNEM7QUFDUDs7QUFFOUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQix5REFBVztBQUN0QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxtQkFBbUIsaURBQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDM0tBO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBQ007O0FBRWpDO0FBQ1AsaUJBQWlCLHdFQUF3RTtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsb0RBQVM7QUFDNUI7QUFDQSwyQ0FBMkMsdURBQXVEO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSxtQkFBbUIsOENBQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDekNBO0FBQUE7QUFBTztBQUNQLGlCQUFpQixxREFBcUQ7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBQTtBQUFrQzs7QUFFM0I7QUFDUCxpQkFBaUIsMENBQTBDO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUM3dENBO0FBQUE7QUFBQTtBQUE4Qjs7QUFFdkIsc0JBQXNCLDBDQUFJO0FBQ2pDO0FBQ0EsZUFBZSwyQ0FBMkM7QUFDMUQ7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNmQTtBQUFBO0FBQUE7QUFBa0M7O0FBRTNCLHNCQUFzQiw4Q0FBTTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEMiLCJmaWxlIjoianMvc2t5ZW5nZGF5Z2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgU3ByaXRlIH0gZnJvbSAnLi9zcHJpdGUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbiBleHRlbmRzIFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lLCBmcmFtZXMsIHNwZWVkLCByZXBlYXQgPSB0cnVlLCBhdXRvcnVuID0gdHJ1ZSwgd2lkdGggPSA2NCwgaGVpZ2h0ID0gNjR9KSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6IGltYWdlTmFtZSxcclxuICAgICAgICAgICAgc291cmNlWDogZnJhbWVzWzBdLnN4LFxyXG4gICAgICAgICAgICBzb3VyY2VZOiBmcmFtZXNbMF0uc3ksXHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMucmVwZWF0ID0gcmVwZWF0O1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGF1dG9ydW47XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMudG90YWxGcmFtZXMgPSB0aGlzLmZyYW1lcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RnJhbWUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuc291cmNlWCA9IHRoaXMuZnJhbWVzW2luZGV4XS5zeDtcclxuICAgICAgICB0aGlzLnNvdXJjZVkgPSB0aGlzLmZyYW1lc1tpbmRleF0uc3k7XHJcbiAgICB9XHJcblxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLnJ1bm5pbmcpe1xyXG4gICAgICAgICAgICB0aGlzLnNldEZyYW1lKDApO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRGcmFtZSgpIHtcclxuICAgICAgICBpZigodGhpcy5jdXJyZW50RnJhbWUgKyAxKSA9PSB0aGlzLnRvdGFsRnJhbWVzKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZyYW1lKDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RnJhbWUodGhpcy5jdXJyZW50RnJhbWUgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIGlmKCF0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxhc3RUaW1lID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKHRpbWUgLSB0aGlzLmxhc3RUaW1lKSA+IHRoaXMuc3BlZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0RnJhbWUoKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtTcHJpdGV9IGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBcnRpZmFjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzcHJpdGUsIHgsIHksIHdpZHRoLCBoZWlnaHQsIHR5cGUpIHtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvblNoYXBlID0ge1xyXG4gICAgICAgICAgICB4OiB4LCBcclxuICAgICAgICAgICAgeTogeSwgXHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCwgXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTsgICBcclxuICAgICAgICB0aGlzLnNwcml0ZS5zZXRYWSh4LCB5KTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNwcml0ZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyU2hlZXQgfSBmcm9tIFwiLi9jaGFyYWN0ZXItc2hlZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2R5IHtcclxuICAgIGNvbnN0cnVjdG9yKHtpbWFnZU5hbWUsIHNwZWVkLCB4ID0gMCwgeSA9IDAsIHN0YW5kID0gJ3VwJ30pIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yKCd1cCcsIDApO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9ucyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uU2hhcGUgPSB7eDogMTgsIHk6IDE1LCB3aWR0aDogMjgsIGhlaWdodDogNDl9O1xyXG5cclxuICAgICAgICBjb25zdCBhbmltYXRpb25TaGVldCA9IG5ldyBDaGFyYWN0ZXJTaGVldCh7aW1hZ2VOYW1lOiBpbWFnZU5hbWV9KTtcclxuICAgICAgICBcIndhbGstZG93bix3YWxrLXVwLHdhbGstbGVmdCx3YWxrLXJpZ2h0XCIuc3BsaXQoXCIsXCIpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uc1tuYW1lXSA9IGFuaW1hdGlvblNoZWV0LmdldEFuaW1hdGlvbihuYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN0YW5kKHN0YW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdBbmltYXRpb24oaW1hZ2VOYW1lKXtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbnMgPSB7fVxyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblNoZWV0ID0gbmV3IENoYXJhY3RlclNoZWV0KHtpbWFnZU5hbWU6IGltYWdlTmFtZX0pO1xyXG4gICAgICAgIFwid2Fsay1kb3duLHdhbGstdXAsd2Fsay1sZWZ0LHdhbGstcmlnaHRcIi5zcGxpdChcIixcIikuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zW25hbWVdID0gYW5pbWF0aW9uU2hlZXQuZ2V0QW5pbWF0aW9uKG5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3RhbmQodGhpcy52ZWxvY2l0eS5kaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHdhbGsoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5zZXREaXJlY3Rpb24oZGlyZWN0aW9uLCB0aGlzLnNwZWVkKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLmFuaW1hdGlvbnNbXCJ3YWxrLVwiICsgZGlyZWN0aW9uXTtcclxuICAgICAgICB0aGlzLnZpZXcucnVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhbmQoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5zZXREaXJlY3Rpb24oZGlyZWN0aW9uLCAwKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSB0aGlzLmFuaW1hdGlvbnNbXCJ3YWxrLVwiICsgZGlyZWN0aW9uXTtcclxuICAgICAgICB0aGlzLnZpZXcuc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgaWYodGhpcy5sYXN0VGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnggKz0gKHRpbWUgLSB0aGlzLmxhc3RUaW1lKSAqICh0aGlzLnZlbG9jaXR5LnggLyAxMDAwKTtcclxuICAgICAgICB0aGlzLnkgKz0gKHRpbWUgLSB0aGlzLmxhc3RUaW1lKSAqICh0aGlzLnZlbG9jaXR5LnkgLyAxMDAwKTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcclxuICAgICAgICB0aGlzLnZpZXcuc2V0WFkoTWF0aC50cnVuYyh0aGlzLngpLE1hdGgudHJ1bmModGhpcy55KSk7XHJcbiAgICAgICAgdGhpcy52aWV3LnVwZGF0ZSh0aW1lKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gICAgY29uc3RydWN0b3Ioe3dpZHRoID0gNjQwLCBoZWlnaHQgPSA2NDAsIGxpbWl0WCA9IDUwMDAwLCBsaW1pdFkgPSA1MDAwMCwgc2Nyb2xsRWRnZSA9IDIwMH0gPSB7fSkge1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5saW1pdFggPSBsaW1pdFg7XHJcbiAgICAgICAgdGhpcy5saW1pdFkgPSBsaW1pdFk7XHJcbiAgICAgICAgdGhpcy53YXRjaE9iamVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNjcm9sbEVkZ2UgPSBzY3JvbGxFZGdlO1xyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoKG9iaikge1xyXG4gICAgICAgIHRoaXMud2F0Y2hPYmplY3QgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub2JqID0gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgaWYodGhpcy53YXRjaE9iamVjdCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLm9iai54ID4gKHRoaXMueCArIHRoaXMud2lkdGggLSB0aGlzLnNjcm9sbEVkZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSBNYXRoLm1pbih0aGlzLmxpbWl0WCwgdGhpcy5vYmoueCAtIHRoaXMud2lkdGggKyB0aGlzLnNjcm9sbEVkZ2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm9iai54IDwgKHRoaXMueCArIHRoaXMuc2Nyb2xsRWRnZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IE1hdGgubWF4KDAsIHRoaXMub2JqLnggLSB0aGlzLnNjcm9sbEVkZ2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm9iai55ID4gKHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gdGhpcy5zY3JvbGxFZGdlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gTWF0aC5taW4odGhpcy5saW1pdFksIHRoaXMub2JqLnkgLSB0aGlzLmhlaWdodCArIHRoaXMuc2Nyb2xsRWRnZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMub2JqLnkgPCAodGhpcy55ICsgdGhpcy5zY3JvbGxFZGdlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gTWF0aC5tYXgoMCwgdGhpcy5vYmoueSAtIHRoaXMuc2Nyb2xsRWRnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGVTaGVldCB9IGZyb20gJy4vc3ByaXRlLXNoZWV0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJTaGVldCBleHRlbmRzIFNwcml0ZVNoZWV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHtpbWFnZU5hbWV9KSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6IGltYWdlTmFtZSxcclxuICAgICAgICAgICAgaW1hZ2VXaWR0aDogODMyLFxyXG4gICAgICAgICAgICBpbWFnZUhlaWdodDogMTM0NFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VxdWVuY2VzID0gdGhpcy5nZXRTZXF1ZW5jZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXF1ZW5jZXMoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoJy4vbWFwcy9wbGF5ZXIuanNvbicpO1xyXG4gICAgICAgIGNvbnN0IHNlcXVlbmNlcyA9IHt9O1xyXG4gICAgICAgIGRhdGEubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgICAgICBzZXF1ZW5jZXNbbGF5ZXIubmFtZV0gPSBsYXllci5kYXRhLmZpbHRlcihpID0+IGkgPiAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VxdWVuY2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFuaW1hdGlvbihuYW1lLCBzcGVlZCA9IDEwMCwgcmVwZWF0ID0gdHJ1ZSwgYXV0b3J1biA9IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0QW5pbWF0aW9uKHRoaXMuc2VxdWVuY2VzW25hbWVdLCBzcGVlZCwgcmVwZWF0LCBhdXRvcnVuKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb2xsaWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXRpY1NoYXBlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYm9kaWVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3RhdGljU2hhcGVzKGRhdGEpIHtcclxuICAgICAgICBkYXRhLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICAgICAgaWYobGF5ZXIudHlwZSA9PSBcIm9iamVjdGdyb3VwXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGljU2hhcGVzLnB1c2goLi4ubGF5ZXIub2JqZWN0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRLaW5lbWF0aWNCb2R5KGJvZHkpIHtcclxuICAgICAgICB0aGlzLmJvZGllcy5wdXNoKHtcclxuICAgICAgICAgICAgeDogYm9keS54LFxyXG4gICAgICAgICAgICB5OiBib2R5LnksXHJcbiAgICAgICAgICAgIG9iajogYm9keVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja1N0YXRpYyh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1N0YXRpYyh0aW1lKSB7XHJcbiAgICAgICAgdGhpcy5ib2RpZXMuZm9yRWFjaChib2R5ID0+IHtcclxuICAgICAgICAgICAgbGV0IG9sZFggPSBib2R5Lng7XHJcbiAgICAgICAgICAgIGxldCBvbGRZID0gYm9keS55O1xyXG4gICAgICAgICAgICBsZXQgeCA9IGJvZHkub2JqLng7XHJcbiAgICAgICAgICAgIGxldCB5ID0gYm9keS5vYmoueTtcclxuICAgICAgICAgICAgLy9tb3ZpbmcgcmlnaHRcclxuICAgICAgICAgICAgaWYoeCA+IG9sZFgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGljU2hhcGVzLmZvckVhY2goc2hhcGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKG9sZFggLSAxICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLndpZHRoKSA8IHNoYXBlLngpICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS54ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUud2lkdGgpID4gc2hhcGUueCkgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgoeSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnkpIDwgKHNoYXBlLnkgKyBzaGFwZS5oZWlnaHQpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUuaGVpZ2h0KSA+IHNoYXBlLnkpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBNYXRoLm1pbih4ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLndpZHRoLCBzaGFwZS54KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCAtIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL21vdmluZyBsZWZ0XHJcbiAgICAgICAgICAgIGlmKHggPCBvbGRYKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRpY1NoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihcclxuICAgICAgICAgICAgICAgICAgICAgICAgKChvbGRYICsgMSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLngpID4gKHNoYXBlLnggKyBzaGFwZS53aWR0aCkpICYmIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS54KSA8IChzaGFwZS54ICsgc2hhcGUud2lkdGgpKSAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh5ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueSkgPCAoc2hhcGUueSArIHNoYXBlLmhlaWdodCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgoeSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS5oZWlnaHQpID4gc2hhcGUueSlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGgubWF4KHggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS54ICwgc2hhcGUueCArIHNoYXBlLndpZHRoKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gYm9keS5vYmouY29sbGlzaW9uU2hhcGUueDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9tb3ZpbmcgZG93blxyXG4gICAgICAgICAgICBpZih5ID4gb2xkWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aWNTaGFwZXMuZm9yRWFjaCggc2hhcGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKG9sZFkgLSAxICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLmhlaWdodCkgPCBzaGFwZS55KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUuaGVpZ2h0KSA+IHNoYXBlLnkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgKCh4ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCkgPCAoc2hhcGUueCArIHNoYXBlLndpZHRoKSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAoKHggKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS54ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUud2lkdGgpID4gc2hhcGUueClcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGgubWluKHkgKyBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUuaGVpZ2h0LCBzaGFwZS55KSAtIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnkgLSBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL21vdmluZyB1cFxyXG4gICAgICAgICAgICBpZih5IDwgb2xkWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0aWNTaGFwZXMuZm9yRWFjaCggc2hhcGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKG9sZFkgKyAxICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueSkgPiAoc2hhcGUueSArIHNoYXBlLmhlaWdodCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgoeSArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLnkpIDwgKHNoYXBlLnkgKyBzaGFwZS5oZWlnaHQpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICgoeCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLngpIDwgKHNoYXBlLnggKyBzaGFwZS53aWR0aCkpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgKCh4ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueCArIGJvZHkub2JqLmNvbGxpc2lvblNoYXBlLndpZHRoKSA+IHNoYXBlLngpXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLm1heCh5ICsgYm9keS5vYmouY29sbGlzaW9uU2hhcGUueSwgc2hhcGUueSArIHNoYXBlLmhlaWdodCkgLSBib2R5Lm9iai5jb2xsaXNpb25TaGFwZS55O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBib2R5LnggPSB4O1xyXG4gICAgICAgICAgICBib2R5LnkgPSB5O1xyXG4gICAgICAgICAgICBib2R5Lm9iai54ID0geDtcclxuICAgICAgICAgICAgYm9keS5vYmoueSA9IHk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDb250cm9sU3RhdGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy51cCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2V5TWFwID0gbmV3IE1hcChbXHJcbiAgICAgICAgICAgIFszNywgJ2xlZnQnXSxcclxuICAgICAgICAgICAgWzM5LCAncmlnaHQnXSxcclxuICAgICAgICAgICAgWzM4LCAndXAnXSxcclxuICAgICAgICAgICAgWzQwLCAnZG93biddLFxyXG4gICAgICAgICAgICBbMzIsICd1c2UnXSxcclxuICAgICAgICAgICAgWzQ5LCAnb25lJ10sXHJcbiAgICAgICAgICAgIFs1MCwgJ3R3byddLFxyXG4gICAgICAgICAgICBbNTEsICd0aHJlZSddLFxyXG4gICAgICAgICAgICBbNTIsICdmb3VyJ11cclxuICAgICAgICBdKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZShldmVudCwgdHJ1ZSkpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB0aGlzLnVwZGF0ZShldmVudCwgZmFsc2UpKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZXZlbnQsIHByZXNzZWQpIHtcclxuICAgICAgICBpZih0aGlzLmtleU1hcC5oYXMoZXZlbnQua2V5Q29kZSkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXNbdGhpcy5rZXlNYXAuZ2V0KGV2ZW50LmtleUNvZGUpXSA9IHByZXNzZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NyZWVuIH0gZnJvbSAnLi9zY3JlZW4nO1xyXG5pbXBvcnQgeyBMb2FkaW5nIH0gZnJvbSAnLi9zY2VuZXMvbG9hZGluZyc7XHJcbmltcG9ydCB7IE1lbnUgfSBmcm9tICcuL3NjZW5lcy9tZW51JztcclxuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tICcuL3NjZW5lcy9sZXZlbCc7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSAnLi9zY2VuZSc7XHJcbmltcG9ydCB7IENvbnRyb2xTdGF0ZSB9IGZyb20gJy4vY29udHJvbC1zdGF0ZSc7XHJcbmltcG9ydCB7IEZpbmlzaCB9IGZyb20gJy4vc2NlbmVzL2ZpbmlzaCc7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7d2lkdGggPSA2NDAsIGhlaWdodCA9IDY0MH0gPSB7fSkge1xyXG4gICAgICAgIHRoaXMuc2NyZWVuID0gbmV3IFNjcmVlbih3aWR0aCxoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuLmxvYWRJbWFnZXMoe1xyXG5cdFx0XHRwbGF5ZXI6ICdpbWcvcGxheWVyLnBuZycsXHJcblx0XHRcdHRpdGxlOiAnaW1nL3RpdGxlLmpwZycsXHJcbiAgICAgICAgICAgIHRpbGVzOiAnaW1nL3RpbGVzLnBuZycgLFxyXG4gICAgICAgICAgICBaYW11cmVua286ICdpbWcvWmFtdXJlbmtvLnBuZycsXHJcbiAgICAgICAgICAgIFN0ZXBhbjogJ2ltZy9TdGVwYW4ucG5nJyAgLFxyXG4gICAgICAgICAgICBLb25vbmVua286ICdpbWcvS29ub25lbmtvLnBuZycgICxcclxuICAgICAgICAgICAgT3ZjaGFyZW5rbzogJ2ltZy9PdmNoYXJlbmtvLnBuZycgICxcclxuICAgICAgICAgICAgWWFtYW5vdjogJ2ltZy9ZYW1hbm92LnBuZycgICxcclxuICAgICAgICAgICAgU21ldG5ldjogJ2ltZy9TbWV0bmV2LnBuZycgICxcclxuICAgICAgICAgICAgTGFyeWFub3Zza3k6ICdpbWcvTGFyeWFub3Zza3kucG5nJyAgLFxyXG4gICAgICAgICAgICBwbGF5ZXIyOiAnaW1nL3BsYXllcjIucG5nJyAgLFxyXG4gICAgICAgICAgICBLdWRyaWF2dGNldjogJ2ltZy9LdWRyaWF2dGNldi5wbmcnICAsXHJcbiAgICAgICAgICAgIFNvbG92ZXY6ICdpbWcvU29sb3Zldi5wbmcnICAsXHJcbiAgICAgICAgICAgIE1hdHZlZXY6ICdpbWcvTWF0dmVldi5wbmcnICAsXHJcbiAgICAgICAgICAgIFlhdW56ZW06ICdpbWcvWWF1bnplbS5wbmcnICAsXHJcbiAgICAgICAgICAgIEJhcnlzaG5pa292YTogJ2ltZy9CYXJ5c2huaWtvdmEucG5nJyAgLFxyXG4gICAgICAgICAgICBLaXlhbW92YTogJ2ltZy9LaXlhbW92YS5wbmcnLFxyXG4gICAgICAgICAgICBjdXJhdG9yOiAnaW1nL2N1cmF0b3IucG5nJyxcclxuICAgICAgICAgICAgYXJ0aWZhY3RzOiAnaW1nL2FydGlmYWN0cy5wbmcnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnaW1nL2JhY2tncm91bmQucG5nJyxcclxuICAgICAgICAgICAgZGVzazogJ2ltZy9kZXNrLnBuZycsXHJcbiAgICAgICAgICAgIG1pc3Npb246ICdpbWcvbWlzc2lvbi5wbmcnLFxyXG4gICAgICAgICAgICBDb21wZXRpdG9yOiAnaW1nL0NvbXBldGl0b3IucG5nJyxcclxuICAgICAgICAgICAgVm9sa292YTogJ2ltZy9Wb2xrb3ZhXzIucG5nJyxcclxuICAgICAgICAgICAgVGl0b3Y6ICdpbWcvVGl0b3YucG5nJyxcclxuICAgICAgICAgICAgS2F0YWV2OiAnaW1nL0thdGFldi5wbmcnLFxyXG4gICAgICAgICAgICBBbmRyemhldnNrYXlhOiAnaW1nL0FuZHJ6aGV2c2theWFfMi5wbmcnLFxyXG4gICAgICAgICAgICBLb2xvZGV6bmlrb3ZhOiAnaW1nL0tvbG9kZXpuaWtvdmFfMi5wbmcnLFxyXG4gICAgICAgICAgICBTb2xvZ3ViOiAnaW1nL1NvbG9ndWJfMi5wbmcnLFxyXG4gICAgICAgICAgICBUZXBpa2luOiAnaW1nL1RlcGlraW5fMi5wbmcnLFxyXG4gICAgICAgICAgICBQdXNoa2luOiAnaW1nL1B1c2hraW5fMi5wbmcnLFxyXG4gICAgICAgICAgICBMZWJlZGV2OiAnaW1nL0xlYmVkZXZfMi5wbmcnLFxyXG4gICAgICAgICAgICBLaXNlbDogJ2ltZy9LaXNlbF8yLnBuZycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQyOiAnaW1nL2JhY2tncm91bmQyLnBuZycsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gbmV3IENvbnRyb2xTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2NlbmVzID0ge1xyXG4gICAgICAgICAgICBsb2FkaW5nOiBuZXcgTG9hZGluZyh0aGlzKSxcclxuICAgICAgICAgICAgbWVudTogbmV3IE1lbnUodGhpcyksXHJcbiAgICAgICAgICAgIGxldmVsOiBuZXcgTGV2ZWwodGhpcyksXHJcbiAgICAgICAgICAgIGZpbmlzaDogbmV3IEZpbmlzaCh0aGlzKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSB0aGlzLnNjZW5lcy5sb2FkaW5nO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTY2VuZShzdGF0dXMpIHtcclxuICAgICAgICBzd2l0Y2goc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmUuTE9BREVEOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzLm1lbnU7XHJcbiAgICAgICAgICAgIGNhc2UgU2NlbmUuU1RBUlRfR0FNRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5sZXZlbDtcclxuICAgICAgICAgICAgY2FzZSBTY2VuZS5GSU5JU0hFRDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5maW5pc2g7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXMubWVudTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnJhbWUodGltZSkge1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNjZW5lLnN0YXR1cyAhPSBTY2VuZS5XT1JLSU5HKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gdGhpcy5jaGFuZ2VTY2VuZSh0aGlzLmN1cnJlbnRTY2VuZS5zdGF0dXMpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLnJlbmRlcih0aW1lKTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGltZSA9PiB0aGlzLmZyYW1lKHRpbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWUgPT4gdGhpcy5mcmFtZSh0aW1lKSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xyXG4gICAgY29uc3RydWN0b3IoaW1hZ2VGaWxlcykge1xyXG4gICAgICAgIHRoaXMuaW1hZ2VGaWxlcyA9IGltYWdlRmlsZXM7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKCkge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiB0aGlzLmltYWdlRmlsZXMpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRJbWFnZShuYW1lLCB0aGlzLmltYWdlRmlsZXNbbmFtZV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkSW1hZ2UobmFtZSwgc3JjKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW25hbWVdID0gaW1hZ2U7XHJcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUobmFtZSk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc2t5ZW5nZGF5Z2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgICBza3llbmdkYXlnYW1lLnJ1bigpO1xyXG59OyIsImltcG9ydCB7IEJvZHkgfSBmcm9tIFwiLi9ib2R5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTlBDIGV4dGVuZHMgQm9keXtcclxuICAgIGNvbnN0cnVjdG9yKGltYWdlTmFtZSwgbmFtZSwgeCwgeSwgc3RhbmQpe1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiBpbWFnZU5hbWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiAxNTAsXHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgIHN0YW5kOiBzdGFuZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pbWFnZU5hbWUgPSBpbWFnZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBzdXBlci51cGRhdGUodGltZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCb2R5IH0gZnJvbSAnLi9ib2R5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBCb2R5IHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2wsIHNjcmVlbiwgeCwgeSwgaW1hZ2VOYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoe2ltYWdlTmFtZTogaW1hZ2VOYW1lLCBzcGVlZDogMTUwLCB4OiB4LCB5OiB5fSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sID0gY29udHJvbDtcclxuICAgICAgICB0aGlzLnNjcmVlbiA9IHNjcmVlbjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIGlmKHRoaXMuY29udHJvbC51cCkge1xyXG4gICAgICAgICAgICB0aGlzLndhbGsoXCJ1cFwiKTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5jb250cm9sLmRvd24pIHtcclxuICAgICAgICAgICAgdGhpcy53YWxrKFwiZG93blwiKTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5jb250cm9sLmxlZnQpIHtcclxuICAgICAgICAgICAgdGhpcy53YWxrKFwibGVmdFwiKTtcclxuICAgICAgICB9IGVsc2UgaWYodGhpcy5jb250cm9sLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FsayhcInJpZ2h0XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhbmQodGhpcy52ZWxvY2l0eS5kaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VwZXIudXBkYXRlKHRpbWUpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFNjZW5lIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gdGhpcy5jb25zdHJ1Y3Rvci5XT1JLSU5HO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgV09SS0lORygpIHsgcmV0dXJuICdXT1JLSU5HJzsgfVxyXG4gICAgc3RhdGljIGdldCBMT0FERUQoKSB7IHJldHVybiAnTE9BREVEJzsgfVxyXG4gICAgc3RhdGljIGdldCBTVEFSVF9HQU1FKCkgeyByZXR1cm4gJ1NUQVJUX0dBTUUnOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEZJTklTSEVEKCkgeyByZXR1cm4gJ0ZJTklTSEVEJzsgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB0aGlzLmNvbnN0cnVjdG9yLldPUktJTkc7XHJcbiAgICB9XHJcblxyXG4gICAgZmluaXNoKHN0YXR1cykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih0aW1lKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4uL3NjZW5lJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaW5pc2ggZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIodGltZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZmlsbCgnIzM0OTdkYScpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4ucHJpbnQoMjYwLCAyNTAsIFwi0JrQvtC90LXRhiDQuNCz0YDRiyFcIik7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5wcmludCgyMjUsIDMwMCwgXCLQndCw0LQg0LjQs9GA0L7QuSDRgNCw0LHQvtGC0LDQu9C4OlwiKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50KDE2NSwgMzQwLCBcItCQ0LvQtdC60YHQsNC90LTRgCDQpNGA0L7Qu9C60L7QsiAtINGB0YbQtdC90LDRgNC40YHRglwiKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50KDY1LCAzNjAsIFwi0JDQu9C10LrQsNC90LTRgCDQk9GD0YDQuNC9IC0g0YDQsNC30YDQsNCx0L7RgtGH0LjQuiwg0L/QvtC80L7RidGM0L3QuNC6INC00LjQt9Cw0LnQvdC10YDQsFwiKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50KDE2NSwgMzgwLCBcItCa0YDQuNGB0YLQuNC90LAg0J/RgNC+0YXQvtGA0L7QstCwIC0g0LTQuNC30LDQudC90LXRgFwiKTtcclxuICAgICAgICBzdXBlci5yZW5kZXIodGltZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4uL3NjZW5lJztcclxuaW1wb3J0IHsgU3ByaXRlU2hlZXQgfSBmcm9tICcuLi9zcHJpdGUtc2hlZXQnO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJTaGVldCB9IGZyb20gJy4uL2NoYXJhY3Rlci1zaGVldCc7XHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL3BsYXllcic7XHJcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gJy4uL2NhbWVyYSc7XHJcbmltcG9ydCB7IFRlYWNoZXIgfSBmcm9tICcuLi90ZWFjaGVyJztcclxuaW1wb3J0IHsgQm9keSB9IGZyb20gJy4uL2JvZHknO1xyXG5pbXBvcnQgeyBBcnRpZmFjdCB9IGZyb20gJy4uL2FydGlmYWN0JztcclxuaW1wb3J0IHsgTlBDIH0gZnJvbSAnLi4vbnBjJztcclxuaW1wb3J0IHsgU3RvcnkgfSBmcm9tICcuLi9zdG9yeSc7XHJcbmltcG9ydCB7IENvbGxpZGVyIH0gZnJvbSAnLi4vY29sbGlkZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIExldmVsIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgICAgIHRoaXMudGlsZXMgPSBuZXcgU3ByaXRlU2hlZXQoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6ICd0aWxlcycsXHJcbiAgICAgICAgICAgIGltYWdlV2lkdGg6IDY0MCxcclxuICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IDY0MFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYXJ0aWZhY3RzdGlsZXMgPSBuZXcgU3ByaXRlU2hlZXQoe1xyXG4gICAgICAgICAgICBpbWFnZU5hbWU6ICdhcnRpZmFjdHMnLFxyXG4gICAgICAgICAgICBpbWFnZVdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0OiA2NDBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoZ2FtZS5jb250cm9sLCBnYW1lLnNjcmVlbiwgOTcxLCAxMzY4LCAncGxheWVyMicpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIgPSBuZXcgQ29sbGlkZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ucGMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ2N1cmF0b3InLCAn0JrRg9GA0LDRgtC+0YAnLCAxMDA5LjQ5LCAxMzcwLjUxLCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdPdmNoYXJlbmtvJywgJ9Cb0LjQt9CwINCe0LLRh9Cw0YDQtdC90LrQvicsIDk4OS41LCAxMjc4LCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdNYXR2ZWV2JywgJ9Cl0LDRgNC40YLQvtC9JywgOTkxLjUsIDc2MC4zMywgJ2xlZnQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnU29sb3ZldicsICfQk9C+0YjQsCcsIDU2Ni45NSwgMTcxOC4wOCwgJ3JpZ2h0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0xhcnlhbm92c2t5JywgJ9CQ0LvQtdC60YHQsNC90LTRgCDQm9Cw0YDRjNGP0L3QvtCy0YHQutC40LknLCA2NTYuODcsIDE0NzAuNDUsICdyaWdodCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdTbWV0bmV2JywgJ9CU0LXQvdC40YEg0KHQvNC10YLQvdC10LInLCAxOTkuMzksIDIxNzAuNzMsICdkb3duJyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0tpeWFtb3ZhJywgJ9CQ0L3QuNGB0LAnLCA1MDQuNTYsIDczNy45MiwgJ3JpZ2h0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0JhcnlzaG5pa292YScsICfQktC40YLQsCcsIDc2OS42MSwgMjIyMC43OSwgJ2xlZnQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnU3RlcGFuJywgJ9Ch0YLQtdC/0LDQvScsIDUwNy4wMiwgNTMwLjMyLCAnZG93bicpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdZYW1hbm92JywgJ9CQ0L3QtNGA0LXQuSDQr9C80LDQvdC+0LInLCAxMTQ0LjM2LCA4NzcuODUsICdsZWZ0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0t1ZHJpYXZ0Y2V2JywgJ9CT0LvQtdCxINCa0YPQtNGA0Y/QstGG0LXQsicsIDYwNC40NiwgMTM0NS40OSwgJ2Rvd24nKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnWWF1bnplbScsICfQkNC90LTRgNC10Lkg0K/Rg9C90LfQtdC8JywgNjgxLjg4LCAxMDgwLjM2LCAncmlnaHQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnWmFtdXJlbmtvJywgJ9Ca0L7RgdGC0Y8g0JfQsNC80YPRgNC10L3QutC+JywgODM0LjQzLCAxNTgwLjUxLCAndXAnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnS29ub25lbmtvJywgJ9Ch0LDRiNCwINCa0L7QvdC+0L3QtdC90LrQvicsIDUxNiwgMTQ3NCwgJ3JpZ2h0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0NvbXBldGl0b3InLCAn0JLQvtCy0LAg0JjQstCw0L3QvtCyJywgMTA5OCwgOTAsICdkb3duJyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ1ZvbGtvdmEnLCAn0JjRgNC40L3QsCDQktC+0LvQutC+0LLQsCcsIDExNTEsIDQ0NSwgJ2xlZnQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnVGl0b3YnLCAn0JzQsNC60YHQuNC8INCi0LjRgtC+0LInLCA5OTMsIDYzNiwgJ2xlZnQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnS2F0YWV2JywgJ9CQ0LvQtdC60YHQtdC5INCa0LDRgtCw0LXQsicsIDgzLCAyMTczLCAncmlnaHQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnQW5kcnpoZXZza2F5YScsICfQr9C90LAg0JDQvdC00YDQtdC20LXQstGB0LrQsNGPJywgNDU2LCA4NTUsICdyaWdodCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdLb2xvZGV6bmlrb3ZhJywgJ9Cv0L3QsCDQmtC+0LvQvtC00LXQt9C90LjQutC+0LLQsCcsIDU2MCwgODU2LCAnbGVmdCcpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdTb2xvZ3ViJywgJ9CT0LvQtdCxINCh0L7Qu9C+0LPRg9CxJywgMTE1MiwgMTAyMywgJ2Rvd24nKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnVGVwaWtpbicsICfQn9Cw0LLQtdC7INCi0LXQv9C40LrQuNC9JywgOTYwLCAyOTMsICdkb3duJyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ1B1c2hraW4nLCAn0JTQtdC90LjRgSDQn9GD0YjQutC40L0nLCA4MDMsIDczNCwgJ3JpZ2h0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0xlYmVkZXYnLCAn0KHQtdGA0LPQtdC5INCb0LXQsdC10LTQtdCyJywgODE0LCAxOTU2LCAnZG93bicpLFxyXG4gICAgICAgICAgICBuZXcgTlBDKCdLaXNlbCcsICfQldC70LXQvdCwINCa0LjRgdC10LvRjCcsIDcwNCwgOTYxLCAncmlnaHQnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnS3VkcmlhdnRjZXYnLCAnJywgNjQwLCAxNzIsICdkb3duJyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ0t1ZHJpYXZ0Y2V2JywgJycsIDY0MCwgMzM5LCAndXAnKSxcclxuICAgICAgICAgICAgbmV3IE5QQygnWWF1bnplbScsICcnLCA1NjUsIDI2NywgJ3JpZ2h0JyksXHJcbiAgICAgICAgICAgIG5ldyBOUEMoJ1lhdW56ZW0nLCAnJywgNzEwLCAyNTYsICdsZWZ0JyksXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy5hcnRpZmFjdHMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgMTAyNCwgMzgyLCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDExNTIsIDM4MiwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCAxMDI0LCAyNTYsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgMTE1MiwgMjU1LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDEwMjQsIDEyNywgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCAxMTUyLCAxMjcsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgyKSwgOTAxLCAzNTIsIDE5LCAzMSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgyKSwgOTAxLCAyMjMsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgyKSwgOTAwLCA5NSwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA0NTQsIDEyNzksIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNTc4LCAxMjgwLCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDY0MiwgMTI4MCwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA3MDYsIDEyODAsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNDU0LCAxNDA3LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDU3OCwgMTQwNywgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA2NDIsIDE0MDcsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNzA2LCAxNDA3LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDQ1NCwgMTUzNiwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA1NzgsIDE1MzYsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNjQyLCAxNTM2LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDcwNiwgMTUzNiwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA0NTQsIDE2NjUsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNTc4LCAxNjY1LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDY0MiwgMTY2NSwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA3MDYsIDE2NjUsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNTEyLCAxNzkxLCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMyksIDYzOSwgMTk4MywgMTksIDMxLCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDMpLCA2MzksIDIwNDcsIDE5LCAzMSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNzAzLCAyMDQ4LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMSksIDc2NywgMjA0OCwgMzAsIDE5LCAncGMnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEpLCA3MDMsIDIxNzQsIDMwLCAxOSwgJ3BjJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxKSwgNzY3LCAyMTc0LCAzMCwgMTksICdwYycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoNCksIDgzMiwgNzA1LCAyNCwgMjIsICdjb2ZmZWUnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDUpLCA2NCwgMjI0MCwgMjUsIDIzLCAnanVybmFsJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSg2KSwgODQ4LCAxNzEyLCAyMiwgMjIsICdyYWRpbycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoNyksIDg0OCwgMTMyOCwgMjcsIDIzLCAnbm90ZScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoOCksIDkwMCwgMTI0MCwgNywgMTQsICdjYXNzZXR0ZScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoOSksIDEwNTYsIDEyMTUsIDY0LCAxLCAnbWlzc2lvbicpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoOSksIDExMjAsIDEyMTUsIDY0LCAxLCAnbWlzc2lvbicpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTApLCA1NjcsIDE5ODQsIDEsIDY0LCAnY29kZScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTApLCA1NjcsIDIwNDgsIDEsIDY0LCAnY29kZScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTEpLCA3MDksIDU3NiwgMSwgNjQsICd0YXNrMicpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTEpLCA4ODYsIDU3NywgMSwgNjQsICd0YXNrMycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTIpLCA5MDIsIDE0MDksIDEzLCAxMywgJ3RhcG9jaGtpJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMiksIDk2MSwgMTE4NCwgNjQsIDY0LCAndGFzazEnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDUpLCA0NTYsIDcwNCwgMjUsIDIzLCAnanVybmFsQW5pcycpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTQpLCAxMjgsIDIyNDAsIDY0LCA2NCwgJ3NvZmEnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDE1KSwgMTkyLCAyMjQwLCA2NCwgNjQsICdzb2ZhJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxNCksIDMyMCwgMjI0MCwgNjQsIDY0LCAnc29mYScpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTUpLCAzODQsIDIyNDAsIDY0LCA2NCwgJ3NvZmEnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDE2KSwgNzA1LCA3NTksIDY0LCA2NCwgJ3dhdGVyJyksXHJcbiAgICAgICAgICAgIG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxNyksIDgwMCwgMTA5OCwgNjQsIDY0LCAndHJhc2gnKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEwMCksIDg0OCwgMTMyOCwgMjcsIDIzLCAnbm90ZTInKSxcclxuICAgICAgICAgICAgbmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEwMCksIDY0MiwgNDI3LCAyNywgMjMsICdmaW5hbCcpLFxyXG4gICAgICAgICAgICBuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTAwKSwgNjQwLCAyNTgsIDI3LCAyMywgJ2ZpbmFsMicpLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcnkgPSBuZXcgU3Rvcnkoe1xyXG4gICAgICAgICAgICBwbGF5ZXI6IHRoaXMucGxheWVyLFxyXG4gICAgICAgICAgICBjb250cm9sOiBnYW1lLmNvbnRyb2wsXHJcbiAgICAgICAgICAgIG5wYzogdGhpcy5ucGMsXHJcbiAgICAgICAgICAgIGFydGlmYWN0czogdGhpcy5hcnRpZmFjdHMsXHJcbiAgICAgICAgICAgIGNvbGxpZGVyOiB0aGlzLmNvbGxpZGVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICAgICAgY29uc3QgbWFwRGF0YSA9IHJlcXVpcmUoJy4uL21hcHMvb2ZmaWNlLmpzb24nKTtcclxuICAgICAgICB0aGlzLm1hcCA9IHRoaXMuZ2FtZS5zY3JlZW4uY3JlYXRlTWFwKCdsZXZlbCcsIG1hcERhdGEsIHRoaXMudGlsZXMpO1xyXG4gICAgICAgIHRoaXMubWFpbkNhbWVyYSA9IG5ldyBDYW1lcmEoe1xyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5nYW1lLnNjcmVlbi53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmdhbWUuc2NyZWVuLmhlaWdodCxcclxuICAgICAgICAgICAgbGltaXRYOiB0aGlzLm1hcC53aWR0aCAtIHRoaXMuZ2FtZS5zY3JlZW4ud2lkdGgsXHJcbiAgICAgICAgICAgIGxpbWl0WTogdGhpcy5tYXAuaGVpZ2h0IC0gdGhpcy5nYW1lLnNjcmVlbi5oZWlnaHRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1haW5DYW1lcmEud2F0Y2godGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uc2V0Q2FtZXJhKHRoaXMubWFpbkNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5hZGRTdGF0aWNTaGFwZXMobWFwRGF0YSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5hZGRLaW5lbWF0aWNCb2R5KHRoaXMucGxheWVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9yeS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBpZih0aGlzLnN0b3J5Lm5ld1BsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5uZXdBbmltYXRpb24oJ3BsYXllcicpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lm5ld1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ucGMuZm9yRWFjaChucGMgPT4ge1xyXG4gICAgICAgICAgICBucGMudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3RvcnkudXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB0aGlzLm1haW5DYW1lcmEudXBkYXRlKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih0aW1lKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUodGltZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5kcmF3U3ByaXRlKHRoaXMubWFwKTsgXHJcbiAgICAgICAgdGhpcy5hcnRpZmFjdHMuZm9yRWFjaChhcnRpZmFjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd1Nwcml0ZShhcnRpZmFjdC5zcHJpdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubnBjLmZvckVhY2gobnBjID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5kcmF3U3ByaXRlKG5wYy52aWV3KTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5wcmludE5hbWUobnBjKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmRyYXdTcHJpdGUodGhpcy5wbGF5ZXIudmlldyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubG9va2luZyAmJiAhdGhpcy5zdG9yeS5sb29rRGVzayAmJiAhdGhpcy5zdG9yeS5sb29rTWlzc2lvbikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50U2F5KHRoaXMuc3RvcnkuZGlhb2xvZ3NbdGhpcy5zdG9yeS5zdGF0dXNdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5wcmludFRhc2sodGhpcy5zdG9yeS5jdXJyZW50VGFzayk7XHJcbiAgICAgICAgaWYodGhpcy5zdG9yeS5sb29rRGVzaykge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmRyYXdJbWFnZSgwLCAwLCAnZGVzaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0b3J5Lmxvb2tNaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY3JlZW4uZHJhd0ltYWdlKDAsIDAsICdtaXNzaW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkuZmluZCAmJiAhdGhpcy5zdG9yeS5maW5kRW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgNTI3LCAxMzQ0LCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgNTU3LCAxMTkwLCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgNzE0LCAxMTc0LCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgNzc4LCAxMDMxLCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgODM0LCA5MTUsIDI3LCAyMywgJycpKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMucHVzaChuZXcgQXJ0aWZhY3QodGhpcy5hcnRpZmFjdHN0aWxlcy5nZXRTcHJpdGUoMTMpLCA5MDYsIDcxNSwgMjcsIDIzLCAnJykpO1xyXG4gICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5wdXNoKG5ldyBBcnRpZmFjdCh0aGlzLmFydGlmYWN0c3RpbGVzLmdldFNwcml0ZSgxMyksIDkwNywgNDg5LCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgMTEwMiwgMzAzLCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLnB1c2gobmV3IEFydGlmYWN0KHRoaXMuYXJ0aWZhY3RzdGlsZXMuZ2V0U3ByaXRlKDEzKSwgMTEwMywgMTA4LCAyNywgMjMsICcnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkuZmluZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5LmZpbmRFbmQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0b3J5Lmxvb2tDaHJpc3R5ICYmICF0aGlzLnN0b3J5Lmxvb2tDaHJpc3R5Xykge1xyXG4gICAgICAgICAgICB2YXIgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgICAgICB2aWRlby5zcmM9XCJ2aWRlby9DaHJpc3R5Lm1wNFwiO1xyXG4gICAgICAgICAgICB2aWRlby5hdXRvcGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIDMyMCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCAyNDApO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImFhYVwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWRlbyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubG9va0NocmlzdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rQ2hyaXN0eV8gPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWFhJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sMTMwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0b3J5Lmxvb2tTYXNoYSAmJiAhdGhpcy5zdG9yeS5sb29rU2FzaGFfKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNyYz1cInZpZGVvL1Nhc2hhLm1wNFwiO1xyXG4gICAgICAgICAgICB2aWRlby5hdXRvcGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIDMyMCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCAyNDApO1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImJiYlwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWRlbyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubG9va1Nhc2hhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubG9va1Nhc2hhXyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYmInKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwxMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubG9va05hdGFzaGEgJiYgIXRoaXMuc3RvcnkubG9va05hdGFzaGFfKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNyYz1cInZpZGVvL05hdGEubXA0XCI7XHJcbiAgICAgICAgICAgIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgMzIwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIDI0MCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2NjXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rTmF0YXNoYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tOYXRhc2hhXyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjY2MnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSw3MDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zdG9yeS5sb29rTGVhZGVyICYmICF0aGlzLnN0b3J5Lmxvb2tMZWFkZXJfKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNyYz1cInZpZGVvL0NhcGl0YW4ubXA0XCI7XHJcbiAgICAgICAgICAgIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgMzIwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIDI0MCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGRkXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rTGVhZGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubG9va0xlYWRlcl8gPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGRkJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sMzUwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0b3J5Lmxvb2tVcyAmJiAhdGhpcy5zdG9yeS5sb29rVXNfKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNyYz1cInZpZGVvL21haW4ubXA0XCI7XHJcbiAgICAgICAgICAgIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgMzIwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIDI0MCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZWVlXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rVXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rVXNfID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VlZScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LDIzMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zdG9yeS5sb29rTWFpbiAmJiAhdGhpcy5zdG9yeS5sb29rTWFpbl8pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICAgICAgdmlkZW8uc3JjPVwidmlkZW8vbWFpbjIubXA0XCI7XHJcbiAgICAgICAgICAgIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgMzIwKTtcclxuICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIDI0MCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZmZmXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9yeS5sb29rTWFpbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lmxvb2tNYWluXyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmZmYnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSw4MTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc3RvcnkubXVzaWMgJiYgIXRoaXMuc3RvcnkubXVzaWNfKSB7XHJcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIGF1ZGlvLnNyYz1cImF1ZGlvL21haW4ubXAzXCI7XHJcbiAgICAgICAgICAgIGF1ZGlvLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZ2dnXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1ZGlvKTtcclxuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3J5Lm11c2ljID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcnkubXVzaWNfID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dnZycpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LDIyNDAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdXBlci5yZW5kZXIodGltZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gJy4uL3NjZW5lJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgICAgIHN1cGVyKGdhbWUpO1xyXG4gICAgICAgIHRoaXMubG9hZGVkQXQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMubG9hZGVkQXQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICAgICAgaWYodGhpcy5sb2FkZWRBdCA9PSAwICYmIHRoaXMuZ2FtZS5zY3JlZW4uaXNJbWFnZXNMb2FkZWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZEF0ID0gdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb2FkZWRBdCAhPSAwICYmICh0aW1lIC0gdGhpcy5sb2FkZWRBdCkgPiA1MDApIHtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2goU2NlbmUuTE9BREVEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKHRpbWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLmZpbGwoJyMzNjlBRDknKTtcclxuICAgICAgICB0aGlzLmdhbWUuc2NyZWVuLnByaW50KDUwLCA3MCwgXCJMb2FkaW5nLi4uXCIpO1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcih0aW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSAnLi4vc2NlbmUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lbnUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICAgICAgc3VwZXIoZ2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBzdXBlci5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBpZih0aGlzLmdhbWUuY29udHJvbC51c2UpIHtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2goU2NlbmUuU1RBUlRfR0FNRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih0aW1lKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUodGltZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5kcmF3SW1hZ2UoMCwgMCwgJ3RpdGxlJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNjcmVlbi5wcmludCgyNTAsIDUwMCwgXCLQndCw0LbQvNC40YLQtSDQv9GA0L7QsdC10LtcIik7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKHRpbWUpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL2ltYWdlLWxvYWRlcidcclxuaW1wb3J0IHsgVGlsZU1hcCB9IGZyb20gJy4vdGlsZS1tYXAnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICB0aGlzLmltYWdlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZXNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pc0NhbWVyYVNldCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENhbWVyYShjYW1lcmEpIHtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB0aGlzLmlzQ2FtZXJhU2V0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkSW1hZ2VzKGltYWdlRmlsZXMpIHtcclxuICAgICAgICBjb25zdCBsb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXIoaW1hZ2VGaWxlcyk7XHJcbiAgICAgICAgbG9hZGVyLmxvYWQoKS50aGVuKChuYW1lcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcyA9IE9iamVjdC5hc3NpZ24odGhpcy5pbWFnZXMsIGxvYWRlci5pbWFnZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdjYW52YXMnKTtcclxuICAgICAgICBsZXQgY2FudmFzID0gZWxlbWVudHNbMF0gfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gY2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU1hcChuYW1lLCBtYXBEYXRhLCB0aWxlc2V0KSB7XHJcbiAgICAgICAgY29uc3QgbWFwSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBtYXBJbWFnZS53aWR0aCA9IG1hcERhdGEud2lkdGggKiBtYXBEYXRhLnRpbGV3aWR0aDtcclxuICAgICAgICBtYXBJbWFnZS5oZWlnaHQgPSBtYXBEYXRhLmhlaWdodCAqIG1hcERhdGEudGlsZWhlaWdodDtcclxuICAgICAgICBjb25zdCBtYXBDb250ZXh0ID0gbWFwSW1hZ2UuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBjb25zdCBoaXRib3hlcyA9IFtdO1xyXG4gICAgICAgIGxldCByb3csIGNvbDtcclxuICAgICAgICBtYXBEYXRhLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICAgICAgaWYobGF5ZXIudHlwZSA9PSAndGlsZWxheWVyJykge1xyXG4gICAgICAgICAgICAgICAgcm93ID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICBsYXllci5kYXRhLmZvckVhY2goaW5kZXggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBDb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlc1t0aWxlc2V0LmltYWdlTmFtZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0LmdldFNvdXJjZVgoaW5kZXgpLCB0aWxlc2V0LmdldFNvdXJjZVkoaW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGF0YS50aWxld2lkdGgsIG1hcERhdGEudGlsZWhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbCAqIG1hcERhdGEudGlsZXdpZHRoLCByb3cgKiBtYXBEYXRhLnRpbGVoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBEYXRhLnRpbGV3aWR0aCwgbWFwRGF0YS50aWxlaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb2wrKztcclxuICAgICAgICAgICAgICAgICAgICBpZihjb2wgPiAobWFwRGF0YS53aWR0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxheWVyLnR5cGUgPT0gJ29iamVjdGdyb3VwJykge1xyXG4gICAgICAgICAgICAgICAgaGl0Ym94ZXMucHVzaCguLi5sYXllci5vYmplY3RzLm1hcChvYmogPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICB4MTogb2JqLngsIFxyXG4gICAgICAgICAgICAgICAgICAgIHgyOiBvYmoueCArIG9iai53aWR0aCwgXHJcbiAgICAgICAgICAgICAgICAgICAgeTE6IG9iai55LCBcclxuICAgICAgICAgICAgICAgICAgICB5Mjogb2JqLnkgKyBvYmouaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW1hZ2VzW25hbWVdID0gbWFwSW1hZ2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaWxlTWFwKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICBzb3VyY2VYOiAwLFxyXG4gICAgICAgICAgICBzb3VyY2VZOiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogbWFwSW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogbWFwSW1hZ2UuaGVpZ2h0LFxyXG4gICAgICAgICAgICBoaXRib3hlczogaGl0Ym94ZXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaWxsKGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpbnQoeCwgeSwgdGV4dCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IFwiMjJweCBHZW9yZ2lhXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaW50VGFzayh0ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UoMCwgNTcwLCAnYmFja2dyb3VuZDInKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIjE2cHggR2VvcmdpYVwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcItCX0LDQtNCw0YfQsDogXCIgKyB0ZXh0LCAzMCwgNjEyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmludE5hbWUocGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gXCIxNHB4IEdlb3JnaWFcIjtcclxuICAgICAgICB2YXIgbmFtZSA9IHtcclxuICAgICAgICAgICAgeDogcGxheWVyLnggLSB0aGlzLmNhbWVyYS54IC0gKHBsYXllci5uYW1lLnNwbGl0KCcgJylbMF0ubGVuZ3RoICogMyAtIHBsYXllci5jb2xsaXNpb25TaGFwZS53aWR0aCksXHJcbiAgICAgICAgICAgIHk6IHBsYXllci55IC0gdGhpcy5jYW1lcmEueSxcclxuICAgICAgICAgICAgdGV4dDogcGxheWVyLm5hbWUuc3BsaXQoJyAnKVswXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHN1Ym5hbWUgPSB7fTtcclxuICAgICAgICBpZihwbGF5ZXIubmFtZS5zcGxpdCgnICcpLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgc3VibmFtZS54ID0gIHBsYXllci54IC0gdGhpcy5jYW1lcmEueCAtIChwbGF5ZXIubmFtZS5zcGxpdCgnICcpWzFdLmxlbmd0aCAqIDMgLSBwbGF5ZXIuY29sbGlzaW9uU2hhcGUud2lkdGgpO1xyXG4gICAgICAgICAgICBzdWJuYW1lLnkgPSBwbGF5ZXIueSAtIHRoaXMuY2FtZXJhLnk7XHJcbiAgICAgICAgICAgIHN1Ym5hbWUudGV4dCA9IHBsYXllci5uYW1lLnNwbGl0KCcgJylbMV1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJuYW1lID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3VibmFtZSAhPSBudWxsKSB0aGlzLmNvbnRleHQuZmlsbFRleHQoc3VibmFtZS50ZXh0LCBzdWJuYW1lLngsIHN1Ym5hbWUueSAtIDEwKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQobmFtZS50ZXh0LCBuYW1lLngsIG5hbWUueSk7XHJcbiAgICB9XHJcbiAgICBwcmludFNheSh0ZXh0LCBtb2RlKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3SW1hZ2UoMCwgMCwgJ2JhY2tncm91bmQnKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSBcIjE2cHggR2VvcmdpYVwiO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0ZXh0WzBdLCA0MCwgNTUpO1xyXG4gICAgICAgIGlmKHRleHQubGVuZ3RoID4gMSkgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRleHRbMV0sIDQwLCA3NSk7XHJcbiAgICAgICAgaWYodGV4dC5sZW5ndGggPiAyKSB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dFsyXSwgNDAsIDk1KTtcclxuICAgICAgICBpZighbW9kZSkgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFwiPNCf0YDQvtCx0LXQuz4g0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y9cIiwgMzg1LCAxMDkpO1xyXG4gICAgICAgIGVsc2UgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFwiPNCm0LjRhNGA0LA+INC00LvRjyDQvtGC0LLQtdGC0LBcIiwgMzk1LCAxMDkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdJbWFnZSh4LCB5LCBpbWFnZU5hbWUpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW2ltYWdlTmFtZV0sIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTcHJpdGUoc3ByaXRlKSB7XHJcblxyXG4gICAgICAgIGxldCBzcHJpdGVYID0gc3ByaXRlLng7XHJcbiAgICAgICAgbGV0IHNwcml0ZVkgPSBzcHJpdGUueTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0NhbWVyYVNldCkge1xyXG4gICAgICAgICAgICBzcHJpdGVYIC09IHRoaXMuY2FtZXJhLng7XHJcbiAgICAgICAgICAgIHNwcml0ZVkgLT0gdGhpcy5jYW1lcmEueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKFxyXG4gICAgICAgICAgICAoc3ByaXRlWCA+PSB0aGlzLndpZHRoKSB8fFxyXG4gICAgICAgICAgICAoc3ByaXRlWSA+PSB0aGlzLmhlaWdodCkgfHwgXHJcbiAgICAgICAgICAgICgoc3ByaXRlWCArIHNwcml0ZS53aWR0aCkgPD0gMCkgfHxcclxuICAgICAgICAgICAgKChzcHJpdGVZICsgc3ByaXRlLmhlaWdodCkgPD0gMClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZVggPSBzcHJpdGUuc291cmNlWCArIE1hdGguYWJzKE1hdGgubWluKDAsIHNwcml0ZVgpKTtcclxuICAgICAgICBsZXQgc291cmNlWSA9IHNwcml0ZS5zb3VyY2VZICsgTWF0aC5hYnMoTWF0aC5taW4oMCwgc3ByaXRlWSkpO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGgubWluKHRoaXMud2lkdGgsIHNwcml0ZVggKyBzcHJpdGUud2lkdGgpIC0gTWF0aC5tYXgoMCwgc3ByaXRlWCk7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGgubWluKHRoaXMuaGVpZ2h0LCBzcHJpdGVZICsgc3ByaXRlLmhlaWdodCkgLSBNYXRoLm1heCgwLCBzcHJpdGVZKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlc1tzcHJpdGUuaW1hZ2VOYW1lXSxcclxuICAgICAgICAgICAgc291cmNlWCwgXHJcbiAgICAgICAgICAgIHNvdXJjZVksIFxyXG4gICAgICAgICAgICB3aWR0aCwgXHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgTWF0aC5tYXgoMCwgc3ByaXRlWCksIFxyXG4gICAgICAgICAgICBNYXRoLm1heCgwLCBzcHJpdGVZKSwgXHJcbiAgICAgICAgICAgIHdpZHRoLCBcclxuICAgICAgICAgICAgaGVpZ2h0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4vc3ByaXRlJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSAnLi9hbmltYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcml0ZVNoZWV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHtpbWFnZU5hbWUsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCBzcHJpdGVXaWR0aCA9IDY0LCBzcHJpdGVIZWlnaHQgPSA2NH0pIHtcclxuICAgICAgICB0aGlzLmltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgICAgICB0aGlzLmltYWdlV2lkdGggPSBpbWFnZVdpZHRoO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VIZWlnaHQgPSBpbWFnZUhlaWdodDtcclxuICAgICAgICB0aGlzLnNwcml0ZVdpZHRoID0gc3ByaXRlV2lkdGg7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QW5pbWF0aW9uKGluZGV4ZXMsIHNwZWVkLCByZXBlYXQgPSB0cnVlLCBhdXRvcnVuID0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQW5pbWF0aW9uKHtcclxuICAgICAgICAgICAgaW1hZ2VOYW1lOiB0aGlzLmltYWdlTmFtZSxcclxuICAgICAgICAgICAgZnJhbWVzOiBpbmRleGVzLm1hcChpbmRleCA9PiAoe3N4OiB0aGlzLmdldFNvdXJjZVgoaW5kZXgpLCBzeTogdGhpcy5nZXRTb3VyY2VZKGluZGV4KX0pKSxcclxuICAgICAgICAgICAgc3BlZWQ6IHNwZWVkLFxyXG4gICAgICAgICAgICByZXBlYXQ6IHJlcGVhdCxcclxuICAgICAgICAgICAgYXV0b3J1bjogYXV0b3J1bixcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuc3ByaXRlV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5zcHJpdGVIZWlnaHRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTcHJpdGUoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNwcml0ZSh7XHJcbiAgICAgICAgICAgIGltYWdlTmFtZTogdGhpcy5pbWFnZU5hbWUsXHJcbiAgICAgICAgICAgIHNvdXJjZVg6IHRoaXMuZ2V0U291cmNlWChpbmRleCksXHJcbiAgICAgICAgICAgIHNvdXJjZVk6IHRoaXMuZ2V0U291cmNlWShpbmRleCksXHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNwcml0ZVdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3ByaXRlSGVpZ2h0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U291cmNlWChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiAoLS1pbmRleCAqIHRoaXMuc3ByaXRlV2lkdGgpICUgdGhpcy5pbWFnZVdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNvdXJjZVkoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC50cnVuYygoLS1pbmRleCAqIHRoaXMuc3ByaXRlV2lkdGgpIC8gdGhpcy5pbWFnZVdpZHRoKSAqIHRoaXMuc3ByaXRlSGVpZ2h0O1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFNwcml0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7aW1hZ2VOYW1lLCBzb3VyY2VYLCBzb3VyY2VZLCB3aWR0aCA9IDY0LCBoZWlnaHQgPSA2NH0pIHtcclxuICAgICAgICB0aGlzLmltYWdlTmFtZSA9IGltYWdlTmFtZTtcclxuICAgICAgICB0aGlzLnNvdXJjZVggPSBzb3VyY2VYO1xyXG4gICAgICAgIHRoaXMuc291cmNlWSA9IHNvdXJjZVk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRYWSh4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3Rvcnkge1xyXG4gICAgY29uc3RydWN0b3Ioe3BsYXllciwgY29udHJvbCwgbnBjLCBhcnRpZmFjdHMsIGNvbGxpZGVyfSkge1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMuY29udHJvbCA9IGNvbnRyb2w7XHJcbiAgICAgICAgdGhpcy5ucGMgPSBucGM7XHJcbiAgICAgICAgdGhpcy5hcnRpZmFjdHMgPSBhcnRpZmFjdHM7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlciA9IGNvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKXtcclxuICAgICAgICB0aGlzLm5ld1BsYXllciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGFwb2Noa2kgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJsb2NrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvb2tEZXNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb29rTWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmVzaWRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IDA7XHJcbiAgICAgICAgdGhpcy5vbGRTdGF0dXMgPSAwO1xyXG4gICAgICAgIHRoaXMuc3ViU3RhdHVzID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSAtMTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmZpbmlzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSAnJztcclxuICAgICAgICB0aGlzLmRpYW9sb2dzID0gW1xyXG4gICAgICAgICAgICBbXCLQmtGD0YDQsNGC0L7RgDog0J/RgNC40LLQtdGCIVwiXSwvLzBcclxuICAgICAgICAgICAgWy8vMVxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0KLRiyDQvdC+0LLRi9C5INGB0L7RgtGA0YPQtNC90LjQuiDQsiDQutC+0LzQv9Cw0L3QuNC4IFNreWVuZyxcIiAsXHJcbiAgICAgICAgICAgICAgICBcItC80L3QvtCz0L7Qs9C+INC10YnQtSDQvdC1INC30L3QsNC10YjRjCDQuCDRgtC10LHQtSDQv9GA0LXQtNGB0YLQvtC40YIg0LLRgdC10LzRgyDQvdCw0YPRh9C40YLRjNGB0Y8uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMlxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0J/QtdGA0LLRi9C5INGI0LDQsywg0LHQtdC3INC60L7RgtC+0YDQvtCz0L4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItGC0Ysg0L3QtSDQtNCy0LjQvdC10YjRjNGB0Y8g0LTQsNC70YzRiNC1INGN0YLQviDRgtGA0LDQtNC40YbQuNGPIFNreUhvbWVcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vM1xyXG4gICAgICAgICAgICAgICAgXCIoPykg0JLQvtC60YDRg9CzINGA0LDQt9C90YvQtSDQv9GA0LXQtNC80LXRgtGLINCyINC60L7QvNC90LDRgtC1LCDQvdGD0LbQvdC+INCy0YvQsdGA0LDRgtGMINCy0LXRgNC90YvQuVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzRcclxuICAgICAgICAgICAgICAgIFwi0KLQsNC/0L7Rh9C60Lg6INC90LDQttC80LjRgtC1IDxzcGFjZT4g0LTQu9GPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Y8uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNVxyXG4gICAgICAgICAgICAgICAgXCLQm9C40LfQsDog0KLRiyDRh9GC0L4t0YLQviDQt9Cw0LHRi9C7IVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzZcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0K8g0L/QvtC50LTRgyDQv9C+0LjRidGDINC/0L7Qu9GD0YfRiNC1IVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzdcclxuICAgICAgICAgICAgICAgIFwi0JvQuNC30LA6INCt0LksINCx0YPQtNGMINC/0YDQvtGJ0LUhXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vOFxyXG4gICAgICAgICAgICAgICAgXCIoPykg0J/QvtC00YPQvNCw0LksINGH0YLQviDQvNC10YjQsNC10YIg0YLQtdCx0LUg0LjQtyDQvtC00LXQttC00Ys/XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vOVxyXG4gICAgICAgICAgICAgICAgXCIoPykg0J3Rg9C20L3QviDQt9Cw0LzQtdC90LjRgtGMINGB0LzQvtC60LjQvdCzINC90LAg0L7QsdGL0YfQvdGD0Y4g0L7QtNC10LbQtNGDLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzEwXHJcbiAgICAgICAgICAgICAgICBcIig/KSDQn9C10YDQtdC0INC90LDRh9Cw0LvQvtC8INGA0LDQsdC+0YLRiyDQvNC+0LbQvdC+INCy0YvQv9C40YLRjCDRh9Cw0YjQtdGH0LrRgyDQutC+0YTQtSDQvdCwINC60YPRhdC90LUuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTFcclxuICAgICAgICAgICAgICAgIFwi0JrQvtGE0LU6INC90LDQttC80LjRgtC1IDxzcGFjZT4g0LTQu9GPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Y8uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTJcclxuICAgICAgICAgICAgICAgIFwiKD8pINCi0LXQv9C10YDRjCDQvNC+0LbQvdC+INC40LTRgtC4INC6INC60YPRgNCw0YLQvtGA0YMg0LfQsCDQt9Cw0LTQsNC90LjRj9C80LguXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTNcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCvINC00YPQvNCw0Y4g0YLRiyDQvtGC0LvQuNGH0L3QviDQstC/0LjRiNC10YjRjNGB0Y8g0LIg0L3QsNGIINC60L7Qu9C70LXQutGC0LjQsiwg0L3QviDQtNC70Y8g0L3QsNGH0LDQu9CwLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0L/QvtC30L3QsNC60L7QvNGB0Y8g0YEg0L3QsNGI0LjQvNC4INC+0YHQvdC+0LLQsNGC0LXQu9GP0LzQuCDQuCDRg9C/0YDQsNCy0LvRj9GO0YnQuNC8INC/0LDRgNGC0L3QtdGA0L7QvCDQvdCw0LnQtNC4IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQutCw0LbQtNC+0LPQviDQuNC3INC90LjRhSDQv9C+INC/0L7QtNGB0LrQsNC30LrQsNC8LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE0XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQktC+0YIg0YHQv9C40YHQvtC6LCDRgtGLINC00L7Qu9C20LXQvSDQv9C+0LTRhdC+0LTQuNGC0Ywg0Log0LrQsNC20LTQvtC80YMg0LjQtyDQvdC40YUg0YHQvtCz0LvQsNGB0L3QviBcIixcclxuICAgICAgICAgICAgICAgIFwi0L/QvtC00YHQutCw0LfQutC1INC4INC/0L7RgdC70LUg0LLQvtC30LLRgNCw0YnQsNGC0YzRgdGPINC60L4g0LzQvdC1LCDQstGB0LUg0L/QvtC90Y/RgtC90L4/XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTVcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0K/RgdC90L4sINC00YPQvNCw0Y4g0YHQv9GA0LDQstC70Y7RgdGMKVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE2XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQntC6LiDQotC+0LPQtNCwINC90LDRh9C90LXQvC5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xN1xyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0J/RgNC+INGN0YLQvtCz0L4g0YfQtdC70L7QstC10LrQsCDRgtC10LHQtSDRgNCw0YHRgdC60LDQttC10YIg0JPQu9C10LEg0JrRg9C00YDRj9Cy0YbQtdCyLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QsNC50LTQuCDQtdCz0L4g0Lgg0YDQsNGB0YHQv9GA0L7RgdC4INC+INC90LXQvC4gXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMThcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCd0LDRiCDQtNC+0Lwg0L3QtSDRgdC70LjRiNC60L7QvCDQsdC+0LvRjNGI0L7QuSwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0L7RjdGC0L7QvNGDINGC0LXQsdC1INC90LUg0YHQvtGB0YLQsNCy0LjRgiDRgtGA0YPQtNCwINGB0LTQtdC70LDRgtGMINGN0YLQvi5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xOVxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0KfRgtC+0LHRiyDQvdCw0LzQtdC60L3Rg9GC0YwsINC90LDQv9C+0LzQvdC4INCT0LvQtdCx0YMg0LjRgdGC0L7RgNC40Y4g0YEg0JDQu9C10LrRgdC10LXQvCBcIixcclxuICAgICAgICAgICAgICAgIFwi0JjQstCw0L3QvtCy0YvQvCwg0L7QvSDQtNCw0LLQsNC7INC10LzRgyDQuNC90YLQtdGA0LLRjNGOLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzIwXHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCf0YDQuNCy0LXRgiwg0JPQu9C10LEhINCvINC90L7QstC10L3RjNC60LjQuSDQuCDQtNC+0LvQttC10L0g0L3QsNC50YLQuCDQv9C+INC/0L7QtNGB0LrQsNC30LrQsNC8IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQstGB0LXRhSDQuNC3INGN0YLQvtCz0L4g0YHQv9C40YHQutCwLiDQnNC90LUg0L3Rg9C20L3QviDRg9C30L3QsNGC0Ywg0L/RgNC+INGH0LXQu9C+0LLQtdC60LAsINC+INC60L7RgtC+0YDQvtC8IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgtGLINCz0L7QstC+0YDQuNC7INGBINCy0LXQtNGD0YnQuNC8INC60LDQvdCw0LvQsCBQb25jaGlrTmV3cyDQkNC70LXQutGB0LXQtdC8INCY0LLQsNC90L7QstGL0LwuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjFcclxuICAgICAgICAgICAgICAgIFwi0JPQu9C10LE6INCf0YDQuNCy0LXRgiEg0J3RgyDRgtGLINCy0YHQv9C+0LzQvdC40LsuLi4uLi7QnNGLINC80L3QvtCz0L4g0L4g0LrQvtC8INCx0LXRgdC10LTQvtCy0LDQu9C4LCBcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QviDRjyDQtNGD0LzQsNGOINGC0LDQuiDQsdGD0LTQtdGCINC40L3RgtC10YDQtdGB0L3QtdC1KSDQrdGC0L7RgiDRh9C10LvQvtCy0LXQuiDRgdGD0L/QtdGA0LPQu9GD0LHQvtC60LjQuSBcIixcclxuICAgICAgICAgICAgICAgIFwi0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDQvNC+0LfQsy4g0JTRg9C80LDRjiDRjdGC0LjQvCDQstGB0LUg0YHQutCw0LfQsNC90L4uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjJcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0KXQvC4uLi7RgdC/0LDRgdC40LHQviwg0L3QviDQv9C+0YfRgtC4INCy0YHQtSDQvtC90Lgg0YPRh9C40LvQuNGB0Ywg0LIg0JzQpNCi0JguLi4uLtC/0L7QutCwXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjNcclxuICAgICAgICAgICAgICAgIFwi0JPQu9C10LE6INCt0LksINGC0LXRgdGC0LjRgNGD0Lkg0L3QsCDQv9GA0L7QtNC1LCDQt9C00LXRgdGMINCy0YHQtSDRgtCw0Log0LTQtdC70LDRjtGCIVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzI0XHJcbiAgICAgICAgICAgICAgICBcItCQ0L3QtNGA0LXQuTog0JzQvtC70L7QtNC10YYg0L3QvtCy0LjRh9C+0LosINGF0L7RgtGPINGPINC00YPQvNCw0Y4g0YLQtdCx0LUg0L/RgNC+0YHRgtC+INC/0L7QstC10LfQu9C+LiBcIixcclxuICAgICAgICAgICAgICAgIFwi0J/QvtGB0LzQvtGC0YDQuNC8INC00L7QudC00LXRiNGMINC70Lgg0YLRiyDQtNC+INC60L7QvdGG0LAuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjVcclxuICAgICAgICAgICAgICAgIFwiKD8pINCd0YPQttC90L4g0LLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjZcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCc0L7Qu9C+0LTQtdGGISDQodC70LXQtNGD0Y7RidGD0Y4g0L/QvtC00YHQutCw0LfQutGDINC40YnQuCDQsiDRgdGC0LDRgtGM0LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcImh0dHA6Ly9wdWxzZS5yYmMucnUvLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzI3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCYINGC0LDQuiwg0LzQvdC1INC/0YDQuNCz0L7QtNC40YLRgdGPINC60L7QvNC/0YzRjtGC0LXRgC4uLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzI4XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCl0LwuLi4g0KLRgNC10LHRg9C10YIg0L/QsNGA0L7Qu9GMINC+0YIgV2lGaSwg0YPRgtC+0YfQvdGOINGDINC60YPRgNCw0YLQvtGA0LAuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMjlcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JAg0LPQtNC1INC80L3QtSDRg9C30L3QsNGC0Ywg0L/QsNGA0L7Qu9GMINC+IFdpLUZpP1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzMwXHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQktGB0LUg0L/RgNC+0YHRgtC+LCDQvdCw0LnQtNC4INGH0LXQu9C+0LLQtdC60LAsINC60L7RgtC+0YDRi9C5INC10LPQviDQv9GA0LjQtNGD0LzQsNC7LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzMxXHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCQ0L3QtNGA0LXQuSwg0L/RgNC40LLQtdGCISDQnNC90LUg0L3Rg9C20LXQvSDQtNC+0YHRgtGD0L8g0LIg0LjQvdGC0LXRgNC90LXRgiDQuCDRjyBcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QtSDQt9C90LDRjiDQv9Cw0YDQvtC70YwsINC80L3QtSDQs9C+0LLQvtGA0LjQu9C4LCDRh9GC0L4g0YLRiyDQtdCz0L4g0L/RgNC40LTRg9C80LDQuy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8zMlxyXG4gICAgICAgICAgICAgICAgXCLQkNC90LTRgNC10Lk6INCf0YDQuNCy0LXRgiEg0KLQsNC6INC4INC10YHRgtGMLiDQndC+INC10YHQu9C4INGPINC/0YDQvtGB0YLQviDQvtGC0LLQtdGH0YMsINCx0YPQtNC10YIgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC90LUg0LjQvdGC0LXRgNC10YHQvdC+LiDQnNGLINCy0YHQtSDRgNCw0LfQstC40LLQsNC10LzRgdGPINC4INC/0L7RjdGC0L7QvNGDLCDQstC+0YIg0LfQsNC00LDQvdC40LUg0L7RgiDQvNC10L3Rjy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8zM1xyXG4gICAgICAgICAgICAgICAgXCLQkNC90LTRgNC10Lk6INCS0YHQv9C+0LzQvdC4INC40LvQuCDRg9C30L3QsNC5INGE0YDQsNC30YMsINCz0LvQsNCy0Ysg0KDQvtGB0YHQuNC50YHQutC+0LPQviDRhNGD0YLQsdC+0LvRjNC90L7Qs9C+IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgdC+0Y7Qt9CwINCS0LjRgtCw0LvQuNGPINCc0YPRgtC60L4sINGB0LrQsNC30LDQvdC90YPRjiDQuNC8ICDQvdCwINC30LDRgdC10LTQsNC90LjQuCDQuNGB0L/QvtC70LrQvtC80LAg0KTQmNCk0JAgXCIsXHJcbiAgICAgICAgICAgICAgICBcItCyIDIwMTAg0LPQvtC00YMgLSDRjdGC0L4g0Lgg0LHRg9C00LXRgiDQvtGC0LLQtdGCINC90LAg0YLQstC+0Lkg0LLQvtC/0YDQvtGBLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzM0XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCU0LAuLi4g0JLRgdC/0L7QvNC90LjQuyEg0K3RgtC+IFxcXCJsZXRtZXNwZWFrZnJvbW15aGVhcnRcXFwiLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzM1XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCf0L7RiNC10Lsg0LHRi9GB0YLRgNC10Lkg0Log0LrQvtC80L/RjNGO0YLQtdGA0YMuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzZcclxuICAgICAgICAgICAgICAgIFwi0JjQvdGE0L7RgNC80LDRhtC40Y8g0L3QsCBQdWxzZTog0K3RgtC+0YIg0YfQtdC70L7QstC10Log0L7Rh9C10L3RjCDQu9GO0LHQuNGCINGB0L/QvtGA0YIsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvtC9INC+0YfQtdC90Ywg0YHQu9C10LTQuNGCINC30LAg0YHQstC+0LjQvCDQt9C00L7RgNC+0LLRjNC10LwsINCy0LXRgdGMINC10LPQviDRgNCw0YbQuNC+0L0gXCIsXHJcbiAgICAgICAgICAgICAgICBcItGB0LHQsNC70LDQvdGB0LjRgNC+0LLQsNC9LCDRgyDQvdC10LPQviDQstGB0LUg0YHQuNGB0YLQtdC80L3QviDQuCDQv9C+INGH0LDRgdCw0LwuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzdcclxuICAgICAgICAgICAgICAgIFwi0KXQsNGA0LjRgtC+0L06INCi0YDRg9C0IOKAlCDQvtCx0LvQsNCz0L7RgNCw0LbQuNCy0LDQtdGCINGH0LXQu9C+0LLQtdC60LAuINCU0LDQstCw0LnRgtC1INGB0LrQvtGA0LXQtSDQutCw0YLQuNGC0YwhXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzhcclxuICAgICAgICAgICAgICAgIFwiKD8pINCd0YPQttC90L4g0LLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMzlcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCi0Ysg0YXQvtGA0L7RiNC+INGB0L/RgNCw0LLQu9GP0LXRiNGM0YHRjyEg0JvRjtCx0LjRiNGMINGH0LjRgtCw0YLRjCDQuCDRgNCw0LfQstC40LLQsNGC0YzRgdGPPyBcIixcclxuICAgICAgICAgICAgICAgIFwi0J3QsNC50LTQuCDQsdC40LfQvdC10YEg0LbRg9GA0L3QsNC7IOKAnNCW0LDQttC00LDigJ0gLCDQstC+0LfQvNC+0LbQvdC+INCyINC90LXQvCDQsdGD0LTQtdGCINGH0YLQvi3RgtC+IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQuNC90YLQtdGA0LXRgdC90L7QtS4g0J/QvtGB0LvQtdC00L3QuNC5INGA0LDQtyDQstC40LTQtdC70LAg0LXQs9C+INCyINCx0LjQsdC70LjQvtGC0LXQutC1LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzQwXHJcbiAgICAgICAgICAgICAgICBcItCW0YPRgNC90LDQuyDQltCw0LbQtNCwOiDQodC+0L7RgdC90L7QstCw0YLQtdC70YwgU2t5ZW5nOiDQnNC+0LUg0LPQu9Cw0LLQvdC+0LUg0YXQvtCx0LHQuCDigJMg0LzQvtGPINGA0LDQsdC+0YLQsCwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGB0LXRgNGM0LXQt9C90L4uINCe0L3QsCDQtNC70Y8g0LzQtdC90Y8g0YHQtdC50YfQsNGBINC90LAg0L/QtdGA0LLQvtC8INC80LXRgdGC0LUuINCa0YDQvtC80LUg0YLQvtCz0L4sINGD0LLQu9C10LrQsNC10YIgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0L7RgdGC0L7Rj9C90L3QvtC1INGA0LDQt9Cy0LjRgtC40LUg4oCTINC60LDQuiDQvNC+0LUg0LvQuNGH0L3QvtC1LCDRgtCw0Log0LggU2t5ZW5nLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzQxXHJcbiAgICAgICAgICAgICAgICBcItCT0L7RiNCwOiDQkiDQsdC40LfQvdC10YHQtSwg0LrQsNC6INCyINC70Y7QsdCy0Lgg4oCUINGH0LXQvCDQsdC+0LvRjNGI0LUg0LPQvtCy0L7RgNC40YjRjCwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGC0LXQvCDQutGA0LXQv9GH0LUg0L7RgtC90L7RiNC10L3QuNGPLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzQyXHJcbiAgICAgICAgICAgICAgICBcIig/KSDQndGD0LbQvdC+INCy0LXRgNC90YPRgtGM0YHRjyDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzQzXHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQpdC+0YDQvtGI0LjQuSDRgtC10LzQvyFcIiBcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDRcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCvINC/0YDQvtGH0LjRgtCw0Lsg0L7QtNC90YMg0YHRgtCw0YLRjNGOINC/0YDQviDQs9Cw0LTQsNC90LjQtSDQvdCwINC60L7RhNC10LnQvdC+0Lkg0LPRg9GJ0LUsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvtC90L4g0L/QvtC/0YPQu9GP0YDQvdC+INCyINC90LXQutC+0YLQvtGA0YvRhSDQutGA0YPQs9Cw0YUuINCQINGC0Ysg0LrQvtCz0LTQsCDQv9C40Lsg0LrQvtGE0LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC90LjRh9C10LPQviDQvdC1INC30LDQvNC10YLQuNC7INC90LAg0YHRgtC10L3QsNGFINC60YPRhdC90Lg/XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDVcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0J3QtdGCLCDQv9C+0LnQtNGDINC/0L7RgdC80L7RgtGA0Y4g0LLQvdC40LzQsNGC0LXQu9GM0L3QtdC5LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzQ2XHJcbiAgICAgICAgICAgICAgICAvL1wi0J3QsNC00L/QuNGB0Ywg0L3QsCDQtNC+0YHQutC1Li4u0LPQvtGC0L7QstC40YIg0LLQutGD0YHQvdC10LUsINGH0LXQvCA4MCUg0LzQvtGB0LrQvtCy0YHQutC40YUg0LfQsNCy0LXQtNC10L3QuNC5XCJcclxuICAgICAgICAgICAgICAgIFwiXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDdcclxuICAgICAgICAgICAgICAgIFwi0JDQu9C10LrRgdCw0L3QtNGAOiDQl9CwINCy0YHRkSwg0YfRgtC+INGB0L4g0LzQvdC+0Lkg0L/RgNC+0LjRgdGF0L7QtNC40YIsINC+0YLQstC10YfQsNGOINGC0L7Qu9GM0LrQviDRjywgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC00LDQttC1INC10YHQu9C4INGPINC90LAg0Y3RgtC+INC90LUg0LzQvtCz0YMg0L/QvtCy0LvQuNGP0YLRjCDQuCDQvdC1INC80L7Qs9GDINC/0YDQtdC00LLQuNC00LXRgtGMXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNDhcclxuICAgICAgICAgICAgICAgIFwiKD8pINCd0YPQttC90L4g0LLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTBcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCf0L7RgdC70LUg0YLQvtCz0L4g0LrQsNC6INC/0L7Rj9Cy0LjQu9C40YHRjCDQutC+0LzQv9GM0Y7RgtC10YDRiywg0Y8g0L/QtdGA0LXRgdGC0LDQuyBcIixcclxuICAgICAgICAgICAgICAgIFwi0L/QvtC70YzQt9C+0LLQsNGC0YzRgdGPINGA0LDQtNC40L4sINGB0LLQvtC4INC/0LvQtdC50LvQuNGB0YLRiyDQuCDQstGB0LUg0YLQsNC60L7QtS4uLiBcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81MVxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0J3QviDRgdC10LPQvtC00L3RjyDQv9C+0LLRgtC+0YAg0YDQsNC00LjQvtC/0YDQvtCz0YDQsNC80LzRiyBcIixcclxuICAgICAgICAgICAgICAgIFwiwqvQndC+0LLQsNGPINGN0LrQvtC90L7QvNC40LrQsC4g0KHRgtGD0LTQtdC90YLRi8K7LCDQv9C+0YHQu9GD0YjQsNC5LCDQvNC+0LbQtdGCINGC0Ysg0YPQt9C90LDQtdGI0YwsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRh9GC0L4t0YLQviwg0YfRgtC+INC/0L7QvNC+0LbQtdGCINGC0LXQsdC1INC00LDQu9GM0YjQtS4g0J7QsdGL0YfQvdC+INC+0L3QviDQu9C10LbQuNGCINCyINC/0LXRgNC10LPQvtCy0L7RgNC60LUuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTJcclxuICAgICAgICAgICAgICAgIFwi0KDQsNC00LjQvjog0J/RiNGI0YjRiNGIINC/0L7QvNC10YXQuCDQsiDRgNCw0LTQuNC+LiDQv9C+0YLQvtC8INCz0L7Qu9C+0YEuLi4g0LLQvi3Qv9C10YDQstGL0YUsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgyDQvNC10L3RjyDQv9GA0L7Qv9Cw0LvQuCDQstGB0Y/Rh9C10YHQutC40LUg0YXQvtCx0LHQuC4g0KHQtdGA0YzRkdC30L3Qvi4g0JXRgdC70Lgg0LTQviDRjdGC0L7Qs9C+INGPIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQt9Cw0L3QuNC80LDQu9GB0Y8g0YHQsNC80LHQviwg0LfQsNC90LjQvNCw0LvRgdGPINGB0LrQsNC70L7Qu9Cw0LfQsNC90LjQtdC8Li4uINC/0YjRiNGI0YjRiNGILlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzUzXHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCU0LAg0YPQtiwg0YEg0YLQsNC60LjQvCDRgNCw0LTQuNC+INC70YPRh9GI0LUg0LLRgdC1INGC0LDQutC4INC/0LvQtdC50LvQuNGB0YLRiy4uLiBcIixcclxuICAgICAgICAgICAgICAgIFwi0L4g0YfQtdC8INGC0LDQvCDQs9C+0LLQvtGA0LjQu9C+0YHRjC4uLiDRgdCw0LzQsdC+INC4INGB0LrQsNC70L7Qu9Cw0LfQsNC90LjQtS4uLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU0XHJcbiAgICAgICAgICAgICAgICBcItCU0LXQvdC40YE6INCvINC00YPQvNCw0Y4sINGH0YLQviDQtdGB0LvQuCDRgtGLINGB0YLRg9C00LXQvdGCLCDQuCDRgtGLINGF0L7Rh9C10YjRjCwg0YfRgtC+0LHRiyDQsiBcIixcclxuICAgICAgICAgICAgICAgIFwi0LHRg9C00YPRidC10Lwg0YMg0YLQtdCx0Y8g0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0LHRi9C7INGD0YHQv9C10YUsINGC0L7Qs9C00LAg0LHQtdGA0Lgg0L3QsCDRgdC10LHRjyDRjdGC0YMgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC+0YLQstC10YLRgdGC0LLQtdC90L3QvtGB0YLRjCwg0LjQtNC4INGC0YPQtNCwLCDQs9C00LUg0YLQtdCx0LUg0YHQutCw0LbRg9GCOiBcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81NVxyXG4gICAgICAgICAgICAgICAgXCLCq9Ct0YLQviDRgtCy0L7RjyDQt9Cw0LTQsNGH0LAuINCi0Ysg0LTQvtC70LbQtdC9INGBINC90LXQuSDRgdC/0YDQsNCy0LjRgtGM0YHRjyDQuCDQv9C+0YLQvtC8INC/0L7QutCw0LfQsNGC0YwsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRh9GC0L4g0L/QvtC70YPRh9C40LvQvtGB0YzCu1wiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU2XHJcbiAgICAgICAgICAgICAgICBcIig/KSDQndGD0LbQvdC+INCy0LXRgNC90YPRgtGM0YHRjyDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQotGLINC/0L7Qt9C90LDQutC+0LzQuNC70YHRjyDQv9C+0LHQu9C40LbQtSDRgSDQvtGB0L3QvtCy0LDRgtC10LvRj9C80LggU2t5ZW5nINC4INGC0LXQv9C10YDRjCBcIixcclxuICAgICAgICAgICAgICAgIFwi0LzQvtC20LXRiNGMINGD0LLQuNC00LXRgtGMINC40YUg0LjRgdGC0L7RgNC40Y4sINC90LDRiNC4INGA0LXQsdGP0YLQsCDQt9Cw0L/QuNGB0LDQu9C4INC10LUg0LIg0LLQuNC00LXQvtGB0YLRg9C00LjQuCBcIixcclxuICAgICAgICAgICAgICAgIFwi0LogU2t5ZW5nIERheS4gXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNThcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCc0LjQvdGD0YLQutGDLi4uINCn0YLQvj8g0KLQtdCx0Y8g0YHRgNC+0YfQvdC+INCy0YvQt9GL0LLQsNC10YIg0JTQtdC90LjRgSDQodC80LXRgtC90LXQsiwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGB0YDQvtGH0L3QviDQuNC00Lgg0Log0L3QtdC80YMhXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU5XHJcbiAgICAgICAgICAgICAgICBcItCU0LXQvdC40YE6INCjINC80LXQvdGPINC10YHRgtGMINC60LvQuNC10L3RgiDQvdCwIDE5OjAwINCyINGH0LXRgtCy0LXRgNCzLCDQvdC+INC90LXRgiDQv9GA0LXQv9C+0LTQsNCy0LDRgtC10LvRjyEgXCIsXHJcbiAgICAgICAgICAgICAgICBcItCa0YLQvi3RgtC+INC/0L7RgdGC0LDQstC40Lsg0LXQs9C+INCyINGA0LDRgdC/0LjRgdCw0L3QuNC1LCDRhdC+0YLRjyDQstGB0LUg0LTQvtC70LbQvdC+INCx0YvRgtGMINGB0L7Qs9C70LDRgdC+0LLQsNC90L4uIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQrdGC0L4g0L3QtSDQv9C10YDQstCw0Y8g0YHRgtGA0LDQvdC90L7RgdGC0Ywg0LfQsCDQv9C+0YHQu9C10LTQvdC10LUg0LLRgNC10LzRjy4uLiDQvdGDINGN0YLQviDQv9C+0YLQvtC8LiBcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82MFxyXG4gICAgICAgICAgICAgICAgXCLQlNC10L3QuNGBOiDQndCw0LnQtNC4INCT0L7RiNGDLCDQvtC9INGB0LzQvtC20LXRgiDQv9C+0LzQvtGH0Ywg0YDQtdGI0LjRgtGMINGN0YLQvtGCINCy0L7Qv9GA0L7RgSFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNjFcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JTQtdC90LjRgdGDINGB0YDQvtGH0L3QviDQvdGD0LbQtdC9INC/0YDQtdC/0L7QtNCw0LLQsNGC0LXQu9GMINCyINGH0LXRgtCy0LXRgNCzIDE5LjAwLCDRh9GC0L4g0LzQvtC20L3QviBcIixcclxuICAgICAgICAgICAgICAgIFwi0YHQtNC10LvQsNGC0Yw/XCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzYyXHJcbiAgICAgICAgICAgICAgICBcItCT0L7RiNCwOiDQk9C70LDQstC90L7QtSDRgNCw0LHQvtGC0LDRgtGMLCDQsCDQvdC1INGB0YLQvtGP0YLRjCDQvdCwINC80LXRgdGC0LUuINCT0LTQtSDRgtCw0Lwg0LzQvtC5INGB0L/QuNGB0L7QuiDQuNC3IFwiLFxyXG4gICAgICAgICAgICAgICAgXCJIZWFkSHVudGVyLi4uINCS0YHQtSDQs9C+0YLQvtCy0L4uIEPQutCw0LbQuCDQlNC10L3QuNGB0YMg0Lgg0L/RgNC+0LTQvtC70LbQsNC5INGA0LDQsdC+0YLQsNGC0YxcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNjNcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0JPQvtGI0LAg0L3QsNGI0LXQuyDQv9GA0LXQv9C+0LTQsNCy0LDRgtC10LvRjywg0LLRgdC1INCyINC/0L7RgNGP0LTQutC1XCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzY0XHJcbiAgICAgICAgICAgICAgICBcItCU0LXQvdC4Yzog0J7RgtC70LjRh9C90L4uINCT0LTQtSDRgtCw0Lwg0LzQvtC5INCx0LvQvtC60L3QvtGCLi4uIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82NVxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQktC40LTQuNC80L4g0Y8g0LfQtNC10YHRjCDQsdC+0LvRjNGI0LUg0L3QtSDQvdGD0LbQtdC9INC4INC/0L7RgNCwINCy0LXRgNC90YPRgtGM0YHRjyDQuiDQutGD0YDQsNGC0L7RgNGDLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0L7QvSDRh9GC0L4t0YLQviDQs9C+0LLQvtGA0LjQuyDQv9GA0L4g0LfQsNC/0LjRgdGMLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82NlxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQryDQstGL0L/QvtC70L3QuNC7INC30LDQtNCw0L3QuNC1INCU0LXQvdC40YHQsCwg0YLRiyDQs9C+0LLQvtGA0LjQuyDQviDQt9Cw0L/QuNGB0LguLi5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNjdcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCU0LAsINGC0Ysg0YLQtdC/0LXRgNGMINC80L7QttC10YjRjCDQv9C+0YHQvNC+0YLRgNC10YLRjCDQtdC1LiDQmNC00Lgg0LIg0LLQuNC00LXQvtGB0YLRg9C00LjRjiwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGPINC/0YDQtdC00YPQv9GA0LXQtNC40Lsg0L3QsNGB0YfQtdGCINGC0LXQsdGPINCh0YLQtdC/0LDQvdCwLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy82OFxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQn9GA0LjQstC10YIsINCh0YLQtdC/0LDQvSFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNjlcclxuICAgICAgICAgICAgICAgIFwi0KHRgtC10L/QsDog0JrRg9C00LAg0LbQtSDQv9C+0LTQtdCy0LDQu9Cw0YHRjCDRjdGC0LAg0LrQsNGB0YHQtdGC0LA/INCvINCy0YHQtdCz0LTQsCDQv9GA0L7RiNGDINC90LUg0YLRgNC+0LPQsNGC0YwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGH0YPQttC40LUg0LLQtdGJ0LghXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzcwXHJcbiAgICAgICAgICAgICAgICBcIig/KSDQktC+0LfQvNC+0LbQvdC+LCDQtdC1INGB0L/RgNGP0YLQsNC70Lgg0LjQu9C4INGD0LrRgNCw0LvQuC4g0KDQsNC30LHQtdGA0LjRgdGMINCyINGH0LXQvCDQtNC10LvQvi5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzFcclxuICAgICAgICAgICAgICAgIFwi0Jgg0YLQvtC70YzQutC+INGB0LXQudGH0LDRgSDRjyDQstGB0L/QvtC80L3QuNC7INC/0YDQviDRgdC70YPRhdC4LCDQutC+0YLQvtGA0YvQtSDRgdC70YvRiNCw0Lsg0LIg0LrQvtGA0LjQtNC+0YDQsNGFLCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YfRgtC+INCz0LTQtS3RgtC+INCyINC60L7QvNC/0LDQvdC40Lgg0YXQvtC00LjRgiDQutC+0L3QutGD0YDQtdC90YIg0Lgg0LLRgdC10Lwg0L7RgdC70L7QttC90Y/QtdGCINC20LjQt9C90YwuINCd0YPQttC90L4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItC90LDQudGC0Lgg0LXQs9C+INCy0L4g0YfRgtC+0LHRiyDRgtC+INC90Lgg0YHRgtCw0LvQviFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzJcclxuICAgICAgICAgICAgICAgIFwi0JjQs9GA0L7Qujog0KHRgtC10L/QsNC9LCDRgtGLINC80L7QttC10YjRjCDQv9C+0LTRgdC60LDQt9Cw0YLRjCwg0YMg0YLQtdCx0Y8g0LXRgdGC0Ywg0LTQvtCz0LDQtNC60Lgg0LrRgtC+INC80L7QsyBcIixcclxuICAgICAgICAgICAgICAgIFwi0LLQt9GP0YLRjCDQutCw0YHRgdC10YLRgz9cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzNcclxuICAgICAgICAgICAgICAgIFwi0KHRgtC10L/QsNC9OiDQlNCw0LbQtSDQvdC1INC30L3QsNGOLi4uINCjINC90LDRgSDQstC10LTQtdGC0YHRjyDQttGD0YDQvdCw0Lsg0LrRgtC+INC60L7Qs9C00LAg0YHQvdC40LzQsNC10YIg0YHRgtGD0LTQuNGOLiBcIixcclxuICAgICAgICAgICAgICAgIFwi0J7QvSDRgyDQkNC90LjRgdGLINCa0LjRj9C80L7QstC+0LksINC80L7QttC10YjRjCDQvdCw0YfQsNGC0Ywg0YEg0Y3RgtC+0LPQvi4uLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83NFxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQlNGD0LzQsNGOINGN0YLQviDRgtC+INGH0YLQviDQvdCw0LTQviwg0YHQv9Cw0YHQuNCx0L4hXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzc1XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCf0YDQuNCy0LXRgiwg0JDQvdC40YHQsCEg0KHRgtC10L/QsNC9INGB0LrQsNC30LDQuywg0YfRgtC+INGDINGC0LXQsdGPINC20YPRgNC90LDQuyDQutGD0LTQsCDQstGB0LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC30LDQv9C40YHRi9Cy0LDRjtGC0YHRjywg0YfRgtC+0LHRiyDRgdC90Y/RgtGMINGB0YLRg9C00LjRji4g0JzQvtC20L3QviDQstC30LPQu9GP0L3Rg9GC0Ywg0L3QsCDQvdC10LPQvj9cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzZcclxuICAgICAgICAgICAgICAgIFwi0JDQvdC40YHQsDog0J/RgNC40LLQtdGCISDQryDQvdC1INC30L3QsNC60L7QvNCwINGBINGC0L7QsdC+0LksINC+0YfQtdC90Ywg0LzQvdC+0LPQviDQstC10YnQtdC5INCyINC/0L7RgdC70LXQtNC90LXQtSBcIixcclxuICAgICAgICAgICAgICAgIFwi0LLRgNC10LzRjyDQv9C+0L/QsNC00LDQtdGCINC90LUg0LIg0YLQtSDRgNGD0LrQuC4g0KDQsNGB0YHQutCw0LbQuCDQviDQvNC40YHRgdC40Lgg0LrQvtC80L/QsNC90LjQuCwg0YLQvtC70YzQutC+IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQv9GA0LXQtNCw0L3QvdGL0Lkg0LTQtdC70YMg0YfQtdC70L7QstC10Log0LfQvdCw0LXRgiDQtdC1INC90LDQuNC30YPRgdGC0YwuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzc3XHJcbiAgICAgICAgICAgICAgICBcIig/KSDQndCwINGB0YLQvtC70LUg0LvQtdC20LjRgiDQttGD0YDQvdCw0LssINC90L4g0JDQvdC40YHQsCDQvdC1INC00L7QstC10YDRj9C10YIg0YLQtdCx0LUg0YLQsNC6INC60LDQuiDQstC40LTQuNGCINCy0L/QtdGA0LLRi9C1LCBcIixcclxuICAgICAgICAgICAgICAgIFwi0L7QvdCwINC/0YDQvtGB0LjRgiDQv9C+0LTRgtCy0LXRgNC00LjRgtGMINGC0LXQsdGPLCDRh9GC0L4g0YLRiyDRgdC+0YLRgNGD0LTQvdC40Log0YHQutCw0LXQvdCzINC4INGA0LDRgdGB0LrQsNC30LDRgtGMINC10LkgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC80LjRgdGB0LjRjiDQutC+0LzQv9Cw0L3QuNC4LCDRgtCw0Log0LrQsNC6INC60L7QvdC60YPRgNC10L3RgiDQtdC1INGC0L7Rh9C90L4g0L3QtSDQt9C90LDQtdGCLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy83OFxyXG4gICAgICAgICAgICAgICAgXCLQryDQstC40LTQtdC7INC90LDQtNC/0LjRgdC4INC90LAg0YHRgtC10L3QsNGFINCyINC70LDRg9C90LbQtSwg0LLQvtC30LzQvtC20L3QviDQvtC00L3QsCDQuNC3INC90LjRhSDRjdGC0L4g0YLQviwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGH0YLQviDQvNC90LUg0L3Rg9C20L3Qvi5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzlcclxuICAgICAgICAgICAgICAgIFwi0JTQtdC70LDQtdC8INGA0LDQt9Cy0LjRgtC40LUg0L/RgNC40LLQu9C10LrQsNGC0LXQu9GM0L3Ri9C8LiBcIixcclxuICAgICAgICAgICAgICAgIFwi0J/RgNC40LLQvtC00LjQvCDQuiDRgNC10LfRg9C70YzRgtCw0YLQsNC8LCDQutC+0YLQvtGA0YvQvNC4INGF0L7Rh9C10YLRgdGPINCz0L7RgNC00LjRgtGM0YHRjy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNzlcclxuICAgICAgICAgICAgICAgIFwiKCEpINCd0YPQttC90L4g0LLQtdGA0L3Rg9GC0YzRgdGPINC6INCQ0L3QuNGB0LUuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzgwXHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCQ0L3QuNGB0LAsINGPINGD0LfQvdCw0Lsg0LzQuNGB0YHQuNGOINC60L7QvNC/0LDQvdC40LguIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84MVxyXG4gICAgICAgICAgICAgICAgXCLQkNC90LjRgdCwOiDQpdC+0YDQvtGI0L4sINC+0L0g0L3QsCDRgdGC0L7Qu9C1LCDQvNC+0LbQtdGI0Ywg0LXQs9C+INCy0LfRj9GC0YwuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzgyXHJcbiAgICAgICAgICAgICAgICBcItCW0YPRgNC90LDQuzogMy3QtSDQv9C+0YHQu9C10LTQvdC40YUsINC60YLQviDQsdGA0LDQuyDQutC70Y7RhzpcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vODNcclxuICAgICAgICAgICAgICAgIFwi0JLQuNGC0LAg0JHQsNGA0YvRiNC90LjQutC+0LLQsCAxNi4wMCAtIDE4LjAwXCIsXHJcbiAgICAgICAgICAgICAgICBcItCa0L7RgdGC0Y8g0JfQsNC80YPRgNC10L3QutC+IDE0LjAwIC0gMTUuMzBcIixcclxuICAgICAgICAgICAgICAgIFwi0KHQsNGI0LAg0JrQvtC90L7QvdC10L3QutC+IDExLjAwIC0gMTMuMDBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vODRcclxuICAgICAgICAgICAgICAgIFwi0JLQtdGA0L7Rj9GC0L3QviDQvdGD0LbQvdC+INC/0L7Qs9C+0LLQvtGA0LjRgtGMINGBINC60LDQttC00YvQvCDQuNC3INC90LjRhSDQuCDRgdC90LDRh9Cw0LvQsCDRjyDQv9C+0LnQtNGDINC6INCS0LjRgtC1IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQkdCw0YDRi9GI0L3QuNC60L7QstC+0LksINGC0LDQuiDQutCw0Log0L7QvdCwINCx0YvQu9CwINC/0L7RgdC70LXQtNC90LXQuSDQsiDRgtC+0YIg0LTQtdC90Ywg0Lgg0YPQt9C90LDRjiBcIixcclxuICAgICAgICAgICAgICAgIFwi0LLQuNC00LXQu9CwINC70Lgg0L7QvdCwINC60LDRgdGB0LXRgtGDXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzg1XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCS0LjRgtCwLCDQv9GA0LjQstC10YIhINCS0LjQtNC10Lsg0YLQstC+0Lgg0LLQuNC00LXQviDQviBTa3luZyBIb21lLCDQvtC90Lgg0L/RgNC+0YHRgtC+INGB0YPQv9C10YAuIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQnNC90LUg0L3Rg9C20L3QsCDRgtCy0L7RjyDQv9C+0LzQvtGJ0YwsINC/0YDQvtC/0LDQu9CwINC60LDRgdGB0LXRgtCwINGBINC30LDQv9C40YHRj9C80Lgg0LjRgdGC0L7RgNC40LggXCIsXHJcbiAgICAgICAgICAgICAgICBcItC+0YHQvdC+0LLQsNGC0LXQu9C10LksINC80L7QttC10YIg0YLRiyDQstC40LTQtdC70LAg0LXQtT9cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vODZcclxuICAgICAgICAgICAgICAgIFwi0JLQuNGC0LA6INCS0L7Rgywg0L/QvtC70LXQs9GH0LUgPSkg0J/RgNC40LLQtdGCISDQmtC+0L3QtdGH0L3QviDQv9C+0LzQvtCz0YMuINCX0L3QsNGOLCDRh9GC0L4g0YLRiyDRg9C20LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0L7Qt9C90LDQutC+0LzQuNC70YHRjyDRgSDQvtGB0L3QvtCy0LDRgtC10LvRj9C80Lgg0Lgg0LzQuNGB0YHQuNC10Lkg0LrQvtC80L/QsNC90LjQuCwg0L3QviDRjdGC0L4g0LXRidC1INC90LUg0LLRgdC1LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84N1xyXG4gICAgICAgICAgICAgICAgXCLQotC10LHQtSDQvdGD0LbQvdC+INC40LfRg9GH0LjRgtGMINC10LUg0L/RgNC40L3RhtC40L/Riywg0L7QvdC4INC30LDQv9C40YHQsNC90Ysg0LIg0LzQvtC10Lwg0LHQu9C+0LrQvdC+0YLQtSwg0L3QviDRjyBcIixcclxuICAgICAgICAgICAgICAgIFwi0LfQsNCx0YvQu9CwINC10LPQviDQsiDQvtC00L3QvtC5INC40Lcg0L/QtdGA0LXQs9C+0LLQvtGA0L7Quiwg0LjQt9GD0YfQuCDQuNGFINC4INC+0YLQstC10YLRjCDQvdCwINC80L7QuCDQstC+0L/RgNC+0YHRiyBcIixcclxuICAgICAgICAgICAgICAgIFwi0L4g0YjQutC+0LvQtSwg0YLQvtCz0LTQsCDRjyDQvtGC0LLQtdGH0YMg0L3QsCDRgtCy0L7QuCA9KVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy84OFxyXG4gICAgICAgICAgICAgICAgXCLQntC00L3QsNC20LTRiywg0LIg0YTQtdCy0YDQsNC70YzRgdC60YPRjiDRgdGD0LHQsdC+0YLRgyAyMDE50LMsINC80Ysg0YHQvtCx0YDQsNC70LjRgdGMINCyINC+0YTQuNGB0LUg0Lgg0L7QsdGB0YPQtNC40LvQuCxcIixcclxuICAgICAgICAgICAgICAgIFwi0YfRgtC+INC/0YDQuNCy0LXQu9C+INC90LDRgSDQuiDRgtC10LrRg9GJ0LXQuSDRgtC+0YfQutC1INGA0LDQt9Cy0LjRgtC40Y8uINCf0YDQvtCw0L3QsNC70LjQt9C40YDQvtCy0LDQu9C4LCDRh9GC0L4g0L/QvtC30LLQvtC70Y/QtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcItC90LDQvCDRgNCw0LfQstC40LLQsNGC0YzRgdGPINGC0LDQutC40LzQuCDRgtC10LzQv9Cw0LzQuC4g0Jgg0YHRhNC+0YDQvNGD0LvQuNGA0L7QstCw0LvQuCDQvdCw0YjQuCDQv9GA0LjQvdGG0LjQv9GLINGA0LDQsdC+0YLRiy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vODlcclxuICAgICAgICAgICAgICAgIFwiMS4g0KHQvtGF0YDQsNC90Y/QtdC8INC10LTQuNC90YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwiMi4g0J7QsdC10YHQv9C10YfQuNCy0LDQtdC8INC/0YDQvtC30YDQsNGH0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCIzLiDQktC+0YHQv9C40YLRi9Cy0LDQtdC8INGB0LDQvNC+0YXQvtC00L3QvtGB0YLRjFwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzkwXHJcbiAgICAgICAgICAgICAgICBcIjQuINCm0LXQvdC40LwgZnVsbCBzdGFja1wiLFxyXG4gICAgICAgICAgICAgICAgXCI1LiDQlNCw0LXQvCDRh9C10YHRgtC90YPRjiDQvtCx0YDQsNGC0L3Rg9GOINGB0LLRj9C30YxcIixcclxuICAgICAgICAgICAgICAgIFwiNi4g0KDRg9C60L7QstC+0LTRgdGC0LLRg9C10LzRgdGPINC/0L7Qu9GM0LfQvtC5XCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIjcuINCd0LDQvdC40LzQsNC10Lwg0LvRjtC00LXQuSDRgdC40LvRjNC90LXQtSDRgdC10LHRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCI4LiDQodGH0LjRgtCw0LXQvCDQstGB0ZEsINGH0LXQvCDRg9C/0YDQsNCy0LvRj9C10LxcIixcclxuICAgICAgICAgICAgICAgIFwiOS4g0KHRgtCw0LLQuNC8INCy0YvRgdC+0LrRg9GOINC/0LvQsNC90LrRg1wiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCIxMC4g0JTQtdGA0LbQuNC8INGB0LrQvtGA0L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiMTEuINCf0L7RgdGC0L7Rj9C90L3QviDQvtCx0LzQtdC90LjQstCw0LXQvNGB0Y8g0L7Qv9GL0YLQvtC8XCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCc0L3QtSDQvdGD0LbQvdC+INCy0LXRgNC90YPRgtGB0Y8g0Log0JLQuNGC0LUsINGH0YLQvtCx0Ysg0L7RgtCy0LXRgtC40YLRjCDQvdCwINC10ZEg0LLQvtC/0YDQvtGB0YsuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCvINC90LDRiNC10Lsg0LXQs9C+LCDQstC10YDQvtGP0YLQvdC+INGC0Ysg0LfQsNCx0YvQu9CwINCyINC+0LTQvdC+0Lkg0LjQtyDQv9C10YDQtdCz0L7QstC+0YDQvtC6LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQktC40YLQsDog0JTQsC4uLiDQotCw0Log0Lgg0LXRgdGC0YwuLi4g0J7Rh9C10L3RjCDQvNC90L7Qs9C+INGA0LDQsdC+0YLRiyDQuCDRgdC+0LLRgdC10Lwg0LfQsNC80L7RgtCw0LvQsNGB0YwuLi4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItCd0YMg0YfRgtC+INC2LCDQv9GA0LjRgdGC0YPQv9C40LwuINCi0LXQv9C10YDRjCDQv9GA0L7QstC10YDQuNC8LCDRh9GC0L4g0YLRiyDRg9C20LUg0LfQvdCw0LXRiNGMINC+INC60L7QvNC/0LDQvdC40LguXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0L7Qs9C00LAg0L3QsNGH0LDQu9CwINGB0LLQvtC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC1INGI0LrQvtC70LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcIjEpIDE2INGE0LXQstGA0LDQu9GPIDE5OTAsIDIpIDIyINC80LDRjyAxOTg5XCIsXHJcbiAgICAgICAgICAgICAgICBcIjMpINCw0LLQs9GD0YHRgiAyMDEyLCA0KSAyNCDQsNCy0LPRg9GB0YLQsCAxOTcxLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCh0LrQvtC70YzQutC+INGD0YfQuNGC0LXQu9C10Lkg0LIgU2t5ZW5nP1wiLFxyXG4gICAgICAgICAgICAgICAgXCIxKSDQlNGD0LzQsNGOIDEwINGC0L7Rh9C90L4g0LXRgdGC0YwsIDIpIDUwINCy0L/QvtC70L3QtSDQtNC+0YHRgtCw0YLQvtGH0L3QviwgXCIsXHJcbiAgICAgICAgICAgICAgICBcIjMpIDEwMCAtINGD0LLQtdGA0LXQvSDRjdGC0L4g0LHQvtC70YzRiNC1INGH0LXQvCDRgyDQutC+0L3QutGD0YDQtdC90YLQvtCyLCA0KSA3MjEwLlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCh0LrQvtC70YzQutC+INGD0YfQtdC90LjQutC+0LIg0LIgU2t5ZW5nP1wiLFxyXG4gICAgICAgICAgICAgICAgXCIxKSDQktCY0J8sINC00LDQuSDQkdC+0LMg0LXQvNGDINC30LTQvtGA0L7QstGM0Y8hLCAyKSDQodC/0LDRgdC40LHQviDRg9GH0LjRgtC10LvRj9C8LCDRh9GC0L4g0L/RgNC40LLQvtC00Y/RgiBcIixcclxuICAgICAgICAgICAgICAgIFwi0YHQstC+0LjRhSDRgNC+0LTQvdGL0YUsIDMpIDcyNzAwLCA0KSDQldGB0LvQuCDQv9C+0YHRh9C40YLQsNGC0Ywg0LLRgdC10YUg0LrRgtC+INGA0LDQsdC+0YLQsNC10YIg0LIgR29vZ2xlLi4uXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQsNC6INC/0YDQvtGF0L7QtNGP0YIg0LfQsNC90Y/RgtC40Y8g0LIgU2t5ZW5nP1wiLFxyXG4gICAgICAgICAgICAgICAgXCIxKSDQndCwINGD0L3QuNC60LDQu9GM0L3QvtC5INC/0LvQsNGC0YTQvtGA0LzQtSBWaW1ib3gsIDIpINCj0YfQuNGC0LXQu9GPINCy0YvQtdC30LbQsNGO0YIg0L3QsCDQtNC+0LwsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCIzKdCSINCa0YDQtdC80LvQtSw0KdCS0YfQtdGA0LAg0YDQsNC30L7RgdC70LDQu9C4INGB0LrQsNC90Ysg0YPRh9C10LHQvdC40LrQsCwg0YHQtdCz0L7QtNC90Y8g0LIg0YHQutCw0LnQv9C1INC/0L7Qv9GA0L7QsdGD0LXQvC5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtCw0Log0YPRh9Cw0YIg0YHQu9C+0LLQsCDQsiBTa3llbmc/XCIsXHJcbiAgICAgICAgICAgICAgICBcIjEpINCT0L7RiNCwINC30LLQvtC90LjRgiDRg9GH0LXQvdC40LrQsNC8INC4INC+0L/RgNCw0YjQuNCy0LDQtdGCINC40YUsIDIpINCy0L4g0YHQvdC1LCBcIixcclxuICAgICAgICAgICAgICAgIFwiMykg0J/RgNC40LvQvtC20LXQvdC40LUgU2t5ZW5nLCA0KSDQo9GH0LXQvdC40LrQuCDQv9C40YjRg9GCINC60LDQttC00L7QtSDRgdC70L7QstC+IDEwMCDRgNCw0LcuXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQsNC60L7QstCwINGG0LXQu9GMINC/0L4g0LLRi9GA0YPRh9C60LUg0LrQvtC80L/QsNC90LjQuCDQsiAyMDE5INCz0L7QtNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCIxKSDQo9Cy0LXQu9C40YfQuNGC0Ywg0LLRi9GA0YPRh9C60YMg0LrQvtC80L/QsNC90LjQuCDQtNC+IDQgMzkyLDIg0LzQu9C9LiDRgNGD0LEuIFwiLFxyXG4gICAgICAgICAgICAgICAgXCIo0L/Qu9Cw0L0gRXhjZWxsZW50IDQgNzAwINC80LvQvS4g0YAuKSwgMikg0L3QtdGCINGG0LXQu9C4LCAzKSDQuCDRgtCw0Log0YHQvtC50LTQtdGCXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQvtCz0L4g0LHQu9Cw0LPQvtC00LDRgNC40YLRjCDQt9CwIFNreWVuZz9cIixcclxuICAgICAgICAgICAgICAgIFwiMSkg0YPRh9C40YLQtdC70Y8g0LjQtyDQp9GD0LLQsNGI0LjQuCwgMikg0JDQvdCz0LvQuNGH0LDQvSwgMykg0JDQvNC10YDQuNC60LDQvdGG0LXQsiwgXCIsXHJcbiAgICAgICAgICAgICAgICBcIjQpINC+0YHQvdC+0LLQsNGC0LXQu9C10LkgU2t5ZW5nICjQk9C10L7RgNCz0LjQuSwg0JDQu9C10LrRgdCw0L3QtNGALCDQpdCw0YDQuNGC0L7QvSwg0JTQtdC90LjRgSwg0JDQvdC00YDQtdC5KVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCS0LjRgtCwOiDQotGLINC00LXQu9Cw0LXRiNGMINGD0YHQv9C10YXQuCEg0J3QsNGB0YfQtdGCINC60LDRgdGB0LXRgtGLLi4uINCd0LXRgiDQtdC1INC90LUg0LHRi9C70L4sIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQutC+0LPQtNCwINGPINC/0YDQuNGI0LvQsC4g0JLQtdGA0L7Rj9GC0L3Qviwg0LrRgtC+LdGC0L4g0LTRgNGD0LPQvtC5INCy0LfRj9C7INC10LUuLi4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCh0L/QsNGB0LjQsdC+INGC0LXQsdC1ISDQmCDQv9C10YDQtdC00L7RhdC90LggPSlcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JLQuNGC0LA6INCb0YPRh9GI0LjQuSDRgdC/0L7RgdC+0LEg0L7RgtC00L7RhdC90YPRgtGMIC0g0LLQt9GP0YLRjNGB0Y8g0LfQsCDQuNC90YLQtdGA0LXRgdC90YPRjiBcIixcclxuICAgICAgICAgICAgICAgIFwi0LfQsNC00LDRh9C60YMgPSkg0J/QvtCz0L3QsNC70LghXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIighKSDQotC10L/QtdGA0Ywg0LzQvtC20L3QviDQuNC00YLQuCDQuiDQmtC+0YHRgtC1INC+0L0g0YHQu9C10LTRg9GO0YnQuNC5INCyINGB0L/QuNGB0LrQtS5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTA2XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCa0L7RgdGC0Y8sINC/0YDQuNCy0LXRgiFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQvtGB0YLRjzog0J/RgNC40LLQtdGCLiDQodC70YvRiNCw0Lsg0LrQsNC6INGC0Ysg0L/QvtC80L7QsyDQlNC10L3QuNGB0YMsINGC0Ysg0LHQvtC70YzRiNC+0Lkg0LzQvtC70L7QtNC10YYsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRgtCw0Log0LTQtdGA0LbQsNGC0YwhXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCh0L/QsNGB0LjQsdC+ID0pINCh0YLQsNGA0LDRjtGB0YwuINCc0L3QtSDQvtGH0LXQvdGMINC90YPQttC90LAg0YLQstC+0Y8g0L/QvtC80L7RidGMLiBcIixcclxuICAgICAgICAgICAgICAgIFwi0JrRgtC+LdGC0L4g0LLQt9GP0Lsg0LrQsNGB0YHQtdGC0YMg0LjQtyDQstC40LTQtdC+0LrQvtC80L3QsNGC0YssINC80L7QttC10YIg0YLRiyDQstC40LTQtdC7Li4uIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0YHRgtGPOiDQntCz0L4sINGD0LbQtSDQsdGL0Lsg0LIg0LLQuNC00LXQvtGB0YLRg9C00LjQuCA9KSDQktC40LbRgywg0YfRgtC+INC+0YHQstCw0LjQstCw0LXRiNGM0YHRjyBcIixcclxuICAgICAgICAgICAgICAgIFwi0Lgg0LzQvdC+0LPQvtC1INGD0LfQvdCw0Lsg0LfQsCDRjdGC0L7RgiDQtNC10L3RjC4g0JXRgdC70Lgg0YPQs9Cw0LTQsNC10YjRjCwg0YfRgtC+INCx0L7Qu9GM0YjQtSDQstGB0LXQs9C+INGPIFwiLFxyXG4gICAgICAgICAgICAgICAgXCJcXFwi0LvRjtCx0LvRjlxcXCIg0LIg0L3QsNGI0LXQuSDRgdGC0YDQsNC90LUsINGC0L4g0L7RgtCy0LXRh9GDINC60YLQviDQsdGA0LDQuyDQutCw0YHRgdC10YLRgy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0J7QvdCwINC+0YLQv9GA0LDQstC40YIg0LHQtdC3INGC0YDRg9C00LBcIixcclxuICAgICAgICAgICAgICAgIFwi0JIg0LvRjtCx0YvQtSDRgdGC0YDQsNC90YssINCz0L7RgNC+0LTQsC5cIixcclxuICAgICAgICAgICAgICAgIFwi0KHQu9C+0LLQsCwg0YHRgtC40YXQuCwg0L/QvtC00LDRgNC60LhcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0Lgg0LrRgNCw0YHQvtGH0L3Ri9C1INC80LDRgNC60LguXCIsXHJcbiAgICAgICAgICAgICAgICBcItCS0YHQtdCz0LTQsCDQstGB0LUg0LLQvtCy0YDQtdC80Y8g0LTQvtGB0YLQsNCy0LjRglwiLFxyXG4gICAgICAgICAgICAgICAgXCLQldC5INCa0L7RgdGC0Y8g0L7Rh9C10L3RjCDQtNC+0LLQtdGA0Y/QtdGCXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCYINC20LTRg9GCINC10LUg0LLRgdC1LCDQutCw0Log0JzQuNGB0YHQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcItCb0Y7QsdC40LzQsNGPINC90LDRiNCwIC4uLiDQoNC+0YHRgdC40LghXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCi0LDQuiDRjdGC0L4g0LbQtSDQvdCw0YjQsCDQu9GO0LHQuNC80LDRjyDQn9C+0YfRgtCwINCg0L7RgdGB0LjQuC5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQvtGB0YLRjzog0JTQsCwg0YLRiyDQvtGC0LLQtdGC0LjQuyDQstC10YDQvdC+Li4uIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0YHRgtGPOiDQkdC+0LvRjNGI0LUg0LzQtdGB0Y/RhtCwINCf0L7Rh9GC0LAg0KDQvtGB0YHQuNC4INC80L7RgNC+0LfQuNC70LAg0LzQvtGOINC/0L7RgdGL0LvQutGDLCDQuCDQsiBcIixcclxuICAgICAgICAgICAgICAgIFwi0LrQvtC90YbQtSDQutC+0L3RhtC+0LIg0LHQtdC3INC+0LHRitGP0YHQvdC10L3QuNGPINC/0YDQuNGH0LjQvSDQvtGC0L/RgNCw0LLQu9GP0LXRgiDQtdGRINC+0LHRgNCw0YLQvdC+LiBcIixcclxuICAgICAgICAgICAgICAgIFwi0J3QuNC60LDQutC40YUg0YPQstC10LTQvtC80LvQtdC90LjQuSwg0YHQvtC+0LHRidC10L3QuNC5LCDQt9Cy0L7QvdC60L7Qsi4gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0L7RgdGC0Y86INCd0LUg0L/QtdGA0LLRi9C5INGA0LDQtyDQvtC90Lgg0YTQsNC60LDQv9GP0YIsINC90L4g0LrQsNC20LTRi9C5INGA0LDQtyDRjyBcIixcclxuICAgICAgICAgICAgICAgIFwi0L3QsCDRh9GC0L4t0YLQviDQvdCw0LTQtdGO0YHRjFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0YHRgtGPOiDQkNGFINC00LAuLi4g0KLQstC+0Lkg0LLQvtC/0YDQvtGBLi4uINCa0L7QvdC10YfQvdC+LCDRjyDQstC40LTQtdC7LCDQutGC0L4g0LLQt9GP0LsgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC60LDRgdGB0LXRgtGDLiDQn9C10YDQtdC0INGC0LXQvCDQutCw0Log0Y8g0L3QsNGH0LDQuyDQv9C+0LTQs9C+0YLQvtCy0LrRgyDQuiDRgdGK0LXQvNC60LUsINC40LcgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC60L7QvNC90LDRgtGLINCy0YvRhdC+0LTQuNC70LAg0KHQsNGI0LAg0JrQvtC90L7QvdC10L3QutC+INC4INC90LXRgdC70LAg0LXQtSDQstGA0YPQutCw0YUuINCj0YLQvtGH0L3QuCDRgyDQvdC10LUuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCe0YLQu9C40YfQvdC+ISDQotC10L/QtdGA0Ywg0Y8g0YLQvtGH0L3QviDQv9C+0LvRg9GH0YMg0L7RgtCy0LXRgi5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTE5XHJcbiAgICAgICAgICAgICAgICBcItCY0LPRgNC+0Lo6INCh0LDRiNCwINC/0YDQuNCy0LXRgiEg0JrQvtGB0YLRjyDRgdC60LDQt9Cw0LssINGH0YLQviDRg9GF0L7QtNGPINGC0Ysg0LfQsNCx0LjRgNCw0LvQsCBcIixcclxuICAgICAgICAgICAgICAgIFwi0LrQsNGB0YHQtdGC0YMg0YEg0LLQuNC00LXQvi3QuNGB0YLQvtGA0LjQtdC5INC+0YHQvdC+0LLQsNGC0LXQu9C10LkuINCc0L7QttC90L4g0LXQtSDQv9C+0YHQvNC+0YLRgNC10YLRjC5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0KHQsNGI0LA6INCf0YDQuNCy0LXRgiEg0JrQvtC90LXRh9C90L4sINC90L4g0Lgg0YLRiyDQv9C+0LzQvtCz0Lgg0LzQvdC1LiDQnNGLINC60L7QvNCw0L3QtNC+0LkgXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNreWVuZyDQv9C40YHQsNC70Lgg0YbQtdC90L3QvtGB0YLQuCDQutC+0LzQv9Cw0L3QuNC4INC90LAg0LrRg9GF0L3QtSDQuCDQt9Cw0LHRi9C70Lgg0LfQsNCx0YDQsNGC0YwsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQv9GA0LjQvdC10YHQuCDQvNC90LUg0YHQv9C40YHQvtC6LCDQsCDRjyDQv9C+0LrQsCDQvdCw0LnQtNGDINC60LDRgdGB0LXRgtGDLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQpdC+0YDQvtGI0L4sINGB0L/QsNGB0LjQsdC+LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQk9C70LDQstC90YvQtSDRhtC10L3QvdC+0YHRgtC4INC60L7QvNC/0LDQvdC40Lg6INGA0LDQt9Cy0LjRgtC40LUsINCz0LjQsdC60L7RgdGC0YwsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLRg9Cy0LDQttC10L3QuNC1LCDRg9C00L7QstC+0LvRjNGB0YLQstC40LUuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzEyM1xyXG4gICAgICAgICAgICAgICAgXCLQodCw0YjQsDog0J7RgtC70LjRh9C90L4sINCwINGC0L4g0YHQvtCy0YHQtdC8INC90LXRgiDQstGA0LXQvNC10L3QuCDQvdCwINC/0L7QtNCz0L7RgtC+0LLQutGDLi4uIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQotGLINC+0YfQtdC90Ywg0L/QvtC80L7Qsy4g0J3QviDQv9C+0LrQsCDRgtC10LHRjyDQvdC1INCx0YvQu9C+LCDRjyDRhdC+0YLQtdC70LAg0L/QtdGA0LXRgdC80L7RgtGA0LXRgtGMIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQt9Cw0L/QuNGB0Ywg0Lgg0LXQtSDQvdC1INC+0LrQsNC30LDQu9C+0YHRjCDQvdCwINC80L7QtdC8INGB0YLQvtC70LUuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCh0LDRiNCwOiDQkiDQvtGE0LjRgdC1INC00LDQstC90L4g0L3QtSDQstGB0LUg0LPQu9Cw0LTQutC+Li4uINCS0LjQtNC40LzQviDQutC+0L3QutGD0YDQtdC90YIg0LTQvtCx0YDQsNC70YHRjyDQuCBcIixcclxuICAgICAgICAgICAgICAgIFwi0YHRjtC00LAuINCd0YPQttC90L4g0YHRgNC+0YfQvdC+INGD0LfQvdCw0YLRjCDQutGC0L4g0Y3RgtC+LiDQldGJ0LUg0Y8g0YHQu9GL0YjQsNC70LAsINGH0YLQviDQuiBTa3llbmdEYXkgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGA0LXQsdGP0YLQsCDQt9Cw0L/QuNGB0LDQu9C4INC/0L7Qt9C00YDQsNCy0LvQtdC90LjRjywg0L3QviDQvtC90Lgg0YLQvtC20LUg0LrRg9C00LAt0YLQviDQv9GA0L7Qv9Cw0LvQuC4gXCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0KHQsNGI0LA6INCf0YDQsNC30LTQvdC40Log0L3QtSDRgdC+0YHRgtC+0LjRgtGB0Y8sINC10YHQu9C4INC90LUg0L3QsNC50YLQuCDQutCw0YHRgdC10YLRgyDQuCDQstGB0LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC/0L7Qt9C00YDQsNCy0LvQtdC90LjRjy4uLiDQmtC+0LPQtNCwINC+0L0g0LfQsNCx0LjRgNCw0Lsg0LrQsNGB0YHQtdGC0YMsINGC0L4g0LIg0YHQv9C10YjQutC1INC+0L/RgNC+0LrQuNC90YPQuyBcIixcclxuICAgICAgICAgICAgICAgIFwi0YfQtdGA0L3QuNC70LAg0L3QsCDQvNC+0LXQvCDRgdGC0L7Qu9C1LCDQvtGH0LXQvdGMINC70Y7QsdC70Y4g0YDRg9GH0LrRgyDRgSDRh9C10YDQvdC40LvQsNC80Lgg0LTQu9GPINC/0L7QtNC/0LjRgdC4LlwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCh0LDRiNCwOiDQmNGJ0Lgg0LXQs9C+INC/0L4g0L7RgtC80LXRgtC40L3QsNC8INC90LAg0L/RgNC10LTQvNC10YLQsNGFIVwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQryDQvdCw0LnQtNGDINC10LPQviDQstC+INGH0YLQvtCx0Ysg0YLQviDQvdC4INGB0YLQsNC70L4hXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzEyOFxyXG4gICAgICAgICAgICAgICAgXCLQmNCz0YDQvtC6OiDQndCwINGC0LLQvtC10Lkg0YDRg9C60LUg0YfQtdGA0L3QuNC70LAsINGN0YLQviDRgtGLINGD0LrRgNCw0Lsg0LrQsNGB0YHQtdGC0YMg0LjQtyBcIixcclxuICAgICAgICAgICAgICAgIFwi0KHQsNGI0LjQvdC+0LPQviDQutCw0LHQuNC90LXRgtCwISDQotGLINC60L7QvdC60YPRgNC10L3Rgiwg0LzQtdGI0LDRjtGJ0LjQuSDQvdCw0Lwg0YDQsNC30LLQuNCy0LDRgtGM0YHRjyFcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrQvtC90LrRg9GA0LXQvdGCOiDQsNGF0LDRhdCw0YUg0L/QvtC50LzQsNC7INC80LXQvdGPLNC90YMg0Lgg0YfRgtC+PyDQotC10LHQtSDQstGB0LUg0YDQsNCy0L3QviDQvdC1IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQvdCw0LnRgtC4INC60LDRgdGB0LXRgtGDINC4INC/0L7Qt9C00YDQsNCy0LvQtdC90LjRjyFcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtC+0L3QutGD0YDQtdC90YI6INCS0LDRiNC4INGB0YLQtdC90Ysg0YHQu9C40YjQutC+0Lwg0L7QtNC40L3QsNC60L7QstGLLCDRh9GC0L7QsdGLINC+0YLRi9GB0LrQsNGC0Ywg0LXQtSDQsiBcIixcclxuICAgICAgICAgICAgICAgIFwi0YHRgtC10L3QtSwg0LAg0L3QtdC70LXQv9GL0LUg0YHQv9C+0YDRgtC40LLQvdGL0LUg0L/QvtC30LTRgNCw0LLQu9C10L3QuNGPLCDQutC+0YLQvtGA0YvQvNC4INCy0Ysg0YXQvtGC0LXQu9C4IFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQv9C+0LLQtdGB0LXQu9C40YLRjCDQstGB0LXRhSwg0LzQvtC20L3QviDQvdCw0LnRgtC4INGC0L7Qu9GM0LrQviDRgdC70YPRh9Cw0LnQvdC+IVwiXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIighKSDQndCw0LbQvNC40YLQtSA8c3BhY2U+LCDRh9GC0L7QsdGLINC/0L7QtNC+0LHRgNCw0YLRjCDQutCw0YHQtdGC0YMuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIighKSDQktC10YDQvdC40YLQtSDQutCw0YHQtdGC0YMg0KHQsNGI0LUuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCh0LDRiNCwOiDQodC/0LDRgdC40LHQviDQsdC+0LvRjNGI0L7QtS4g0JAg0YHQtdC50YfQsNGBINC+0YLQv9GA0LDQstC70Y/QudGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgywgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGDINC90LXQtSDQuiDRgtC10LHQtSDRgNCw0LfQs9C+0LLQvtGAINCx0YvQuy5cIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xMzVcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCt0YLQviDQv9GA0L7RgdGC0L4g0L3QtdCy0LXRgNC+0Y/RgtC90L4hINCi0Ysg0L3QsNGI0LXQuyDQutC+0L3QutGD0YDQtdC90YIg0Lgg0LfQsNC/0LjRgdGMLiBcIixcclxuICAgICAgICAgICAgICAgIFwi0J3QviDRjdGC0L4g0LXRidC1INC90LUg0LLRgdC1LiDQldGB0LvQuCDRhdC+0YfQtdGI0Ywg0YPQt9C90LDRgtGMINCx0L7Qu9GM0YjQtSDQviDRgdC+0LfQtNCw0YLQtdC70Y/RhSDRjdGC0L7QuSBcIixcclxuICAgICAgICAgICAgICAgIFwi0LjQs9GA0YssINC90LDQudC00Lgg0LjRhSDQv9C+0LfQtNGA0LDQstC70LXQvdC40Y8uIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0JIg0L/QtdGA0LLRg9GOINC+0YfQtdGA0LXQtNGMINGPINCx0Ysg0L/QvtC40YHQutCw0LvQsCDQsiDQutC+0YDQt9C40L3QtSDRgSDQvNGD0YHQvtGA0L7QvC4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItCt0YLQsCDQtNC10LLRg9GI0LrQsCDQvtGH0LXQvdGMINC70Y7QsdC40YIg0YDQuNGB0L7QstCw0YLRjCDQuCDQstGB0LXQs9C0INGB0YLRgNC10LzQuNGC0YHRjyDQuiDRgdC+0LLQtdGA0YjQtdC90YHRgtCy0YMsIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQv9C+0Y3RgtC+0LzRgyDQvNC90L7Qs9C+0LUg0LzQvtC20LXRgiDQstGL0LHRgNC+0YHQuNGC0YwsINC00LDQttC1INGI0LXQtNC10LLRgNGLLiBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTM3XHJcbiAgICAgICAgICAgICAgICBcItCa0L7RgNC30LjQvdCwOiDQndCw0LbQvNC40YLQtSA8c3BhY2U+INC00LvRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNGPLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCIoISkg0JLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzEzOVxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0J7QtNC40L0g0LjQtyDRjdGC0LjRhSDRgNC10LHRj9GCINC+0YfQtdC90Ywg0LvRjtCx0LjRgiDQutC+0LTRiyDQuCDQs9C+0LLQvtC70L7QvNC60LguIFwiLFxyXG4gICAgICAgICAgICAgICAgXCLQoSDRgtC10YUg0L/QvtGALCDQutCw0Log0L7QvSDRg9Cy0LjQtNC10Lsg0YTQvtC80YDRg9C70Ysg0L3QsCDQtNC+0YHQutC1LCDQs9C00LUg0LrQsNC20LTRi9C5INCyINC+0YTQuNGB0LUgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC70Y7QsdC40YIg0L7RgdGC0LDQstC70Y/RgtGMINC/0L7RgdC70LDQvdC40Y8sINC+0L3QsCDQvdC1INCy0YvRhdC+0LTQuNGCINGDINC90LXQs9C+INC40Lcg0LPQvtC70L7QstGLLiBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTQwXHJcbiAgICAgICAgICAgICAgICBcItCU0L7RgdC60LA6INCd0LDQttC80LjRgtC1IDxzcGFjZT4g0LTQu9GPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Y8gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvL1xyXG4gICAgICAgICAgICAgICAgXCIwMDExMDAwMTAxMDAxMDEwMDEwMTEwMDEwMTAxMTAwMTAxMTAwMDEwMDAxMDEwMTEwMTAxMDAxMDAxMDExMDFcIixcclxuICAgICAgICAgICAgICAgIFwiMTAxMDExMTAxMDEwMTAwMDEwMTAwMTEwMTAxMDAxMDEwMDExMDAwMTAwMDExMTEwMDAxMDEwMTAwMDExMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIjEwMDEwMDExMTAwMTAxMDExMTAxMDEwMDAwXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIighKSDQktC10YDQvdGD0YLRjNGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTQzXHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQrdGC0LAg0LTQtdCy0YPRiNC60LAg0L7Rh9C10L0g0LvRjtCx0LjRgiDQstC+0LTRgyDQuCDRjdGC0LjQvCDQstGB0LUg0YHQutCw0LfQsNC90L4gPSkuIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNDRcclxuICAgICAgICAgICAgICAgIFwi0JHRg9GC0LvRjCDRgSDQstC+0LTQvtC5OiDQndCw0LbQvNC40YLQtSA8c3BhY2U+INC00LvRjyDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQuNGPIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy81N1xyXG4gICAgICAgICAgICAgICAgXCIoISkg0JLQtdGA0L3Rg9GC0YzRgdGPINC6INC60YPRgNCw0YLQvtGA0YMuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE0NlxyXG4gICAgICAgICAgICAgICAgXCLQmtGD0YDQsNGC0L7RgDog0J7QvSDQv9C+0LTQvdC40LzQsNC10YIg0YLRj9C20LXRgdGC0Lgg0YEg0YDQsNC90L3QtdCz0L4g0LTQtdGC0YHRgtCy0LAsINC90L4g0LIg0Y3RgtC+0YIgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGA0LDQtyAtINGN0YLQviBcXFwi0L3QvtCy0YvQuSDRgNC10LrQvtGA0LRcXFwiINC20LjQvNCwINC70LXQttCwLiBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTQ3XHJcbiAgICAgICAgICAgICAgICBcItCU0LjQstCw0L06INCd0LDQttC80LjRgtC1IDxzcGFjZT4g0LTQu9GPINCy0LfQsNC40LzQvtC00LXQudGB0YLQstC40Y8gXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcIighKSDQktC10YDQvdGD0YLRjNGB0Y8g0Log0LrRg9GA0LDRgtC+0YDRgy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTQ5XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQotGLINC00LDQttC1INC90LUg0L/RgNC10LTRgdGC0LDQstC70Y/QtdGI0YwsINGH0YLQviDRgdC00LXQu9Cw0Lsg0LTQu9GPINC90LDRgS4gXCIsXHJcbiAgICAgICAgICAgICAgICBcItCS0L7RgiDQv9C+0LTQsNGA0L7Quiwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00LXRgiDRg9C90LjQutCw0LvRjNC90YvQvCDRgtC+0LvRjNC60L4g0LTQu9GPINGC0LXQsdGPLiBcIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vNTdcclxuICAgICAgICAgICAgICAgIFwi0JrRg9GA0LDRgtC+0YA6INCt0YLQviDQt9C+0LvQvtGC0LDRjyDQutCw0YDRgtCwINC90LAg0L/QvtC20LjQt9C90LXQvdC90YvQuSDQv9GA0L7Qv9GD0YHQuiDQuiAgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC70Y7QsdC+0LzRgyDRhNC10YHRgtC40LLQsNC70Y4g0L7RgiBTa3llbmcg0LHQtdC3INC+0LPRgNCw0L3QuNGH0LXQvdC40LkuXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzU3XHJcbiAgICAgICAgICAgICAgICBcItCa0YPRgNCw0YLQvtGAOiDQkCDRgdC10LnRh9Cw0YEg0LHQtdCz0Lgg0YHQutC+0YDQtdC1INC6INC60L7QvNC90LDRgtC1IFNreWVuZ0RheSwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItGH0YLQvtCx0Ysg0YPQstC40LTQtdGC0Ywg0YTQuNC90LDQu9GM0L3QvtC1INC/0L7Qt9C00YDQsNCy0LvQtdC90LjRjyDRgNC10LHRj9GCINC4INC/0L7RgdC10YLQuNGC0YwgXCIsXHJcbiAgICAgICAgICAgICAgICBcItC70YPRh9GI0YPRjiDQstC10YfQtdGA0LjQvdC60YMg0LPQvtC00LAhIFwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNTJcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE1M1xyXG4gICAgICAgICAgICAgICAgXCLQmNGA0LA6INCU0L7QstC+0LvRjNC90YvQuSDQutC70LjQtdC90YIg4oCUINC70YPRh9GI0LDRjyDQsdC40LfQvdC10YEt0YHRgtGA0LDRgtC10LPQuNGPLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNTRcclxuICAgICAgICAgICAgICAgIFwi0JzQsNC60YHQuNC8OiBDdXN0b21lciBTZXJ2aWNlIGlzIGFuIEFUVElUVURFLCBub3QgYSBkZXBhcnRtZW50LlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNTVcclxuICAgICAgICAgICAgICAgIFwi0JDQu9C10LrRgdC10Lk6ICAg0J/RgNC40YjQu9CwINCx0LDQsdC60LAg0Log0LLRgNCw0YfRgywg0LAg0LLRgNCw0Ycg0YLQvtC20LUg0LHQsNCx0LrQsC5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTU2XHJcbiAgICAgICAgICAgICAgICBcItCv0L3QsDog0KDQsNCx0L7RgtCwINC90LUg0LLQvtC70LouINCg0LDQsdC+0YLQsCDigJQg0LLQvtGA0LouXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE1N1xyXG4gICAgICAgICAgICAgICAgXCLQr9C90LA6ICNza3llbmd0ZWFtIOKAkyDQutC+0LzQsNC90LTQsCwg0LrQvtGC0L7RgNCw0Y8g0LjQt9C+0LHRgNC10LvQsCDQvtCx0YPRh9C10L3QuNC1INCw0L3Qs9C70LjQudGB0LrQvtC80YMg0LfQsNC90L7QstC+IPCfjI0uXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE1OFxyXG4gICAgICAgICAgICAgICAgXCLQk9C70LXQsTog0JLRgdC1INC/0LvQsNC90LjRgNGD0Y7Rgiwg0LAg0Y8g0L/QuNC60LjRgNGD0Y4uXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE1OVxyXG4gICAgICAgICAgICAgICAgXCLQn9Cw0LLQtdC7OiBFdmVyeXRoaW5nIGlzIGRlc2lnbmVkLiBGZXcgdGhpbmdzIGFyZSBkZXNpZ25lZCB3ZWxsLlwiLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBbLy8xNjBcclxuICAgICAgICAgICAgICAgIFwi0JTQtdC90LjRgTog0KfQtdC8INCx0L7Qu9GM0YjQtSDRg9C30LXQuywg0YLQtdC8INCx0L7Qu9GM0YjQtSDRg9C30LXQuy5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgWy8vMTYxXHJcbiAgICAgICAgICAgICAgICBcItCh0LXRgNCz0LXQuTogU2xvdyBpbnRlcm5ldCBjb25uZWN0aW9uLiBMb2FkaW5nLi4uXCIsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFsvLzE2MlxyXG4gICAgICAgICAgICAgICAgXCLQldC70LXQvdCwOiBLZWVwIEdvaW5nLCBubyBNYXR0ZXIgV0hBVC5cIixcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wO1xyXG4gICAgICAgICAgICB0aGlzLm5wYy5mb3JFYWNoKG5wYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIueCArIDY0IDwgbnBjLnggfHwgbnBjLngrNjQgPCB0aGlzLnBsYXllci54IHx8IHRoaXMucGxheWVyLnkgKyA2NCA8IG5wYy55IHx8IG5wYy55ICsgNjQgPCB0aGlzLnBsYXllci55KVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShucGMuaW1hZ2VOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfSkudGhlbihiZXNpZGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJlc2lkZSA9IGJlc2lkZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wO1xyXG4gICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKGFydGlmYWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci54ICsgNjQgPCBhcnRpZmFjdC5jb2xsaXNpb25TaGFwZS54IHx8IFxyXG4gICAgICAgICAgICAgICAgICAgIGFydGlmYWN0LmNvbGxpc2lvblNoYXBlLnggKyBhcnRpZmFjdC5jb2xsaXNpb25TaGFwZS53aWR0aCA8IHRoaXMucGxheWVyLnggfHwgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueSArIDY0IDwgYXJ0aWZhY3QuY29sbGlzaW9uU2hhcGUueSB8fCBcclxuICAgICAgICAgICAgICAgICAgICBhcnRpZmFjdC5jb2xsaXNpb25TaGFwZS55ICsgYXJ0aWZhY3QuY29sbGlzaW9uU2hhcGUuaGVpZ2h0IDwgdGhpcy5wbGF5ZXIueSlcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJ0aWZhY3QudHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLnRoZW4odHlwZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVzaWRlID0gdHlwZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk92Y2hhcmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSA0ICYmIHRoaXMubGFzdFN0YXR1cyA9PSAzKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRhcG9jaGtpXCIgJiYgdGhpcy5zdGF0dXMgPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk92Y2hhcmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSA3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazFcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY29mZmVlXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTEpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5wYy5mb3JFYWNoKG5wYyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihucGMuaW1hZ2VOYW1lID09ICdjdXJhdG9yJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbnBjLnggPSAxMDY5O1xyXG4gICAgICAgICAgICAgICAgICAgIG5wYy55ID0gMTAzODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDEzKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLdWRyaWF2dGNldlwiICYmIHRoaXMuc3RhdHVzID09IDIwKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJZYXVuemVtXCIgJiYgdGhpcy5zdGF0dXMgPT0gMjQpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAyNil7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwicGNcIiAmJiB0aGlzLnN0YXR1cyA9PSAyOCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDI5KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJZYW1hbm92XCIgJiYgdGhpcy5zdGF0dXMgPT0gMzEpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInBjXCIgJiYgdGhpcy5zdGF0dXMgPT0gMzYpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk1hdHZlZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSAzNykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAzOSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImp1cm5hbFwiICYmIHRoaXMuc3RhdHVzID09IDQwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU29sb3ZldlwiICYmIHRoaXMuc3RhdHVzID09IDQxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDQzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazJcIiAmJiB0aGlzLnN0YXR1cyA9PSA0Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tEZXNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJMYXJ5YW5vdnNreVwiICYmIHRoaXMuc3RhdHVzID09IDQ3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDQ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwicmFkaW9cIiAmJiB0aGlzLnN0YXR1cyA9PSA1MSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA1Mykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA1Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA1OCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNvbG92ZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA2MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNtZXRuZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA2Mikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA2NSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIktpeWFtb3ZhXCIgJiYgdGhpcy5zdGF0dXMgPT0gNzQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLaXlhbW92YVwiICYmIHRoaXMuc3RhdHVzID09IDgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiS2l5YW1vdmFcIiAmJiB0aGlzLnN0YXR1cyA9PSA4Mikge1xyXG4gICAgICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImp1cm5hbEFuaXNcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXBvY2hraSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKChhcnRpZmFjdCwgaSwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJ0aWZhY3QudHlwZSA9PSBcImp1cm5hbEFuaXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXJ0aWZhY3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJCYXJ5c2huaWtvdmFcIiAmJiB0aGlzLnN0YXR1cyA9PSA4NSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIkJhcnlzaG5pa292YVwiICYmIHRoaXMuc3RhdHVzID09IDk0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU3RlcGFuXCIgJiYgdGhpcy5zdGF0dXMgPT0gNjcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJaYW11cmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMDcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLb25vbmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjApIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLb25vbmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJtaXNzaW9uXCIgJiYgdGhpcy5zdGF0dXMgPT0gNzgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTWlzc2lvbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwibm90ZVwiICYmIHRoaXMuc3RhdHVzID09IDg4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazNcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjMpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJDb21wZXRpdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTI5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY2Fzc2V0dGVcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMzIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTWFpbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiS29ub25lbmtvXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDEzNSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRyYXNoXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9va0NocmlzdHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMzkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjb2RlXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubG9va1Nhc2hhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwid2F0ZXJcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNDQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTmF0YXNoYSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDE0Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInNvZmFcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNDcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb29rTGVhZGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiZmluYWxcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNTIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29rVXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImZpbmFsMlwiICYmIHRoaXMuc3RhdHVzID09IDE1Mikge1xyXG4gICAgICAgICAgICB0aGlzLm11c2ljID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJWb2xrb3ZhXCIgJiYgdGhpcy5zdWJTdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDE1MztcclxuICAgICAgICAgICAgdGhpcy5zdWJTdGF0dXMgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlRpdG92XCIgJiYgdGhpcy5zdWJTdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDE1NDtcclxuICAgICAgICAgICAgdGhpcy5zdWJTdGF0dXMgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIkthdGFldlwiICYmIHRoaXMuc3ViU3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbGRTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAxNTU7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViU3RhdHVzID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJBbmRyemhldnNrYXlhXCIgJiYgdGhpcy5zdWJTdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDE1NjtcclxuICAgICAgICAgICAgdGhpcy5zdWJTdGF0dXMgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIktvbG9kZXpuaWtvdmFcIiAmJiB0aGlzLnN1YlN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub2xkU3RhdHVzID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMTU3O1xyXG4gICAgICAgICAgICB0aGlzLnN1YlN0YXR1cyA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU29sb2d1YlwiICYmIHRoaXMuc3ViU3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbGRTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAxNTg7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViU3RhdHVzID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJUZXBpa2luXCIgJiYgdGhpcy5zdWJTdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IDE1OTtcclxuICAgICAgICAgICAgdGhpcy5zdWJTdGF0dXMgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlB1c2hraW5cIiAmJiB0aGlzLnN1YlN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub2xkU3RhdHVzID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gMTYwO1xyXG4gICAgICAgICAgICB0aGlzLnN1YlN0YXR1cyA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiTGViZWRldlwiICYmIHRoaXMuc3ViU3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbGRTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAxNjE7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViU3RhdHVzID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLaXNlbFwiICYmIHRoaXMuc3ViU3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vbGRTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAxNjI7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViU3RhdHVzID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gbnVsbCAmJiB0aGlzLnN1YlN0YXR1cyAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViU3RhdHVzID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb29raW5nIHx8IHRoaXMuYmxvY2spIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sLnVwID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbC5yaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wuZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2wubGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvb2tpbmcgJiYgKG5ldyBEYXRlKCkpIC0gdGhpcy5sYXN0VGltZSA+IDUwMCAmJiB0aGlzLmNvbnRyb2wudXNlICYmICh0aGlzLnN0YXR1cyA8IDk2IHx8IHRoaXMuc3RhdHVzID4gMTAyKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRhcG9jaGtpXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFwb2Noa2kgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpZmFjdHMuZm9yRWFjaCgoYXJ0aWZhY3QsIGksIGFycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFydGlmYWN0LnR5cGUgPT0gXCJ0YXBvY2hraVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5hcnRpZmFjdHNbaV07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbGxpZGVyLnN0YXRpY1NoYXBlc1t0aGlzLmNvbGxpZGVyLnN0YXRpY1NoYXBlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImp1cm5hbFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcG9jaGtpID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLmZvckVhY2goKGFydGlmYWN0LCBpLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcnRpZmFjdC50eXBlID09IFwianVybmFsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFydGlmYWN0c1tpXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ucGMuZm9yRWFjaChucGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5wYy5pbWFnZU5hbWUgPT0gJ2N1cmF0b3InKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnBjLnggPSA3NzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wYy55ID0gMTc5MztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIm5vdGVcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXBvY2hraSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGlmYWN0cy5mb3JFYWNoKChhcnRpZmFjdCwgaSwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXJ0aWZhY3QudHlwZSA9PSBcIm5vdGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXJ0aWZhY3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjYXNzZXR0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcG9jaGtpID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWZhY3RzLmZvckVhY2goKGFydGlmYWN0LCBpLCBhcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhcnRpZmFjdC50eXBlID09IFwiY2Fzc2V0dGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXJ0aWZhY3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubGFzdFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICBpZih0aGlzLnN1YlN0YXR1cyA9PSAxKSB0aGlzLnN1YlN0YXR1cysrO1xyXG4gICAgICAgICAgICBlbHNlIHRoaXMuc3RhdHVzKys7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvb2tpbmcgJiYgKG5ldyBEYXRlKCkpIC0gdGhpcy5sYXN0VGltZSA+IDUwMCAmJiB0aGlzLmNvbnRyb2wudGhyZWUgJiYgdGhpcy5zdGF0dXMgPT0gOTYpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzKys7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvb2tpbmcgJiYgKG5ldyBEYXRlKCkpIC0gdGhpcy5sYXN0VGltZSA+IDUwMCAmJiB0aGlzLmNvbnRyb2wuZm91ciAmJiB0aGlzLnN0YXR1cyA9PSA5Nykge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9va2luZyAmJiAobmV3IERhdGUoKSkgLSB0aGlzLmxhc3RUaW1lID4gNTAwICYmIHRoaXMuY29udHJvbC50aHJlZSAmJiB0aGlzLnN0YXR1cyA9PSA5OCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSB0aGlzLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMrKztcclxuICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubG9va2luZyAmJiAobmV3IERhdGUoKSkgLSB0aGlzLmxhc3RUaW1lID4gNTAwICYmIHRoaXMuY29udHJvbC5vbmUgJiYgdGhpcy5zdGF0dXMgPT0gOTkpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzKys7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvb2tpbmcgJiYgKG5ldyBEYXRlKCkpIC0gdGhpcy5sYXN0VGltZSA+IDUwMCAmJiB0aGlzLmNvbnRyb2wudGhyZWUgJiYgdGhpcy5zdGF0dXMgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFN0YXR1cyA9IHRoaXMuc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cysrO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5sb29raW5nICYmIChuZXcgRGF0ZSgpKSAtIHRoaXMubGFzdFRpbWUgPiA1MDAgJiYgdGhpcy5jb250cm9sLm9uZSAmJiB0aGlzLnN0YXR1cyA9PSAxMDEpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzKys7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvb2tpbmcgJiYgKG5ldyBEYXRlKCkpIC0gdGhpcy5sYXN0VGltZSA+IDUwMCAmJiB0aGlzLmNvbnRyb2wuZm91ciAmJiB0aGlzLnN0YXR1cyA9PSAxMDIpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0U3RhdHVzID0gdGhpcy5zdGF0dXM7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzKys7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gNCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTdGF0dXMgPSAzO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC90YPQttC90YvQuSDQv9GA0LXQtNC80LXRgiDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRjy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk92Y2hhcmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSA3ICYmIHRoaXMubGFzdFN0YXR1cyA9PSA2KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gNDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQvdGD0LbQvdGL0Lkg0L/RgNC10LTQvNC10YIg0LTQu9GPINC/0YDQvtC00L7Qu9C20LXQvdC40Y8uXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJ0YXBvY2hraVwiICYmIHRoaXMuc3RhdHVzID09IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gNztcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J/RgNC+0LTQvtC70LbQsNC5INC00LLQuNC20LXQvdC40LUg0LTQsNC70YzRiNC1LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiT3ZjaGFyZW5rb1wiICYmIHRoaXMuc3RhdHVzID09IDEwKXtcclxuICAgICAgICAgICAgdGhpcy5uZXdQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J/RgNC+0LTQvtC70LbQsNC5INC00LLQuNC20LXQvdC40LUg0LTQsNC70YzRiNC1LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazFcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQntGC0L/RgNCw0LLQu9GP0LnRgdGPINC90LAg0LrRg9GF0L3RjiDQuCDQstGL0L/QtdC5INGH0LDRiNC10YfQutGDINC60L7RhNC1LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY29mZmVlXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTMpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAyMCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQntGC0L/RgNCw0LLQu9GP0LnRgdGPINC6INCT0LvQtdCx0YMg0JrRg9C00YDRj9Cy0YbQtdCy0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLdWRyaWF2dGNldlwiICYmIHRoaXMuc3RhdHVzID09IDI0KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCt0YLQvtGCINGH0LXQu9C+0LLQtdC6INGB0YPQv9C10YDQs9C70YPQsdC+0LrQuNC5INGC0LXRhdC90LjRh9C10YHQutC40Lkg0LzQvtC30LMuINCd0LDQudC00Lgg0LXQs9C+LlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIllhdW56ZW1cIiAmJiB0aGlzLnN0YXR1cyA9PSAyNil7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDI4KXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudGC0Lgg0LrQvtC80L/RjNGO0YLQtdGALlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwicGNcIiAmJiB0aGlzLnN0YXR1cyA9PSAyOSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDMxKXtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0YLQvtCz0L4sINC60YLQviDQv9GA0LjQtNGD0LzQsNC7INC/0LDRgNC+0LvRjCBXaS1GaS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIllhbWFub3ZcIiAmJiB0aGlzLnN0YXR1cyA9PSAzNil7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutC+0LzQv9GM0Y7RgtC10YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInBjXCIgJiYgdGhpcy5zdGF0dXMgPT0gMzcpe1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0K3RgtC+0YIg0YfQtdC70L7QstC10Log0YHQu9C10LTQuNGCINC30LAg0LfQtNC+0YDQvtCy0YzQtdC8LNGDINC90LXQs9C+INCy0YHQtSDRgdC40YHRgtC10LzQvdC+INC4INC/0L4g0YfQsNGB0LDQvC5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIk1hdHZlZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSAzOSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA0MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQttGD0YDQvdCw0Lsg0LIg0LHQuNCx0LvQuNC+0YLQtdC60LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJqdXJuYWxcIiAmJiB0aGlzLnN0YXR1cyA9PSA0MSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JXQs9C+INCz0LvQsNCy0L3QvtC1INGF0L7QsdCx0LggLSDRjdGC0L4g0YDQsNCx0L7RgtCwLiDQntC90LAg0LTQu9GPINC90LXQs9C+INC90LAg0L/QtdGA0LLQvtC8INC80LXRgdGC0LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJTb2xvdmV2XCIgJiYgdGhpcy5zdGF0dXMgPT0gNDMpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gNDYpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0L3QsNC00L/QuNGB0Ywg0L3QsCDQutGD0YXQvdC1LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazJcIiAmJiB0aGlzLnN0YXR1cyA9PSA0Nykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tEZXNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCIuLi4g0LPQvtGC0L7QstC40YIg0LLQutGD0YHQvdC10LUsINGH0LXQvCA4MCUg0LzQvtGB0LrQvtCy0YHQutC40Lkg0LfQsNCy0LXQtNC10L3QuNC5LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiTGFyeWFub3Zza3lcIiAmJiB0aGlzLnN0YXR1cyA9PSA0OSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSA1MSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDRgNCw0LTQuNC+INCyINC/0LXRgNC10LPQvtCy0L7RgNC60LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gNTgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCf0L7QtNC+0LnRgtC4INC6INCU0LXQvdC40YHRgyDQodC80LXRgtC90LXQstGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDY3KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQn9C+0LTQvtC50YLQuCDQuiDQvtC/0LXRgNCw0YLQvtGA0YMg0KHRgtC10L/QsNC90YMsINC+0L0g0LIg0LLQuNC00LXQvtGB0YLRg9C00LjQuC5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlNvbG92ZXZcIiAmJiB0aGlzLnN0YXR1cyA9PSA2Mikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0JTQtdC90LjRgdGDINCh0LzQtdGC0L3QtdCy0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJTbWV0bmV2XCIgJiYgdGhpcy5zdGF0dXMgPT0gNTYpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJTbWV0bmV2XCIgJiYgdGhpcy5zdGF0dXMgPT0gNjApIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCf0L7QtNC+0LnRgtC4INC6INCT0L7RiNC1LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU21ldG5ldlwiICYmIHRoaXMuc3RhdHVzID09IDY1KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiS2l5YW1vdmFcIiAmJiB0aGlzLnN0YXR1cyA9PSA3OCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQvNC40YHRgdC40Y4g0LrQvtC80L/QsNC90LjQuCDQsiDQu9Cw0YPQvdC20LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLaXlhbW92YVwiICYmIHRoaXMuc3RhdHVzID09IDg1KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQntGC0L/RgNCw0LLQu9GP0LnRgdGPINC6INCS0LjRgtC1INCR0LDRgNGL0YjQvdC40LrQvtCy0L7QuS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIkJhcnlzaG5pa292YVwiICYmIHRoaXMuc3RhdHVzID09IDg4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INCx0LvQvtC60L3QvtGCINCyINC/0LXRgNC10LPQvtCy0L7RgNC60LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJCYXJ5c2huaWtvdmFcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMDcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCe0YLQv9GA0LDQstC70LnRgdGPINC6INCa0L7QvdGB0YLQsNC90YLQuNC90YMg0JfQsNC80YPRgNC10L3QutC+LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiU3RlcGFuXCIgJiYgdGhpcy5zdGF0dXMgPT0gNzQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCf0L7QtNC+0LnRgtC4INC6INCQ0L3QuNGB0LUg0JrQuNGP0LzQvtCy0L7QuS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIlphbXVyZW5rb1wiICYmIHRoaXMuc3RhdHVzID09IDEyMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J/QvtC00L7QudGC0Lgg0Log0KHQsNGI0LUg0JrQvtC90L7QvdC10L3QutC+LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiS29ub25lbmtvXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTIzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INCz0LvQsNCy0L3Ri9C1INGG0LXQvdC90L7RgdGC0Lgg0LrQvtC80L/QsNC90LjQuCDQvdCwINC60YPRhdC90LUuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJLb25vbmVua29cIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0LrQvtC90LrRg9GA0LXQvdGC0LAuXCJcclxuICAgICAgICAgICAgdGhpcy5maW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJtaXNzaW9uXCIgJiYgdGhpcy5zdGF0dXMgPT0gNzkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29rTWlzc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIm1pc3Npb25cIiAmJiB0aGlzLnN0YXR1cyA9PSA4MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0JDQvdC40YHQtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIm5vdGUyXCIgJiYgdGhpcy5zdGF0dXMgPT0gOTQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INCS0LjRgtC1LlwiIC8vPz8/XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwidGFzazNcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMjQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INCh0LDRiNC1INCa0L7QvdC+0L3QtdC90LrQvi5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcIkNvbXBldGl0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAxMzIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0LrQsNGB0YHQtdGC0YMuXCJcclxuICAgICAgICAgICAgdGhpcy5maW5kRW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJ0YXNrMVwiICYmIHRoaXMuc3RhdHVzID09IDEzNCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0KHQsNGI0LUg0JrQvtC90L7QvdC10L3QutC+LlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiS29ub25lbmtvXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM1KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQn9C+0LTQvtC50YLQuCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDEzNykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQutC+0YDQt9C40L3RgyDQtNC70Y8g0LzRg9GB0L7RgNCwLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwicmFkaW9cIiAmJiB0aGlzLnN0YXR1cyA9PSA1Mykge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0K3RgtC+0YIg0YfQtdC70L7QstC10Log0YDQsNC90LXQtSDQt9Cw0L3QuNC80LDQu9GB0Y8g0YHQsNC80LHQviDQuCDRgdC60LDQu9C+0LvQsNC30LDQvdGM0LXQvC5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInRyYXNoXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTM5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDE0MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQtNC+0YHQutGDLCDQutC+0YLQvtGA0YMg0YLRiyDQvdC4INGA0LDQt9GDINC90LUg0YHQvNC+0YLRgNC10LsuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjb2RlXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTQzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQktC10YDQvdC40YHRjCDQuiDQutGD0YDQsNGC0L7RgNGDLlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYmVzaWRlID09IFwiY3VyYXRvclwiICYmIHRoaXMuc3RhdHVzID09IDE0NCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0J3QsNC50LTQuCDQutGD0LvQtdGAINGBINCy0L7QtNC+0LkuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJ3YXRlclwiICYmIHRoaXMuc3RhdHVzID09IDE0Nikge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFzayA9IFwi0JLQtdGA0L3QuNGB0Ywg0Log0LrRg9GA0LDRgtC+0YDRgy5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcImN1cmF0b3JcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNDcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCd0LDQudC00Lgg0YPQtNC+0LHQvdGL0Lkg0LTQuNCy0LDQvSDQsiDQsdC40LHQu9C40L7RgtC10LrQtS5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJlc2lkZSA9PSBcInNvZmFcIiAmJiB0aGlzLnN0YXR1cyA9PSAxNDkpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhc2sgPSBcItCS0LXRgNC90LjRgdGMINC6INC60YPRgNCw0YLQvtGA0YMuXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5iZXNpZGUgPT0gXCJjdXJhdG9yXCIgJiYgdGhpcy5zdGF0dXMgPT0gMTUyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXNrID0gXCLQndCw0LnQtNC4INC60L7QvNC90LDRgtGDIFNreWVuZ0RheS5cIlxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb2xsaWRlci5zdGF0aWNTaGFwZXNbdGhpcy5jb2xsaWRlci5zdGF0aWNTaGFwZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLmJlc2lkZSA9PSBcIlZvbGtvdmFcIiB8fCBcclxuICAgICAgICAgICAgdGhpcy5iZXNpZGUgPT0gXCJUaXRvdlwiIHx8IFxyXG4gICAgICAgICAgICB0aGlzLmJlc2lkZSA9PSBcIkthdGFldlwiIHx8IFxyXG4gICAgICAgICAgICB0aGlzLmJlc2lkZSA9PSBcIkFuZHJ6aGV2c2theWFcIiB8fCBcclxuICAgICAgICAgICAgdGhpcy5iZXNpZGUgPT0gXCJLb2xvZGV6bmlrb3ZhXCIgfHwgXHJcbiAgICAgICAgICAgIHRoaXMuYmVzaWRlID09IFwiU29sb2d1YlwiIHx8IFxyXG4gICAgICAgICAgICB0aGlzLmJlc2lkZSA9PSBcIlRlcGlraW5cIiB8fCBcclxuICAgICAgICAgICAgdGhpcy5iZXNpZGUgPT0gXCJQdXNoa2luXCIgfHwgXHJcbiAgICAgICAgICAgIHRoaXMuYmVzaWRlID09IFwiTGViZWRldlwiIHx8IFxyXG4gICAgICAgICAgICB0aGlzLmJlc2lkZSA9PSBcIktpc2VsXCIpICYmIHRoaXMuc3ViU3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9va2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSB0aGlzLm9sZFN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBCb2R5IH0gZnJvbSBcIi4vYm9keVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRlYWNoZXIgZXh0ZW5kcyBCb2R5IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHtpbWFnZU5hbWU6ICd0ZWFjaGVyJywgc3BlZWQ6IDAsIHg6IHgsIHk6IHl9KTtcclxuICAgICAgICB0aGlzLnN0YW5kKGRpcmVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2F5KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUodGltZSkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSh0aW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4vc3ByaXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUaWxlTWFwIGV4dGVuZHMgU3ByaXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGl0Ym94ZXMgPSBwcm9wcy5oaXRib3hlcyB8fCBbXTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoZGlyZWN0aW9uLCBzcGVlZCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGRpcmVjdGlvbiwgc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpcmVjdGlvbihkaXJlY3Rpb24sIHNwZWVkKSB7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBzd2l0Y2goZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gLXNwZWVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBzcGVlZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHNwZWVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSAtc3BlZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9