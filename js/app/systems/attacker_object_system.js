'use strict';

define(['app/entities/fireball'], function(Fireball) {
	/**
	 * Sistema de objetos atacantes.
	 * @class AttackerObjectSystem
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {GameStateSystem} gameStateSystem
	 * @param {LevelSystem} levelSystem
	 */
	function AttackerObjectSystem(game, gameStateSystem, levelSystem) {
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
		
		/*
		 * Se carga en el GameStateSystem
		 */
		gameStateSystem.attackerObjectSystem = this;
		
		levelSystem.attackerObjectSystem = this;
		
		/**
		 * Sistema de niveles
		 * @property levelSystem
		 * @type {LevelSystem}
		 */
		this.levelSystem = levelSystem;
		
		/**
		 * Ataque detenido
		 * @property stop
		 * @type {Boolean}
		 */
		this.stop = true;
		
		/**
		 * Ataque actual
		 * @property currrentAttack
		 * @type {Object}
		 */
		this.currentAttack = null;
		
		/**
		 * Pool de bolas de fuego
		 * @property fireballsPool
		 * @type {FireballsPool}
		 */
		this.fireballsPool = new FireballsPool(game, 5);
	}

	AttackerObjectSystem.prototype = {
		/**
		 * Asignar jugador
		 * @method setPlayer
		 * @param {Player} player
		 */
		setPlayer : function(player) {
			this.player = player;
			
			player.collides(function(body, shapeA, shapeB, equation) {
				player.die();
			}, this);
		},
		
		/**
		 * Crear estrategia de ataque
		 * @param {Array} attacks Ataques
		 * @return {Strategy} estrategia de ataque
		 */
		createStrategy : function(attacks) {
			return new Strategy(this.game, this.fireballsPool, attacks, this.levelSystem.speedMultiplier);
		},
		
		/**
		 * Iniciar ataque
		 * @method startAttack
		 * @param {AttackObjectSystem.Strategy} strategy
		 */
		startAttack : function(strategy) {
			this.stop = false;
			this.strategy = strategy;
			this.currentAttack = strategy.createAttack();
		},
		
		/**
		 * Detener ataque
		 * @method stopAttack
		 */
		stopAttack : function() {
			this.stop = true;
		},
		
		/**
		 * Actualizar
		 * @method update
		 */
		update : function() {
			if(!this.stop) {
				if(this.currentAttack.isFinished()) {
					this.currentAttack = this.strategy.createAttack();
				}
			}
		},
		
		/**
		 * Indica si el ataque ha finalizado
		 * @return {Boolean}
		 */
		attackIsFinished : function() {
			return this.currentAttack.isFinished();
		},
		
		/**
		 * Multiplicar velocidad de ataques
		 * @method multiplySpeed
		 * @param {Number} multiplier
		 */
		multiplySpeed : function(multiplier) {
			if(this.currentAttack != null) this.currentAttack.multiplySpeed(multiplier);
			if(this.strategy != null) this.strategy.multiplySpeed(multiplier);
		}
	};
	
	/**
	 * Pool de bolas de fuego
	 * @param {Phaser.Game} Objeto game de phaser
	 * @param {Number} n Numero de bolas de fuego predeterminado
	 * @constructor
	 * @class FireballsPool
	 */
	var FireballsPool = function(game, n) {
		/**
		 * Objeto game de phaser
		 * @var game
		 * @property {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Bolas de fuego disponibles
		 * @var Array
		 */
		this.fireballs = [];
		
		for(var i=0; i<n; i++) {
			var fireball = new Fireball(game, 0, 0);
			fireball.hide();
			this.fireballs.push(fireball);
		}
	}
	
	FireballsPool.prototype = {
		/**
		 * Obtiene una bola de fuego del pool, si hay disponibles entonces crea una nueva
		 * @return {Fireball}
		 */
		pop : function() {
			var fireball = this.fireballs.pop();
			
			if(fireball == undefined) {
				fireball = new Fireball(this.game, 0, 0);
			}
			
			fireball.show();
			
			return fireball;
		},
		
		/**
		 * Mete una bola de fuego en el pool
		 * @param {Fireball} fireball
		 */
		push : function(fireball) {
			fireball.hide();
			this.fireballs.push(fireball);
		}
	};
	
	/**
	 * Namespace para ataques
	 * @namespace
	 */
	var Attacks = {};
	
	/**
	 * Ataque base
	 * @class Attacks.BaseAttack
	 * @param {FireballsPool} Pool de bolas de fuego
	 * @constructor
	 */
	Attacks.BaseAttack = function(fireballsPool) {
		/**
		 * Bolas de fuego
		 * @property fireballs
		 * @type {array}
		 */
		this.fireballs = [];
		
		/**
		 * Pool de bolas de fuego
		 * @property fireballsPool
		 * @type {FireballsPool}
		 */
		this.fireballsPool = fireballsPool;
	};
	
	Attacks.BaseAttack.prototype = {
		/**
		 * Verifica si el ataque ha finalizado
		 * @method isFinished
		 * @return {boolean}
		 */
		isFinished : function() {
			this.fireballs.forEach((function(fireball, index) {
				if(fireball.checkOnShiftEnd()) {
					this.fireballsPool.push(fireball);
					this.fireballs.splice(index, 1);
				}
			}).bind(this));
			
			return this.fireballs.length == 0;
		},
		
		/**
		 * Multiplicar velocidad
		 * @method multiplySpeed
		 * @param {Number} multiplier
		 */
		multiplySpeed : function(multiplier) {
			this.fireballs.forEach(function(fireball) {
				fireball.multiplySpeed(multiplier);
			});
		}
	};
	
	/**
	 * Ataque desde arriba
	 * @class Attacks.Above
	 * @constructor
	 * @param {Phaser.Game} game Objeto game de phaser
	 * @param {FireballsPool} fireballsPool Pool de bolas de fuego
	 * @param {Number} speedMultiplier Multiplicador de velocidad
	 */
	Attacks.Above = function(game, fireballsPool, speedMultiplier) {
		
		Attacks.BaseAttack.call(this, fireballsPool);
		
		var config = { 'minSpeed' : 80, 'maxSpeed' : 120, 'minFireballs' : 4, 'maxFireballs' : 5 };
		
		var n = game.rnd.integerInRange(config.minFireballs, config.maxFireballs);
		
		for(var i=0; i<n; i++) {
			
			var fireball = fireballsPool.pop();
			
			var x, y, velocity, rotation;
				
			velocity = game.rnd.realInRange(config.minSpeed, config.maxSpeed);
			
			x = game.rnd.integerInRange(0, game.world.width);
			
			if(x > Math.floor(game.world.width/2)) {
				rotation = game.rnd.realInRange(Math.PI/2 + 0.5, Math.PI - 0.5);
			} else {
				rotation = game.rnd.realInRange(0.5, Math.PI/2 - 0.5);
			}
			
			if(x == 0) {
				x = -fireball.width;
				y = game.rnd.integerInRange(0, Math.floor(game.world.height/3));
			} else if(x == game.world.width) {
				x += fireball.width;
				y = game.rnd.integerInRange(0, Math.floor(game.world.height/3));
			} else {
				y = -fireball.height;
			}
			
			
			fireball.launch(x, y, velocity * speedMultiplier, rotation);
			
			this.fireballs.push(fireball);
		}
		
		Fireball.playAudio();
	};
	
	Attacks.Above.prototype = Object.create(Attacks.BaseAttack.prototype);
	
	/**
	 * Ataque desde abajo
	 * @class Attacks.Bottom
	 * @constructor
	 * @param {Phaser.Game} game Objeto game de phaser
	 * @param {FireballsPool} fireballsPool Pool de bolas de fuego
	 * @param {Number} speedMultiplier multiplicador de velocidad
	 */
	Attacks.Bottom = function(game, fireballsPool, speedMultiplier) {
		
		Attacks.BaseAttack.call(this, fireballsPool);
		
		var config = { 'minSpeed' : 80, 'maxSpeed' : 120, 'minFireballs' : 4, 'maxFireballs' : 5 };
		
		var n = game.rnd.integerInRange(config.minFireballs, config.maxFireballs);
		
		for(var i=0; i<n; i++) {
			
			var fireball = fireballsPool.pop();
			
			var x, y, velocity, rotation;
				
			velocity = game.rnd.realInRange(config.minSpeed, config.maxSpeed);
			
			x = game.rnd.integerInRange(0, game.world.width);
			
			if(x > Math.floor(game.world.width/2)) {
				rotation = -game.rnd.realInRange(Math.PI/2 + 0.5, Math.PI - 0.5);
			} else {
				rotation = -game.rnd.realInRange(0.5, Math.PI/2 - 0.5);
			}
			
			if(x == 0) {
				x = -fireball.width;
				y = game.rnd.integerInRange(Math.floor(2*game.world.height/3), game.world.height - (fireball.height)/2);
			} else if(x == game.world.width) {
				x += fireball.width;
				y = game.rnd.integerInRange(Math.floor(2*game.world.height/3), game.world.height - (fireball.height)/2);
			} else {
				y = game.height;
			}

			fireball.launch(x, y, velocity * speedMultiplier, rotation);
			
			this.fireballs.push(fireball);
		}
		
		Fireball.playAudio();
	};
	
	Attacks.Bottom.prototype = Object.create(Attacks.BaseAttack.prototype);
	
	/**
	 * Ataque lateral
	 * @class Attacks.Lateral
	 * @constructor
	 * @param {Phaser.Game} game Objeto game de phaser
	 * @param {FireballsPool} fireballsPool Pool de bolas de fuego
	 * @param {Number} speedMultiplier multiplicador de velocidad
	 */
	Attacks.Lateral = function(game, fireballsPool, speedMultiplier) {
		
		Attacks.BaseAttack.call(this, fireballsPool);
		
		var config = { 'minSpeed' : 80, 'maxSpeed' : 100, 'minFireballs' : 3, 'maxFireballs' : 4 };
		
		var n = game.rnd.integerInRange(config.minFireballs, config.maxFireballs);
		
		for(var i=0; i<n; i++) {
			
			var fireball = fireballsPool.pop();
			
			var x, y, velocity, rotation;
							
			velocity = game.rnd.realInRange(config.minSpeed, config.maxSpeed);
			
			if(game.rnd.integerInRange(0, 1) == 0) {
				x = game.world.width;
				rotation = Math.PI;
			} else {
				x = -fireball.width;
				rotation = 0;
			}
			
			y = game.rnd.integerInRange(60, game.world.height - fireball.height);
			
			fireball.launch(x, y, velocity * speedMultiplier, rotation);
			
			this.fireballs.push(fireball);
		}
		
		Fireball.playAudio();
	};
	
	Attacks.Lateral.prototype = Object.create(Attacks.BaseAttack.prototype);
	
	/**
	 * Ataque en recta desde arriba y abajo
	 * @class Attacks.Straight
	 * @constructor
	 * @param {Phaser.Game} game Objeto game de phaser
	 * @param {FireballsPool} fireballsPool Pool de bolas de fuego
	 * @param {Number} speedMultiplier multiplicador de velocidad
	 */
	Attacks.Straight = function(game, fireballsPool, speedMultiplier) {
		
		Attacks.BaseAttack.call(this, fireballsPool);
		
		var config = { 'minSpeed' : 80, 'maxSpeed' : 100, 'minFireballs' : 3, 'maxFireballs' : 4 };
		
		var n = game.rnd.integerInRange(config.minFireballs, config.maxFireballs);
		
		for(var i=0; i<n; i++) {
			
			var fireball = fireballsPool.pop();
			
			var x, y, velocity, rotation;
							
			velocity = game.rnd.realInRange(config.minSpeed, config.maxSpeed);
			
			x = game.rnd.integerInRange(0, game.world.width - fireball.width);
			
			if(game.rnd.integerInRange(0, 1) == 0) {
				y = game.height;
				rotation = -Math.PI/2;
			} else {
				y = -fireball.height;
				rotation = Math.PI/2;
			}
			
			fireball.launch(x, y, velocity * speedMultiplier, rotation);
			
			this.fireballs.push(fireball);
		}
		
		Fireball.playAudio();
	};
	
	Attacks.Straight.prototype = Object.create(Attacks.BaseAttack.prototype);
	
	/**
	 * Estrategia de ataque
	 * @class Strategy
	 * @constructor
	 * @param {Phaser.Game} game Objeto game de phaser
	 * @param {FireballsPool} fireballsPool Pool de bolas de fuego
	 * @param {Array} attacks Ataques que se pueden realizar
	 * @param {Number} speedMultiplier multiplicador de velocidad
	 */
	var Strategy = function(game, fireballsPool, attacks, speedMultiplier) {
		/**
		 * Objeto game de phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Pool de bolas de fuego
		 * @property fireballsPool
		 * @type {FireballsPool}
		 */
		this.fireballsPool = fireballsPool;
		
		/**
		 * Ataques que se pueden realizar
		 * @property attacks
		 * @type {Array}
		 */
		this.attacks = attacks;
		
		/**
		 * Multiplicador de velocidad
		 * @property speedMultiplier
		 * @type {Number}
		 */
		this.speedMultiplier = speedMultiplier;
	};
	
	Strategy.prototype = {	
		/**
		 * Crear ataque
		 * @method createAttack
		 * @return {Object} Ataque realizado
		 */
		createAttack : function() {
			var i = this.game.rnd.integerInRange(0, this.attacks.length - 1);
			
			return new Attacks[this.attacks[i]](this.game, this.fireballsPool, this.speedMultiplier);
		},
		
		/**
		 * Multiplicar velocidad
		 * @method speedMultiply
		 * @param {Number} multiplier multiplicador
		 */
		multiplySpeed : function(multiplier) {
			this.speedMultiplier = this.speedMultiplier * multiplier;
		}
	};
	
	return AttackerObjectSystem;
});
