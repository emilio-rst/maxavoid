'use strict';

define(['phaser',
        'app/components/physics_component'], function(Phaser,
                                                      PhysicsComponent) {

	/**
	 * Player physics
	 *
	 * @class PlayerPhysics
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Phaser.Sprite} sprite
	 * @param {LevelSystem} levelSystem
	 */
	function PlayerPhysics(game, sprite, levelSystem) {
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
		 * Level system
		 * @property levelSystem
		 * @type {levelSystem}
		 */
		this.levelSystem = levelSystem;

		/**
		 * Movement speed
		 * @property speed
		 * @type {number}
		 */
		this.speed = 200;

		/*
		 * Enable physics
		 */
		this.game.physics.p2.enable(this.sprite, false);

		//this.sprite.body.debug = true;

		PhysicsComponent.addPolygon(this.sprite, 'player');

		this.sprite.body.fixedRotation = true;
	};

	PlayerPhysics.prototype = {
		/**
		 * Move left
		 * @method moveLeft
		 */
		moveLeft : function() {
			this.sprite.body.velocity.x = -this.speed * this.levelSystem.speedMultiplier;
			this.sprite.body.velocity.y = 0;
		},

		/**
		 * Move right
		 * @method moveRight
		 */
		moveRight : function() {
			this.sprite.body.velocity.x = this.speed * this.levelSystem.speedMultiplier;
			this.sprite.body.velocity.y = 0;
		},

		/**
		 * Move up
		 * @method moveUp
		 */
		moveUp : function() {
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = -this.speed * this.levelSystem.speedMultiplier;
		},

		/**
		 * Move down
		 * @method moveDown
		 */
		moveDown : function() {
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = this.speed * this.levelSystem.speedMultiplier;
		},

		/**
		 * Stand in place
		 * @method stand
		 */
		stand : function() {
			this.sprite.body.setZeroVelocity();
		},

		/**
		 * Fall
		 * @method fall
		 */
		fall : function() {
			this.sprite.body.kinematic = true;
			this.sprite.body.velocity.y = this.speed * 2;
		},

		/**
		 * Sprite overlapping
		 * @method overlap
		 * @return {boolean}
		 */
		overlap : function(sprite) {
			return PhysicsComponent.overlap(this.sprite, sprite);
		},

		/**
		 * Collides
		 * @method collides
		 * @param {function} [callback] retrollamada para verificar colision
		 * @param {object} [callbackContext] contexto de retrollamada
		 */
		collides : function(callback, callbackContext) {
			this.sprite.body.onBeginContact.add(callback, callbackContext);
		},

		/**
		 * Set collision
		 * @method setCollision
		 * @param {Boolean} value
		 */
		setCollision : function(value) {
			if(value) {
				this.sprite.body.dynamic = true;
			} else {
				this.sprite.body.kinematic = true;
			}
		}
	};

	return PlayerPhysics;
});
