'use strict';

define(['phaser'], function(Phaser) {

	/**
	 * Namespace para sprites de fuel bar
	 * @namespace
	 */
	var FuelBarSprite = {};

	/**
	 * Fuel bar sprites
	 * @class FuelBarSprite.Sprite
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	FuelBarSprite.Sprite = function(game) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Sprite object
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(10, 10, 'fuel_bar');

		/*
		 * Start fuel level
		 */
		this.setFuelLevel(20.0);

	};

	FuelBarSprite.Sprite.prototype = {
		/**
		 * Set fuel level
		 * @method setFuelLevel
		 * @param {Float} value fuel level (0 to 20)
		 */
		setFuelLevel : function(value) {
			this.phaserSprite.frameName = "fuel_bar_" + Math.ceil(value).toString();
		}
	};

	/**
	 * Load image atlas
	 * @method load
	 * @param {Phaser.Game} game
	 */
	FuelBarSprite.load = function(game) {
		game.load.atlasJSONHash('fuel_bar', 'assets/sprites/fuel_bar.png', 'assets/sprites/fuel_bar.json');
	};

	return FuelBarSprite;
});
