'use strict';

define(['phaser'], function(Phaser) {

	/**
	 * Namespace for coin sprite
	 * @namespace
	 */
	var CoinSprite = {};

	/**
	 * Coin sprites
	 * @class CoinSprite.Sprite
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Int} x
	 * @param {Int} y
	 */
	CoinSprite.Sprite = function(game, x, y) {
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
		this.phaserSprite = this.game.add.sprite(x, y, 'coin');

		this.phaserSprite.animations.add('spin', Phaser.Animation.generateFrameNames('coin_', 1, 6, '', 2), 7, true, false);
		this.phaserSprite.animations.play('spin');
	};

	CoinSprite.Sprite.prototype = {
		/**
		 * Destroy
		 * @method destroy
		 */
		destroy : function() {
			this.phaserSprite.destroy();
		}
	};

	/**
	 * Load images atlas
	 * @method load
	 * @param {Phaser.Game} game
	 */
	CoinSprite.load = function(game) {
		game.load.atlasJSONHash('coin', 'assets/sprites/coin.png', 'assets/sprites/coin.json');
	};

	return CoinSprite;
});
