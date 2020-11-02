'use strict';

define([], function() {
	
	var ScoreSprite = {};
	
	/**
	 * Sprites de la barra de combustible
	 * 
	 * @class ScoreSprite
	 * @constructor
	 * @param game {Phaser.Game}
	 */
	var ScoreSprite = function(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type Phaser.Game 
		 */
		this.game = game;
		
		/*
		 * Estilo de fuente
		 */
		var style = { font: "24px Sans-Serif", fill: "#FFFF00", align: "center" };
		
		this.sprite = this.game.add.sprite(this.game.world.centerX, 5, 'coin');
		this.sprite.frameName = 'coin_01';
		
		/**
		 * Objeto Text de Phaser
		 * @property text
		 * @type Phaser.Text
		 */
		this.text = this.game.add.text(this.sprite.x + this.sprite.width + 5, 10, '0', style);
	};
	
	ScoreSprite.prototype = {
		/**
		 * Asignar puntuación alcanzada
		 * @method setValue
		 * @param {Int} value
		 */
		setValue : function(value) {
			this.text.text = value.toString();
		}
	};
	
	return ScoreSprite;
});
