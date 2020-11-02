'use strict';

define(['phaser',
        'app/entities/level'], function(Phaser,
		                                Level) {
	/**
	 * Sistema de niveles.
	 * Permite realizar la transición hacia los distintos niveles
	 * @class LevelSystem
	 * @param {Phaser.Game} game
	 */
	function LevelSystem(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Indicador de niveles
		 * @property levelIndicator
		 * @type {Level.Indicator}
		 */
		this.levelIndicator = null;
		
		/**
		 * Sistema de puntuaciones
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
		 * Sistema de combustible
		 * @property fuelSystem
		 * @type {FuelSystem}
		 */
		this.fuelSystem = null;
		
		/**
		 * Sistema de poderes
		 * @property powersSystem
		 * @type {PowersSystem}
		 */
		this.powersSystem = null;
		
		/**
		 * Player
		 * @property player
		 * @type {Player}
		 */
		this.player = null;
		
		/**
		 * Número de rondas realizadas de recolección de monedas durante el nivel
		 * @property rounds
		 */
		this.rounds = false;
		
		/**
		 * Indica si el nivel ha sido completado
		 * @property isLevelComplete
		 * @type {Boolean}
		 */
		this.isLevelComplete = false;
		
		/**
		 * Multiplicador de velocidad para la sucesión de niveles
		 * @property speedMultiplier
		 * @type {Number}
		 */
		this.speedMultiplier = 1;
	}

	LevelSystem.prototype = {
		/**
		 * Iniciar nivel
		 * @param {Number} level numero de nivel
		 */
		initLevel : function(level) {
			this.levelIndicator.level = level;
			
			this.speedMultiplier = 1 + Math.ceil(level/13)*0.2;
			
			var initSystems = function() {
				this.fuelSystem.reloadFuelBar();
				this.fuelSystem.startConsumeFuel();
				this.fuelSystem.startFuelSupply();
				this.scoreSystem.startMoneySupply();
				this.powersSystem.startSupply();
				this.startAttack(level);
			};
			
			initSystems = initSystems.bind(this);
			
			Level.splash(this.game, level, initSystems);
		},
		
		/**
		 * Iniciar ataque
		 * @method startAttack
		 * @param {Number} level
		 */
		startAttack : function(level) {
			/*
			 * Estrategias de ataque
			 */
			var strategies = [
				['Lateral'],
				['Straight'],
				['Above'],
				['Bottom'],
				['Lateral', 'Straight'],
				['Lateral', 'Above'],
				['Lateral', 'Bottom'],
				['Straight', 'Above'],
				['Straight', 'Bottom'],
				['Above', 'Bottom'],
				['Lateral', 'Straight', 'Above'],
				['Lateral', 'Straight', 'Bottom'],
				['Lateral', 'Straight', 'Above', 'Bottom'],
			];
			
			var numStrategies = strategies.length;
			
			level -= numStrategies * Math.floor(level/numStrategies);
			
			var strategy = this.attackerObjectSystem.createStrategy(strategies[level]);
			
			this.attackerObjectSystem.startAttack(strategy);
		},
		
		/**
		 * Cuando se completa el nivel
		 * @method onLevelComplete
		 */
		onLevelComplete : function() {
			this.isLevelComplete = true;
			this.rounds = 0;
			
			this.attackerObjectSystem.stopAttack();
			
			var timer = this.game.time.events.loop(Phaser.Timer.SECOND, function() {
				if(this.player.alive) {
					if(this.attackerObjectSystem.attackIsFinished()) {
						this.game.time.events.remove(timer);
						
						this.fuelSystem.stopFuelSupply();
						this.fuelSystem.stopConsumeFuel();
						this.powersSystem.stopSupply();
						this.powersSystem.disableActivePower();
						
						this.initLevel(this.levelIndicator.level+1);
					}
				} else {
					this.game.time.events.remove(timer);
				}
			}, this);
		},
		
		/**
		 * Evento cuando se recogieron todas las monedas
		 * @method onCoinsPicked
		 */
		onAllCoinsCollected : function() {
			if(this.rounds < 1) {
				this.rounds++;
				this.scoreSystem.createRandomCoins();
			} else {
				this.onLevelComplete();
			}
		}
	};
	
	return LevelSystem;
});
