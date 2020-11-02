'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace pause button
	 * @namespace
	 */
	var PauseButtonSprite = {};

	/**
	 * Sprites of pause button
	 *
	 * @class PauseButtonSprite.Sprite
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	PauseButtonSprite.Sprite = function (game) {
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
		this.phaserSprite = this.game.add.sprite(730, 0, 'pause_button', 'pause');
	};

	PauseButtonSprite.Sprite.prototype = {
		/**
		 * Display pause button
		 * @method setPause
		 */
		setPause : function() {
			this.phaserSprite.frameName = 'pause';
		},

		/**
		 * Display play button
		 * @method setPlay
		 */
		setPlay : function() {
			this.phaserSprite.frameName = 'play';
		}
	};

	/**
	 * Load images atlas
	 * @method load
	 * @param {Phaser.Game} game
	 */
	PauseButtonSprite.load= function(game) {
		game.load.atlasJSONHash('pause_button', 'assets/sprites/pause_button.png', 'assets/sprites/pause_button.json');
	};

	return PauseButtonSprite;
});
