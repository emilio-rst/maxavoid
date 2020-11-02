'use strict';

define(['phaser'], function(Phaser) {
	
	/**
	 * Namespace para físicas de World
	 * @namespace
	 */
	var WorldPhysics = {};
	
	/**
	 * Físicas de la nube
	 * @class StagePhysics.Cloud
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Phaser.Sprite} sprite
	 */
	WorldPhysics.Cloud = function(game, sprite, speed) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Objeto Sprite de Phaser
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.sprite = sprite;
		
		/**
		 * Cantidad de pixeles que debe avanzar por segundo
		 * @property speed
		 * @type {number}
		 */
		this.speed = speed;
	};
	
	WorldPhysics.Cloud.prototype = {
		/**
		 * Actualizar posicion de la nube en función de la velocidad
		 * @method update
		 */
		update : function() {
			if(this.sprite.x <= -this.sprite.width) {
				this.sprite.x = this.game.width;
				this.sprite.y = Math.floor(Math.random() * (this.game.world.height - 20));
			} else {
				this.sprite.x -= this.speed * this.game.time.physicsElapsed;
			}
		}
	};
	
	/**
	 * Eliminar barreras predeterminadas del mundo
	 * @method WorldPhysics.clearDefaultBounds
	 * @param {Phaser.Game} game
	 */
	WorldPhysics.clearDefaultBounds = function(game) {
		game.physics.p2.setBoundsToWorld(false, false, false, false, false);
	}
	
	/**
	 * Verificar barreras del mundo
	 * @method WorldPhysics.checkBounds
	 * @param {Phaser.Game} game
	 * @param {Player} player
	 */
	WorldPhysics.checkBounds = function(game, player) {		
		if(player.alive) {
			var sprite = player.phaserSprite;
			
			if(sprite.body.y < (50 + sprite.height/2) ) {
				sprite.body.y = 50 + sprite.height/2;
			} else if(sprite.body.y > (game.height - sprite.height/2)) {
				sprite.body.y = game.height - sprite.height/2;
			}
			
			if(sprite.body.x < (sprite.width/2)) {
				sprite.body.x = sprite.width/2;
				console.log(sprite.body.x);
			} else if(sprite.body.x > (game.width - sprite.width/2)) {
				sprite.body.x = game.width - sprite.width/2;
				console.log(sprite.body.x);
			}
		}
	}
	
	return WorldPhysics;
});
