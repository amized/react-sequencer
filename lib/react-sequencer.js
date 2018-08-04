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

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

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

/***/ "./src/manager.js":
/*!************************!*\
  !*** ./src/manager.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequencer = _interopRequireDefault(__webpack_require__(/*! ./sequencer */ "./src/sequencer.js"));

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var _debounce = _interopRequireDefault(__webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Manager =
/*#__PURE__*/
function () {
  function Manager() {
    var _this = this;

    _classCallCheck(this, Manager);

    this.startLoop = function () {
      if (!_this.isLooping) {
        _this.isLooping = true;
        _this.now = Date.now();
        _this.requestID = onNextTick(_this._onLoop);
      }
    };

    this.stopLoop = function () {
      if (_this.isLooping) {
        _this.isLooping = false;
        cancelNextTick(_this.requestID);
      }
    };

    this._onLoop = function () {
      _this.now = Date.now();
      var continueLoop = false;

      for (var key in _this.sequencers) {
        var seq = _this.sequencers[key];

        if (seq.status === _constants.STATUS_PLAYING) {
          seq._onLoop(_this.now);

          continueLoop = true;
        }
      }

      if (continueLoop) {
        _this.requestID = onNextTick(_this._onLoop);
      } else {
        _this.stopLoop();
      }
    };

    this.keys = 0;
    this.sequencers = {};
    this.now = Date.now();
    this.isLooping = false;
  }

  _createClass(Manager, [{
    key: "createSequencer",
    value: function createSequencer(options) {
      var _this2 = this;

      var seq = new _sequencer.default(options);
      var key = this.getNewKey();
      this.sequencers[key] = seq;
      var api = {
        play: function play() {
          _this2.play(seq);
        },
        complete: function complete() {
          seq.complete(_this2.now);
        },
        stop: function stop() {
          seq.stop(_this2.now);
        },
        pause: function pause() {
          seq.pause(_this2.now);
        },
        onChange: seq.onChange,
        getState: seq.getState
      };
      return api;
    }
  }, {
    key: "getNewKey",
    value: function getNewKey() {
      return this.keys++;
    }
  }, {
    key: "play",
    value: function play(seq) {
      this.startLoop();
      seq.play(this.now);
    }
  }]);

  return Manager;
}();

var manager = new Manager();
var _default = manager;
exports.default = _default;
module.exports = exports["default"];

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

var Sequencer =
/*#__PURE__*/
function () {
  function Sequencer(props) {
    var _this = this;

    _classCallCheck(this, Sequencer);

    this._onLoop = function (now) {
      var currentStep = _this._getStep(_this.currentStep);

      var currentTimeIn = _this.currentTimeIn = now - _this.startedAt;
      var completesAt = currentStep.endPos;
      _this.timeIntoStep = currentTimeIn - currentStep.startPos;

      if (currentTimeIn >= completesAt) {
        if (_this.currentStep === _this.steps.length - 1) {
          if (_this.loop) {
            _this.currentStep = 0;
            _this.currentTimeIn = 0;
            _this.startedAt = now;
          } else {
            _this.status = _constants.STATUS_COMPLETE;
          }
        } else {
          _this.currentStep++;
        }

        _this._notifyChange();
      }
    };

    this.onChange = function (fn) {
      _this.subscriptions.push(fn);
    };

    this.play = function (now) {
      if (_this.status === _constants.STATUS_PLAYING) {
        return;
      }

      if (_this.isComplete()) {
        _this.currentStep = 0;
        _this.currentTimeIn = 0;
      }

      _this.startedAt = now - _this.currentTimeIn;
      _this.status = _constants.STATUS_PLAYING;

      _this._notifyChange();
    };

    this.pause = function () {
      if (_this.status !== _constants.STATUS_IDLE) {
        _this.status = _constants.STATUS_IDLE;

        _this._notifyChange();
      }
    };

    this.stop = function () {
      if (_this.status !== _constants.STATUS_IDLE) {
        _this.currentStep = 0;
        _this.currentTimeIn = 0;
        _this.status = _constants.STATUS_IDLE;

        _this._notifyChange();
      }
    };

    this.complete = function () {
      if (_this.status !== _constants.STATUS_COMPLETE) {
        _this.currentStep = _this.steps.length - 1;
        _this.status = _constants.STATUS_COMPLETE;

        _this._notifyChange();
      }
    };

    this.isComplete = function () {
      return _this.status === _constants.STATUS_COMPLETE;
    };

    this.isPlaying = function () {
      return _this.status === _constants.STATUS_PLAYING;
    };

    this.getState = function () {
      var state = {
        current: _this.steps[_this.currentStep].name,
        index: _this.currentStep,
        isPlaying: _this.isPlaying(),
        isComplete: _this.isComplete()
      };
      return state;
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

var _manager = _interopRequireDefault(__webpack_require__(/*! ./manager */ "./src/manager.js"));

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

    _this.inSeq = _manager.default.createSequencer({
      steps: props.inSteps
    });
    _this.outSeq = _manager.default.createSequencer({
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

var _manager = _interopRequireDefault(__webpack_require__(/*! ./manager */ "./src/manager.js"));

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
      complete = options.complete;

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

        _this.sequencer = props.sequencer ? props.sequencer : _manager.default.createSequencer({
          steps: steps,
          loop: loop,
          complete: complete
        });
        _this.api = {
          play: _this.sequencer.play,
          stop: _this.sequencer.stop,
          pause: _this.sequencer.pause,
          complete: _this.sequencer.complete
        };
        _this.state = _this.sequencer.getState();

        _this.sequencer.onChange(_this.handleChange);

        return _this;
      }

      _createClass(SequencerWrapper, [{
        key: "render",
        value: function render() {
          var sequencer = Object.assign(this.api, this.state);
          var props = Object.assign({}, this.props, {
            sequencer: sequencer
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