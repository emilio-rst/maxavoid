'use strict';

define(['phaser'], function(Phaser) {

	/**
	 * Namespace player input
	 * @namespace
	 */
	var PlayerInput = {};

	/**
	 * Keyboard input
	 * @class PlayerInput.Keyboard
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	PlayerInput.Keyboard = function(game) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Event listener
		 * @property listener
		 * @type {PlayerInput.Listener}
		 */
		this.listener = null;

		/* Capturar eventos de teclado */
		this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.onDownKeyLeft, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.onDownKeyRight, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.onDownKeyUp, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.onDownKeyDown, this);
		this.game.input.keyboard.onUpCallback = this.onUpKey.bind(this);
	}

	PlayerInput.Keyboard.prototype = {
		/**
		 * Left key
		 * @method onDownKeyLeft
		 * @param {Object} e objeto evento
		 */
		onDownKeyLeft : function(e) {
			if(this.game.paused) return false;

			if(this.listener !== null) this.listener.onMoveLeft();
		},

		/**
		 * Right key
		 * @method onDownKeyRight
		 * @param {Object} e objeto evento
		 */
		onDownKeyRight : function(e) {
			if(this.game.paused) return false;

			if(this.listener !== null) this.listener.onMoveRight();
		},

		/**
		 * Up key
		 * @method onDownKeyUp
		 * @param {Object} e objeto evento
		 */
		onDownKeyUp : function(e) {
			if(this.game.paused) return false;

			if(this.listener !== null) this.listener.onMoveUp();
		},

		/**
		 * Down key
		 * @method onDownKeyDown
		 * @param {Object} e objeto evento
		 */
		onDownKeyDown : function(e) {
			if(this.game.paused) return false;

			if(this.listener !== null) this.listener.onMoveDown();
		},

		/**
		 * Key release
		 * @method onUpKey
		 * @param {Object} e objeto evento
		 */
		onUpKey : function(e) {
			if(this.game.paused) return false;

			if(this.listener !== null) this.listener.onStand();
		}
	};

	/**
	 * Touch input
	 *
	 * @class PlayerInput.Touch
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	PlayerInput.Touch = function(game) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Event listener
		 * @property listener
		 * @type {PlayerInput.Listener}
		 */
		this.listener = null;

		/* Touch screen events */
		this.game.input.onUp.add(this.onUp, this);
	};

	PlayerInput.Touch.prototype = {
		/**
		 * Swipe up
		 * @method onUp
		 * @param {Phaser.Pointer} Coordenadas de posición del puntero
		 */
		onUp : function(pointer) {

			var changeX = pointer.position.x - pointer.positionDown.x;
			var changeY = pointer.position.y - pointer.positionDown.y;

			if(Phaser.Point.distance(pointer.position, pointer.positionDown) > 50) {

				if(Math.abs(changeX) > Math.abs(changeY)) {

					if(changeX > 0) {
						if(this.listener !== null) this.listener.onMoveRight();
					} else {
						if(this.listener !== null) this.listener.onMoveLeft();
					}

				} else if(Math.abs(changeX) < Math.abs(changeY)) {
					if(changeY > 0) {
						if(this.listener !== null) this.listener.onMoveDown();
					} else {
						if(this.listener !== null) this.listener.onMoveUp();
					}
				}
			} else {
				if(this.listener !== null) this.listener.onStand();
			}

		}
	};

	/**
	 *Listener
	 * @class PlayerInput.Listener
	 * @constructor
	 */
	PlayerInput.Listener = function() {};

	PlayerInput.Listener.prototype = {
		/**
		 * Move left
		 * @method onMoveLeft
		 * @abstract
		 */
		onMoveLeft : function() {},

		/**
		 * Move right
		 * @method onMoveRight
		 * @abstract
		 */
		onMoveRight : function() {},

		/**
		 * Move up
		 * @method onMoveUp
		 * @abstract
		 */
		onMoveUp : function() {},

		/**
		 * Move down
		 * @method onMoveDown
		 * @abstract
		 */
		onMoveDown : function() {},

		/**
		 * Stand
		 * @method onStand
		 * @abstract
		 */
		onStand : function() {}
	};

	return PlayerInput;
});
