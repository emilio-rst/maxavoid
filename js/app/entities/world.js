'use strict';

define(['app/components/world_sprite',
        'app/components/world_physics',
        'app/components/world_audio'], function(WorldSprite, 
		                                        WorldPhysics,
		                                        WorldAudio) {
	/**
	 * Mundo
	 * @class World
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 */
	function World(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game} 
		 */
		this.game = game;
		
		WorldSprite.background(this.game);
		
		/**
		 * Sprite del Sol
		 * @property sun
		 * @type {WorldSprite.Sun}
		 */
		this.sun = new WorldSprite.Sun(this.game, 650, -100);
		
		/**
		 * Sprites de nubes
		 * @property cloudsSprites
		 * @type {Array. <WorldSprite.Cloud>}
		 */
		this.cloudsSprites = [];
		
		/**
		 * Sprites de nubes
		 * @property cloudsPhysics
		 * @type {Array. <WorldPhysics.Cloud>}
		 */
		this.cloudsPhysics = [];
		
		var speed = 5;
		var sprite, physics;
		
		sprite = new WorldSprite.Cloud(this.game, WorldSprite.Cloud.STYLE_1, 250, 30)
		this.cloudsSprites.push(sprite);
		physics = new WorldPhysics.Cloud(this.game, sprite.getPhaserSprite(), speed);
		this.cloudsPhysics.push(physics);
		
		speed += 5;
		
		sprite = new WorldSprite.Cloud(this.game, WorldSprite.Cloud.STYLE_2, 300, 200);
		this.cloudsSprites.push(sprite);
		physics = new WorldPhysics.Cloud(this.game, sprite.getPhaserSprite(), speed);
		this.cloudsPhysics.push(physics);
		
		speed += 5;
		
		sprite = new WorldSprite.Cloud(this.game, WorldSprite.Cloud.STYLE_3, -100, 200);
		this.cloudsSprites.push(sprite);
		physics = new WorldPhysics.Cloud(this.game, sprite.getPhaserSprite(), speed);
		this.cloudsPhysics.push(physics);
		
		WorldAudio.playMusic();
		
		WorldPhysics.clearDefaultBounds(this.game);
	}
	
	World.prototype = {
		/**
		 * Actualizar
		 * @method update
		 * @param {Player} player
		 */
		update : function(player) {
			for(var i in this.cloudsPhysics) {
				this.cloudsPhysics[i].update();
			}
			
			WorldPhysics.checkBounds(this.game, player);
		}
	};
	
	/**
	 * Cargar atlas de imagenes y audio
	 * @method load
	 * @param {Phaser.Game} game
	 */
	World.load = function(game) {
		WorldSprite.load(game);
		WorldAudio.load(game);
	};
	
	/**
	 * Reproduce la musica
	 * @method playMusic
	 */
	World.playMusic = WorldAudio.playMusic;
	
	/**
	 * Detiene la musica
	 * @method stopMusic
	 */
	World.stopMusic = WorldAudio.stopMusic;
	
	return World;
});
