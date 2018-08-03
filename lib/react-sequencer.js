(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define("react-sequencer", ["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["react-sequencer"] = factory(require("prop-types"), require("react"));
	else
		root["react-sequencer"] = factory(root["prop-types"], root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
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

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATUS_COMPLETE = exports.STATUS_PLAYING = exports.STATUS_IDLE = void 0;
var STATUS_IDLE = 'sequencer/STATUS_IDLE';
exports.STATUS_IDLE = STATUS_IDLE;
var STATUS_PLAYING = 'sequencer/STATUS_PLAYING';
exports.STATUS_PLAYING = STATUS_PLAYING;
var STATUS_COMPLETE = 'sequencer/STATUS_COMPLETE';
exports.STATUS_COMPLETE = STATUS_COMPLETE;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withSequencer", {
  enumerable: true,
  get: function get() {
    return _withSequencer.default;
  }
});
Object.defineProperty(exports, "Transition", {
  enumerable: true,
  get: function get() {
    return _transition.default;
  }
});
Object.defineProperty(exports, "Sequencer", {
  enumerable: true,
  get: function get() {
    return _sequencer.default;
  }
});

var _withSequencer = _interopRequireDefault(__webpack_require__(/*! ./with-sequencer */ "./src/with-sequencer.js"));

var _transition = _interopRequireDefault(__webpack_require__(/*! ./transition */ "./src/transition.js"));

var _sequencer = _interopRequireDefault(__webpack_require__(/*! ./sequencer */ "./src/sequencer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/sequencer.js":
/*!**************************!*\
  !*** ./src/sequencer.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var onNextTick, cancelNextTick;

if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
  onNextTick = window.requestAnimationFrame;
  cancelNextTick = window.cancelAnimationFrame;
} else if (typeof setTimeout === 'function') {
  onNextTick = function onNextTick(func) {
    return setTimeout(func, 1);
  };

  cancelNextTick = clearTimeout;
} else {
  throw new Error('React sequencer depends on requestAnimationFrame, please use a polyfill if not available in the browser.');
}

var Sequencer =
/*#__PURE__*/
function () {
  function Sequencer(props) {
    var _this = this;

    _classCallCheck(this, Sequencer);

    this._onLoop = function () {
      if (_this.status !== _constants.STATUS_PLAYING) {
        return;
      }

      var currentStep = _this._getStep(_this.currentStep);

      var now = Date.now();
      var currentTimeIn = _this.currentTimeIn = now - _this.startedAt;
      var completesAt = currentStep.endPos;
      _this.timeIntoStep = currentTimeIn - currentStep.startPos;

      if (currentTimeIn >= completesAt) {
        console.log('updating', _this.currentStep, _this.startedAt);

        if (_this.currentStep === _this.steps.length - 1) {
          if (_this.loop) {
            _this.currentStep = 0;
            _this.currentTimeIn = 0;
            _this.startedAt = Date.now();
          } else {
            _this.status = _constants.STATUS_COMPLETE;
          }
        } else {
          _this.currentStep++;
        }

        _this._notifyChange();
      }

      _this.requestID = onNextTick(_this._onLoop);
    };

    this.play = function () {
      if (_this.status === _constants.STATUS_PLAYING) {
        return;
      }

      if (_this.isComplete()) {
        _this.currentStep = 0;
        _this.currentTimeIn = 0;
      }

      _this.startedAt = Date.now() - _this.currentTimeIn;
      _this.status = _constants.STATUS_PLAYING;

      _this._notifyChange();

      _this.requestID = onNextTick(_this._onLoop);
    };

    this.pause = function () {
      if (_this.status !== _constants.STATUS_IDLE) {
        _this.status = _constants.STATUS_IDLE;
        cancelNextTick(_this.requestID);

        _this._notifyChange();
      }
    };

    this.stop = function () {
      if (_this.status !== _constants.STATUS_IDLE) {
        _this.currentStep = 0;
        _this.currentTimeIn = 0;
        _this.status = _constants.STATUS_IDLE;
        cancelNextTick(_this.requestID);

        _this._notifyChange();
      }
    };

    this.complete = function () {
      if (_this.status !== _constants.STATUS_COMPLETE) {
        _this.currentStep = _this.steps.length - 1;
        _this.status = _constants.STATUS_COMPLETE;
        cancelNextTick(_this.requestID);

        _this._notifyChange();
      }
    };

    this.isComplete = function () {
      return _this.status === _constants.STATUS_COMPLETE;
    };

    this.isPlaying = function () {
      return _this.status === _constants.STATUS_PLAYING;
    };

    var defaults = {
      steps: [],
      loop: false,
      complete: false
    };
    var options = Object.assign(defaults, props);
    this.steps = this._generateSteps(options.steps);
    this.currentStep = 0;
    this.currentTimeIn = 0;
    this.timeIntoStep = 0;
    this.loop = options.loop;
    this.status = _constants.STATUS_IDLE;
    this.requestID = null;
    this.subscriptions = [];

    if (options.complete === true) {
      this.complete();
    }
  }

  _createClass(Sequencer, [{
    key: "_generateSteps",
    value: function _generateSteps(stepsInput) {
      if (!stepsInput || !Array.isArray(stepsInput)) {
        throw new Error('Invalid format.');
      }

      var prev = 0;
      var steps = stepsInput.map(function (step) {
        if (!Array.isArray(step) || step.length !== 2 || typeof step[0] !== 'string' && typeof step[1] !== 'number') {
          throw new Error('Invalid format. See docs for correct structure.');
        }

        var startPos = prev;
        var endPos = step[1] + prev;
        prev = endPos;
        return {
          startPos: startPos,
          endPos: endPos,
          name: step[0]
        };
      });
      return steps;
    }
  }, {
    key: "_getStep",
    value: function _getStep(stepId) {
      return this.steps[stepId];
    }
  }, {
    key: "_notifyChange",
    value: function _notifyChange() {
      var state = this.getState();
      this.subscriptions.forEach(function (fn) {
        fn(state);
      });
    }
  }, {
    key: "onChange",
    value: function onChange(fn) {
      this.subscriptions.push(fn);
    }
  }, {
    key: "getState",
    value: function getState() {
      var state = {
        current: this.steps[this.currentStep].name,
        index: this.currentStep,
        isPlaying: this.isPlaying(),
        isComplete: this.isComplete(),
        play: this.play,
        stop: this.stop,
        pause: this.pause,
        complete: this.complete
      };
      return state;
    }
  }]);

  return Sequencer;
}();

var _default = Sequencer;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/transition.js":
/*!***************************!*\
  !*** ./src/transition.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _sequencer = _interopRequireDefault(__webpack_require__(/*! ./sequencer */ "./src/sequencer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Transition =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Transition, _React$PureComponent);

  function Transition(props) {
    var _this;

    _classCallCheck(this, Transition);

    _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this, props));

    _this.handleInSeqChange = function (seq) {
      _this.setState({
        current: seq.current,
        exitComplete: false
      });
    };

    _this.handleOutSeqChange = function (seq) {
      _this.setState({
        current: seq.current,
        exitComplete: seq.isComplete
      });
    };

    _this.inSeq = new _sequencer.default({
      steps: props.inSteps
    });
    _this.outSeq = new _sequencer.default({
      steps: props.outSteps
    });
    var current;

    if (props.in && props.runOnMount) {
      current = _this.inSeq.getState().current;
    } else if (!props.in) {
      _this.outSeq.complete();

      current = _this.outSeq.getState().current;
    } else {
      _this.inSeq.complete();

      current = _this.inSeq.getState().current;
    }

    _this.state = {
      current: current,
      exitComplete: !props.in
    };

    _this.inSeq.onChange(_this.handleInSeqChange);

    _this.outSeq.onChange(_this.handleOutSeqChange);

    return _this;
  }

  _createClass(Transition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.in && this.props.runOnMount) {
        this.inSeq.play();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.inSeq.stop();
      this.inSeq = null;
      this.outSeq.stop();
      this.outSeq = null;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.in && this.props.in) {
        this.inSeq.stop();
        this.outSeq.play();
      } else if (nextProps.in && !this.props.in) {
        this.outSeq.stop();
        this.inSeq.play();
      }
    }
    /*
    componentDidUpdate(prevProps) {
      if (!prevProps.in && this.props.in) {
        this.outSeq.stop();
        this.inSeq.play();
      } else if (prevProps.in && !this.props.in) {
        this.inSeq.stop();
        this.outSeq.play();
      }
    }
    */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          unmountOnExit = _this$props.unmountOnExit;
      var show = this.props.in;
      var _this$state = this.state,
          current = _this$state.current,
          exitComplete = _this$state.exitComplete;

      if (unmountOnExit && show === false && exitComplete === true) {
        return null;
      }

      if (!children) {
        return null;
      }

      if (typeof children !== 'function') {
        throw new Error('Child passed into Transition must be a function');
      }

      return children(current);
    }
  }]);

  return Transition;
}(_react.default.PureComponent);

