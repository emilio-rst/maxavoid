'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace of fireball sprites
	 * @namespace
	 */
	var FireballSprite = {};

	/**
	 * Sprites of the fireball
	 * @class FireballSprite.Sprite
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Int} x
	 * @param {Int} y
	 */
	FireballSprite.Sprite = function(game, x, y) {
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
		this.phaserSprite = this.game.add.sprite(x, y, 'fireball');

		this.phaserSprite.animations.add('play', Phaser.Animation.generateFrameNames('fireball_', 1, 4, '', 2), 12, true, false);
		this.phaserSprite.animations.play('play');
	};

	FireballSprite.Sprite.prototype = {
		/**
		 * Destroy
		 * @method destroy
		 */
		destroy : function() {
			this.phaserSprite.destroy();
		},

		/**
		 * Set the sprite visible
		 * @method setVisible
		 * @param {boolean} value
		 */
		setVisible : function(value) {
			this.phaserSprite.visible = value;
		},

		/**
		 * Bring to the top layer
		 * @method bringToTop
		 */
		bringToTop : function() {
			this.phaserSprite.bringToTop();
		}
	};

	/**
	 * Width
	 * @property width
	 * @type {Int}
	 */
	Object.defineProperty(FireballSprite.Sprite.prototype, 'width', {
		get : function() {
			return this.phaserSprite.width;
		}
	});

	/**
	 * Height
	 * @property height
	 * @type {Int}
	 */
	Object.defineProperty(FireballSprite.Sprite.prototype, 'height', {
		get : function() {
			return this.phaserSprite.height;
		}
	});

	/**
	 * Load images atlas
	 * @method load
	 * @param {Phaser.Game} game
	 */
	FireballSprite.load = function(game) {
		game.load.atlasJSONHash('fireball', 'assets/sprites/fireball.png', 'assets/sprites/fireball.json');
	};

	return FireballSprite;
});
