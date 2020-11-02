'use strict';

define(['app/components/powers_sprite'], function(PowersSprite) {
	
	/**
	 * Namespace para poderes
	 * @namepace
	 */
	var Powers = {};
	
	/**
	 * Bateria
	 * @class Powers.Battery
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 * @param {Int} x
	 * @param {Int} y
	 * @param {PowersSystem} powersSystem
	 */
	Powers.Battery = function(game, x, y, powersSystem) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Sprite
		 * @property sprite
		 * @type {PowersSprite.Battery}
		 */
		this.sprite = new PowersSprite.Battery(this.game, x, y);
		
		/**
		 * Sistema de poderes
		 * @property powersSystem
		 * @type {PowersSystem}
		 */
		this.powersSystem = powersSystem;
	}

	Powers.Battery.prototype = {
		/**
		 * Destruir
		 * @method destroy
		 */
		destroy : function() {
			this.sprite.destroy();
		},
		
		/**
		 * Habilitar poder
		 * @method enable
		 * @param {Player} player
		 */
		enable : function(player) {
			player.enableUltraSpeed();
		}
	};

	/**
	 * Sprite de phaser
	 * @property phaserSprite
	 * @type {Phaser.Sprite}
	 */
	Object.defineProperty(Powers.Battery.prototype, 'phaserSprite', {
		get : function() {
			return this.sprite.phaserSprite;
		}
	});


	/**
	 * Escudo
	 * @class Powers.Shield
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 * @param {Int} x
	 * @param {Int} y
	 * @param {PowersSystem} powersSystem
	 */
	Powers.Shield = function(game, x, y, powersSystem) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Sprite
		 * @property sprite
		 * @type {PowersSprite.Battery}
		 */
		this.sprite = new PowersSprite.Shield(this.game, x, y);
		
		/**
		 * Sistema de poderes
		 * @property powersSystem
		 * @type {PowersSystem}
		 */
		this.powersSystem = powersSystem;
	}

	Powers.Shield.prototype = {
		/**
		 * Destruir
		 * @method destroy
		 */
		destroy : function() {
			this.sprite.destroy();
		},
		
		/**
		 * Habilitar poder
		 * @method enable
		 * @param {Player} player
		 */
		enable : function(player) {
			player.enableInvulnerability();
		}
	};

	/**
	 * Sprite de phaser
	 * @property phaserSprite
	 * @type {Phaser.Sprite}
	 */
	Object.defineProperty(Powers.Shield.prototype, 'phaserSprite', {
		get : function() {
			return this.sprite.phaserSprite;
		}
	});

	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	Powers.load = PowersSprite.load;

	return Powers;
});
