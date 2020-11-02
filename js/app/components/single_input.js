'use strict';

define(['phaser'], function(Phaser) {
	
	/**
	 * Namespace para dispositivos de entrada simple
	 * @namespace
	 */
	var SingleInput = {};
	
	/**
	 * Dispositivo de entrada teclado
	 * @class SingleInput.Keyboard
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	SingleInput.Keyboard = function(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Objeto listener de eventos de entrada
		 * @property listener
		 * @type {SingleInput.Listener} 
		 */
		this.listener = null;
		
		/* Capturar eventos de teclado */
		this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.onDownArrowKey, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.onDownArrowKey, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.onDownArrowKey, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.onDownArrowKey, this);
	}
	
	SingleInput.Keyboard.prototype = {
		/**
		 * Evento al presionar teclas de flechas
		 * @method onDownArrowKey
		 * @param {Object} e objeto evento
		 */
		onDownArrowKey : function(e) {
			if(this.listener !== null) this.listener.onInput();
		}
	};
	
	/**
	 * Dispositivo de entrada pantalla tactil para el jugador
	 * 
	 * @class SingleInput.Touch
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	SingleInput.Touch = function(game) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/**
		 * Objeto listener de eventos de entrada
		 * @property listener
		 * @type {SingleInput.Listener}
		 */
		this.listener = null;
		
		/* Eventos de pantalla tactil */
		this.game.input.onTap.add(this.onTap, this);
	};
	
	SingleInput.Touch.prototype = {
		/**
		 * Al presionar pantalla
		 * @method onTap
		 */
		onTap : function() {
			if(this.listener !== null) this.listener.onInput();
		}
	};
	
	/**
	 * Listener de eventos de entrada
	 * @class SingleInput.Listener
	 * @constructor
	 */
	SingleInput.Listener = function() {};
	
	SingleInput.Listener.prototype = {
		/**
		 * Se realizo un evento de entrada
		 * @method onInput
		 * @abstract
		 */
		onInput: function() {}
	};
	
	return SingleInput;
});
