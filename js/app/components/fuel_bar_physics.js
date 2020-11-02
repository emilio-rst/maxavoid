'use strict';

define(['phaser'], function(Phaser) {

	/**
	 * Name space of fuel bar physics
	 * @namespace
	 */
	var FuelBarPhysics = {};

	/**
	 * Physics of the fuel bar
	 *
	 * @class FuelBarPhysics
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	FuelBarPhysics.Physics = function(game) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Fuel level (0 to 20)
		 * @property _fuelLevel
		 * @type {Number}
		 * @private
		 */
		this._fuelLevel = 20;

		/**
		 * Fuel event listener
		 * @property listener
		 * @type {FuelBarPhysics.Listener}
		 */
		this.listener = null;

		/**
		 * Fuel spend loop
		 * @property consumeFuelLoop
		 * @type {FuelBarPhysics.ConsumeFuelLoop}
		 */
		this.consumeFuelLoop = null;
	};

	FuelBarPhysics.Physics.prototype = {
		/**
		 * Start spend of fuel
		 * @method startConsumeFuel
		 * @param {Number} fuel fuel spend units
		 */
		startConsumeFuel : function(fuel) {
			this.stopConsumeFuel();
			this.consumeFuelLoop = new FuelBarPhysics.ConsumeFuelLoop(this, fuel);
		},

		/**
		 * Stop fuel spend
		 * @method stopConsumeFuel
		 */
		stopConsumeFuel : function() {
			if(this.consumeFuelLoop !== null) {
				this.consumeFuelLoop.stop();
				this.consumeFuelLoop = null;
			}
		}
	};

	/**
	 * Fuel level (0 to 20)
	 * @property fuelLevel
	 * @type {Int}
	 * @default 20
	 */
	Object.defineProperty(FuelBarPhysics.Physics.prototype, 'fuelLevel', {
		get : function() {
			return this._fuelLevel;
		},

		set : function(value) {
			if(value >= 20) {
				this._fuelLevel = 20;
			} else if(value <=0 ) {
				this._fuelLevel = 0;
			} else {
				this._fuelLevel = value;
			}

			if(this.listener !== null) this.listener.onChangeFuelLevel(this);
		}
	});

	/**
	 * Fuel spend loop
	 *
	 * @class FuelBarPhysics.ConsumeFuelLoop
	 * @constructor
	 * @param {FuelBarPhysics.Physics} physics
	 * @param {Number} fuel fuel spend units
	 */
	FuelBarPhysics.ConsumeFuelLoop = function(physics, fuel) {
		/**
		 * Physics
		 * @property physics
		 * @type {FuelBarPhysics.Physics}
		 */
		this.physics = physics;

		/**
		 * Fuel spend units by seconds
		 * @property fuel
		 * @type {Number}
		 */
		this.fuel = fuel;

		/**
		 * Timer
		 * @property timer
		 * @type {Phaser.TimerEvent}
		 */
		this.timer = physics.game.time.events.loop(Phaser.Timer.SECOND, this.consumeFuel, this);
	};

	FuelBarPhysics.ConsumeFuelLoop.prototype = {
		/**
		 * Spend fuel
		 * @method consumeFuel
		 */
		consumeFuel : function() {
			this.physics.fuelLevel = this.physics.fuelLevel - this.fuel;
		},

		/**
		 * Stop
		 * @method stop
		 */
		stop : function() {
			this.physics.game.time.events.remove(this.timer);
		}
	};

	/**
	 * Physics events listener
	 * @class FuelBarPhysics.Listener
	 * @constructor
	 */
	FuelBarPhysics.Listener = function() {};

	FuelBarPhysics.Listener.prototype = {
		/**
		 * Change on fuel level
		 * @method onChangeFuelLevel
		 * @param {FuelBarPhysics.Physics}  physics Objeto físicas del tanque de combustible
		 * @abstract
		 */
		onChangeFuelLevel : function(physics) {}
	};

	return FuelBarPhysics;
});
