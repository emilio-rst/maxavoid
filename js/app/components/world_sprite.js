'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace para sprites de World
	 * @namespace
	 */
	var WorldSprite = {};
	
	/**
	 * Adiciona Fondo
	 * 
	 * @method WorldSprite.background
	 * @param {Phaser.Game} game
	 */
	WorldSprite.background = function(game) {
		game.stage.backgroundColor = '#6359FF';
	};
	
	/**
	 * Sprites de la nube
	 * @class WorldSprite.Cloud
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {String} cloudStyle Estilo de nube
	 * @param {Int} x
	 * @param {Int} y
	 */
	WorldSprite.Cloud = function (game, cloudStyle, x, y) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Objeto sprite de Phaser
		 * @property phaserSprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(x, y, 'world');
				
		this.phaserSprite.frameName = cloudStyle;
	};
		
	WorldSprite.Cloud.prototype = {
		/**
		 * Obtener sprite de phaser
		 * @method getPhaserSprite
		 * @return {Phaser.Sprite}
		 */
		getPhaserSprite : function() {
			return this.phaserSprite;
		}
	};
	
	/**
	 * Primer estilo de nube
	 * @contant
	 * @type {String}
	 */
	WorldSprite.Cloud.STYLE_1 = 'cloud1';
	
	/**
	 * Segundo estilo de nube
	 * @contant
	 * @type {String}
	 */
	WorldSprite.Cloud.STYLE_2 = 'cloud2';
	
	/**
	 * Tercer estilo de nube
	 * @contant
	 * @type {String}
	 */
	WorldSprite.Cloud.STYLE_3 = 'cloud3';
	
	/**
	 * Sprites del sol
	 * @class WorldSprite.Sun
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Int} x
	 * @param {Int} y
	 */
	WorldSprite.Sun = function (game, x, y) {
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
		this.phaserSprite = this.game.add.sprite(x, y, 'world');
		
		this.phaserSprite.animations.add('bright', Phaser.Animation.generateFrameNames('sun_', 1, 6, '', 1), 10, true, false);
		this.phaserSprite.animations.play('bright');
	};
	
	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	WorldSprite.load = function(game) {
		game.load.atlasJSONHash('world', 'assets/sprites/world.png', 'assets/sprites/world.json');
	};
	
	return WorldSprite;
});
