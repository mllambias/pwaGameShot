"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
var Player =
/*#__PURE__*/
function (_Character) {
  _inherits(Player, _Character);

  /**
   * Inicializa un jugador
   * @param game {Game} La instancia del juego al que pertenece el personaje
   */
  function Player(game) {
    var _this;

    _classCallCheck(this, Player);

    var height = PLAYER_HEIGHT * game.width / 100,
        width = PLAYER_WIDTH * game.width / 100,
        x = game.width / 2 - width / 2,
        y = game.height - height,
        speed = PLAYER_SPEED,
        myImage = PLAYER_PICTURE,
        myImageDead = PLAYER_PICTURE_DEAD;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, game, width, height, x, y, speed, myImage, myImageDead));
    _this.updatesPerShot = 10;
    _this.updatesPerShotCount = 0;
    _this.dragging = false;

    _this.initDraggingAbility();

    return _this;
  }
  /**
   * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
   */


  _createClass(Player, [{
    key: "update",
    value: function update() {
      if (!this.dead && !this.dragging) {
        switch (this.game.keyPressed) {
          case KEY_LEFT:
            if (this.x > this.speed) {
              this.x -= this.speed;
            }

            break;

          case KEY_RIGHT:
            if (this.x < this.game.width - this.width - this.speed) {
              this.x += this.speed;
            }

            break;

          case KEY_SHOOT:
            this.game.shoot(this);
            break;
        }
      }
      /**
       * In case game is touchable...
       */


      if (!this.dead) {
        this.updatesPerShotCount++;

        if (this.updatesPerShotCount % this.updatesPerShot == 0) {
          this.game.shoot(this);
        }
      }
    }
    /**
     * In case game is touchable...
     */

  }, {
    key: "initDraggingAbility",
    value: function initDraggingAbility() {
      var _this2 = this;

      var interactable = interact(this.myImageContainer);
      interactable.draggable({
        startAxis: 'x',
        lockAxis: 'start',
        listeners: {
          start: function start(ev) {// console.log(ev)
          },
          move: function move(ev) {
            if (_this2.width < _this2.x + ev.delta.x && _this2.x + ev.delta.x < _this2.game.width) {
              _this2.x += ev.delta.x;
            }
          },
          end: function end(ev) {// console.log(ev)
          }
        }
      });
    }
    /**
     * Mata al jugador
     */

  }, {
    key: "die",
    value: function die() {
      var _this3 = this;

      if (!this.dead) {
        setTimeout(function () {
          _this3.game.endGame();
        }, 2000);

        _get(_getPrototypeOf(Player.prototype), "die", this).call(this);
      }
    }
  }]);

  return Player;
}(Character);