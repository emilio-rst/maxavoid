'use strict';

define([], function() {
	/**
	 * Namespace main menu
	 * @namespace
	 */
	var MainMenuSprite = {};

	/**
	 * Add background
	 *
	 * @method MainMenuSprite.background
	 * @param {Phaser.Game} game
	 */
	MainMenuSprite.background = function (game) {
		game.stage.backgroundColor = '#6359FF';
	};

	/**
	 * Add title
	 *
	 * @method MainMenuSprite.title
	 * @param {Phaser.Game} game
	 */
	MainMenuSprite.title = function (game) {
		game.add.sprite(25, 5, 'main_menu', 'title');
	};

	/**
	 * Add player
	 *
	 * @method MainMenuSprite.player
	 * @param {Phaser.Game} game
	 */
	MainMenuSprite.player = function (game) {
		var sprite = game.add.sprite(590, 38, 'main_menu');
		sprite.animations.add('player', Phaser.Animation.generateFrameNames('player_', 1, 6, '', 2), 5, true, false);
		sprite.animations.play('player');
	};

	/**
	 * Add touch screen start
	 *
	 * @method MainMenuSprite.touchStart
	 * @param {Phaser.Game} game
	 */
	MainMenuSprite.touchStart = function (game) {
		game.add.sprite(20, 250, 'main_menu', 'touch_start');
	};

	/**
	 * Add keyboard start
	 *
	 * @method MainMenuSprite.touchStart
	 * @param {Phaser.Game} game
	 */
	MainMenuSprite.arrowsStart = function (game) {
		game.add.sprite(20, 250, 'main_menu', 'arrows_start');
	};

	/**
	 * Add fireballs
	 *
	 * @method MainMenuSprite.player
	 * @param {Phaser.Game} game
	 */
	MainMenuSprite.fireballs = function (game) {

		var fireball = function(x, y, rotation) {
			var sprite = game.add.sprite(x, y, 'main_menu');

			sprite.animations.add('fireball', Phaser.Animation.generateFrameNames('fireball_', 1, 4, '', 2), 8, true, false);

			if(rotation != undefined) {
				sprite.rotation = rotation;
			}

			sprite.animations.play('fireball');
		};

		fireball(386, 200);
		fireball(500, -10, 0.5);
		fireball(100, -10, 0.4);
	};

	/**
	 * Score Sprites
	 *
	 * @class MainMenuSprite.MaxScore
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {number} maxScore
	 */
	MainMenuSprite.Score = function(game, maxScore) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		var style = { font: "bold 24px Sans-Serif", fill: "#FFFF00", align: "center" };

		var text = 'SCORE: ' + maxScore.toString();

		/**
		 * Text object
		 * @property sprite
		 * @type {Phaser.Text}
		 */
		this.text = this.game.add.text(50, 340, text, style);
	};

	/**
	 * Load images
	 * @method load
	 * @param {Phaser.Game} game
	 */
	MainMenuSprite.load = function(game) {
		game.load.atlasJSONHash('main_menu', 'assets/sprites/main_menu.png', 'assets/sprites/main_menu.json');
	};

	return MainMenuSprite;
});
