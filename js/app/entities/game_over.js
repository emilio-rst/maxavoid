'use strict';

define(['app/components/game_over_sprite', 
        'app/components/game_over_audio'], function(GameOverSprite,
                                                    GameOverAudio) {
	/**
	 * Aviso Game Over
	 * @class GameOver
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 */
	function GameOver(game) {
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
		this.sprite = new GameOverSprite.Sprite(this.game);
		
		GameOverAudio.play();
	}

	GameOver.prototype = {
		/**
		 * Destruir
		 * @method destroy
		 */
		destroy : function() {
			this.sprite.destroy();
		}
	};

	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 * @static
	 */
	GameOver.load = function(game) {
		GameOverSprite.load(game);
		GameOverAudio.load(game);
	};

	return GameOver;
});
