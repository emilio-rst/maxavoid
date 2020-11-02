'use strict';

define([], function() {
	/**
	 * Namespace para publicidad
	 * @namespace
	 */
	var Advertising = {};
	
	/**
	 * Cargar publicidad
	 * @method load
	 * @param {Phaser.Game} game
	 */
	Advertising.load = function(game) {
		/*
		 * Integración de crosswalk en android 
		 */
		if(game.device.crosswalk) {
			Advertising.leadbolt();
		} else {
			// TODO: publicidad en facebook
		}
	};
	
	/**
	 * Publicidad con leadbolt
	 * @method leadbolt
	 */
	Advertising.leadbolt = function() {
		if(window.innerHeight < 480) {
			Advertising.banner('ads/leadbolt_low.html', 320, 50);
		} else {
			Advertising.banner('ads/leadbolt_hi.html', 468, 60);
		}
	};
	
	/**
	 * Carga el banner publicitario
	 * @method banner
	 * @param {String} url
	 * @param {Number} width
	 * @param {Number} height
	 */
	Advertising.banner = function(url, width, height) {
		var banner = document.getElementById('banner');
		banner.setAttribute('data', url);
		banner.setAttribute('width', width);
		banner.setAttribute('height', height);
	};
	
	return Advertising;
});
