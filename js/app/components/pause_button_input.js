'use strict';

define([], function() {

	/**
	 * Namespace pause button
	 * @namespace
	 */
	var PauseButtonInput = {};

	/**
	 * Add listener
	 * @param {Phaser.Game} game
	 * @param {Phaser.Sprite} sprite
	 * @param {PauseButtonInput.Listener} listener
	 */
	PauseButtonInput.addListener = function(game, sprite, listener) {
		sprite.inputEnabled = true;
		sprite.events.onInputUp.add(listener.onPause, listener);
		game.input.onDown.add(listener.onPlay, listener);
	};

	/**
	 * Input listeners
	 * @class PauseButtonInput.Listener
	 * @constructor
	 */
	PauseButtonInput.Listener = function() {};

	PauseButtonInput.Listener.prototype = {
		/**
		 * On playing
		 * @method onPlay
		 * @abstract
		 */
		onPlay : function() {},

		/**
		 * On pause
		 * @method onPause
		 * @abstract
		 */
		onPause : function() {}
	};

	return PauseButtonInput;
});
