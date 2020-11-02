'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace para audio de World
	 * @namespace
	 */
	var WorldAudio = {};
	
	/**
	 * Música
	 * @property music
	 * @type {Phaser.Audio}
	 */
	WorldAudio.music = null;
	
	/**
	 * Reproducir musica
	 * @method playMusic
	 */
	WorldAudio.playMusic = function() {
		WorldAudio.music.play();
	};
	
	/**
	 * Deterner música
	 * @method stopMusic
	 */
	WorldAudio.stopMusic = function() {
		WorldAudio.music.stop();
	};
	
	/**
	 * Cargar archivos de audio
	 * @method load
	 * @param {Phaser.Game} game
	 */
	WorldAudio.load = function(game) {
		game.load.audio('music', 'assets/audio/music.ogg');
		
		game.load.onLoadComplete.add(function() {
			WorldAudio.music = game.add.audio('music');
			WorldAudio.music.loop = true;
		});
	};
	
	return WorldAudio;
});
