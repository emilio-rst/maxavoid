'use strict';

define(['app/components/level_sprite',
        'app/components/level_audio'], function(LevelSprite,
                                                LevelAudio) {
	
	/**
	 * Namespace para entidades de level
	 * @namespace
	 */
	var Level = {};
	
	/**
	 * Indicador de nivel
	 * @class Level.Indicator
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 * @param {LevelSystem} levelSystem sistema de niveles
	 */
	Level.Indicator = function(game, levelSystem) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		levelSystem.levelIndicator = this;
		
		/**
		 * Nivel actual
		 * @property Level.Indicator._level
		 * @type {Number}
		 * @private
		 */
		this._level = null;
		
		/**
		 * Sprite de puntación
		 * @property Level.Indicator.sprite
		 * @type {LevelSprite}
		 */
		this.sprite = new LevelSprite.Indicator(this.game);

	}
	
	/**
	 * Número de nivel
	 * @property Level.Indicator.level
	 * @type {Number}
	 */
	Object.defineProperty(Level.Indicator.prototype, 'level', {
		get : function() {
			return this._level;
		},
		
		set : function(value) {
			this._level = value;
			this.sprite.setLevel(value);
		}
	});

	/**
	 * Splash al iniciar nivel
	 * 
	 * @method Level.Splash
	 * @param {Phaser.Game} game
	 * @param {Number} level número de nivel
	 * @param {Function} onDestroy callback al destruirse el splash
	 */
	Level.splash = function(game, level, onDestroy) {
		var callbacks = {
			onDestroy : onDestroy,
			
			onGo : function() {
				LevelAudio.playGo();
			}
		};
		
		LevelSprite.splash(game, level, callbacks);
	};
	
	/**
	 * Cargar sprites de level
	 * @method load
	 * @param {Phaser.Game} game
	 */
	Level.load = function(game) {
		LevelSprite.load(game);
		LevelAudio.load(game);
	}

	return Level;
});
