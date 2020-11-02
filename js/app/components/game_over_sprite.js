'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Names of game over sprites
	 * @namespace
	 */
	var GameOverSprite = {};

	/**
	 * Game over sprites
	 * @class GameOverSprite.Sprite
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	GameOverSprite.Sprite = function(game) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		var frameData = this.game.cache.getFrameData('game_over').getFrameByName("game_over_01");

		var x = this.game.world.centerX - (frameData.width/2);
		var y = this.game.world.centerY - (frameData.height/2)

		/**
		 * Sprite object
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(x, y, 'game_over');

		this.phaserSprite.animations.add('play', Phaser.Animation.generateFrameNames('game_over_', 1, 2, '', 2), 2, true, false);
		this.phaserSprite.animations.play('play');
	};

	GameOverSprite.Sprite.prototype = {
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
	GameOverSprite.load = function(game) {
		game.load.atlasJSONHash('game_over', 'assets/sprites/game_over.png', 'assets/sprites/game_over.json');
	};

	return GameOverSprite;
});
