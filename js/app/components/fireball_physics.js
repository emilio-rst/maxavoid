'use strict';

define(['phaser',
        'app/components/physics_component'], function(Phaser,
                                                      PhysicsComponent) {

	/**
	 * Fireball physics
	 * @class FireballPhysics
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Phaser.Sprite} sprite
	 */
	function FireballPhysics(game, sprite) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * OSprite object
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.sprite = sprite;

		/*
		 * Enable physics
		 */
		this.game.physics.p2.enable(this.sprite, false);

		//this.sprite.body.debug = true;

		PhysicsComponent.addPolygon(this.sprite, 'fireball');

		this.sprite.body.kinematic = true;

		/**
		 * Lister
		 * @property listener
		 * @type {FireballPhysics.Listener}
		 */
		this.listener = null;
	};

	FireballPhysics.prototype = {
		/**
		 * Launch the fireball
		 * @method launch
		 * @param {number} x initial x axis position
		 * @param {number} y initial y axis position
		 * @param {number} velocity movement velocity
		 * @param {number} rotation rotation angle
		 */
		launch : function(x, y, velocity, rotation) {
			this.sprite.body.x = x;
			this.sprite.body.y = y;
			this.sprite.body.rotation = rotation;
			this.sprite.body.velocity.x = velocity * Math.cos(rotation);
			this.sprite.body.velocity.y = velocity * Math.sin(rotation);
		},

		/**
     * Check if the fireball has reached the end of the screen on Y axis
		 * @method checkOnShifEndY
		 * @return {boolean}
		 * @private
		 */
		_checkOnShiftEndY : function() {
			if(this.sprite.body.velocity.y > 0) {
				return (this.sprite.body.y  > this.game.height);
			} else if(this.sprite.body.velocity.y < 0) {
				return (this.sprite.body.y < -this.sprite.height);
			}
		},

		/**
		 * Check if has reached the end of the screen
		 * @method checkOnShifEnd
		 * @return {boolean}
		 */
		checkOnShiftEnd : function() {

			if(this.sprite.body.velocity.x > 0) {
				if(this.sprite.body.x  > this.game.width) return true;
			} else if(this.sprite.body.velocity.x < 0) {
				if(this.sprite.body.x < -this.sprite.width) return true;
			}

			return this._checkOnShiftEndY();
		},

		/**
		 * Multiply velocity
		 * @method speedMultiply
		 * @param {Number} multiplier multiplicador
		 */
		multiplySpeed : function(multiplier) {
			this.sprite.body.velocity.x = multiplier * this.sprite.body.velocity.x;
			this.sprite.body.velocity.y = multiplier * this.sprite.body.velocity.y;
		},

		/**
		 * Enable body
		 */
		enableBody : function() {
			this.game.physics.p2.addBody(this.sprite.body);
		},

		/**
		 * Disable body
		 */
		disableBody : function() {
			this.game.physics.p2.removeBody(this.sprite.body);
		}
	};

	return FireballPhysics;
});
