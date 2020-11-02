'use strict';

define(['app/components/main_menu_sprite',
        'app/components/single_input',
        'app/components/score_storage'], function(MainMenuSprite, 
                                                  SingleInput, 
                                                  ScoreStorage) {
	/**
	 * Menu principal
	 * @class MainMenu
	 * @param Game game
	 */
	function MainMenu(game) {
		/**
		 * Objeto game
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		MainMenuSprite.background(this.game);
		MainMenuSprite.player(this.game);
		MainMenuSprite.fireballs(this.game);
		MainMenuSprite.title(this.game);
		
		/*
		 * Listener de eventos
		 */
		var listener = new SingleInput.Listener();
		listener.onInput = this.play.bind(this);
		
		MainMenuSprite.arrowsStart(this.game);
		
		/**
		 * Entrada de teclado
		 * @property inputKeyboard
		 * @type {SingleInput.Keyboard}
		 */
		this.inputKeyboard = new SingleInput.Keyboard(this.game);
		this.inputKeyboard.listener = listener;
	
		
		/**
		 * Máxima puntuación
		 * @property maxScore
		 * @type {MainMenuSprite.Score}
		 */
		this.score = new MainMenuSprite.Score(this.game, ScoreStorage.Local.getMaxScore());
	}

	MainMenu.prototype = {
		/**
		 * Iniciar juego
		 * @method play
		 */
		play : function() {
			var self = this;
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					self.game.state.start('how-to-play');
				} else {
					FB.login(function(response) {
						if (response.authResponse) {
							self.game.state.start('how-to-play');
						}
					});
				}
			});
		}
	};
	
	/**
	 * Cargar imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	MainMenu.load = MainMenuSprite.load;
	
	return MainMenu;
});
