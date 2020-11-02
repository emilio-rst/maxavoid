'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace of fireball sound
	 * @namespace
	 */
	var FireballAudio = {};

	/**
	 * Audio
	 * @property audio
	 * @type {Phaser.Audio}
	 */
	FireballAudio.audio = null;

	/**
	 * Play sound
	 * @method play
	 */
	FireballAudio.play = function() {
		FireballAudio.audio.play();
	};

	/**
	 * Load sound files
	 * @method load
	 * @param {Phaser.Game} game
	 */
	FireballAudio.load = function(game) {
		game.load.audio('big_fireball', 'assets/audio/big_fireball.ogg');
		//game.load.audio('small_fireball', 'assets/audio/small_fireball.ogg');

		game.load.onLoadComplete.add(function() {
			FireballAudio.audio = game.add.audio('big_fireball');
		});
	};

	return FireballAudio;
});
