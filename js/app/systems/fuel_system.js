'use strict';

define(['phaser', 
        'app/entities/fuel',
        'app/entities/player'], function(Phaser, 
                                         Fuel, 
                                         Player) {
	/**
	 * Sistema de combustible.
	 * @class FuelSystem
	 * @param {Phaser.Game} game
	 * @param {GameStateSystem} gameStateSystem
	 * @param {LevelSystem} levelSystem
	 */
	function FuelSystem(game, gameStateSystem, levelSystem) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/*
		 * Se carga en el GameStateSystem
		 */
		gameStateSystem.fuelSystem = this;
		
		levelSystem.fuelSystem = this;
		
		/**
		 * Sistema de niveles
		 * @property levelSystem
		 * @type {LevelSystem}
		 */
		this.levelSystem = levelSystem;
		
		/**
		 * Entidad Player
		 * @property player
		 * @type {Player}
		 */
		this.player = null;
		
		/**
		 * Entidad FuelBar
		 * @property fuelBar
		 * @type {FuelBar}
		 */
		this.fuelBar = null;
		
		/**
		 * Contenedor de combustible
		 * @property fuel
		 * @type {Fuel}
		 */
		this.fuel = null;
		
		/**
		 * Timer de suministro de combustible
		 * @property fuelTimer
		 * @type {Phaser.TimerEvent}
		 * @private
		 */
		this.fuelTimer = false;
		
		/**
		 * Suministrar combustible
		 * @property fuelSupply
		 * @type {boolean}
		 * @private
		 */
		this.fuelSupply = false;
	}

	FuelSystem.prototype = {
		/**
		 * Sin combustible
		 * @method withoutFuel
		 */
		withoutFuel : function() {
			this.player.die();
		},
		
		/**
		 * Iniciar sumunistro de combustible
		 * @method startFuelSupply
		 */
		startFuelSupply : function() {
			this.fuelSupply = true;
			this.createFuelTimer();
		},
		
		/**
		 * Crear timer de combustible
		 * @method createFuelTimer
		 */
		createFuelTimer : function() {
			this.fuelTimer = this.game.time.events.add(Phaser.Timer.SECOND * 6, this.createFuel, this);
		},
		
		/**
		 * Detener sumunistro de combustible
		 * @method stopFuelSupply
		 */
		stopFuelSupply : function() {
			if(!this.fuelSupply) return;
			
			this.game.time.events.remove(this.fuelTimer);
			
			if(this.fuel !== null) this.fuel.destroy();
			
			this.fuelTimer = null;
			this.fuelSupply = false;
		},
		
		/**
		 * Crear contenedor de combustible
		 * @method createfuel
		 */
		createFuel : function() {
			if(this.fuel !== null) this.fuel.destroy();
			this.fuel = new Fuel(this.game, this.game.rnd.integerInRange(50, this.game.width - 50), this.game.rnd.integerInRange(50, this.game.height - 50));
		},
		
		/**
		 * Recoger combustible
		 * @method pickFuel
		 */
		collectFuel : function() {
			this.fuel.destroy();
			this.fuel = null;
			
			Player.audioCollect();
			
			this.fuelBar.reload();
			
			if(this.fuelSupply) this.createFuelTimer();
		},

		/**
		 * Iniciar consumo de combustible
		 * @method startConsumeFuel
		 */
		startConsumeFuel : function() {
			this.fuelBar.startConsumeFuel();
		},
		
		/**
		 * Detener consumo de combustible
		 * @method stopConsumeFuel
		 */
		stopConsumeFuel : function() {
			this.fuelBar.stopConsumeFuel();
		},
		
		/**
		 * Recarga completamente la barra de combustible
		 * @method reloadFuelBar
		 */
		reloadFuelBar : function() {
			this.fuelBar.reload();
		},
		
		/**
		 * Actualizar sistema de combustible
		 * @method update
		 */
		update : function() {
			if(this.fuel !== null && this.player.alive) {
				if(this.player.checkOverlap(this.fuel.phaserSprite)) this.collectFuel();
			}
		} 
	};
	
	return FuelSystem;
});
