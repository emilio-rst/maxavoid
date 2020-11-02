'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Namespace para audio de Player
	 * @namespace
	 */
	var PlayerAudio = {};

	/**
	 * Collect coin sound
	 * @property money
	 * @type {Phaser.Audio}
	 */
	PlayerAudio.coin = null;

	/**
	 * Collect item sound
	 * @property money
	 * @type {Phaser.Audio}
	 */
	PlayerAudio.item = null;

	/**
	 * Collect coin
	 * @method collectCoin
	 */
	PlayerAudio.collectCoin = function() {
		PlayerAudio.coin.play();
	};

	/**
	 * Play collect fuel
	 * @method collect
	 */
	PlayerAudio.collect = function() {
		PlayerAudio.item.play();
	};

	/**
	 * Play power track
	 * @method playPowerMusic
	 */
	PlayerAudio.playPowerMusic = function() {
		PlayerAudio.powerMusic.play();
	};

	/**
	 * Stop
	 * @method stopPowerMusic
	 */
	PlayerAudio.stopPowerMusic = function() {
		PlayerAudio.powerMusic.stop();
	};

	/**
	 * Load sound files
	 * @method load
	 * @param {Phaser.Game} game
	 */
	PlayerAudio.load = function(game) {
		game.load.audio('cash_register', 'assets/audio/cash_register.ogg');
		game.load.audio('collect', 'assets/audio/collect.ogg');
		game.load.audio('power_music', 'assets/audio/power_music.ogg');

		game.load.onLoadComplete.add(function() {
			PlayerAudio.coin = game.add.audio('cash_register');
			PlayerAudio.item = game.add.audio('collect');

			PlayerAudio.powerMusic = game.add.audio('power_music');
			PlayerAudio.powerMusic.loop = true;
		});
	};

	return PlayerAudio;
});
