'use strict';

define(['phaser',
        'app/states/boot',
        'app/states/preload',
        'app/states/main_menu',
        'app/states/how_to_play',
        'app/states/level_master'],function(Phaser,
                                            BootState,
                                            PreloadState,
                                            MainMenuState,
                                            HowToPlayState,
                                            LevelMasterState) {

	/**
	 * Game constructor
	 * @class Game
	 * @construct
	 */
	function Game() {}

	Game.prototype = {
	   start: function() {
		   /**
		    * Objeto game de phaser
		    * @property game
		    * @type {Phaser.Game}
		    */
		   this.game = new Phaser.Game(800, 420, Phaser.AUTO, 'game_area');

		   this.game.state.add('boot', BootState);
		   this.game.state.add('preload', PreloadState);
		   this.game.state.add('main-menu', MainMenuState);
		   this.game.state.add('how-to-play', HowToPlayState);
		   this.game.state.add('level-master', LevelMasterState);


			 // Start the game
		   this.game.state.start('boot');
	   }
	};

	return Game;

});
