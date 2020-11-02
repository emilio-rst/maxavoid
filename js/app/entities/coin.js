'use strict';

define(['app/components/coin_sprite'], function(CoinSprite) {
	/**
	 * Moneda
	 * @class Coin
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 * @param {Int} x
	 * @param {Int} y
	 */
	function Coin(game, x, y) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Sprite de moneda
		 * @property sprite
		 * @type {CoinSprite}
		 */
		this.sprite = new CoinSprite.Sprite(this.game, x, y);
	}

	Coin.prototype = {
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
	Object.defineProperty(Coin.prototype, 'phaserSprite', {
		get : function() {
			return this.sprite.phaserSprite;
		}
	});
	
	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	Coin.load = CoinSprite.load;

	return Coin;
});
