'use strict';

define(['app/components/pause_button_sprite', 
        'app/components/pause_button_input'], function(PauseButtonSprite, 
                                                       PauseButtonInput) {
	
	/**
	 * Boton de pause
	 * 
	 * @class PauseButton
	 * @constructor
	 * @param {Phaser.Game} game Objeto game de phaser
	 * @param {GameStateSystem} gameStateSystem Sistema de Estado de Juego
	 */
	function PauseButton(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Pause button sprite
		 * @type {PauseButtonSprite}
		 * @property button
		 */
		this.sprite = new PauseButtonSprite.Sprite(this.game);
		
		PauseButtonInput.addListener(game, this.sprite.phaserSprite, this);
	}

	PauseButton.prototype = {
		/**
		 * Al jugar
		 * @method onPlay
		 */
		onPlay : function() {
			if(this.game.paused) { 
				this.game.paused = false; 
				this.sprite.setPause();
			}
		},
		
		/**
		 * Al pausar
		 * @method onPause
		 */
		onPause : function() {
			this.sprite.setPlay();
			this.game.paused = true;
		}
	}
	
	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	PauseButton.load = PauseButtonSprite.load;
	
	return PauseButton;
});
