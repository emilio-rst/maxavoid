'use strict';

define(['app/components/player_sprite', 
        'app/components/player_physics',
        'app/components/player_input',
        'app/components/player_audio',
        'app/components/player_powers'], function(PlayerSprite, 
                                                  PlayerPhysics, 
                                                  PlayerInput,
                                                  PlayerAudio,
                                                  PlayerPowers) {
	
	/**
	 * Jugador
	 * 
	 * @class Player
	 * @constructor
	 * @param {Phaser.Game} game Objeto game de phaser
	 * @param {FuelSystem} fuelSystem  Sistema de combustible
	 * @param {ScoreSystem} scoreSystem Sistema de puntación
	 * @param {GameStateSystem} gameStateSystem Sistema de Estado de Juego
	 * @param {AttackerObjectSystem} attackerObjectSystem Sistema de Objetos Atacantes
	 * @param {LevelSystem} levelSystem Sistema de niveles
	 * @param {PowersSystem} powersSystem Sistema de poderes
	 */
	function Player(game, fuelSystem, scoreSystem, gameStateSystem, attackerObjectSystem, levelSystem, powersSystem) {
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
		fuelSystem.player = this;
		
		/*
		 * Se carga en el ScoreSystem
		 */
		scoreSystem.player = this;
		
		/*
		 * Se carga en el LevelSystem
		 */
		levelSystem.player = this;
		
		/*
		 * Se carga en el PowersSystem
		 */
		powersSystem.player = this;
				
		/**
		 * Sistema de estado de juego
		 * @property gameStateSystem
		 * @type {GameStateSystem}
		 */
		this.gameStateSystem = gameStateSystem;
		
		/**
		 * Sistema de niveles
		 * @property levelSystem
		 * @type {levelSystem}
		 */
		this.levelSystem = levelSystem;
		
		/**
		 * Sistema de objetos atacantes
		 * @property attackerObjectSystem
		 * @type {attackerObjectSystem}
		 */
		this.attackerObjectSystem = attackerObjectSystem;
		
		/**
		 * Sistema de poderes
		 * @property powersSystem
		 * @type {powersSystem}
		 */
		this.powersSystem = powersSystem;
		
		/**
		 * Indica si el jugador está vivo
		 * @property alive
		 * @type {boolean}
		 */
		this.alive = true;
		
		/**
		 * Dirección actual en eje horizontal
		 * @property currentDirection
		 * @type {String}
		 */
		this.currentDirection = 'Right';
		
		/**
		 * Sprite del jugador
		 * @property sprite
		 * @type {PlayerSprite.Sprite}
		 */
		this.sprite = new PlayerSprite.Sprite(this.game, this.game.world.centerX, this.game.world.centerY);
		
		/**
		 * Físicas del jugador
		 * @property physics
		 * @type {PlayerPhysics}
		 */
		this.physics = new PlayerPhysics(this.game, this.sprite.phaserSprite, this.levelSystem);
		
		/*
		 * Se carga en el AttackerObjectSystem
		 */
		attackerObjectSystem.setPlayer(this);
		
		/*
		 * Listener de eventos del sprite
		 */
		this.sprite.listener = new PlayerSprite.Listener();
		this.sprite.listener.onLoopLeft = this.physics.moveLeft.bind(this.physics);
		this.sprite.listener.onLoopRight = this.physics.moveRight.bind(this.physics);
		this.sprite.listener.onLoopDown = this.physics.moveDown.bind(this.physics);
		this.sprite.listener.onLoopUp = this.physics.moveUp.bind(this.physics);
		this.sprite.listener.onLoopFall = this.physics.fall.bind(this.physics);
		
		/*
		 * Listener de eventos de entrada
		 */ 
		var listener = new PlayerInput.Listener();
		listener.onMoveLeft = this.moveLeft.bind(this);
		listener.onMoveRight = this.moveRight.bind(this);
		listener.onMoveUp = this.moveUp.bind(this);
		listener.onMoveDown = this.moveDown.bind(this);
		listener.onStand = this.stand.bind(this);
		
		/**
		 * Entrada de teclado
		 * @property inputKeyboard
		 * @type {PlayerInput.Keyboard}
		 */
		this.inputKeyboard = new PlayerInput.Keyboard(this.game);
		this.inputKeyboard.listener = listener;
		
		/**
		 * Entrada de pantalla tactil
		 * @property inputTouch
		 * @type {PlayerInput.Touch}
		 */
		this.inputTouch = new PlayerInput.Touch(this.game);
		this.inputTouch.listener = listener;
		
		/**
		 * Movimiento actual
		 * @property activeMove
		 * @type {String}
		 */
		this.activeMove = null;
		
		/**
		 * Poder activo
		 * @property activePower
		 * @type {Object}
		 */
		this.activePower = null;
		
		/**
		 * Grupo de animaciones activo
		 * @property animationGroup
		 * @type {String}
		 */
		this.activeAnimationGroup = 'Player';
		
		/* Inicia en estado estacionario */
		this.stand();
	}

	Player.prototype = {
		/**
		 * Posición estacionaria
		 * @method stand
		 */
		stand : function() {
			if(this.alive == false) return false;
			
			this.activeMove = 'Stand';
			
			this.sprite.play(this.activeAnimationGroup, 'stand' + this.currentDirection);
			
			this.physics.stand();
		},
		
		/**
		 * Iniciar movimiento a la derecha
		 * @method moveRight
		 */
		moveRight : function() {
			if(this.alive == false || this.activeMove == 'Right') return false;
			
			this.activeMove = 'Right';
			this.currentDirection = 'Right';
			this.physics.stand();
			this.sprite.play(this.activeAnimationGroup, 'right');
		},

		/**
		 * Mover a la izquierda
		 * @method moveLeft
		 */
		moveLeft : function() {
			if(this.alive == false || this.activeMove == 'Left') return false;
			
			this.activeMove = 'Left';
			this.currentDirection = 'Left';
			this.physics.stand();
			this.sprite.play(this.activeAnimationGroup, 'left');
		},
		
		/**
		 * Mover hacia arriba
		 * @method moveUp
		 */
		moveUp : function() {
			if(this.alive == false || this.activeMove == 'Up') return false;
			
			this.activeMove = 'Up';
			
			this.physics.stand();
			
			this.sprite.play(this.activeAnimationGroup, 'up' + this.currentDirection);
		},
		
		/**
		 * Mover hacia abajo
		 * @method moveDown
		 */
		moveDown : function() {
			if(this.alive == false || this.activeMove == 'Down') return false;
			
			this.activeMove = 'Down';
			
			this.physics.stand();
			
			this.sprite.play(this.activeAnimationGroup, 'down' + this.currentDirection);
		},
		
		/**
		 * Morir
		 * @method fall
		 */
		die : function() {
			this.alive = false;
			this.activeMove = null;
			
			this.powersSystem.disableActivePower();
			
			this.sprite.play('Player', 'fall' + this.currentDirection);
			
			this.gameStateSystem.gameOver();
		},
		
		/**
		 * Verifica si se solapa con otro sprite
		 * @method checkOverlap
		 * @param {Phaser.Sprite} sprite
		 * @return boolean
		 */
		checkOverlap : function(sprite) {
			return this.physics.overlap(sprite);
		},
		
		/**
		 * Colision
		 * @method collides
		 * @param {Phaser.Physics.CollisionGroup | array} group grupo de colision
		 * @param {function} [callback] retrollamada al colisionar
		 * @param {object} [callbackContext] contexto de retrollamada
		 */
		collides : function(callback, callbackContext) {
			this.physics.collides(callback, callbackContext);
		},
		
		/**
		 * Reproducir nuevamente animacion de movimiento
		 * @method replayMoveAnimation
		 */
		replayMoveAnimation : function() {
			if(this.activeMove == 'Left' || this.activeMove == 'Right') {
				this.sprite.play(this.activeAnimationGroup, 'loop' + this.activeMove);
			} else if(this.activeMove == 'Up' || this.activeMove == 'Down') {
				this.sprite.play(this.activeAnimationGroup, 'loop' + this.activeMove + this.currentDirection);
			} else {
				this.sprite.play(this.activeAnimationGroup, 'stand' + this.currentDirection);
			}
		},
		
		/**
		 * Habilitar ultra velocidad
		 * @method enableUltraSpeed
		 */
		enableUltraSpeed : function() {
			this.activePower = new PlayerPowers.UltraSpeed(this.game, this.powersSystem, this.attackerObjectSystem);
			this.activePower.enable();
			this.activeAnimationGroup = 'UltraSpeed';
			this.replayMoveAnimation();
		},
		
		/**
		 * Habilitar invulnerabilidad
		 * @method enableInvulnerability
		 */
		enableInvulnerability : function() {
			this.activePower = new PlayerPowers.Invulnerability(this.game, this.powersSystem, this);
			this.activePower.enable();
			this.activeAnimationGroup = 'Invulnerability';
			this.replayMoveAnimation();
		},
		
		/**
		 * Deshabilitar poder activo
		 * @method disableActivePower
		 */
		disableActivePower : function() {
			PlayerAudio.stopPowerMusic();
			this.activePower.disable();
			this.activePower = null;
			this.activeAnimationGroup = 'Player';
			this.replayMoveAnimation();
		},
		
		/**
		 * Verifica si hay un poder activo
		 * @method existsActivePower
		 * @return {Boolean}
		 */
		existsActivePower : function() {
			return this.activePower != null;
		},
		
		/**
		 * Habilitar o deshabilitar colisiones
		 * @method setCollision
		 * @param {Boolean} value
		 */
		setCollision : function(value) {
			this.physics.setCollision(value);
		}
	};
	
	/**
	 * Sprite de phaser
	 * @property phaserSprite
	 * @type {Phaser.Sprite}
	 */
	Object.defineProperty(Player.prototype, 'phaserSprite', {
		get : function() {
			return this.sprite.phaserSprite;
		}
	});
	
	/**
	 * Cargar atlas de imagenes y audio
	 * @method load
	 * @param {Phaser.Game} game
	 */
	Player.load = function(game) {
		PlayerSprite.load(game);
		PlayerAudio.load(game);
	};
	
	/**
	 * Reproducir audio de recojer moneda
	 * @method audioCollectCoin
	 */
	Player.audioCollectCoin = PlayerAudio.collectCoin;
	
	/**
	 * Reproducir audio de recojer item
	 * @method audioCollect
	 */
	Player.audioCollect = PlayerAudio.collect;
	
	/**
	 * Reproducir música de poder
	 * @methos playPowerMusic
	 */
	Player.playPowerMusic = PlayerAudio.playPowerMusic;
	
	/**
	 * Detener música de poder
	 * @methos stopPowerMusic
	 */
	Player.stopPowerMusic = PlayerAudio.stopPowerMusic;
	
	return Player;
});
