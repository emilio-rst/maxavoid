'use strict';

define(['app/components/fuel_sprite'], function(FuelSprite) {
	/**
	 * Contenedor de combustible
	 * @class Fuel
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 * @param {Int} x
	 * @param {Int} y
	 */
	function Fuel(game, x, y) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Sprite de contenedor de combustible
		 * @property sprite
		 * @type {FuelSprite}
		 */
		this.sprite = new FuelSprite.Sprite(this.game, x, y);
	}

	Fuel.prototype = {
		/**
		 * Destruir
		 * @method destroy
		 */
		destroy : function() {
			this.sprite.destroy();
		}
	};

	/**
	 * Sprite de phaser
	 * @property phaserSprite
	 * @type {Phaser.Sprite}
	 */
	Object.defineProperty(Fuel.prototype, 'phaserSprite', {
		get : function() {
			return this.sprite.phaserSprite;
		}
	});

	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	Fuel.load = FuelSprite.load;

	return Fuel;
});
