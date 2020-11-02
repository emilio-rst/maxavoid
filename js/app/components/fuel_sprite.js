'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace of fuel sprites
	 * @namespace
	 */
	var FuelSprite = {};

	/**
	 * Sprites of fuel container
	 * @class FuelSprite.Sprite
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Int} x
	 * @param {Int} y
	 */
	FuelSprite.Sprite = function(game, x, y) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Sprite objects
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(x, y, 'fuel');

		this.phaserSprite.animations.add('float', Phaser.Animation.generateFrameNames('fuel_', 1, 10, '', 2), 10, true, false);
		this.phaserSprite.animations.play('float');
	};

	FuelSprite.Sprite.prototype = {
		/**
		 * Destroy
		 * @method destroy
		 */
		destroy : function() {
			this.phaserSprite.destroy();
		}
	};

	/**
	 * Load image atlas
	 * @method load
	 * @param {Phaser.Game} game
	 */
	FuelSprite.load = function(game) {
		game.load.atlasJSONHash('fuel', 'assets/sprites/fuel.png', 'assets/sprites/fuel.json');
	};

	return FuelSprite;
});
