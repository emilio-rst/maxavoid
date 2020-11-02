'use strict';

define([], function() {
	/**
	 * Name space how to play tutorial
	 * @namespace
	 */
	var HowToPlayPhysics = {};

	/**
	 * Finger physics
	 * @class HowToPlayPhysics.Thumb
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Phaser.Sprite} sprite
	 */
	HowToPlayPhysics.Thumb = function(game, sprite) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Sprite
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.sprite = sprite;

		/**
		 * X position
		 * @property x
		 * @type {Number}
		 */
		this.x = this.sprite.x;

		/**
		 * Speed movement
		 * @property speed
		 * @type {number}
		 */
		this.speed = 200;

		/**
		 * Distance to move
		 * @property distance
		 * @type {Number}
		 */
		this.distance = 200;

		/**
		 * Event listener
		 * @property listener
		 * @type {HowToPlayPhysisc.Listener}
		 */
		this.listener = null;

		/**
		 * Stop movement
		 * @property stopped
		 * @type {Boolean}
		 */
		this.stopped = true;
	};

	HowToPlayPhysics.Thumb.prototype = {
		/**
		 * Back to the start position
		 * @method restart
		 */
		restart : function() {
			this.sprite.x = this.x;
		},

		/**
		 * Do swipe
		 * @method swipe
		 */
		swipe : function() {
			this.stopped = false;
		},

		/**
		 * Update
		 * @method update
		 */
		update : function() {
			if(!this.stopped) {
				var deltaX = this.speed * this.game.time.physicsElapsed;

				if((this.sprite.x + deltaX) >= (this.x + this.distance)) {
					this.sprite.x = this.x + this.distance;
					this.stopped = true;

					if(this.listener != null) this.listener.onSwipeComplete();
				} else {
					this.sprite.x += deltaX;
				}
			}
		}
	};

	/**
	 * Event listener
	 *
	 * @class HowToPlayPhysics.Listener
	 * @constructor
	 * @abstract
	 */
	HowToPlayPhysics.Listener = function() {};

	HowToPlayPhysics.Listener.prototype = {
		/**
		 * Stop animation
		 * @method onMoveRightComplete
		 * @abstract
		 */
		onSwipeComplete : function() {}
	};

	return HowToPlayPhysics;
});
