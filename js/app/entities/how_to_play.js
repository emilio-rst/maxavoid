'use strict';

define(['phaser',
        'app/components/how_to_play_sprite',
        'app/components/how_to_play_physics',
        'app/components/single_input'], function(Phaser,
                                                 HowToPlaySprite,
                                                 HowToPlayPhysics,
                                                 SingleInput) {
	/**
	 * Como jugar
	 * @class HowToPlay
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 */
	function HowToPlay(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Físicas
		 * @property physics
		 * @type {HowToPlayPhysics.Thumb} 
		 */
		this.physics = null;
			
		HowToPlaySprite.background(this.game);		
		HowToPlaySprite.title(this.game);
		
		/*
		 * Listener de eventos
		 */
		var listener = new SingleInput.Listener();
		listener.onInput = this.play.bind(this);
		
		/*
		 * Integración de crosswalk en android 
		 */
		if(game.device.crosswalk) {	
			/**
			 * Objeto thumb
			 * @property thumb
			 * @type {HowToPlaySprite.Thumb} 
			 */
			this.thumb = new HowToPlaySprite.Thumb(this.game);
			this.thumb.listener = new HowToPlaySprite.Listener();
			
			this.physics = new HowToPlayPhysics.Thumb(this.game, this.thumb.phaserSprite);
			this.physics.listener = new HowToPlayPhysics.Listener();
			this.physics.listener.onSwipeComplete = this.onSwipeComplete.bind(this);
			
			/**
			 * Texto descriptivo
			 * @property description
			 * @type {Phaser.Text}
			 */
			this.description = HowToPlaySprite.description(this.game);
			
			this.swipe();
			
			HowToPlaySprite.touchStart(this.game);
			
			/**
			 * Entrada tactil
			 * @property inputTouch
			 * @type {SingleInput.Touch}
			 */
			this.inputTouch = new SingleInput.Touch(this.game);
			this.inputTouch.listener = listener;
		} else {
			HowToPlaySprite.arrowsKeys(this.game);
			HowToPlaySprite.arrowsStart(this.game);
			
			/**
			 * Entrada de teclado
			 * @property inputKeyboard
			 * @type {SingleInput.Keyboard}
			 */
			this.inputKeyboard = new SingleInput.Keyboard(this.game);
			this.inputKeyboard.listener = listener;
		}
	}
	
	HowToPlay.prototype = {
		/**
		 * Gesto Swipe
		 * @method swipe
		 */
		swipe : function() {
			this.thumb.touch();
			this.thumb.listener.onTouchComplete = this.physics.swipe.bind(this.physics);
			this.description.text = "SWIPE TO MOVE";
		},
		
		onSwipeComplete : function() {
			this.thumb.up();
			this.description.text = "KEEP IN MOVING";
			
			this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
				this.description.text = "TAP TO STOP";
				this.thumb.tap();
				
				this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
					this.physics.restart();
					this.description.text = "";
					
					this.swipe();
				}, this);
			}, this);
		},
		
		/**
		 * Al actualizar
		 * @method update
		 */
		update : function() {
			if(this.physics != null) {
				this.physics.update();
			}
		},
		
		/**
		 * Iniciar juego
		 * @method play
		 */
		play : function() {
			this.game.state.start('level-master');
		}
	};
	
	/**
	 * Cargar imagenes
	 * @method load
	 * @param {Phaser.Game} game
	 */
	HowToPlay.load = HowToPlaySprite.load;

	return HowToPlay;
});
