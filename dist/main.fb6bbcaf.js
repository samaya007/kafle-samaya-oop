// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/modules/GameBoard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBoard = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GameBoard = exports.GameBoard = /*#__PURE__*/function () {
  function GameBoard(boardElement, gameManager) {
    _classCallCheck(this, GameBoard);
    this.boardElement = boardElement;
    this.gameManager = gameManager;
    this.icons = ["icon1", "icon2", "icon3", "icon4", "icon5"];
    this.initializeBoard(); //name of the images on game board array
  }
  _createClass(GameBoard, [{
    key: "initializeBoard",
    value: function initializeBoard() {
      this.boardElement.innerHTML = "";
      this.tiles = [];
      this.createTiles();
      this.assignWinningLine();
    }
  }, {
    key: "createTiles",
    value: function createTiles() {
      for (var i = 0; i < 25; i++) {
        //loops 25 times to create tiles
        var tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.index = i;
        this.boardElement.appendChild(tile);
        this.tiles.push(tile);
      }
    }
    //for assigning a winning line
    //if the gambox grid is chnaged from 5by5 to any other number make sure to update here as well
  }, {
    key: "assignWinningLine",
    value: function assignWinningLine() {
      var _this = this;
      var winningLineIndex = Math.floor(Math.random() * 5);
      var isRow = Math.random() < 0.5;
      var winningIcon = this.icons[Math.floor(Math.random() * this.icons.length)];
      this.winningLine = {
        isRow: isRow,
        index: winningLineIndex,
        icon: winningIcon
      };
      //this sets random icons for all tiles
      this.tiles.forEach(function (tile) {
        return tile.dataset.icon = _this.icons[Math.floor(Math.random() * _this.icons.length)];
      }); //and this sets the wining icon for all the tiles in a same row or coloumn
      for (var i = 0; i < 5; i++) {
        var index = isRow ? winningLineIndex * 5 + i : i * 5 + winningLineIndex;
        this.tiles[index].dataset.icon = winningIcon;
      }
    }
    //this reveales the tile, where the backgroudn image if the tile is based on its icon
  }, {
    key: "revealTile",
    value: function revealTile(tile) {
      tile.classList.add("revealed");
      tile.style.backgroundImage = "url('img/".concat(tile.dataset.icon, ".svg')"); // for images with svg extension
      //for ease better use images with similar extension here
      var tileIndex = parseInt(tile.dataset.index);
      this.gameManager.updateGameState(this.isTileInWinningLine(tileIndex));
    }

    //took a while to fix: checks if the tile is in the wining line and if the tile index matches the wining line
  }, {
    key: "isTileInWinningLine",
    value: function isTileInWinningLine(tileIndex) {
      var _this$winningLine = this.winningLine,
        isRow = _this$winningLine.isRow,
        index = _this$winningLine.index,
        icon = _this$winningLine.icon;
      return isRow && Math.floor(tileIndex / 5) === index || !isRow && tileIndex % 5 === index;
    }
  }, {
    key: "checkForWin",
    value: function checkForWin() {
      var _this$winningLine2 = this.winningLine,
        isRow = _this$winningLine2.isRow,
        index = _this$winningLine2.index,
        icon = _this$winningLine2.icon;
      //  const winningIndices = [];
      for (var i = 0; i < 5; i++) {
        var tileIndex = isRow ? index * 5 + i : index + i * 5;
        // Checks if the tile is revealed and has the winning icon i.e, similar across the row or coloumn
        if (!this.tiles[tileIndex].classList.contains("revealed") || this.tiles[tileIndex].dataset.icon !== icon) {
          return false;
        }
      }
      return true;
    }
  }]);
  return GameBoard;
}();
},{}],"js/modules/GameManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameManager = void 0;
var _GameBoard = require("./GameBoard.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GameManager = exports.GameManager = /*#__PURE__*/function () {
  function GameManager(gameBoardElement, triesLeftElement, messageElement) {
    _classCallCheck(this, GameManager);
    this.gameBoardElement = gameBoardElement;
    this.triesLeftElement = triesLeftElement;
    this.messageElement = messageElement;
    this.gameBoard = new _GameBoard.GameBoard(gameBoardElement, this);
    this.triesLeft = 20;
    this.updateGameState(false); //initial value false meaning no tile in winning row/coloumn
  }
  //handles win and loss 
  _createClass(GameManager, [{
    key: "updateGameState",
    value: function updateGameState(tileInWinningLine) {
      this.triesLeftElement.textContent = "Tries Left: ".concat(this.triesLeft);
      if (tileInWinningLine && this.gameBoard.checkForWin()) {
        this.handleWin();
      } else if (this.triesLeft <= 0) {
        this.handleLose();
      }
    }
  }, {
    key: "handleTileClick",
    value: function handleTileClick(tile) {
      //DO  NOT TOUCH took a while to fix simple typo error:
      //this checks if the clicked dtile has not been revealed and if at the same time if ther are remainig tries
      //and reveals the cliked tile on board
      if (!tile.classList.contains("revealed") && this.triesLeft > 0) {
        this.gameBoard.revealTile(tile);
        if (!this.gameBoard.isTileInWinningLine(parseInt(tile.dataset.index))) {
          this.triesLeft--;
        }
        this.updateGameState(this.gameBoard.isTileInWinningLine(parseInt(tile.dataset.index)));
      }
    }
    //winners message
  }, {
    key: "handleWin",
    value: function handleWin() {
      this.messageElement.textContent = "Congratulations, you've won the jackpot ! Restart to play again";
      this.messageElement.classList.remove("hidden");
      this.messageElement.classList.add("win-message");
    }
    //,oosing message
  }, {
    key: "handleLose",
    value: function handleLose() {
      this.messageElement.textContent = "Better luck next time. Please restart the game.";
      this.messageElement.classList.remove("hidden");
      this.messageElement.classList.add("lose-message");
    }
    // to reset the game
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.gameBoard.initializeBoard();
      //reset tge number of tris 
      this.triesLeft = 20;
      this.updateGameState(false);
      this.messageElement.textContent = ""; // clears message
      this.messageElement.classList.add("hidden"); // message is hidden
    }
  }]);
  return GameManager;
}();
},{"./GameBoard.js":"js/modules/GameBoard.js"}],"js/modules/gsapanimation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gsapanimation = gsapanimation;
function gsapanimation() {
  gsap.registerPlugin(ScrollTrigger);

  //selcting the game iamge container
  var gameImages = document.querySelector(".obimage");
  if (gameImages) {
    gsap.from('.obimage', {
      duration: 1,
      y: '-1vw',
      opacity: 0,
      ease: 'power2.in',
      //ease
      scrollTrigger: {
        trigger: ".obj",
        //triggering element
        toggleActions: "restart none none none"
      }
    });
  }
}
;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

require("./../sass/main.scss");
var _GameManager = require("./modules/GameManager.js");
var _gsapanimation = require("./modules/gsapanimation.js");
(0, _gsapanimation.gsapanimation)();
var gameBoardElement = document.querySelector("#game-board");
var triesLeftElement = document.querySelector("#tries-left");
var messageElement = document.querySelector("#message");
var restartButton = document.querySelector("#restart-game");
var gameManager = new _GameManager.GameManager(gameBoardElement, triesLeftElement, messageElement);
gameBoardElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("tile")) {
    gameManager.handleTileClick(event.target);
  }
});
restartButton.addEventListener("click", function () {
  gameManager.resetGame();
});
},{"./../sass/main.scss":"sass/main.scss","./modules/GameManager.js":"js/modules/GameManager.js","./modules/gsapanimation.js":"js/modules/gsapanimation.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54393" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map