Transition.propTypes = {
  /** Toggles the component in and out. */
  in: _propTypes.default.bool,

  /** Sequence to perform when in becomes true. */
  inSteps: _propTypes.default.array.isRequired,

  /** Sequence to perform when in becomes false. */
  outSteps: _propTypes.default.array.isRequired,

  /** Whether or not to run the 'in' sequence when the component mounts. */
  unmountOnExit: _propTypes.default.bool,

  /** If set to true, the child element is removed from the dom when
   * the out sequence gets to a completed state. Note that your
   * component will remain mounted for the duration of the last
   * step before unmounting. */
  runOnMount: _propTypes.default.bool
};
Transition.defaultProps = {
  in: false,
  unmountOnExit: false,
  runOnMount: false
};
var _default = Transition;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/with-sequencer.js":
/*!*******************************!*\
  !*** ./src/with-sequencer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _sequencer = _interopRequireDefault(__webpack_require__(/*! ./sequencer */ "./src/sequencer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var withSequencer = function withSequencer(options) {
  var steps = options.steps,
      loop = options.loop,
      complete = options.complete,
      shouldTriggerPlay = options.shouldTriggerPlay;

  if (!options.steps) {
    throw new Error('Missing steps configuration in withSequencer');
  }

  return function (Component) {
    var _class, _temp, _initialiseProps;

    return _temp = _class =
    /*#__PURE__*/
    function (_React$PureComponent) {
      _inherits(SequencerWrapper, _React$PureComponent);

      function SequencerWrapper(props) {
        var _this;

        _classCallCheck(this, SequencerWrapper);

        _this = _possibleConstructorReturn(this, (SequencerWrapper.__proto__ || Object.getPrototypeOf(SequencerWrapper)).call(this, props));

        _initialiseProps.call(_this);

        _this.sequencer = props.sequencer ? props.sequencer : new _sequencer.default({
          steps: steps,
          loop: loop,
          complete: complete
        });
        _this.state = _this.sequencer.getState();

        _this.sequencer.onChange(_this.handleChange);

        return _this;
      }

      _createClass(SequencerWrapper, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          if (shouldTriggerPlay && shouldTriggerPlay(this.props, nextProps)) {
            this.sequencer.play();
          }
        }
      }, {
        key: "render",
        value: function render() {
          var props = Object.assign({}, this.props, {
            sequencer: this.state
          });
          return _react.default.createElement(Component, props);
        }
      }]);

      return SequencerWrapper;
    }(_react.default.PureComponent), _initialiseProps = function _initialiseProps() {
      var _this2 = this;

      this.handleChange = function (props) {
        _this2.setState(props);
      };
    }, _temp;
  };
};

var _default = withSequencer;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ });
});
//# sourceMappingURL=react-sequencer.js.map