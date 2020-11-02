'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace player sprite
	 * @namespace
	 */
	var PlayerSprite = {};

	/**
	 * Player sprite
	 *
	 * @class PlayerSprite.Sprite
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {Number} x
	 * @param {Number} y
	 */
	PlayerSprite.Sprite = function (game, x, y) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Sprite
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(x, y);

		/**
		 * Event listener
		 * @property listener
		 * @type {PlayerSprite.Listener}
		 */
		this.listener = null;

		/**
		 * Animation groups
		 * @property groups
		 * @type {Object}
		 */
		this.groups = {};

		for(var group in groups) {
			if(groups.hasOwnProperty(group)) {
				this.groups[group] = new groups[group](this);
			}
		}

		/**
		 * Animation groups for textures
		 * @property active
		 * @type {String}
		 */
		this.active = null;
	};

	/**
	 * Play
	 * @method play
	 * @param {String} group
	 * @param {String} animation
	 */
	PlayerSprite.Sprite.prototype.play = function(group, animation) {
		if(this.active != group) {
			this.groups[group].loadTexture();
			this.active = group;
		}

		this.groups[group][animation]();
	};

	/*
	 * Animation groups
	 */
	var groups = {};

	/**
	 * Default animation grups
	 * @class animations.Player
	 * @constructor
	 * @param {PlayerSprite} sprite
	 */
	groups.Player = function(sprite) {
		/**
		 * Sprite
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.sprite = sprite;

		this.loadTexture();

		this.addAnimations();
	};

	groups.Player.prototype = {
		/**
		 * Load texture
		 * @method loadTexture
		 */
		loadTexture : function() {
			this.sprite.phaserSprite.loadTexture('player');
		},

		/**
		 * Add animation
		 * @method addAnimations
		 */
		addAnimations : function() {
			this.sprite.phaserSprite.animations.add('stand_left', Phaser.Animation.generateFrameNames('stand_left_', 1, 8, '', 2), 10, true, false);
			this.sprite.phaserSprite.animations.add('stand_right', Phaser.Animation.generateFrameNames('stand_right_', 1, 8, '', 2), 10, true, false);

			var anim;

			this.sprite.phaserSprite.animations.add('loop_left', Phaser.Animation.generateFrameNames('loop_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_left', Phaser.Animation.generateFrameNames('begin_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopLeft, this);

			this.sprite.phaserSprite.animations.add('loop_right', Phaser.Animation.generateFrameNames('loop_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_right', Phaser.Animation.generateFrameNames('begin_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopRight, this);

			this.sprite.phaserSprite.animations.add('loop_up_left', Phaser.Animation.generateFrameNames('loop_up_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_up_left', Phaser.Animation.generateFrameNames('begin_up_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopUpLeft, this);

			this.sprite.phaserSprite.animations.add('loop_up_right', Phaser.Animation.generateFrameNames('loop_up_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_up_right', Phaser.Animation.generateFrameNames('begin_up_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopUpRight, this);

			this.sprite.phaserSprite.animations.add('loop_down_left', Phaser.Animation.generateFrameNames('loop_down_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_down_left', Phaser.Animation.generateFrameNames('begin_down_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopDownLeft, this);

			this.sprite.phaserSprite.animations.add('loop_down_right', Phaser.Animation.generateFrameNames('loop_down_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_down_right', Phaser.Animation.generateFrameNames('begin_down_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopDownRight, this);

			this.sprite.phaserSprite.animations.add('loop_fall_left', Phaser.Animation.generateFrameNames('loop_fall_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_fall_left', Phaser.Animation.generateFrameNames('begin_fall_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopFallLeft, this);

			this.sprite.phaserSprite.animations.add('loop_fall_right', Phaser.Animation.generateFrameNames('loop_fall_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('begin_fall_right', Phaser.Animation.generateFrameNames('begin_fall_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopFallRight, this);
		},

		/**
		 * Play loop left
		 * @method loopLeft
		 */
		loopLeft : function() {
			this.sprite.phaserSprite.animations.play('loop_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopLeft();
		},

		/**
		 * Play start left
		 * @method left
		 */
		left : function() {
			this.sprite.phaserSprite.animations.play('begin_left');
		},

		/**
		 * Play loop right
		 * @method loopRight
		 */
		loopRight : function() {
			this.sprite.phaserSprite.animations.play('loop_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopRight();
		},

		/**
		 * Play start right
		 * @method right
		 */
		right : function() {
			this.sprite.phaserSprite.animations.play('begin_right');
		},

		/**
		 * Play stand left
		 * @method standLeft
		 */
		standLeft : function() {
			this.sprite.phaserSprite.animations.play('stand_left');
		},

		/**
		 * Play stand right
		 * @method standRight
		 */
		standRight : function() {
			this.sprite.phaserSprite.animations.play('stand_right');
		},

		/**
		 * Play loop up left
		 * @method loopUpLeft
		 */
		loopUpLeft : function() {
			this.sprite.phaserSprite.animations.play('loop_up_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopUp();
		},

		/**
		 * Play start up left
		 * @method upLeft
		 */
		upLeft : function() {
			this.sprite.phaserSprite.animations.play('begin_up_left');
		},

		/**
		 *  Play loop up left
		 * @method loopUpRight
		 */
		loopUpRight : function() {
			this.sprite.phaserSprite.animations.play('loop_up_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopUp();
		},

		/**
		 *  Play loop right
		 * @method upRight
		 */
		upRight : function() {
			this.sprite.phaserSprite.animations.play('begin_up_right');
		},

		/**
		 * Play loop down left
		 * @method loopDownLeft
		 */
		loopDownLeft : function() {
			this.sprite.phaserSprite.animations.play('loop_down_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopDown();
		},

		/**
		 * Play down left
		 * @method downLeft
		 */
		downLeft : function() {
			this.sprite.phaserSprite.animations.play('begin_down_left');
		},

		/**
		 * Animación ciclica hacia abajo desde la derecha
		 * @method loopDownRight
		 */
		loopDownRight : function() {
			this.sprite.phaserSprite.animations.play('loop_down_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopDown();
		},

		/**
		 * Animación de movimiento hacia abajo desde la derecha
		 * @method downRight
		 */
		downRight : function() {
			this.sprite.phaserSprite.animations.play('begin_down_right');
		},

		/**
		 * Animación ciclica hacia abajo desde la izquierda
		 * @method loopFallLeft
		 */
		loopFallLeft : function() {
			this.sprite.phaserSprite.animations.play('loop_fall_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopFall();
		},

		/**
		 * Animación de movimiento hacia abajo desde la izquierda
		 * @method fallLeft
		 */
		fallLeft : function() {
			this.sprite.phaserSprite.animations.play('begin_fall_left');
		},

		/**
		 * Animación ciclica hacia abajo desde la derecha
		 * @method loopFallRight
		 */
		loopFallRight : function() {
			this.sprite.phaserSprite.animations.play('loop_fall_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopFall();
		},

		/**
		 * Animación de movimiento hacia abajo desde la derecha
		 * @method fallRight
		 */
		fallRight : function() {
			this.sprite.phaserSprite.animations.play('begin_fall_right');
		}
	};

	/**
	 * Animaciones de ultra velocidad para el jugador
	 * @class animations.Player
	 * @constructor
	 * @param {PlayerSprite} sprite
	 */
	groups.UltraSpeed = function(sprite) {
		/**
		 * Sprite de Phaser
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.sprite = sprite;

		this.loadTexture();

		this.addAnimations();
	};

	groups.UltraSpeed.prototype = {
		/**
		 * Cargar textura
		 * @method loadTexture
		 */
		loadTexture : function() {
			this.sprite.phaserSprite.loadTexture('ultra_speed');
		},

		/**
		 * Adiciona las animaciones al sprite de Phaser
		 * @method addAnimations
		 */
		addAnimations : function() {
			this.sprite.phaserSprite.animations.add('ultra_speed_stand_left', Phaser.Animation.generateFrameNames('stand_left_', 1, 8, '', 2), 10, true, false);
			this.sprite.phaserSprite.animations.add('ultra_speed_stand_right', Phaser.Animation.generateFrameNames('stand_right_', 1, 8, '', 2), 10, true, false);

			var anim;

			this.sprite.phaserSprite.animations.add('ultra_speed_loop_left', Phaser.Animation.generateFrameNames('loop_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('ultra_speed_begin_left', Phaser.Animation.generateFrameNames('begin_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopLeft, this);

			this.sprite.phaserSprite.animations.add('ultra_speed_loop_right', Phaser.Animation.generateFrameNames('loop_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('ultra_speed_begin_right', Phaser.Animation.generateFrameNames('begin_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopRight, this);

			this.sprite.phaserSprite.animations.add('ultra_speed_loop_up_left', Phaser.Animation.generateFrameNames('loop_up_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('ultra_speed_begin_up_left', Phaser.Animation.generateFrameNames('begin_up_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopUpLeft, this);

			this.sprite.phaserSprite.animations.add('ultra_speed_loop_up_right', Phaser.Animation.generateFrameNames('loop_up_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('ultra_speed_begin_up_right', Phaser.Animation.generateFrameNames('begin_up_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopUpRight, this);

			this.sprite.phaserSprite.animations.add('ultra_speed_loop_down_left', Phaser.Animation.generateFrameNames('loop_down_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('ultra_speed_begin_down_left', Phaser.Animation.generateFrameNames('begin_down_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopDownLeft, this);

			this.sprite.phaserSprite.animations.add('ultra_speed_loop_down_right', Phaser.Animation.generateFrameNames('loop_down_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('ultra_speed_begin_down_right', Phaser.Animation.generateFrameNames('begin_down_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopDownRight, this);
		},

		/**
		 * Animación ciclica a la izquierda
		 * @method loopLeft
		 */
		loopLeft : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_loop_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopLeft();
		},

		/**
		 * Animación de movimiento a la izquierda
		 * @method left
		 */
		left : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_begin_left');
		},

		/**
		 * Animación ciclica a la derecha
		 * @method loopRight
		 */
		loopRight : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_loop_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopRight();
		},

		/**
		 * Animación de movimiento a la derecha
		 * @method right
		 */
		right : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_begin_right');
		},

		/**
		 * Animación estacionaria a la izquierda
		 * @method standLeft
		 */
		standLeft : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_stand_left');
		},

		/**
		 * Animación estacionaria a la derecha
		 * @method standRight
		 */
		standRight : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_stand_right');
		},

		/**
		 * Animación ciclica hacia arriba desde la izquierda
		 * @method loopUpLeft
		 */
		loopUpLeft : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_loop_up_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopUp();
		},

		/**
		 * Animación de movimiento hacia arriba desde la izquierda
		 * @method upLeft
		 */
		upLeft : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_begin_up_left');
		},

		/**
		 * Animación ciclica hacia arriba desde la derecha
		 * @method loopUpRight
		 */
		loopUpRight : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_loop_up_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopUp();
		},

		/**
		 * Animación de movimiento hacia arriba desde la derecha
		 * @method upRight
		 */
		upRight : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_begin_up_right');
		},

		/**
		 * Animación ciclica hacia abajo desde la izquierda
		 * @method loopDownLeft
		 */
		loopDownLeft : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_loop_down_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopDown();
		},

		/**
		 * Animación de movimiento hacia abajo desde la izquierda
		 * @method downLeft
		 */
		downLeft : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_begin_down_left');
		},

		/**
		 * Animación ciclica hacia abajo desde la derecha
		 * @method loopDownRight
		 */
		loopDownRight : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_loop_down_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopDown();
		},

		/**
		 * Animación de movimiento hacia abajo desde la derecha
		 * @method downRight
		 */
		downRight : function() {
			this.sprite.phaserSprite.animations.play('ultra_speed_begin_down_right');
		}
	};

	/**
	 * Animaciones de invulnerabilidad para el jugador
	 * @class animations.Player
	 * @constructor
	 * @param {PlayerSprite} sprite
	 */
	groups.Invulnerability = function(sprite) {
		/**
		 * Sprite de Phaser
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.sprite = sprite;

		this.loadTexture();

		this.addAnimations();
	};

	groups.Invulnerability.prototype = {
		/**
		 * Cargar textura
		 * @method loadTexture
		 */
		loadTexture : function() {
			this.sprite.phaserSprite.loadTexture('invulnerability');
		},

		/**
		 * Adiciona las animaciones al sprite de Phaser
		 * @method addAnimations
		 */
		addAnimations : function() {
			this.sprite.phaserSprite.animations.add('invulnerability_stand_left', Phaser.Animation.generateFrameNames('stand_left_', 1, 8, '', 2), 10, true, false);
			this.sprite.phaserSprite.animations.add('invulnerability_stand_right', Phaser.Animation.generateFrameNames('stand_right_', 1, 8, '', 2), 10, true, false);

			var anim;

			this.sprite.phaserSprite.animations.add('invulnerability_loop_left', Phaser.Animation.generateFrameNames('loop_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('invulnerability_begin_left', Phaser.Animation.generateFrameNames('begin_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopLeft, this);

			this.sprite.phaserSprite.animations.add('invulnerability_loop_right', Phaser.Animation.generateFrameNames('loop_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('invulnerability_begin_right', Phaser.Animation.generateFrameNames('begin_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopRight, this);

			this.sprite.phaserSprite.animations.add('invulnerability_loop_up_left', Phaser.Animation.generateFrameNames('loop_up_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('invulnerability_begin_up_left', Phaser.Animation.generateFrameNames('begin_up_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopUpLeft, this);

			this.sprite.phaserSprite.animations.add('invulnerability_loop_up_right', Phaser.Animation.generateFrameNames('loop_up_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('invulnerability_begin_up_right', Phaser.Animation.generateFrameNames('begin_up_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopUpRight, this);

			this.sprite.phaserSprite.animations.add('invulnerability_loop_down_left', Phaser.Animation.generateFrameNames('loop_down_left_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('invulnerability_begin_down_left', Phaser.Animation.generateFrameNames('begin_down_left_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopDownLeft, this);

			this.sprite.phaserSprite.animations.add('invulnerability_loop_down_right', Phaser.Animation.generateFrameNames('loop_down_right_', 1, 6, '', 2), 5, true, false);
			anim = this.sprite.phaserSprite.animations.add('invulnerability_begin_down_right', Phaser.Animation.generateFrameNames('begin_down_right_', 1, 5, '', 2), 40, false, false);
			anim.onComplete.add(this.loopDownRight, this);
		},

		/**
		 * Animación ciclica a la izquierda
		 * @method loopLeft
		 */
		loopLeft : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_loop_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopLeft();
		},

		/**
		 * Animación de movimiento a la izquierda
		 * @method left
		 */
		left : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_begin_left');
		},

		/**
		 * Animación ciclica a la derecha
		 * @method loopRight
		 */
		loopRight : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_loop_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopRight();
		},

		/**
		 * Animación de movimiento a la derecha
		 * @method right
		 */
		right : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_begin_right');
		},

		/**
		 * Animación estacionaria a la izquierda
		 * @method standLeft
		 */
		standLeft : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_stand_left');
		},

		/**
		 * Animación estacionaria a la derecha
		 * @method standRight
		 */
		standRight : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_stand_right');
		},

		/**
		 * Animación ciclica hacia arriba desde la izquierda
		 * @method loopUpLeft
		 */
		loopUpLeft : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_loop_up_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopUp();
		},

		/**
		 * Animación de movimiento hacia arriba desde la izquierda
		 * @method upLeft
		 */
		upLeft : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_begin_up_left');
		},

		/**
		 * Animación ciclica hacia arriba desde la derecha
		 * @method loopUpRight
		 */
		loopUpRight : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_loop_up_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopUp();
		},

		/**
		 * Animación de movimiento hacia arriba desde la derecha
		 * @method upRight
		 */
		upRight : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_begin_up_right');
		},

		/**
		 * Animación ciclica hacia abajo desde la izquierda
		 * @method loopDownLeft
		 */
		loopDownLeft : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_loop_down_left');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopDown();
		},

		/**
		 * Animación de movimiento hacia abajo desde la izquierda
		 * @method downLeft
		 */
		downLeft : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_begin_down_left');
		},

		/**
		 * Animación ciclica hacia abajo desde la derecha
		 * @method loopDownRight
		 */
		loopDownRight : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_loop_down_right');
			if(this.sprite.listener !== null) this.sprite.listener.onLoopDown();
		},

		/**
		 * Animación de movimiento hacia abajo desde la derecha
		 * @method downRight
		 */
		downRight : function() {
			this.sprite.phaserSprite.animations.play('invulnerability_begin_down_right');
		}
	};

	/**
	 * Listener de eventos de sprite del jugador
	 *
	 * @class PlayerSprite.Listener
	 * @constructor
	 * @abstract
	 */
	PlayerSprite.Listener = function() {};

	PlayerSprite.Listener.prototype = {
		/**
		 * Inicia la animación ciclo de movimiento a la izquierda
		 * @method onLoopLeft
		 * @abstract
		 */
		onLoopLeft : function() {},

		/**
		 * Inicia la animación ciclo de movimiento a la derecha
		 * @method onLoopRight
		 * @abstract
		 */
		onLoopRight : function() {},

		/**
		 * Inicia la animación ciclo de movimiento hacia abajo
		 * @method onLoopDown
		 * @abstract
		 */
		onLoopDown : function() {},

		/**
		 * Inicia la animación ciclo de movimiento hacia arriba
		 * @method onLoopUp
		 * @abstract
		 */
		onLoopUp : function() {},

		/**
		 * Inicia la animación ciclo de movimiento hacia abajo
		 * @method onLoopFall
		 * @abstract
		 */
		onLoopFall : function() {}
	};

	/**
	 * Cargar atlas de imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	PlayerSprite.load= function(game) {
		game.load.atlasJSONHash('player', 'assets/sprites/player.png', 'assets/sprites/player.json');
		game.load.atlasJSONHash('ultra_speed', 'assets/sprites/ultra_speed.png', 'assets/sprites/ultra_speed.json');
		game.load.atlasJSONHash('invulnerability', 'assets/sprites/invulnerability.png', 'assets/sprites/invulnerability.json');
	};

	return PlayerSprite;
});
