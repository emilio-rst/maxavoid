'use strict';

define([], function() {
	/**
	 * Namespace for level audio
	 * @namespace
	 */
	var LevelAudio = {};

	/**
	 * Level audio
	 * @property audio
	 * @type {Phaser.Audio}
	 */
	LevelAudio.audio = null;

	/**
	 * Play sound go
	 * @method playGo
	 */
	LevelAudio.playGo = function() {
		LevelAudio.audio.play();
	};

	/**
	 * Load files
	 * @method load
	 * @param {Phaser.Game} game
	 */
	LevelAudio.load = function(game) {
		game.load.audio('lets_go', 'assets/audio/lets_go.ogg');

		game.load.onLoadComplete.add(function() {
			LevelAudio.audio = game.add.audio('lets_go');
		});
	};

	return LevelAudio;
});
