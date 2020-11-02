'use strict';

define([], function() {
	/**
	 * Namespace Game over sound
	 * @namespace
	 */
	var GameOverAudio = {};

	/**
	 * Audio
	 * @property audio
	 * @type {Phaser.Audio}
	 */
	GameOverAudio.audio = null;

	/**
	 * Play sound
	 * @method play
	 */
	GameOverAudio.play = function() {
		GameOverAudio.audio.play();
	};

	/**
	 * Load sound
	 * @method load
	 * @param {Phaser.Game} game
	 */
	GameOverAudio.load = function(game) {
		game.load.audio('game_over', 'assets/audio/game_over.ogg');

		game.load.onLoadComplete.add(function() {
			GameOverAudio.audio = game.add.audio('game_over');
		});
	};

	return GameOverAudio;
});
