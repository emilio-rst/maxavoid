'use strict';

define(['app/components/fireball_sprite',
        'app/components/fireball_physics',
        'app/components/fireball_audio'], function(FireballSprite, 
                                                   FireballPhysics,
                                                   FireballAudio) {
	/**
	 * Fireball
	 * @class Fireball
	 * @constructor
	 * @param {Phaser.Game} game
	 * @param {number} x
	 * @param {number} y
	 */
	function Fireball(game, x, y) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Sprite de fireball
		 * @property sprite
		 * @type {FireballSprite.Sprite}
		 */
		this.sprite = new FireballSprite.Sprite(this.game, x, y);
		
		/**
		 * Físicas de fireball
		 * @property physics
		 * @type {FireballPhysics}
		 */
		this.physics = new FireballPhysics(this.game, this.sprite.phaserSprite);
	}

	Fireball.prototype = {
		/**
		 * Lanzar bola de fuego
		 * @method launch
		 * @param {number} x Coordenada inicial x
		 * @param {number} y Coordenada inicial y
		 * @param {number} velocity velocidad de desplazamiento
		 * @param {number} rotation ángulo de rotación en radianes
		 */
		launch : function(x, y, velocity, rotation) {
			this.physics.launch(x, y, velocity, rotation);
		},
				
		/**
		 * Asigna grupo de colision
		 * @method setCollisionGroup
		 * @param {Phaser.Physics.CollisionGroup | array} group grupo de colision
		 */
		setCollisionGroup : function(collisionGroup) {
			this.physics.setCollisionGroup(collisionGroup);
		},
		
		/**
		 * Verifica si alcanza el final del desplazamiento en el área de juego
		 * @method checkOnShifEnd
		 * @return {boolean}
		 */
		checkOnShiftEnd : function() {
			return this.physics.checkOnShiftEnd();
		},
		
		/**
		 * Destruir
		 * @method destroy
		 */
		destroy : function() {
			this.sprite.destroy();
		},
		
		/**
		 * Multiplicar velocidad
		 * @method speedMultiply
		 * @param {Number} multiplier multiplicador
		 */
		multiplySpeed : function(multiplier) {
			this.physics.multiplySpeed(multiplier);
		},
		
		/**
		 * Mostrar bola de fuego
		 * @method show
		 */
		show : function() {
			this.sprite.setVisible(true);
			this.sprite.bringToTop();
			this.physics.enableBody();
		},
		
		/**
		 * Ocultar bola de fuego
		 * @method hide
		 */
		hide : function() {
			this.sprite.setVisible(false);
			this.physics.disableBody();
		}
	};
	
	/**
	 * Ancho
	 * @property width
	 * @type {number}
	 */
	Object.defineProperty(Fireball.prototype, 'width', {
		get : function() {
			return this.sprite.width;
		}
	});
	
	/**
	 * Alto
	 * @property height
	 * @type {number}
	 */
	Object.defineProperty(Fireball.prototype, 'height', {
		get : function() {
			return this.sprite.height;
		}
	});
	
	/**
	 * Sprite de phaser
	 * @property phaserSprite
	 * @type {Phaser.Sprite}
	 */
	Object.defineProperty(Fireball.prototype, 'phaserSprite', {
		get : function() {
			return this.sprite.phaserSprite;
		}
	});
	
	/**
	 * Cargar atlas de imagenes y sonido
	 * @method load
	 * @param {Phaser.Game} game
	 */
	Fireball.load = function(game) {
		FireballSprite.load(game);
		FireballAudio.load(game);
	};
	
	/**
	 * Reproducir audio
	 * @method playAudio
	 */
	Fireball.playAudio = function() {
		FireballAudio.play();
	};
	
	return Fireball;
});
