/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setOrigins = setOrigins;

var _math = __webpack_require__(3);

function setOrigins(base, tree) {
    base.originX = base.BBox.x + base.BBox.width / 2;
    base.originY = base.BBox.y + base.BBox.height;

    tree.originX = tree.BBox.x + tree.BBox.width / 2;
    tree.originY = tree.BBox.y;

    setValues(base, tree);
}

function setValues(base, tree) {
    var angle = 40;
    var duration = 400;

    base.visibleHeight = 100;

    document.getElementById('controls').addEventListener('click', function (e) {
        angle = e.offsetX > window.innerWidth / 2 ? -Math.abs(angle) : Math.abs(angle);

        var _treeTransformValues = (0, _math.treeTransformValues)(base.visibleHeight, tree.visibleHeight, angle),
            treeDelta = _treeTransformValues.treeDelta,
            treeAngle = _treeTransformValues.treeAngle;

        tree.animBend(treeDelta, treeAngle, duration);
        base.animRotate(angle, duration);
    });
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anim = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SVGObject = function () {
    function SVGObject(el) {
        _classCallCheck(this, SVGObject);

        this.el = el;
        this.BBox = this.el.getBBox();
        this.centerX = this.BBox.x + this.BBox.width / 2;
        this.centerY = this.BBox.y + this.BBox.height / 2;
        this.originX = this.centerX;
        this.originY = this.centerY;
        this.visibleHeight = this.BBox.height;
    }

    _createClass(SVGObject, [{
        key: 'rotate',
        value: function rotate(angle) {
            this.el.setAttributeNS(null, 'transform', 'rotate(' + angle + ', ' + this.originX + ', ' + this.originY + ')');
            // animate(this._rotate.bind(this), 0, angle, 300);
        }
    }, {
        key: 'translate',
        value: function translate(x, y) {
            this.el.setAttributeNS(null, 'transform', 'translate(' + x + ', ' + y + ')');
        }
    }, {
        key: 'bend',
        value: function bend(deltaX, deltaY, angle) {
            this.el.setAttributeNS(null, 'transform', 'translate(' + deltaX + ', ' + deltaY + ') rotate(' + angle + ', ' + this.originX + ', ' + this.originY + ')');
        }
    }, {
        key: 'animate',
        value: function animate(method, duration) {
            // switch(method) {
            //     case 'rotate':
            //         return animate(this.rotate.bind(this), 0, args[0], duration, 'cubicIn', () => {
            //             animate(this.rotate.bind(this), args[0], 0, duration + 100, 'cubicOut');
            //         });
            //     case 'bend':
            //         this.bend(...args); break;
            // }
        }
    }, {
        key: 'animRotate',
        value: function animRotate(angle, duration) {
            var rotation = {
                name: 'rotrot',
                start: 0,
                end: angle,
                duration: duration,
                easing: 'cubicIn'
            };

            var self = this;

            (0, _anim.animate)([rotation], function (angle) {
                self.rotate(angle);
            }, function () {
                (0, _anim.animate)([reverse(rotation)], function (angle) {
                    self.rotate(angle);
                });
            });
        }
    }, {
        key: 'animBend',
        value: function animBend(treeDelta, treeAngle, duration) {
            var rotation = {
                name: 'bendrot',
                start: 0,
                end: treeAngle,
                duration: duration,
                easing: 'cubicIn'
            };

            var translationY = {
                name: 'bendtran',
                start: 0,
                end: treeDelta,
                duration: duration,
                easing: 'cubicIn'
            };

            var self = this;

            (0, _anim.animate)([rotation, translationY], function (angle, deltaY) {
                self.bend(0, deltaY, angle);
            }, function () {
                (0, _anim.animate)([reverse(rotation), reverse(translationY)], function (angle, deltaY) {
                    self.bend(0, deltaY, angle);
                });
            });
        }
    }]);

    return SVGObject;
}();

exports.default = SVGObject;


function reverse(animation) {
    var start = animation.start;
    animation.start = animation.end;
    animation.end = start;
    animation.complete = false;
    animation.easing = 'cubicOut';
    animation.duration = animation.duration * 1.3;
    return animation;
}

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.animate = animate;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var animators = {};
var currentTime = void 0;
var running = void 0;
var animId = void 0;

function animate(animations, handler, callback) {
    if (!currentTime) currentTime = performance.now();
    animators[handler] = { animations: animations, handler: handler, startTime: currentTime, callback: callback };

    if (!running) animLoop(currentTime);
}

function animLoop(timestamp) {
    animId = requestAnimationFrame(animLoop);
    running = true;
    currentTime = timestamp;

    if (!Object.keys(animators).length) return stop();

    for (var animKey in animators) {
        var animator = animators[animKey];

        update(animator);

        var args = animator.animations.map(function (anim) {
            return anim.value;
        });
        animator.handler.apply(animator, _toConsumableArray(args));

        if (animator.complete) {
            animator.callback && animator.callback();
            delete animators[animKey];
        }
    }
}

function stop() {
    running = false;
    currentTime = null;
    cancelAnimationFrame(animId);
}

function update(animator) {
    animator.animations.forEach(function (anim) {
        var start = anim.start,
            end = anim.end,
            duration = anim.duration,
            easing = anim.easing;
        var startTime = animator.startTime;

        var timePassed = currentTime - startTime;

        anim.value = interpolate(start, end, timePassed, duration, easing);

        if (timePassed >= duration) {
            anim.complete = true;
            anim.value = anim.end;
        }
    });

    var completeAnimations = animator.animations.filter(function (anim) {
        return anim.complete;
    });
    if (completeAnimations.length === animator.animations.length) animator.complete = true;
}

function interpolate(start, end, timePassed, duration, easingFn) {
    var t = timePassed / duration;
    easingFn = easingFn || 'cubicIn';

    var tPrime = easing[easingFn](t);
    var delta = end - start;
    var value = start + tPrime * delta;

    return value;
}

var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

var easing = {
    cubicIn: function cubicIn(t) {
        return t * t * t;
    },
    cubicOut: function cubicOut(t) {
        return --t * t * t + 1;
    },
    bounceIn: function bounceIn(t) {
        return 1 - bounceOut(1 - t);
    },
    bounceOut: function bounceOut(t) {
        return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
    }
};

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.treeTransformValues = treeTransformValues;
function treeTransformValues(radius, height, angle) {
    var b = radius * Math.sin(toRadians(angle));
    var a = Math.sqrt(Math.pow(height, 2) - Math.pow(b, 2));
    var x = radius * (1 - Math.cos(toRadians(angle)));

    var treeDelta = height - a + x;
    var treeAngle = -toDegrees(Math.asin(b / height));
    return { treeDelta: treeDelta, treeAngle: treeAngle };
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _svg = __webpack_require__(1);

var _svg2 = _interopRequireDefault(_svg);

var _catmas = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
    var wrapper = document.getElementById('tree');
    var treeSVG = wrapper.contentDocument.querySelector('svg');

    var base = new _svg2.default(treeSVG.getElementById('treebase'));
    var tree = new _svg2.default(treeSVG.getElementById('tree'));

    (0, _catmas.setOrigins)(base, tree);
}

window.addEventListener('load', init);

/***/ }
/******/ ]);