'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Componente de pantalla
	 * @namespace ScreenComponent
	 */
	var ScreenComponent = {};
	
	/**
	 * Escalar a resolucion de pantalla
	 * @method scale
	 * @param {Phaser.game} game
	 */
	ScreenComponent.scale = function(game) {
		
		// Integración crosswalk en android
		if(game.device.crosswalk) {
			
			var advertisingSpace;
			
			if(window.innerHeight < 480) {
				advertisingSpace = 54;
			} else {
				advertisingSpace = 64;
			}
			
			game.scale.setMinMax(null, window.innerHeight - advertisingSpace, null, window.innerHeight - advertisingSpace);
			
			game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
			game.scale.setScreenSize();
		}
	};
	
	return ScreenComponent;
});
