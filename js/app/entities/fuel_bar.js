'use strict';

define(['app/components/fuel_bar_sprite',
        'app/components/fuel_bar_physics'], function(FuelBarSprite, 
                                                     FuelBarPhysics) {
	/**
	 * Barra de combustible
	 * @class FuelBar
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 * @param {FuelSystem} fuelSystem Sistema de combustible
	 */
	function FuelBar(game, fuelSystem) {
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
		this.fuelSystem = fuelSystem;
		
		/*
		 * Se carga en el FuelSystem
		 */
		fuelSystem.fuelBar = this;
		
		/**
		 * Sprite de barra de combustible
		 * @property sprite
		 * @type {FuelBarSprite.Sprite}
		 */
		this.sprite = new FuelBarSprite.Sprite(this.game);
		
		/**
		 * Físicas de barra de combustible
		 * @property physics
		 * @type {FuelBarPhysics.Physics}
		 */
		this.physics = new FuelBarPhysics.Physics(this.game);
		
		var listener = new FuelBarPhysics.Listener();
		listener.onChangeFuelLevel = this.onChangeFuelLevel.bind(this);
		this.physics.listener = listener;
	}

	FuelBar.prototype = {
		/**
		 * Cuando cambia el nivel de combustible
		 * @method onChangeFuelLevel
		 * @param {FuelBarPhysics.Physics} physics
		 */
		onChangeFuelLevel : function(physics) {
			this.sprite.setFuelLevel(physics.fuelLevel);
			
			if(physics.fuelLevel == 0) {
				this.stopConsumeFuel();
				this.fuelSystem.withoutFuel();
			}
		},
		
		/**
		 * Iniciar consumo de combustible
		 * @method startConsumeFuel
		 */
		startConsumeFuel : function() {
			this.physics.startConsumeFuel(0.5);
		},
		
		/**
		 * Detener consumo de combustible
		 * @method stopConsumeFuel
		 */
		stopConsumeFuel : function() {
			this.physics.stopConsumeFuel();
		},
		
		
		/**
		 * Recargar combustible completo
		 * @method reloadFull
		 */
		reload : function() {
			this.physics.fuelLevel = 20;
		}
	};

	/**
	 * Nivel de combustible (0 a 20)
	 * @property fuelLevel
	 * @type {Int}
	 * @default 20
	 */
	Object.defineProperty(FuelBar.prototype, 'fuelLevel', {
		get : function() {
			return this.physics.fuelLevel;
		},
		
		set : function(value) {
			this.physics.fuelLevel = value;
		}
	});

	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	FuelBar.load = FuelBarSprite.load;

	return FuelBar;
});
