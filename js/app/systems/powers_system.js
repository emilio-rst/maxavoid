 'use strict';

define(['phaser', 
        'app/entities/powers',
        'app/entities/player',
        'app/entities/world'], function(Phaser, 
                                        Powers, 
                                        Player,
                                        World) {
	/**
	 * Sistema de poderes.
	 * @class PowersSystem
	 * @param {Phaser.Game} game
	 * @param {LevelSystem} levelSystem
	 * @param {GameStateSystem} gameStateSystem
	 */
	function PowersSystem(game, levelSystem, gameStateSystem) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Entidad Player
		 * @property player
		 * @type {Player}
		 */
		this.player = null;
		
		/**
		 * Poder
		 * @property power
		 * @type {Object}
		 */
		this.power = null;
		
		/**
		 * Timer de suministro de poderes
		 * @property timer
		 * @type {Phaser.TimerEvent}
		 * @private
		 */
		this.timer = false;
		
		/**
		 * Suministrar poderes
		 * @property powerSupply
		 * @type {boolean}
		 * @private
		 */
		this.supply = false;
		
		/**
		 * Tiempo en segundos que debe esperar para que aparezca un poder
		 * @property duration
		 * @type {Number}
		 * @private
		 */
		this.duration = 8;
		
		levelSystem.powersSystem = this;
		
		gameStateSystem.powersSystem = this;
	}

	PowersSystem.prototype = {
		/**
		 * Iniciar sumunistro de poderes
		 * @method startSupply
		 */
		startSupply : function() {
			this.supply = true;
			this.createTimer();
		},
		
		/**
		 * Crear timer
		 * @method createTimer
		 */
		createTimer : function() {
			this.timer = this.game.time.events.add(Phaser.Timer.SECOND * this.duration, this.createPower, this);
		},
		
		/**
		 * Suministrar poder de ser posible
		 * @method supplyPower
		 */
		supplyPower : function() {
			if(this.supply) this.createTimer();
		},
		
		/**
		 * Detener sumunistro de poderes
		 * @method stopSupply
		 */
		stopSupply : function() {
			if(!this.supply) return;
			
			this.game.time.events.remove(this.timer);
			
			if(this.power !== null) this.power.destroy();
			
			this.timer = null;
			this.supply = false;
		},
		
		/**
		 * Crear poder
		 * @method createPower
		 */
		createPower : function() {
			if(this.power !== null) this.power.destroy();
			
			var powers = ['Battery', 'Shield', null];
			
			var power = powers[this.game.rnd.integerInRange(0, powers.length - 1)];
			
			if(power != null) {
				this.power = new Powers[power](this.game, this.game.rnd.integerInRange(50, this.game.width - 50), this.game.rnd.integerInRange(50, this.game.height - 50), this);
			} else {
				this.createTimer();
			}
		},
		
		/**
		 * Recoger poder
		 * @method collect
		 */
		collect : function() {
			this.power.enable(this.player);
			
			this.power.destroy();
			this.power = null;
			
			Player.audioCollect();
			World.stopMusic();
			Player.playPowerMusic();
		},
		
		/**
		 * Deshabilitar poder activo
		 * @method disableActivePower
		 */
		disableActivePower : function() {
			if(this.player.existsActivePower()) {
				Player.stopPowerMusic();
				World.playMusic();
				this.player.disableActivePower();
			}
		},
		
		/**
		 * Actualizar sistema
		 * @method update
		 */
		update : function() {
			if(this.power !== null && this.player.alive) {
				if(this.player.checkOverlap(this.power.phaserSprite)) this.collect();
			}
		}
	};
	
	return PowersSystem;
});
