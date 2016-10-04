/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	var oTracking = __webpack_require__(1);
	
	function otrackinginit() {
	
	  var config_data = {
	    server: 'https://spoor-api.ft.com/px.gif',
	    context: {
	      product: 'next'
	    },
	    user: {
	      ft_session: oTracking.utils.getValueFromCookie(/FTSession=([^;]+)/)
	    }
	  };
	  oTracking.init(config_data);
	}
	
	function addTrackingEvent(selector, callback) {
	  var collection = document.querySelectorAll(selector);
	  collection.forEach(function (item, index) {
	    item.addEventListener('click', callback(item, index));
	  });
	}
	
	function getTrackingEventConfig(action, category, pos, context) {
	  var trackingEventConfig = {
	    detail: {
	      category: category,
	      action: action,
	      context: {}
	    },
	    bubbles: true
	  };
	  if (pos) {
	    trackingEventConfig.detail.pos = pos;
	  }
	  if (context) {
	    if (context.anything) {
	      trackingEventConfig.detail.context.anything = context.anything;
	    }
	    if (context.url) {
	      trackingEventConfig.detail.context.url = context.url;
	    }
	  }
	}
	
	function getLinkTrackingEvent(category, pos, context) {
	  var track = function track(event) {
	    var trackingEventConfig = getTrackingEventConfig('click', category, pos, context);
	    document.body.dispatchEvent(new CustomEvent('oTracking.event', trackingEventConfig));
	  };
	  return track;
	}
	
	document.addEventListener("o.DOMContentLoaded", function () {
	
	  otrackinginit();
	
	  // track visit to any page
	  oTracking.page({
	    content: {
	      asset_type: 'page'
	    }
	  });
	
	  //  track click from the cta button
	  addTrackingEvent('.cta', function (item, index) {
	    var callback = getLinkTrackingEvent('help-cta', 0, { url: item.getAttribute('href') });
	
	    if (item.className.indexOf('chat') > -1) {
	      if (item.className.indexOf('chat-online') > -1) {
	        callback = getLinkTrackingEvent('help-subBrand', null, { anything: 'chat-online', url: document.location.pathname });
	      } else if (item.className.indexOf('chat-offline') > -1) {
	        callback = getLinkTrackingEvent('help-subBrand', null, { anything: 'chat-offline', url: document.location.pathname });
	      }
	    }
	    return callback;
	  });
	
	  // track click on the sub brand link
	  addTrackingEvent('.header-sub-brand a', function (item, index) {
	    return getLinkTrackingEvent('help-subBrand', null, { url: item.getAttribute('href') });
	  });
	
	  // track click on the breadcrumbs link
	  addTrackingEvent('.breadcrumbs a', function (item, index) {
	    return getLinkTrackingEvent('help-breadcumbs', index + 1, { url: item.getAttribute('href') });
	  });
	
	  // track click on category link from the help topic homepage
	  addTrackingEvent('.help-topic a', function (item, index) {
	    return getLinkTrackingEvent('help-topic', index + 1, { url: item.getAttribute('href') });
	  });
	
	  // track click from top answered links on homepage
	  addTrackingEvent('.top-answer a', function (item, index) {
	    return getLinkTrackingEvent('help-top-answer', index + 1, { url: item.getAttribute('href') });
	  });
	
	  // track click from related question links on qa pages
	  addTrackingEvent('.related-question a', function (item, index) {
	    return getLinkTrackingEvent('help-related-question', index + 1, { url: item.getAttribute('href') });
	  });
	
	  // track click on search results page
	  addTrackingEvent('.search-template h2.entry-title a', function (item, index) {
	    return getLinkTrackingEvent('help-search-result', index + 1, { url: item.getAttribute('href') });
	  });
	
	  // track click from any link on the footer
	  addTrackingEvent('.o-footer a', function (item, index) {
	    return getLinkTrackingEvent('help-footer-link', null, { url: item.getAttribute('href') });
	  });
	
	  // track click to subcategory heading and qa page from catgory page links
	  document.querySelectorAll('.category-template ul.category li.page_item_has_children').forEach(function (item, subIndex) {
	    addTrackingEvent('.' + item.className.split(' ')[1] + ' > a', function (item) {
	      return getLinkTrackingEvent('help-category-link', subIndex + 1, { url: item.getAttribute('href'), anything: 'subcategory' });
	    });
	
	    addTrackingEvent('.' + item.className.split(' ')[1] + ' ul.children a', function (item, index) {
	      return getLinkTrackingEvent('help-category-link', index + 1, { url: item.getAttribute('href'), anything: 'qa' });
	    });
	  });
	
	  // track click to qa from subcategory page links
	  addTrackingEvent('.subcategory-template ul.category li a', function (item, index) {
	    return getLinkTrackingEvent('help-subcategory-link', index + 1, { url: item.getAttribute('href'), anything: 'qa' });
	  });
	
	  // track search by clicking on the button
	  document.querySelectorAll('#searchsubmit').forEach(function (item, index) {
	    item.addEventListener('click', function (event) {
	      var trackingEventConfig = getTrackingEventConfig('click', 'help-search', null, { anything: 'q:' + encodeUri(document.getElementById('s').value) });
	      document.body.dispatchEvent(new CustomEvent('oTracking.event', trackingEventConfig));
	    });
	  });
	
	  // track search by submitting the form
	  document.querySelectorAll('#searchform').forEach(function (item, index) {
	    item.addEventListener('submit', function (event) {
	      var trackingEventConfig = getTrackingEventConfig('submit', 'help-search', null, { anything: 'q:' + encodeUri(document.getElementById('s').value) });
	      document.body.dispatchEvent(new CustomEvent('oTracking.event', trackingEventConfig));
	    });
	  });
	
	  // track click on the contact us links
	  addTrackingEvent('.contact-template contact a', function (item, index) {
	    return getLinkTrackingEvent('help-contact-link', index + 1, { url: item.getAttribute('href') });
	  });
	
	  // hide related content if it's empty
	  // <!-- no pages to show -->
	
	  document.querySelectorAll('.content-template .content').forEach(function (item) {
	    if (item.innerHTML.indexOf('<!-- no pages to show -->') > -1) {
	      item.style.display = 'none';
	    }
	  });
	});
	
	__webpack_require__(84);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global require, module */
	'use strict'; // eslint-disable-line strict
	
	var settings = __webpack_require__(3);
	var user = __webpack_require__(4);
	var session = __webpack_require__(8);
	var send = __webpack_require__(9);
	
	/**
	 * The version of the tracking module.
	 * @type {string}
	 */
	var version = '1.1.14';
	/**
	 * The source of this event.
	 * @type {string}
	 */
	var source = 'o-tracking';
	/**
	 * The API key.
	 * @type {string}
	 */
	var api_key = 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP';
	
	/**
	 * @class Tracking
	 */
	function Tracking() {
		this.version = version;
		this.source = source;
		this.api_key = api_key;
	
		/**
	  * The initialised state of the object.
	  * @type {boolean}
	  */
		this.initialised = false;
	}
	
	/**
	 * Turn on/off developer mode. (Can also be activated on init.)
	 * @param {boolean} level - Turn on or off, defaults to false if omitted.
	 * @return {undefined}
	 */
	Tracking.prototype.developer = function (level) {
		if (level) {
			settings.set('developer', true);
		} else {
			settings.destroy('developer', null);
			settings.destroy('no_send', null);
		}
	};
	
	/**
	 * Clean up the tracking module.
	 * @return {undefined}
	 */
	Tracking.prototype.destroy = function () {
		this.developer(false);
		this.initialised = false;
	
		settings.destroy('config');
		settings.destroy('page_sent');
	};
	
	/**
	 * Overload toString method to show the version.
	 * @return {string} The module's version.
	 */
	Tracking.prototype.toString = function () {
		return 'oTracking version ' + version;
	};
	
	Tracking.prototype.event = __webpack_require__(70);
	
	Tracking.prototype.page = __webpack_require__(72);
	
	Tracking.prototype.click = __webpack_require__(73);
	
	// Previously, the click handler was initialised as "link"
	Tracking.prototype.link = { init: function init(_) {
			return Tracking.prototype.click.init('link');
		} }; // eslint-disable-line no-unused-vars
	
	Tracking.prototype.utils = __webpack_require__(5);
	
	/**
	 * Initialises the Tracking object.
	 *
	 * All options are optional, if a configuration option is missing, the module
	 * will try to initialise using any configuration found in the DOM using the
	 * script config tag.
	 *
	 * @example
	 * <!-- DOM configuration settings -->
	 * <script type='application/json' data-o-tracking-config>
	 * page: {
	 * 	 product: 'desktop'
	 * },
	 * user: {
	 *   user_id: '023ur9jfokwenvcklwnfiwhfoi324'
	 * }
	 * </script>
	 *
	 * @param {Object} config 					- See {@link Tracking} for the configuration options.
	 * @param {boolean} config.developer        - Optional, if `true`, logs certain actions.
	 * @param {boolean} config.noSend           - Optional, if `true`, won't send events.
	 * @param {string} config.configId          - Optional
	 * @param {string} config.session           - Optional
	 *
	 * @return {Tracking} - Returns the tracking object
	 */
	Tracking.prototype.init = function (config) {
		if (this.initialised) {
			return this;
		}
	
		var hasDeclarativeConfig = !!this._getDeclarativeConfigElement();
	
		if (!(hasDeclarativeConfig || config)) {
			return this;
		}
	
		config = config || {};
		if (hasDeclarativeConfig) {
			config = this._getDeclarativeConfig(config);
		}
	
		settings.set('config', config);
		settings.set('version', this.version);
		settings.set('source', this.source);
		settings.set('api_key', this.api_key);
	
		settings.set('page_sent', false);
	
		// Developer mode
		if (config.developer) {
			this.developer(config.developer);
	
			if (config.noSend) {
				settings.set('no_send', true);
			}
		}
	
		// User identifier
		user.init(config.user ? config.user.user_id : null);
	
		// Session
		session.init(config.session);
	
		// Initialize the sending queue.
		send.init();
	
		this.event.init();
		this.page.init();
		this.initialised = true;
		return this;
	};
	
	/**
	 * Checks if the <script type='application/json' data-o-tracking-config> element is in the DOM
	 * @private
	 * @return {HTMLElement} - Returns the <script> element if found
	 */
	Tracking.prototype._getDeclarativeConfigElement = function () {
		return document.querySelector('script[data-o-tracking-config]');
	};
	
	/**
	 * Initialises additional data using the <script type='application/json' data-o-tracking-config> element in the DOM.
	 * @private
	 * @param {Object} options - A partially, or fully filled options object.  If
	 *                           an option is missing, this method will attempt to
	 *                           initialise it from the DOM.
	 * @return {Object} - The options modified to include the options gathered from the DOM
	 */
	Tracking.prototype._getDeclarativeConfig = function (options) {
		var configEl = this._getDeclarativeConfigElement();
		var declarativeConfigString = undefined;
		if (configEl) {
			declarativeConfigString = configEl.textContent || configEl.innerText || configEl.innerHTML;
		} else {
			return false;
		}
	
		var declarativeOptions = undefined;
	
		try {
			declarativeOptions = JSON.parse(declarativeConfigString);
		} catch (e) {
			var configError = new Error('Invalid JSON configuration syntax, check validity for o-tracking configuration: "' + e.message + '"');
			this.utils.broadcast('oErrors', 'log', {
				error: configError.message,
				info: { module: 'o-tracking' }
			});
			throw configError;
		}
	
		for (var property in declarativeOptions) {
			if (declarativeOptions.hasOwnProperty(property)) {
				options[property] = options[property] || declarativeOptions[property];
			}
		}
	
		return options;
	};
	
	var tracking = new Tracking();
	
	function initialise() {
		tracking.init();
		document.removeEventListener('o.DOMContentLoaded', initialise);
	}
	
	// Try and initialise on o.DOMContentLoaded. If it fails, defer to the
	// consumer of the library.
	document.addEventListener('o.DOMContentLoaded', initialise);
	
	/**
	 * A constructed object, this module is a Singleton as we only want one
	 * instance sending events. See {@link Tracking} for the publicly available
	 * interface.
	 * @type {Tracking}
	 */
	module.exports = tracking;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var settings = {};
	
	/**
	 * Very basic implementation of deep clone, and only supports simple POJO objects and
	 * native arrays.
	 * @param  {*} value Any value
	 * @return {*}       Copy of value
	 * @private
	 */
	function clone(value) {
	  if (value === undefined) {
	    return value;
	  }
	  switch (Object.prototype.toString.call(value)) {
	    case '[object Object]':
	      return JSON.parse(JSON.stringify(value));
	    case '[object Array]':
	      return [].slice.call(value);
	    default:
	      return value;
	  }
	}
	
	/**
	 * Saves a value. Stores a copy rather than a reference, to avoid mutations leaking.
	 *
	 * @param {string} key - The key to use to store the object
	 * @param {*} value - The value
	 * @return {undefined}
	 */
	function setValue(key, value) {
	  settings[key] = clone(value);
	}
	
	/**
	 * Retrieves a value from the settings object. Returns a copy rather than reference, to
	 * avoid mutations leaking.
	 *
	 * @param {string} key - The key to get
	 * @return {*} - The setting.
	 */
	function getValue(key) {
	  return clone(settings[key]);
	}
	
	/**
	 * Deletes a value
	 *
	 * @param  {string} key - The key to delete
	 * @return {undefined}
	 */
	function destroy(key) {
	  delete settings[key];
	}
	
	module.exports = {
	  'set': setValue,
	  'get': getValue,
	  'destroy': destroy
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var _userID = undefined;
	var store = undefined;
	var defaultUserConfig = {
		storage: 'cookie',
		name: 'spoor-id',
		value: null,
		domain: document.URL.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1].indexOf('ft.com') > -1 ? 'ft.com' : null
	};
	
	var utils = __webpack_require__(5);
	var Store = __webpack_require__(7);
	
	/**
	 * migrate_across_domains
	 * Clean up after forgetting to write cookies to the 'root' ft.com domain.
	 * - Check local storage for the 'proper' value.
	 * - If it exists, use it.
	 * - If not, set current user id as the 'proper' value.
	 * - If this value and the cookie match, then we've already fixed it.
	 * - If not, drop the cookie and it will be reset it on the root domain.
	 *
	 * @param {Store} store - The storage instance used for storing the ID.
	 * @param {String} user_id - The user ID to check against storage.
	 * @return {String} - The real user ID.
	 */
	function migrate_across_domains(store, user_id) {
		var ls_name = 'o-tracking-proper-id';
		var proper_id = undefined;
	
		try {
			// This isn't consistent in at least Firefox, maybe more, localstorage seems secured at subdomian level.
			proper_id = utils.getValueFromCookie(ls_name + '=([^;]+)');
	
			if (!proper_id) {
				var d = new Date();
				d.setTime(d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
				var expires = 'expires=' + d.toGMTString() + ';';
	
				window.document.cookie = ls_name + '=' + utils.encode(user_id) + ';' + expires + 'path=/;domain=.' + defaultUserConfig.domain + ';';
				proper_id = user_id;
			}
		} catch (error) {
			utils.broadcast('oErrors', 'log', {
				error: error.message,
				info: { module: 'o-tracking' }
			});
			proper_id = user_id;
		}
	
		// Expire the cookie on the (sub)domain
		window.document.cookie = 'spoor-id=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
		// Re-set the cookie on the  root domain
		store.write(proper_id);
	
		return proper_id;
	}
	
	/**
	 * Init
	 *
	 * @param {String|Object} value The value of a userID to use or configuration object.
	 * @return {String} - The user ID.
	 */
	function init(value) {
		var config = utils.merge(defaultUserConfig, { value: value });
	
		// config.name is important here, means the user has specifically asked for a cookie name.
		if (config.storage === 'cookie' && config.name) {
			config.nameOverride = config.name;
		}
	
		store = new Store(config.name, config);
	
		_userID = store.read();
	
		if (_userID) {
			_userID = migrate_across_domains(store, _userID);
		}
	
		if (!_userID) {
			_userID = config.value;
		}
	
		if (!_userID) {
			_userID = utils.guid();
		}
	
		store.write(_userID); // Refreshes the cookie...
	
		return _userID;
	}
	
	function destroy() {
		store.destroy();
	}
	
	module.exports = {
		init: init,
		userID: function userID() {
			return _userID;
		},
		destroy: destroy
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require, window */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	/**
	 * Shared 'internal' scope.
	 * @private
	 */
	var settings = __webpack_require__(3);
	
	/**
	 * CUID Generator
	 */
	var cuid = __webpack_require__(6);
	
	/**
	 * Record of callbacks to call when a page is tracked.
	 */
	var page_callbacks = [];
	
	/**
	 * Log messages to the browser console. Requires 'log' to be set on init.
	 *
	 * @param {*} List of objects to log
	 * @return {undefined}
	 */
	function log() {
		if (settings.get('developer') && window.console) {
			for (var i = 0; i < arguments.length; i++) {
				window.console.log(arguments[i]);
			}
		}
	}
	
	/**
	 * Tests if variable is a certain type. Defaults to check for undefined if no type specified.
	 *
	 * @param {*} variable - The variable to check.
	 * @param {string} type - The type to test for. Defaults to undefined.
	 *
	 * @return {boolean} - The answer for if the variable is of type.
	 */
	function is(variable, type) {
		if (!type) {
			type = 'undefined';
		}
		return typeof variable === type;
	}
	
	/**
	 * Merge objects together. Will remove 'falsy' values.
	 *
	 * @param {Object} target - The original object to merge in to.
	 * @param {Object} options - The object to merge into the target. If omitted, will merge target into a new empty Object.
	 *
	 * @return {Object} The merged object.
	 */
	function merge(target, options) {
		if (!options) {
			options = target;
			target = {};
		}
	
		var name = undefined;
		var src = undefined;
		var copy = undefined;
	
		/* jshint -W089 */
		/* eslint guard-for-in: 0 */
		for (name in options) {
			src = target[name];
			copy = options[name];
	
			// Prevent never-ending loop
			if (target === copy) {
				continue;
			}
	
			// Gets rid of missing values too
			if (typeof copy !== 'undefined' && copy !== null) {
				target[name] = src === Object(src) && !is(src, 'function') ? merge(src, copy) : copy;
			}
		}
		/* jshint +W089 */
		/* jslint forin:true */
	
		return target;
	}
	
	/**
	 * URL encode a string.
	 * @param {string} str - The string to be encoded.
	 *
	 * @return {string} The encoded string.
	 */
	function encode(str) {
		if (window.encodeURIComponent) {
			return window.encodeURIComponent(str);
		} else {
			return window.escape(str);
		}
	}
	
	/**
	 * URL decode a string.
	 * @param {string} str - The string to be decoded.
	 *
	 * @return {string} The decoded string.
	 */
	function decode(str) {
		if (window.decodeURIComponent) {
			return window.decodeURIComponent(str);
		} else {
			return window.unescape(str);
		}
	}
	
	/*
	 * Utility to add event listeners.
	 *
	 * @param {Element} element
	 * @param {string} event
	 * @param {Function} listener
	 */
	function addEvent(element, event, listener) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, false);
		} else {
			element.attachEvent('on' + event, listener);
		}
	}
	
	/*
	 * Utility for dispatching custom events from window
	 *
	 * @param {string} namespace
	 * @param {string} eventType
	 * @param {Object} detail
	 */
	function broadcast(namespace, eventType, detail) {
		detail = detail || {};
		try {
			window.dispatchEvent(new CustomEvent(namespace + '.' + eventType, {
				detail: detail,
				bubbles: true
			}));
		} catch (error) {}
	}
	
	/**
	 * Listen for page tracking requests.
	 *
	 * @param {Function} cb - The callback to be called whenever a page is tracked.
	 * @return {undefined}
	 */
	function onPage(cb) {
		if (is(cb, 'function')) {
			page_callbacks.push(cb);
		}
	}
	
	/**
	 * Trigger the 'page' listeners.
	 * @return {undefined}
	 */
	function triggerPage() {
		for (var i = 0; i < page_callbacks.length; i++) {
			page_callbacks[i]();
		}
	}
	
	/**
	 * Get a value from document.cookie matching the first match of the regexp you supply
	 * @param {RegExp} matcher - The Regex to match with
	 * @return {String} - The vale from the cookie
	 */
	function getValueFromCookie(matcher) {
		return document.cookie.match(matcher) && RegExp.$1 !== '' && RegExp.$1 !== 'null' ? RegExp.$1 : null;
	}
	
	/**
	 * Get a value from the url, used for uuid or querystring parameters
	 * @param {RegExp} matcher - The Regex to match with
	 * @return {String} - The value from the URL
	 */
	function getValueFromUrl(matcher) {
		return document.location.href.match(matcher) && RegExp.$1 !== '' ? RegExp.$1 : null;
	}
	
	/**
	 * Get a value from a specified JavaScript variable.
	 * @param {String} str - The name of variable, in dot syntax.
	 * @return {String} The value from the JS variable.
	 */
	function getValueFromJsVariable(str) {
		if (typeof str !== 'string') {
			return null;
		}
	
		var i = undefined;
		var namespaces = str.split('.');
		var test = window;
	
		for (i = 0; i < namespaces.length; i = i + 1) {
			if (typeof test[namespaces[i]] === 'undefined') {
				return null;
			}
	
			test = test[namespaces[i]];
		}
	
		return test !== '' ? test : null;
	}
	
	module.exports = {
		log: log,
		is: is,
		isUndefined: is,
		merge: merge,
		encode: encode,
		decode: decode,
		guid: cuid,
		addEvent: addEvent,
		broadcast: broadcast,
		onPage: onPage,
		triggerPage: triggerPage,
		getValueFromCookie: getValueFromCookie,
		getValueFromUrl: getValueFromUrl,
		getValueFromJsVariable: getValueFromJsVariable
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*eslint-disable*/
	/**
	 * cuid.js
	 * Collision-resistant UID generator for browsers and node.
	 * Sequential for fast db lookups and recency sorting.
	 * Safe for element IDs and server-side lookups.
	 *
	 * Extracted from CLCTR
	 *
	 * Copyright (c) Eric Elliott 2012
	 * MIT License
	 */
	
	/*global window, navigator, document, require, process, module */
	(function (app) {
	  'use strict';
	  var namespace = 'cuid',
	      c = 0,
	      blockSize = 4,
	      base = 36,
	      discreteValues = Math.pow(base, blockSize),
	      pad = function pad(num, size) {
	    var s = "000000000" + num;
	    return s.substr(s.length - size);
	  },
	      randomBlock = function randomBlock() {
	    return pad((Math.random() * discreteValues << 0).toString(base), blockSize);
	  },
	      safeCounter = function safeCounter() {
	    c = c < discreteValues ? c : 0;
	    c++; // this is not subliminal
	    return c - 1;
	  },
	      api = function cuid() {
	    // Starting with a lowercase letter makes
	    // it HTML element ID friendly.
	    var letter = 'c',
	        // hard-coded allows for sequential access
	
	    // timestamp
	    // warning: this exposes the exact date and time
	    // that the uid was created.
	    timestamp = new Date().getTime().toString(base),
	
	    // Prevent same-machine collisions.
	    counter,
	
	    // A few chars to generate distinct ids for different
	    // clients (so different computers are far less
	    // likely to generate the same id)
	    fingerprint = api.fingerprint(),
	
	    // Grab some more chars from Math.random()
	    random = randomBlock() + randomBlock();
	
	    counter = pad(safeCounter().toString(base), blockSize);
	
	    return letter + timestamp + counter + fingerprint + random;
	  };
	
	  api.slug = function slug() {
	    var date = new Date().getTime().toString(36),
	        counter,
	        print = api.fingerprint().slice(0, 1) + api.fingerprint().slice(-1),
	        random = randomBlock().slice(-2);
	
	    counter = safeCounter().toString(36).slice(-4);
	
	    return date.slice(-2) + counter + print + random;
	  };
	
	  api.globalCount = function globalCount() {
	    // We want to cache the results of this
	    var cache = (function calc() {
	      var i,
	          count = 0;
	
	      for (i in window) {
	        count++;
	      }
	
	      return count;
	    })();
	
	    api.globalCount = function () {
	      return cache;
	    };
	    return cache;
	  };
	
	  api.fingerprint = function browserPrint() {
	    return pad((navigator.mimeTypes.length + navigator.userAgent.length).toString(36) + api.globalCount().toString(36), 4);
	  };
	
	  // don't change anything from here down.
	  if (true) {
	    module.exports = api;
	  } else {
	    app[namespace] = api;
	  }
	})(undefined);
	/*eslint-enable */

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require, window */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	/**
	 * Class for storing data
	 * Will choose the 'best' storage method available. Can also specify a type of storage.
	 *
	 * @class  Store
	 * @param {string} name - The name of the store
	 * @param {Object} config - Optional, config object for extra configuration
	 */
	var Store = function Store(name, config) {
	
		/**
	  * Internal Storage key prefix.
	  */
		var keyPrefix = 'o-tracking';
	
		/**
	  * Temporary var containing data from a previously saved store.
	  * @property loadStore
	  */
		var loadStore = undefined;
		var utils = __webpack_require__(5);
	
		if (utils.isUndefined(name)) {
			var undefinedName = new Error('You must specify a name for the store.');
			utils.broadcast('oErrors', 'log', {
				error: undefinedName.message,
				info: { module: 'o-tracking' }
			});
			throw undefinedName;
		}
	
		this.config = utils.merge({ storage: 'best', expires: 10 * 365 * 24 * 60 * 60 * 1000 }, config);
	
		/**
	  * Store data.
	  */
		this.data = null;
	
		/**
	  * The key/name of this store.
	  */
		this.storageKey = this.config.hasOwnProperty('nameOverride') ? this.config.nameOverride : [keyPrefix, name].join('_');
	
		/**
	  * The storage method to use. Determines best storage method.
	  *
	  * @type {Object}
	  */
		this.storage = (function (config, window) {
			var test_key = keyPrefix + '_InternalTest';
	
			// If cookie has been manually specified, don't bother with local storage.
			if (config.storage !== 'cookie') {
				try {
					if (window.localStorage) {
						window.localStorage.setItem(test_key, 'TEST');
	
						if (window.localStorage.getItem(test_key) === 'TEST') {
							window.localStorage.removeItem(test_key);
							return {
								_type: 'localStorage',
								load: function load(name) {
									return window.localStorage.getItem.call(window.localStorage, name);
								},
								save: function save(name, value) {
									return window.localStorage.setItem.call(window.localStorage, name, value);
								},
								remove: function remove(name) {
									return window.localStorage.removeItem.call(window.localStorage, name);
								}
							};
						}
					}
				} catch (error) {
					utils.broadcast('oErrors', 'log', {
						error: error.message,
						info: { module: 'o-tracking' }
					});
				}
			}
	
			function cookieLoad(name) {
				name = name + '=';
	
				var cookies = window.document.cookie.split(';');
				var i = undefined;
				var cookie = undefined;
	
				for (i = 0; i < cookies.length; i = i + 1) {
					cookie = cookies[i].replace(/^\s+|\s+$/g, '');
					if (cookie.indexOf(name) === 0) {
						return utils.decode(cookie.substring(name.length, cookie.length));
					}
				}
	
				return null;
			}
	
			function cookieSave(name, value, expiry) {
				var d = undefined;
				var expires = '';
				var cookie = undefined;
	
				if (utils.is(expiry, 'number')) {
					d = new Date();
					d.setTime(d.getTime() + expiry);
					expires = 'expires=' + d.toGMTString() + ';';
				}
	
				cookie = utils.encode(name) + '=' + utils.encode(value) + ';' + expires + 'path=/;' + (config.domain ? 'domain=.' + config.domain + ';' : '');
				window.document.cookie = cookie;
			}
	
			function cookieRemove(name) {
				cookieSave(name, '', -1);
			}
	
			cookieSave(test_key, 'TEST');
	
			if (cookieLoad(test_key) === 'TEST') {
				cookieRemove(test_key);
	
				return {
					_type: 'cookie',
					load: cookieLoad,
					save: cookieSave,
					remove: cookieRemove
				};
			}
	
			return {
				_type: 'none',
				load: function load() {},
				save: function save() {},
				remove: function remove() {}
			};
		})(this.config, window);
	
		// Retrieve any previous store with the same name.
		loadStore = this.storage.load(this.storageKey);
		if (loadStore) {
			try {
				this.data = JSON.parse(loadStore);
			} catch (error) {
				utils.broadcast('oErrors', 'log', {
					error: error.message,
					module: 'o-tracking'
				});
				this.data = loadStore;
			}
		}
	
		return this;
	};
	
	/**
	 * Get/Read the current data.
	 *
	 * @return {Object} Returns the data from the store.
	 */
	Store.prototype.read = function () {
		return this.data;
	};
	
	/**
	 * Write the supplied data to the store.
	 *
	 * @param {String} data - The data to write.
	 * @return {Store} - The instance of the store
	 */
	Store.prototype.write = function (data) {
		// Set this.data, in-case we're on a file:// domain and can't set cookies.
		this.data = data;
		this.storage.save(this.storageKey, typeof this.data === 'string' ? this.data : JSON.stringify(this.data), this.config.expires);
	
		return this;
	};
	
	/**
	 * Delete the current data.
	 * @return {Store} - The instance of the store
	 */
	Store.prototype.destroy = function () {
		this.data = null;
		this.storage.remove(this.storageKey);
		return this;
	};
	
	module.exports = Store;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var store = undefined;
	var defaultSessionConfig = {
		storage: 'best',
		name: 'session',
		expires: 30 * 60 * 1000 // 30 minutes
	};
	
	var utils = __webpack_require__(5);
	var Store = __webpack_require__(7);
	
	/**
	 * Set the session in the store.
	 *
	 * @param {String} session - The session to be stored.
	 * @return {undefined}
	 */
	function setSession(session) {
		var d = new Date();
		d.setTime(d.getTime() + store.config.expires);
	
		store.write({
			value: session,
			expiry: d.valueOf()
		});
	}
	
	/**
	 * Get the session from the store. Expiry and gen of a new session are handled here.
	 *
	 * @return {Object} the current session
	 */
	function getSession() {
		var s = store.read();
		var session = undefined;
		var isNew = false;
	
		if (s) {
			var d = new Date().valueOf();
			var exp = parseInt(s.expiry);
	
			// If current session is active.
			if (exp >= d) {
				session = s.value;
			}
		}
	
		// No active session, gen a new one.
		if (!session) {
			session = utils.guid();
			isNew = true;
		}
	
		// Refreshes the cookie...
		setSession(session);
	
		return {
			id: session,
			isNew: isNew
		};
	}
	
	/**
	 * Init
	 *
	 * @param {String|Object} config The name used to store the session or configuration object.
	 * @return {Session} - The session
	 */
	function init(config) {
		if (utils.is(config, 'string')) {
			config = { name: config };
		}
	
		if (utils.isUndefined(config)) {
			config = {};
		}
	
		var c = utils.merge(defaultSessionConfig, config);
	
		// config.name is important here, means the user has specifically asked for a cookie name.
		if (c.storage === 'cookie' && config.name) {
			c.nameOverride = c.name;
		}
	
		store = new Store(c.name, c);
	
		return getSession();
	}
	
	module.exports = {
		init: init,
		session: getSession
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _Promise = __webpack_require__(10)['default'];
	
	var define = false;
	
	/*global module, require, window */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var settings = __webpack_require__(3);
	var utils = __webpack_require__(5);
	var Queue = __webpack_require__(65);
	var transports = __webpack_require__(66);
	/**
	 * Default collection server.
	 */
	var domain = 'http://test.spoor-api.ft.com';
	
	/**
	 * Queue queue.
	 *
	 * @type {Queue}
	 */
	var queue = undefined;
	
	/**
	 * Consistent check to see if we should use sendBeacon or not.
	 *
	 * @return {boolean} Should we use sendBeacon?
	 */
	function should_use_sendBeacon() {
		return navigator.sendBeacon && _Promise && (settings.get('config') || {}).useSendBeacon;
	}
	
	/**
	 * Attempts to send a tracking request.
	 *
	 * @param {Object} request The request to be sent.
	 * @param {Function} callback Callback to fire the next item in the queue.
	 * @return {undefined}
	 */
	function sendRequest(request, callback) {
		var queueTime = request.queueTime;
		var offlineLag = new Date().getTime() - queueTime;
		var path = undefined;
		var transport = should_use_sendBeacon() ? transports.get('sendBeacon')() : window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest() ? transports.get('xhr')() : transports.get('image')();
		var user_callback = request.callback;
	
		var core_system = settings.get('config') && settings.get('config').system || {};
		var system = utils.merge(core_system, {
			api_key: settings.get('api_key'), // String - API key - Make sure the request is from a valid client (idea nicked from Keen.io) useful if a page gets copied onto a Russian website and creates noise
			version: settings.get('version'), // Version of the tracking client e.g. '1.2'
			source: settings.get('source') });
	
		// Source of the tracking client e.g. 'o-tracking'
		request = utils.merge({ system: system }, request);
	
		// Only bothered about offlineLag if it's longer than a second, but less than 12 months. (Especially as Date can be dodgy)
		if (offlineLag > 1000 && offlineLag < 12 * 30 * 24 * 60 * 60 * 1000) {
			request.time = request.time || {};
			request.time.offset = offlineLag;
		}
		delete request.callback;
		delete request.async;
		delete request.type;
		delete request.queueTime;
	
		utils.log('user_callback', user_callback);
		utils.log('PreSend', request);
	
		path = JSON.stringify(request);
	
		utils.log('path', path);
	
		transport.complete(function (error) {
			if (utils.is(user_callback, 'function')) {
				user_callback.call(request);
				utils.log('calling user_callback');
			}
	
			if (error) {
				// Re-add to the queue if it failed.
				// Re-apply queueTime here
				request.queueTime = queueTime;
				queue.add(request).save();
	
				utils.broadcast('oErrors', 'log', {
					error: error.message,
					info: { module: 'o-tracking' }
				});
			} else {
				callback && callback();
			}
		});
	
		// Both developer and noSend flags have to be set to stop the request sending.
		if (!(settings.get('developer') && settings.get('no_send'))) {
			transport.send(domain, path);
		}
	}
	
	/**
	 * Adds a new request to the list of pending requests
	 *
	 * @param {Tracking} request The request to queue
	 * @return {undefined}
	 */
	function add(request) {
		request.queueTime = new Date().getTime();
		if (should_use_sendBeacon()) {
			sendRequest(request);
		} else {
			queue.add(request).save();
		}
		utils.log('AddedToQueue', queue);
	}
	
	/**
	 * If there are any requests queued, attempts to send the next one
	 * Otherwise, does nothing
	 * @param {Function} callback - Optional callback
	 * @return {undefined}
	 */
	function run(callback) {
		if (utils.isUndefined(callback)) {
			callback = function () {};
		}
	
		// Investigate queue lengths bug
		// https://jira.ft.com/browse/DTP-330
		var all_events = queue.all();
	
		if (all_events.length > 200) {
			(function () {
				var counts = {};
	
				all_events.forEach(function (event) {
					var label = [event.category, event.action].join(':');
	
					if (!counts.hasOwnProperty(label)) {
						counts[label] = 0;
					}
	
					counts[label] += 1;
				});
	
				queue.replace([]);
	
				queue.add({
					category: 'o-tracking',
					action: 'queue-bug',
					context: {
						url: document.url,
						queue_length: all_events.length,
						counts: counts,
						storage: queue.storage.storage._type
					}
				});
			})();
		}
	
		var next = function next() {
			run();
			callback();
		};
		var nextRequest = queue.shift();
	
		// Cancel if we've run out of requests.
		if (!nextRequest) {
			return callback();
		}
	
		// Send this request, then try run again.
		return sendRequest(nextRequest, next);
	}
	
	/**
	 * Convenience function to add and run a request all in one go.
	 *
	 * @param {Object} request The request to queue and run.
	 * @return {undefined}
	 */
	function addAndRun(request) {
		add(request);
		run();
	}
	
	/**
	 * Init the queue and send any leftover events.
	 * @return {undefined}
	 */
	function init() {
		queue = new Queue('requests');
	
		if (settings.get('config') && settings.get('config').server) {
			domain = settings.get('config').server;
		}
	
		// If any tracking calls are made whilst offline, try sending them the next time the device comes online
		utils.addEvent(window, 'online', run);
	
		// On startup, try sending any requests queued from a previous session.
		run();
	
		return queue;
	}
	
	module.exports = {
		init: init,
		add: add,
		run: run,
		addAndRun: addAndRun
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(11), __esModule: true };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(37);
	__webpack_require__(44);
	module.exports = __webpack_require__(21).Promise;

/***/ },
/* 12 */
/***/ function(module, exports) {



/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(14)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(17)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(15)
	  , defined   = __webpack_require__(16);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(18)
	  , $export        = __webpack_require__(19)
	  , redefine       = __webpack_require__(24)
	  , hide           = __webpack_require__(25)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(31)
	  , $iterCreate    = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(33)
	  , getProto       = __webpack_require__(26).getProto
	  , ITERATOR       = __webpack_require__(34)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(20)
	  , core      = __webpack_require__(21)
	  , ctx       = __webpack_require__(22)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 20 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 21 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(23);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(26)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(28) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(29)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(26)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(33)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(25)(IteratorPrototype, __webpack_require__(34)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(26).setDesc
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(34)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(35)('wks')
	  , uid    = __webpack_require__(36)
	  , Symbol = __webpack_require__(20).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(20)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	var Iterators = __webpack_require__(31);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(39)
	  , step             = __webpack_require__(40)
	  , Iterators        = __webpack_require__(31)
	  , toIObject        = __webpack_require__(41);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(17)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(42)
	  , defined = __webpack_require__(16);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(43);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(26)
	  , LIBRARY    = __webpack_require__(18)
	  , global     = __webpack_require__(20)
	  , ctx        = __webpack_require__(22)
	  , classof    = __webpack_require__(45)
	  , $export    = __webpack_require__(19)
	  , isObject   = __webpack_require__(46)
	  , anObject   = __webpack_require__(47)
	  , aFunction  = __webpack_require__(23)
	  , strictNew  = __webpack_require__(48)
	  , forOf      = __webpack_require__(49)
	  , setProto   = __webpack_require__(54).set
	  , same       = __webpack_require__(55)
	  , SPECIES    = __webpack_require__(34)('species')
	  , speciesConstructor = __webpack_require__(56)
	  , asap       = __webpack_require__(57)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , empty      = function(){ /* empty */ }
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(empty), promise;
	  if(sub)test.constructor = function(exec){
	    exec(empty, empty);
	  };
	  (promise = P.resolve(test))['catch'](empty);
	  return promise === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(28)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(62)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(33)(P, PROMISE);
	__webpack_require__(63)(PROMISE);
	Wrapper = __webpack_require__(21)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(64)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(43)
	  , TAG = __webpack_require__(34)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(46);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(22)
	  , call        = __webpack_require__(50)
	  , isArrayIter = __webpack_require__(51)
	  , anObject    = __webpack_require__(47)
	  , toLength    = __webpack_require__(52)
	  , getIterFn   = __webpack_require__(53);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(47);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(31)
	  , ITERATOR   = __webpack_require__(34)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(15)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(45)
	  , ITERATOR  = __webpack_require__(34)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(21).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(26).getDesc
	  , isObject = __webpack_require__(46)
	  , anObject = __webpack_require__(47);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(22)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(47)
	  , aFunction = __webpack_require__(23)
	  , SPECIES   = __webpack_require__(34)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(20)
	  , macrotask = __webpack_require__(58).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(43)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(22)
	  , invoke             = __webpack_require__(59)
	  , html               = __webpack_require__(60)
	  , cel                = __webpack_require__(61)
	  , global             = __webpack_require__(20)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(43)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20).document && document.documentElement;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(46)
	  , document = __webpack_require__(20).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(24);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(21)
	  , $           = __webpack_require__(26)
	  , DESCRIPTORS = __webpack_require__(28)
	  , SPECIES     = __webpack_require__(34)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(34)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var utils = __webpack_require__(5);
	var Store = __webpack_require__(7);
	
	/**
	 * Class for handling a queue backed up by a store.
	 * @class Queue
	 *
	 * @param {String} name - The name of the queue.
	 * @return {Queue} - Returns the instance of the queue.
	 */
	var Queue = function Queue(name) {
		if (utils.isUndefined(name)) {
			var undefinedName = new Error('You must specify a name for the queue.');
			utils.broadcast('oErrors', 'log', {
				error: undefinedName.message,
				info: { module: 'o-tracking' }
			});
			throw undefinedName;
		}
	
		/**
	  * Queue data.
	  * @type {Array}
	  */
		this.queue = [];
	
		/**
	  * The storage method to use. Determines best storage method.
	  * @type {Object}
	  */
		this.storage = new Store(name);
	
		// Retrieve any previous store with the same name.
		if (this.storage.read()) {
			this.queue = this.storage.read();
		}
	
		return this;
	};
	
	/**
	 * Gets the contents of the store.
	 *
	 * @return {Array} The array of items.
	 */
	Queue.prototype.all = function () {
		if (this.queue.length === 0) {
			return [];
		}
	
		var items = [];
	
		for (var i = 0; i < this.queue.length; i = i + 1) {
			items.push(this.queue[i].item);
		}
	
		return items;
	};
	
	/**
	 * Gets the first item in the store.
	 *
	 * @return {Object} Returns the item.
	 */
	Queue.prototype.first = function () {
		if (this.queue.length === 0) {
			return null;
		}
	
		return this.queue[0].item;
	};
	
	/**
	 * Gets the last item in the store.
	 *
	 * @return {Object} Returns the item.
	 */
	Queue.prototype.last = function () {
		if (this.queue.length === 0) {
			return null;
		}
	
		return this.queue.slice(-1)[0].item;
	};
	
	/**
	 * Add data to the store.
	 *
	 * @param {Object} item - An item or an array of items.
	 *
	 * @return {Queue} - Returns the instance of the queue.
	 */
	Queue.prototype.add = function (item) {
		// I was trying to turn this whole add function into a little module, to stop doAdd function being created everytime, but couldn't work out how to get to 'this' from within the module.
	
		var self = this;
		var i = undefined;
	
		function doAdd(item) {
			self.queue.push({
				created_at: new Date().valueOf(),
				item: item
			});
		}
	
		if (utils.is(item, 'object') && item.constructor.toString().match(/array/i)) {
			for (i = 0; i < item.length; i = i + 1) {
				doAdd(item[i]);
			}
		} else {
			doAdd(item);
		}
	
		return self;
	};
	
	/**
	 * Overwrite the store with something completely new.
	 *
	 * @param {Array} items The new array of data.
	 *
	 * @return {Queue} - Returns the instance of the queue.
	 */
	Queue.prototype.replace = function (items) {
		if (utils.is(items, 'object') && items.constructor.toString().match(/array/i)) {
			this.queue = [];
			this.add(items).save();
	
			return this;
		}
	
		var invalidArg = new Error('Argument invalid, must be an array.');
		utils.broadcast('oErrors', 'log', {
			error: invalidArg.message,
			info: { module: 'o-tracking' }
		});
		throw invalidArg;
	};
	
	/**
	 * Pop the first item from the queue.
	 *
	 * @return {Object} The item.
	 */
	Queue.prototype.shift = function () {
		if (this.queue.length === 0) {
			return null;
		}
	
		var item = this.queue.shift().item;
	
		this.save();
	
		return item;
	};
	
	/**
	 * Save the current store to localStorage so that old requests can still be sent after a page refresh.
	 *
	 * @return {Queue} - Returns the instance of the queue.
	 */
	Queue.prototype.save = function () {
		this.storage.write(this.queue);
	
		return this;
	};
	
	module.exports = Queue;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	module.exports = {
		xhr: __webpack_require__(67),
		sendBeacon: __webpack_require__(68),
		image: __webpack_require__(69),
		get: function get(name) {
			return this.mock || this[name];
		}
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	module.exports = function () {
		var xhr = new window.XMLHttpRequest();
	
		return {
			send: function send(url, data) {
				xhr.open('POST', url, true);
				xhr.withCredentials = true;
				xhr.setRequestHeader('Content-type', 'application/json');
				xhr.send(data);
			},
			complete: function complete(callback) {
				xhr.onerror = function () {
					callback(this);
				};
				xhr.onload = function () {
					if (xhr.status >= 200 && xhr.status < 300) {
						callback();
					} else {
						callback('Incorrect response: ' + xhr.status);
					}
				};
			}
		};
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _Promise = __webpack_require__(10)['default'];
	
	var define = false;
	
	module.exports = function () {
	    var resolver = undefined;
	    var rejecter = undefined;
	    var p = new _Promise(function (resolve, reject) {
	        resolver = resolve;
	        rejecter = reject;
	    });
	    return {
	        send: function send(url, data) {
	            if (navigator.sendBeacon(url, data)) {
	                resolver();
	            } else {
	                rejecter(new Error('Failed to send beacon event: ' + data.toString()));
	            }
	        },
	        complete: function complete(callback) {
	            callback && p.then(callback, callback);
	        }
	    };
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	var utils = __webpack_require__(5);
	
	module.exports = function () {
		var image = new Image(1, 1);
	
		return {
			send: function send(url, data) {
				image.src = url + '?data=' + utils.encode(data);
			},
			complete: function complete(callback) {
				if (image.addEventListener) {
					image.addEventListener('error', callback);
					image.addEventListener('load', function () {
						return callback();
					});
				} else {
					// it's IE!
					image.attachEvent('onerror', callback);
					image.attachEvent('onload', function () {
						return callback();
					});
				}
			}
		};
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var Core = __webpack_require__(71);
	var utils = __webpack_require__(5);
	
	/**
	 * Default properties for events.
	 *
	 * @type {Object}
	 * @return {Object} - Default configuration for events
	 */
	var defaultEventConfig = function defaultEventConfig() {
		return {
			category: 'event',
			action: 'generic',
			context: {}
		};
	};
	
	/**
	 * Track an event.
	 *
	 * @param {Event} trackingEvent - The event, which could the following properties in its 'detail' key:
	 *   [category] - The category, for example: video
	 *   [action] - The action performed, for example: play
	 *   [component_id] - Optional. The ID for the component instance.
	 *
	 * @param {Function} callback - Optional, Callback function. Called when request completed.
	 * @return {undefined}
	 */
	function event(trackingEvent, callback) {
		if (utils.is(trackingEvent.detail.category) || utils.is(trackingEvent.detail.action)) {
			var noCategoryActionVals = 'Missing category or action values';
			utils.broadcast('oErrors', 'log', {
				error: noCategoryActionVals,
				info: { module: 'o-tracking' }
			});
			throw noCategoryActionVals;
		}
	
		var config = utils.merge(defaultEventConfig(), {
			category: trackingEvent.detail.category,
			action: trackingEvent.detail.action,
			context: trackingEvent.detail
		});
	
		delete config.context.category;
		delete config.context.action;
	
		var origamiElement = getOrigamiEventTarget(trackingEvent);
		if (origamiElement) {
			config.context.component_name = origamiElement.getAttribute('data-o-component');
			config.context.component_id = config.context.component_id || getComponentId(origamiElement);
		} else {
			config.context.component_name = config.context.component_name;
			config.context.component_id = config.context.component_id;
		}
	
		Core.track(config, callback);
	}
	
	/**
	 * Helper function that gets the target of an event if it's an Origami component
	 * @param  {Event} event - The event triggered.
	 * @return {HTMLElement|undefined} - Returns the HTML element if an Origami component, else undefined.
	 */
	function getOrigamiEventTarget(event) {
		// IE backwards compatibility (get the actual target). If not IE, uses
		// `event.target`
		var element = event.target || event.srcElement;
	
		if (element && element.getAttribute('data-o-component')) {
			return element;
		} else {
			return;
		}
	}
	
	/**
	 * Helper function that generates a component id based on its xpath
	 *
	 * @param {HTMLElement} element - The HTML Element to gen an ID for.
	 *
	 * @return {string} hash
	 */
	function getComponentId(element) {
		var path = _getElementPath(element);
	
		if (typeof path === 'undefined') {
			return;
		}
	
		// Select the source element (first item in the ordered sequence `path`)
		var srcElement = path[0];
	
		// Because, you could have two identical elements in the DOM as siblings,
		// we need to determine the 'sibling index': the order they're sitting within a DOM node.
		// Although in reality this is unlikely to always be the same, it's just a
		// best guess - unless child elements are always appended to an element rather than added as the first child.
		var siblingIndex = (function getSiblingIndex(element) {
			var srcParent = element.parentElement;
			if (srcParent) {
				for (var i = 0; i < srcParent.childNodes.length; i++) {
					if (srcParent.childNodes[i] === srcElement) {
						return i;
					}
				}
				return -1;
			} else {
				return 0;
			}
		})(srcElement);
	
		// Generate a normalised string (normalising browser quirks) from the sequence of elements
		var normalisedStringPath = path.reduceRight(function (builder, el) {
			if (!el.nodeName) {
				return builder + ' - ' + el.constructor.name + '\n';
			}
	
			var nodeName = el.nodeName.toLowerCase();
	
			// In some browsers, document is prepended with a '#'
			if (nodeName.indexOf('#') === 0) {
				return builder + '<' + nodeName + '>';
			}
	
			// Replace this stuff with stuff that makes each node unique - without including styling detail (as this may change depending on animation state etc, position)
			return builder + '<' + nodeName + ' id="' + (el.id || '') + '">';
		}, '');
	
		// Append a sibling index to the string and use some simple, off the shelf string hashing algorithm.
		return _generateHash(normalisedStringPath + '_siblingIndex=' + siblingIndex);
	}
	
	/**
	 * Gets the xpath for an element
	 *
	 * @param  {HTMLElement} element - The element to get a path for.
	 *
	 * @private
	 *
	 * @return {array} The xpath
	 */
	function _getElementPath(element) {
		var path = [];
	
		while (element) {
			path.push(element);
			element = element.parentElement;
		}
	
		return path;
	}
	
	/**
	 * JS Implementation of MurmurHash2
	 *
	 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	 * @see http://github.com/garycourt/murmurhash-js
	 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
	 * @see http://sites.google.com/site/murmurhash/
	 * Copyright (c) 2011 Gary Court
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 *
	 * @param {string} str  - The string to hash, ASCII only.
	 *
	 * @return {number} 32-bit positive integer hash
	 *
	 * @private
	 */
	function _generateHash(str) {
		var l = str.length;
		var h = 1 ^ l;
		var i = 0;
		var k = undefined;
	
		while (l >= 4) {
			k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
	
			k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
			k ^= k >>> 24;
			k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	
			h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
	
			l -= 4;
			++i;
		}
	
		switch (l) {
			case 3:
				h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
				break;
			case 2:
				h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
				break;
			case 1:
				h ^= str.charCodeAt(i) & 0xff;
				h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
		}
	
		h ^= h >>> 13;
		h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
		h ^= h >>> 15;
	
		return h >>> 0;
	}
	
	module.exports = event;
	module.exports.init = function () {
		utils.addEvent(window, 'oTracking.event', event);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var Send = __webpack_require__(9);
	var User = __webpack_require__(4);
	var Session = __webpack_require__(8);
	
	/**
	 * Shared 'internal' scope.
	 * @type {Object}
	 */
	var settings = __webpack_require__(3);
	var utils = __webpack_require__(5);
	
	/**
	 * Default properties for sending a tracking request.
	 * @type {Object}
	 * @return {Object} - The default settings for the component.
	 */
	var defaultConfig = function defaultConfig() {
		return {
			async: true,
			callback: function callback() {},
			system: {},
			context: {},
			user: {
				passport_id: utils.getValueFromCookie(/USERID=([0-9]+):/) || utils.getValueFromCookie(/PID=([0-9]+)\_/),
				ft_session: utils.getValueFromCookie(/FTSession=([^;]+)/)
			}
		};
	};
	
	/**
	 * Generate and store a new rootID.
	 * @param {string} new_id - Optional rootID, if you want to use your own. Otherwise we'll create one for you.
	 * @return {string|*} The rootID.
	 */
	function setRootID(new_id) {
		settings.set('root_id', requestID(new_id));
		return settings.get('root_id');
	}
	
	/**
	 * Get rootID.
	 * @return {string|*} The rootID.
	 */
	function getRootID() {
		var root_id = settings.get('root_id');
	
		if (utils.isUndefined(root_id)) {
			root_id = setRootID();
		}
	
		return root_id;
	}
	
	/**
	 * Create a requestID (unique identifier) for the page impression.
	 *
	 * @param {string} request_id - Optional RequestID, if you want to use your own. Otherwise will create one for you.
	 *
	 * @return {string|*} The RequestID.
	 */
	function requestID(request_id) {
		if (utils.isUndefined(request_id)) {
			request_id = utils.guid();
		}
	
		return request_id;
	}
	
	/**
	 * Make a tracking request.
	 *
	 * @param {Object} config - Should be passed an object containing a format and the values for that format
	 * @param {function} callback - Fired when the request has been made.
	 *
	 * @return {Object} request
	 */
	function track(config, callback) {
		if (utils.isUndefined(callback)) {
			callback = function () {};
		}
	
		var coreContext = settings.get('config') && settings.get('config').context || {};
		config.context = utils.merge(coreContext, config.context);
	
		var request = utils.merge(defaultConfig(), utils.merge(config, { callback: callback }));
	
		var session = Session.session();
	
		/* Values here are kinda the mandatory ones, so we want to make sure they're possible. */
		request = utils.merge({
			context: {
				id: requestID(request.id), // Keep an ID if it's been set elsewhere.
				root_id: getRootID()
			},
	
			user: settings.get('config') ? settings.get('config').user : {},
	
			device: {
				spoor_session: session.id,
				spoor_session_is_new: session.isNew,
				spoor_id: User.userID()
			}
		}, request);
	
		utils.log('Core.Track', request);
		// Send it.
		Send.addAndRun(request);
	
		return request;
	}
	
	module.exports = {
		setRootID: setRootID,
		getRootID: getRootID,
		track: track
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*global module, require */
	/*eslint-disable*/
	'use strict';
	/*eslint-enable*/
	
	var Core = __webpack_require__(71);
	var utils = __webpack_require__(5);
	var settings = __webpack_require__(3);
	
	settings.set('page_viewed', false);
	
	/**
	 * Default properties for page tracking requests.
	 *
	 * @return {Object} - The default properties for pages.
	 */
	var defaultPageConfig = function defaultPageConfig() {
		return {
			category: 'page',
			action: 'view',
			context: {
				url: document.URL,
				referrer: document.referrer
			},
	
			async: true // Send this event asyncronously - as sync doesn't work in FF, as it doesn't send cookies. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#withCredentials
		};
	};
	
	/**
	 * Make the page tracking request.
	 *
	 * @param {Object} config - Configuration object. If omitted, will use the defaults.
	 * @param {Function} callback - Callback function. Called when request completed.
	 * @return {undefined}
	 */
	function page(config, callback) {
		config = utils.merge(defaultPageConfig(), {
			context: config
		});
	
		// New PageID for a new Page... Unless... It's the first pageview, and some events may have been sent before this.
		if (settings.get('page_viewed')) {
			Core.setRootID();
		}
	
		Core.track(config, callback);
	
		// Alert internally that a new page has been tracked - for single page apps for example.
		settings.set('page_viewed', true);
		utils.triggerPage();
	}
	
	/**
	 * Listener for pages.
	 *
	 * @param {CustomEvent} e - The CustomEvent
	 * @private
	 * @return {undefined}
	 */
	function listener(e) {
		page(e.detail);
	}
	
	module.exports = page;
	module.exports.init = function () {
		utils.addEvent(window, 'oTracking.page', listener);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var _Array$from = __webpack_require__(74)['default'];
	
	var _Object$assign = __webpack_require__(78)['default'];
	
	var define = false;
	
	/*global module, require */
	'use strict'; // eslint-disable-line strict
	
	var Delegate = __webpack_require__(82);
	var Queue = __webpack_require__(65);
	var Core = __webpack_require__(71);
	var utils = __webpack_require__(5);
	var settings = __webpack_require__(3);
	
	var internalQueue = undefined;
	
	// Trigger the event tracking
	var track = function track(eventData) {
		var href = eventData.context.domPathTokens[0].href || null;
		var isInternal = href && href.indexOf(window.document.location.hostname) > -1;
	
		if (isInternal) {
			eventData.context.source_id = Core.getRootID();
	
			// Queue the event and send it on the next page load
			internalQueue.add(eventData).save();
		} else {
			// Send now, before leaving this page
			eventData.async = false;
			Core.track(eventData);
		}
	};
	
	// Utility for trimming strings
	var sanitise = function sanitise(property) {
		return typeof property === 'string' ? property.trim() : property;
	};
	
	// For a given container element, get the number of elements that match the
	// clicked element (siblings); and the index of the clicked element (position).
	var getSiblingsAndPosition = function getSiblingsAndPosition(el, clickedEl, selector) {
		var siblings = _Array$from(el.querySelectorAll(selector));
		var position = siblings.findIndex(function (item) {
			return item === clickedEl;
		});
		if (position === -1) return;
		return {
			siblings: siblings.length,
			position: position
		};
	};
	
	// Get some properties of a given element.
	var getElementProperties = function getElementProperties(el) {
		var elementPropertiesToCollect = ["nodeName", "className", "id", "href", "text", "role"];
		var elementProperties = elementPropertiesToCollect.reduce(function (returnObject, property) {
			if (el[property]) {
				returnObject[property] = sanitise(el[property]);
			} else if (el.getAttribute(property)) {
				returnObject[property] = sanitise(el.getAttribute(property));
			} else if (el.hasAttribute(property)) {
				returnObject[property] = el.hasAttribute(property);
			}
			return returnObject;
		}, {});
	
		// Collect any attribute that matches given strings.
		_Array$from(el.attributes).filter(function (attribute) {
			return attribute.name.match(/^data-trackable|^data-o-|^aria-/i);
		}).forEach(function (attribute) {
			return elementProperties[attribute.name] = attribute.value;
		});
	
		return elementProperties;
	};
	
	// Trace the clicked element and all of its parents, collecting properties as we go
	var getTrace = function getTrace(el) {
		var rootEl = document;
		var clickedEl = el;
		var selector = clickedEl.getAttribute('data-trackable') ? '[data-trackable="' + clickedEl.getAttribute('data-trackable') + '"]' : clickedEl.nodeName;
		var trace = [];
		while (el && el !== rootEl) {
			var elementProperties = getElementProperties(el);
	
			// If the element happens to have a data-trackable attribute, get the siblings
			// and position of the clicked element (relative to the current element).
			if (elementProperties["data-trackable"]) {
				elementProperties = _Object$assign(elementProperties, getSiblingsAndPosition(el, clickedEl, selector));
			}
			trace.push(elementProperties);
			el = el.parentNode;
		}
		return trace;
	};
	
	// Get properties for the event (as opposed to properties of the clicked element)
	// Available properties include mouse x- and y co-ordinates, for example.
	var getEventProperties = function getEventProperties(event) {
		var eventPropertiesToCollect = ["ctrlKey", "altKey", "shiftKey", "metaKey"];
		var eventProperties = eventPropertiesToCollect.reduce(function (returnObject, property) {
			try {
				if (event[property]) returnObject[property] = sanitise(event[property]);
			} catch (e) {
				console.log(e);
			}
			return returnObject;
		}, {});
		return eventProperties;
	};
	
	// Controller for handling click events
	var handleClickEvent = function handleClickEvent(eventData) {
		return function (clickEvent, clickElement) {
			var context = getEventProperties(clickEvent);
			context.domPathTokens = getTrace(clickElement);
			context.url = window.document.location.href || null;
			eventData.context = context;
	
			// Merge the event data into the "parent" config data
			var config = utils.merge(settings.get('config'), eventData);
			track(config);
		};
	};
	
	/**
	 * If there are any requests queued, attempts to send the next one
	 * Otherwise, does nothing
	 * @return {undefined}
	 */
	/*eslint-disable no-unused-vars*/
	var runQueue = function runQueue(_) {
		var next = function next(_) {
			runQueue();
		};
		var nextLink = internalQueue.shift();
		if (nextLink) {
			Core.track(nextLink, next);
		}
	};
	/*eslint-enable no-unused-vars*/
	
	var init = function init(category, elementsToTrack) {
		elementsToTrack = elementsToTrack || 'a, button, input'; // See https://github.com/ftlabs/ftdomdelegate#selector-string
	
		// Note: `context` is the term o-tracking uses for the data that is sent to spoor
		var eventData = {
			action: 'click',
			category: category || 'o-tracking'
		};
	
		// Activte the click event listener
		var delegate = new Delegate(document.body);
		delegate.on('click', elementsToTrack, handleClickEvent(eventData), true);
	
		// Track any queued events
		internalQueue = new Queue('clicks');
		runQueue();
	
		// Listen for page requests. If this is a single page app, we can send link requests now.
		utils.onPage(runQueue);
	};
	
	module.exports = {
		init: init
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	__webpack_require__(76);
	module.exports = __webpack_require__(21).Array.from;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(22)
	  , $export     = __webpack_require__(19)
	  , toObject    = __webpack_require__(77)
	  , call        = __webpack_require__(50)
	  , isArrayIter = __webpack_require__(51)
	  , toLength    = __webpack_require__(52)
	  , getIterFn   = __webpack_require__(53);
	$export($export.S + $export.F * !__webpack_require__(64)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(16);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	module.exports = __webpack_require__(21).Object.assign;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(19);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(81)});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(26)
	  , toObject = __webpack_require__(77)
	  , IObject  = __webpack_require__(42);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(29)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(83);

/***/ },
/* 83 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	/*jshint browser:true, node:true*/
	
	'use strict';
	
	module.exports = Delegate;
	
	/**
	 * DOM event delegator
	 *
	 * The delegator will listen
	 * for events that bubble up
	 * to the root node.
	 *
	 * @constructor
	 * @param {Node|string} [root] The root node or a selector string matching the root node
	 */
	function Delegate(root) {
	
	  /**
	   * Maintain a map of listener
	   * lists, keyed by event name.
	   *
	   * @type Object
	   */
	  this.listenerMap = [{}, {}];
	  if (root) {
	    this.root(root);
	  }
	
	  /** @type function() */
	  this.handle = Delegate.prototype.handle.bind(this);
	}
	
	/**
	 * Start listening for events
	 * on the provided DOM element
	 *
	 * @param  {Node|string} [root] The root node or a selector string matching the root node
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.root = function (root) {
	  var listenerMap = this.listenerMap;
	  var eventType;
	
	  // Remove master event listeners
	  if (this.rootElement) {
	    for (eventType in listenerMap[1]) {
	      if (listenerMap[1].hasOwnProperty(eventType)) {
	        this.rootElement.removeEventListener(eventType, this.handle, true);
	      }
	    }
	    for (eventType in listenerMap[0]) {
	      if (listenerMap[0].hasOwnProperty(eventType)) {
	        this.rootElement.removeEventListener(eventType, this.handle, false);
	      }
	    }
	  }
	
	  // If no root or root is not
	  // a dom node, then remove internal
	  // root reference and exit here
	  if (!root || !root.addEventListener) {
	    if (this.rootElement) {
	      delete this.rootElement;
	    }
	    return this;
	  }
	
	  /**
	   * The root node at which
	   * listeners are attached.
	   *
	   * @type Node
	   */
	  this.rootElement = root;
	
	  // Set up master event listeners
	  for (eventType in listenerMap[1]) {
	    if (listenerMap[1].hasOwnProperty(eventType)) {
	      this.rootElement.addEventListener(eventType, this.handle, true);
	    }
	  }
	  for (eventType in listenerMap[0]) {
	    if (listenerMap[0].hasOwnProperty(eventType)) {
	      this.rootElement.addEventListener(eventType, this.handle, false);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * @param {string} eventType
	 * @returns boolean
	 */
	Delegate.prototype.captureForType = function (eventType) {
	  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
	};
	
	/**
	 * Attach a handler to one
	 * event for all elements
	 * that match the selector,
	 * now or in the future
	 *
	 * The handler function receives
	 * three arguments: the DOM event
	 * object, the node that matched
	 * the selector while the event
	 * was bubbling and a reference
	 * to itself. Within the handler,
	 * 'this' is equal to the second
	 * argument.
	 *
	 * The node that actually received
	 * the event can be accessed via
	 * 'event.target'.
	 *
	 * @param {string} eventType Listen for these events
	 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
	 * @param {function()} handler Handler function - event data passed here will be in event.data
	 * @param {Object} [eventData] Data to pass in event.data
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
	  var root, listenerMap, matcher, matcherParam;
	
	  if (!eventType) {
	    throw new TypeError('Invalid event type: ' + eventType);
	  }
	
	  // handler can be passed as
	  // the second or third argument
	  if (typeof selector === 'function') {
	    useCapture = handler;
	    handler = selector;
	    selector = null;
	  }
	
	  // Fallback to sensible defaults
	  // if useCapture not set
	  if (useCapture === undefined) {
	    useCapture = this.captureForType(eventType);
	  }
	
	  if (typeof handler !== 'function') {
	    throw new TypeError('Handler must be a type of Function');
	  }
	
	  root = this.rootElement;
	  listenerMap = this.listenerMap[useCapture ? 1 : 0];
	
	  // Add master handler for type if not created yet
	  if (!listenerMap[eventType]) {
	    if (root) {
	      root.addEventListener(eventType, this.handle, useCapture);
	    }
	    listenerMap[eventType] = [];
	  }
	
	  if (!selector) {
	    matcherParam = null;
	
	    // COMPLEX - matchesRoot needs to have access to
	    // this.rootElement, so bind the function to this.
	    matcher = matchesRoot.bind(this);
	
	    // Compile a matcher for the given selector
	  } else if (/^[a-z]+$/i.test(selector)) {
	      matcherParam = selector;
	      matcher = matchesTag;
	    } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
	      matcherParam = selector.slice(1);
	      matcher = matchesId;
	    } else {
	      matcherParam = selector;
	      matcher = matches;
	    }
	
	  // Add to the list of listeners
	  listenerMap[eventType].push({
	    selector: selector,
	    handler: handler,
	    matcher: matcher,
	    matcherParam: matcherParam
	  });
	
	  return this;
	};
	
	/**
	 * Remove an event handler
	 * for elements that match
	 * the selector, forever
	 *
	 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
	 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
	 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
	 * @returns {Delegate} This method is chainable
	 */
	Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
	  var i, listener, listenerMap, listenerList, singleEventType;
	
	  // Handler can be passed as
	  // the second or third argument
	  if (typeof selector === 'function') {
	    useCapture = handler;
	    handler = selector;
	    selector = null;
	  }
	
	  // If useCapture not set, remove
	  // all event listeners
	  if (useCapture === undefined) {
	    this.off(eventType, selector, handler, true);
	    this.off(eventType, selector, handler, false);
	    return this;
	  }
	
	  listenerMap = this.listenerMap[useCapture ? 1 : 0];
	  if (!eventType) {
	    for (singleEventType in listenerMap) {
	      if (listenerMap.hasOwnProperty(singleEventType)) {
	        this.off(singleEventType, selector, handler);
	      }
	    }
	
	    return this;
	  }
	
	  listenerList = listenerMap[eventType];
	  if (!listenerList || !listenerList.length) {
	    return this;
	  }
	
	  // Remove only parameter matches
	  // if specified
	  for (i = listenerList.length - 1; i >= 0; i--) {
	    listener = listenerList[i];
	
	    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
	      listenerList.splice(i, 1);
	    }
	  }
	
	  // All listeners removed
	  if (!listenerList.length) {
	    delete listenerMap[eventType];
	
	    // Remove the main handler
	    if (this.rootElement) {
	      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Handle an arbitrary event.
	 *
	 * @param {Event} event
	 */
	Delegate.prototype.handle = function (event) {
	  var i,
	      l,
	      type = event.type,
	      root,
	      phase,
	      listener,
	      returned,
	      listenerList = [],
	      target,
	      /** @const */EVENTIGNORE = 'ftLabsDelegateIgnore';
	
	  if (event[EVENTIGNORE] === true) {
	    return;
	  }
	
	  target = event.target;
	
	  // Hardcode value of Node.TEXT_NODE
	  // as not defined in IE8
	  if (target.nodeType === 3) {
	    target = target.parentNode;
	  }
	
	  root = this.rootElement;
	
	  phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2);
	
	  switch (phase) {
	    case 1:
	      //Event.CAPTURING_PHASE:
	      listenerList = this.listenerMap[1][type];
	      break;
	    case 2:
	      //Event.AT_TARGET:
	      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
	      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
	      break;
	    case 3:
	      //Event.BUBBLING_PHASE:
	      listenerList = this.listenerMap[0][type];
	      break;
	  }
	
	  // Need to continuously check
	  // that the specific list is
	  // still populated in case one
	  // of the callbacks actually
	  // causes the list to be destroyed.
	  l = listenerList.length;
	  while (target && l) {
	    for (i = 0; i < l; i++) {
	      listener = listenerList[i];
	
	      // Bail from this loop if
	      // the length changed and
	      // no more listeners are
	      // defined between i and l.
	      if (!listener) {
	        break;
	      }
	
	      // Check for match and fire
	      // the event if there's one
	      //
	      // TODO:MCG:20120117: Need a way
	      // to check if event#stopImmediatePropagation
	      // was called. If so, break both loops.
	      if (listener.matcher.call(target, listener.matcherParam, target)) {
	        returned = this.fire(event, target, listener);
	      }
	
	      // Stop propagation to subsequent
	      // callbacks if the callback returned
	      // false
	      if (returned === false) {
	        event[EVENTIGNORE] = true;
	        event.preventDefault();
	        return;
	      }
	    }
	
	    // TODO:MCG:20120117: Need a way to
	    // check if event#stopPropagation
	    // was called. If so, break looping
	    // through the DOM. Stop if the
	    // delegation root has been reached
	    if (target === root) {
	      break;
	    }
	
	    l = listenerList.length;
	    target = target.parentElement;
	  }
	};
	
	/**
	 * Fire a listener on a target.
	 *
	 * @param {Event} event
	 * @param {Node} target
	 * @param {Object} listener
	 * @returns {boolean}
	 */
	Delegate.prototype.fire = function (event, target, listener) {
	  return listener.handler.call(target, event, target);
	};
	
	/**
	 * Check whether an element
	 * matches a generic selector.
	 *
	 * @type function()
	 * @param {string} selector A CSS selector
	 */
	var matches = (function (el) {
	  if (!el) return;
	  var p = el.prototype;
	  return p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
	})(Element);
	
	/**
	 * Check whether an element
	 * matches a tag selector.
	 *
	 * Tags are NOT case-sensitive,
	 * except in XML (and XML-based
	 * languages such as XHTML).
	 *
	 * @param {string} tagName The tag name to test against
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesTag(tagName, element) {
	  return tagName.toLowerCase() === element.tagName.toLowerCase();
	}
	
	/**
	 * Check whether an element
	 * matches the root.
	 *
	 * @param {?String} selector In this case this is always passed through as null and not used
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesRoot(selector, element) {
	  /*jshint validthis:true*/
	  if (this.rootElement === window) return element === document;
	  return this.rootElement === element;
	}
	
	/**
	 * Check whether the ID of
	 * the element in 'this'
	 * matches the given ID.
	 *
	 * IDs are case-sensitive.
	 *
	 * @param {string} id The ID to test against
	 * @param {Element} element The element to test with
	 * @returns boolean
	 */
	function matchesId(id, element) {
	  return id === element.id;
	}
	
	/**
	 * Short hand for off()
	 * and root(), ie both
	 * with no parameters
	 *
	 * @return void
	 */
	Delegate.prototype.destroy = function () {
	  this.off();
	  this.root();
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85);

/***/ },
/* 85 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	'use strict';
	
	var define = false;
	
	"use strict";
	
	var hasFired = {};
	
	function trigger(type) {
		if (type in hasFired) return;
		hasFired[type] = true;
		document.dispatchEvent(new CustomEvent('o.' + type));
	}
	
	window.addEventListener('load', trigger.bind(null, 'load'));
	window.addEventListener('load', trigger.bind(null, 'DOMContentLoaded'));
	document.addEventListener('DOMContentLoaded', trigger.bind(null, 'DOMContentLoaded'));
	
	document.onreadystatechange = function () {
		if (document.readyState === 'complete') {
			trigger('DOMContentLoaded');
			trigger('load');
		} else if (document.readyState === 'interactive' && !document.attachEvent) {
			trigger('DOMContentLoaded');
		}
	};
	
	if (document.readyState === 'complete') {
		trigger('DOMContentLoaded');
		trigger('load');
	} else if (document.readyState === 'interactive' && !document.attachEvent) {
		trigger('DOMContentLoaded');
	}
	
	if (document.attachEvent) {
		// If IE and not a frame
		// continually check to see if the document is ready
		var top = false;
		var delay = 50;
	
		try {
			top = window.frameElement == null && document.documentElement;
		} catch (e) {}
	
		if (top && top.doScroll) {
			(function doScrollCheck() {
				if (!('DOMContentLoaded' in hasFired)) {
	
					try {
						// Use the trick by Diego Perini
						// http://javascript.nwbox.com/IEContentLoaded/
						top.doScroll("left");
					} catch (e) {
						return delay < 5000 ? setTimeout(doScrollCheck, delay *= 1.2) : undefined;
					}
	
					trigger('DOMContentLoaded');
				}
			})();
		}
	}

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map