'use strict';

define(['phaser', 
        'app/entities/game_over', 
        'app/entities/world'], function(Phaser, 
                                        GameOver, 
                                        World) {
	/**
	 * Sistema de estado de juego.
	 * Permite realizar la transición hacia los estados de juego
	 * @class GameStateSystem
	 * @param {Phaser.Game} game
	 */
	function GameStateSystem(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Sistema de combustible
		 * @property fuelSystem
		 * @type {FuelSystem}
		 */
		this.fuelSystem = null;
		
		/**
		 * Sistema de puntuación
		 * @property scoreSystem
		 * @type {ScoreSystem}
		 */
		this.scoreSystem = null;
		
		/**
		 * Sistema de objetos atacantes
		 * @property attackerObjectSystem
		 * @type {AttackerObjectSystem}
		 */
		this.attackerObjectSystem = null;
		
		/**
		 * Sistema de poderes
		 * @property powersSystem
		 * @type {PowersSystem}
		 */
		this.powersSystem = null;
	}

	GameStateSystem.prototype = {
		/**
		 * Finalizar juego
		 * @method gameOver
		 */
		gameOver : function() {
			this.fuelSystem.stopConsumeFuel();
			this.fuelSystem.stopFuelSupply();
			this.attackerObjectSystem.stopAttack();
			this.powersSystem.stopSupply();
			this.powersSystem.disableActivePower();
			
			var gameOver = new GameOver(this.game);
			
			var timerEvent = function() {
				World.stopMusic();
				this.game.state.start('main-menu');
			};
			
			this.game.time.events.add(Phaser.Timer.SECOND * 5, timerEvent, this);
			
			this.scoreSystem.updateMaxScore();
		}
	};
	
	return GameStateSystem;
});
