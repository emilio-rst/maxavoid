'use strict';

define(['app/entities/coin',
        'app/entities/player'], function(Coin, 
                                         Player) {
	/**
	 * Sistema de puntuación.
	 * @class ScoreSystem
	 * @param {Phaser.Game} game
	 * @param {GameStateSystem} gameStateSystem
	 * @param {LevelSystem} levelSystem
	 */
	function ScoreSystem(game, gameStateSystem, levelSystem) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		levelSystem.scoreSystem = this;
		
		/**
		 * Sistema de niveles
		 * @property levelSystem
		 * @type {LevelSystem}
		 */
		this.levelSystem = levelSystem;
		
		/*
		 * Se carga en el GameStateSystem
		 */
		gameStateSystem.scoreSystem = this;
		
		/**
		 * Entidad Player
		 * @property player
		 * @type {Player}
		 */
		this.player = null;
		
		/**
		 * Entidad Score
		 * @property score
		 * @type {Score}
		 */
		this.score = null;
		
		/**
		 * Monedas aleatorias
		 * @property randomCoins
		 * @type {Array. <Coin>}
		 */
		this.randomCoins = [];
	}

	ScoreSystem.prototype = {
		/**
		 * Iniciar suministro de dinero
		 * @method startMoneySupply
		 */
		startMoneySupply : function() {
			this.createRandomCoins();
		},
		
		/**
		 * Crear monedas aleatorias
		 * @method createRandomCoins
		 */
		createRandomCoins : function() {
			for(var i=0; i<10; i++) {
				var coin = new Coin(this.game, this.game.rnd.integerInRange(10, this.game.width-50), this.game.rnd.integerInRange(60, this.game.height-50));
				this.randomCoins.push(coin);
			}
		},
		
		/**
		 * Actualizar sistema
		 * @method update
		 */
		update : function() {
			if(!this.player.alive) return;
			
			var i;
			
			for(i in this.randomCoins) {
				if(this.player.checkOverlap(this.randomCoins[i].phaserSprite)) {
					this.score.addCoin();
					this.randomCoins[i].destroy();
					this.randomCoins.splice(i, 1);
					
					Player.audioCollectCoin();
					
					if(this.randomCoins.length == 0) this.levelSystem.onAllCoinsCollected();
				} 
			}
		},
		
		/**
		 * Actualizar máxima puntuación
		 * @method updateMaxScore
		 */
		updateMaxScore : function() {
			this.score.updateMaxScore();
		}
	};
	
	return ScoreSystem;
});
