'use strict';

define(['phaser'], function(Phaser) {

	/**
	 * Sprites of the level
	 * @namespace LevelSprite
	 */
	var LevelSprite = {};

	/**
	 * Level indicator
	 *
	 * @class LevelSprite.Indicator
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	LevelSprite.Indicator = function(game) {
		/**
		 * Game object
		 * @property game
		 * @type Phaser.Game
		 */
		this.game = game;

		/**
		 * Game object
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.sprite = this.game.add.sprite(150, 20, 'level');
		this.sprite.frameName = 'level';

		/**
		 * Level number
		 * @property numbers
		 * @type {Array}
		 */
		this.numbers = [];
	};

	LevelSprite.Indicator.prototype = {
		/**
		 * Set level
		 * @method setLevel
		 * @param {Int} level
		 */
		setLevel : function(value) {
			for(i in this.numbers) {
				this.numbers[i].destroy();
			}

			this.numbers = [];

			var s = value.toString();
			var x = this.sprite.x + this.sprite.width + 8;

			for(var i = 0; i < s.length; i++) {
				var sprite = this.game.add.sprite(x, this.sprite.y, 'level');
				sprite.frameName = s.charAt(i);
				this.numbers.push(sprite);
				x += sprite.width;
			}
		}
	};

	/**
	 * Splash screen
	 *
	 * @method LevelSprite.Splash
	 * @param {Phaser.Game} game
	 * @param {Number} level número de nivel
	 * @param {Object} callbacks callbacks (onGo, onDestroy)
	 */
	LevelSprite.splash = function(game, level, callbacks) {
		var sprite = game.add.sprite(150, 20, 'level');
		sprite.frameName = 'level_big';

		sprite.y = (game.height - sprite.height)/2;
		sprite.x = (game.width - sprite.width)/2;

		var numbers = [];

		var s = level.toString();
		var x = sprite.x + sprite.width + 8;

		for(var i = 0; i < s.length; i++) {
			var number = game.add.sprite(x, sprite.y, 'level');
			number.frameName = s.charAt(i) + '_big';
			numbers.push(number);
			x += number.width;
		}

		game.time.events.add(Phaser.Timer.SECOND * 2, function() {

			/*
			 * Destroy splash screen
			 */
			sprite.destroy();
			for(i in numbers) {
				numbers[i].destroy();
			}

			var go = game.add.sprite(150, 20, 'level');
			go.frameName = 'go';

			go.y = (game.height - go.height)/2;
			go.x = (game.width - go.width)/2;

			callbacks.onGo();

			game.time.events.add(Phaser.Timer.SECOND, function() {
				go.destroy();
				callbacks.onDestroy();
			});
		});
	};

	/**
	 * Load images
	 * @method load
	 * @param {Phaser.Game} game
	 */
	LevelSprite.load = function(game) {
		game.load.atlasJSONHash('level', 'assets/sprites/level.png', 'assets/sprites/level.json');
	};

	return LevelSprite;
});
