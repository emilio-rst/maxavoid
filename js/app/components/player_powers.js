'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace power ups
	 * @namespace
	 */
	var PlayerPowers = {};

	/**
	 * Ultra speed power up
	 * @class PlayerPower.UltraSpeed
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {PowersSystem} powersSystem
	 * @param {AttackerObjectSystem} attackerObjectSystem
	 */
	PlayerPowers.UltraSpeed = function(game, powersSystem, attackerObjectSystem) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Attacker object system
		 * @property attackerObjectSystem
		 * @type {attackerObjectSystem}
		 */
		this.attackerObjectSystem = attackerObjectSystem;

		/**
		 * Power up system
		 * @property powersSystem
		 * @type {powersSystem}
		 */
		this.powersSystem = powersSystem;

		/**
		 * Timer
		 * @property timer
		 * @type {Phaser.TimerEvent}
		 * @private
		 */
		this.timer = null;

		/**
		 * Multiplier
		 * @property multiplier
		 * @type {Number}
		 * @private
		 */
		this.multiplier = 0.5;

		/**
		 * Duration
		 * @property duration
		 * @type {Number}
		 * @private
		 */
		this.duration = 8;
	}

	PlayerPowers.UltraSpeed.prototype = {
		/**
		 * Enable
		 * @method enable
		 */
		enable : function() {
			this.attackerObjectSystem.multiplySpeed(0.5);
			this.timer = this.game.time.events.add(Phaser.Timer.SECOND * this.duration, this.onFinished, this);
		},

		/**
		 * Disable
		 * @method disable
		 */
		disable : function() {
			this.attackerObjectSystem.multiplySpeed(1/this.multiplier);
			this.game.time.events.remove(this.timer);
			this.timer = null;
		},

		/**
		 * Finished power
		 * @method onFinished
		 */
		onFinished : function() {
			this.powersSystem.disableActivePower();
			this.powersSystem.supplyPower();
		}
	};

	/**
	 * Invulnerability power up
	 * @class PlayerPower.Invulnerability
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {PowersSystem} powersSystem
	 * @param {AttackerObjectSystem} attackerObjectSystem
	 */
	PlayerPowers.Invulnerability = function(game, powersSystem, player) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Attacker object system
		 * @property attackerObjectSystem
		 * @type {attackerObjectSystem}
		 */
		this.player = player;

		/**
		 * Power system
		 * @property powersSystem
		 * @type {powersSystem}
		 */
		this.powersSystem = powersSystem;

		/**
		 * Timer
		 * @property timer
		 * @type {Phaser.TimerEvent}
		 * @private
		 */
		this.timer = null;

		/**
		 * Duration
		 * @property duration
		 * @type {Number}
		 * @private
		 */
		this.duration = 8;
	}

	PlayerPowers.Invulnerability.prototype = {
		/**
		 * Enable
		 * @method enable
		 */
		enable : function() {
			this.player.setCollision(false);
			this.timer = this.game.time.events.add(Phaser.Timer.SECOND * this.duration, this.onFinished, this);
		},

		/**
		 * Disable
		 * @method disable
		 */
		disable : function() {
			this.player.setCollision(true);
			this.game.time.events.remove(this.timer);
			this.timer = null;
		},

		/**
		 * Finished
		 * @method onFinished
		 */
		onFinished : function() {
			this.powersSystem.disableActivePower();
			this.powersSystem.supplyPower();
		}
	};

	return PlayerPowers;
});
