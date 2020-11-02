'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace para sprites de Poderes
	 * @namespace
	 */
	var PowersSprite = {};
	
	/**
	 * Sprites de bateria
	 * @class PowersSprite.Battery
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Int} x
	 * @param {Int} y
	 */
	PowersSprite.Battery = function(game, x, y) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Objeto sprite de Phaser
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(x, y, 'battery');		
		
		this.phaserSprite.animations.add('bright', Phaser.Animation.generateFrameNames('battery_', 1, 4, '', 2), 8, true, false);
		this.phaserSprite.animations.play('bright');
	};
	
	PowersSprite.Battery.prototype = {
		/**
		 * Destruir
		 * @method destroy
		 */
		destroy : function() {
			this.phaserSprite.destroy();
		}
	};
	
	/**
	 * Sprites de escudo
	 * @class PowersSprite.Shield
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Int} x
	 * @param {Int} y
	 */
	PowersSprite.Shield = function(game, x, y) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Objeto sprite de Phaser
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(x, y, 'shield');		
		
		this.phaserSprite.animations.add('float', Phaser.Animation.generateFrameNames('shield_', 1, 8, '', 2), 8, true, false);
		this.phaserSprite.animations.play('float');
	};
	
	PowersSprite.Shield.prototype = {
		/**
		 * Destruir
		 * @method destroy
		 */
		destroy : function() {
			this.phaserSprite.destroy();
		}
	};
	
	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	PowersSprite.load = function(game) {
		game.load.atlasJSONHash('battery', 'assets/sprites/battery.png', 'assets/sprites/battery.json');
		game.load.atlasJSONHash('shield', 'assets/sprites/shield.png', 'assets/sprites/shield.json');
	};
	
	return PowersSprite;
});
