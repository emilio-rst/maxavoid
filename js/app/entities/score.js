'use strict';

define(['app/components/score_sprite',
        'app/components/score_valuation',
        'app/components/score_storage'], function(ScoreSprite, 
                                                  ScoreValuation,
                                                  ScoreStorage) {
	/**
	 * Score
	 * @class Score
	 * @constructor
	 * @param {Phaser.Game} game Objeto Game de Phaser
	 * @param {ScoreSystem} scoreSystem sistema de puntuaciones
	 */
	function Score(game, scoreSystem) {
		/**
		 * Objeto Game de Phaser
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;
		
		/*
		 * Carga en el sistema de puntuaciones 
		 */
		scoreSystem.score = this;
		
		/**
		 * Sprite de puntación
		 * @property sprite
		 * @type {ScoreSprite}
		 */
		this.sprite = new ScoreSprite(this.game);
		
		/**
		 * Valoración de puntación
		 * @property sprite
		 * @type {ScoreValuation}
		 */
		this.valuation = new ScoreValuation();
	}
	
	Score.prototype = {
		/**
		 * Adicionar moneda
		 * @method addCoin
		 */
		addCoin : function() {
			this.valuation.addCoin();
			this.sprite.setValue(this.valuation.value);
		},
		
		/**
		 * Actualiza la máxima puntuación
		 * @method updateMaxScore
		 */
		updateMaxScore : function() {
			if(this.value > ScoreStorage.Local.getMaxScore()) {
				ScoreStorage.Local.saveMaxScore(this.valuation.value);
			}
		},
		
		/**
		 * Obtiene la máxima puntuación
		 * @method getMaxScore
		 * @return {number}
		 */
		getMaxScore : function() {
			return ScoreStorage.Local.getMaxScore();
		}
	};

	/**
	 * Puntuación alcanzada
	 * @property value
	 * @type {Int}
	 * @default 0
	 */
	Object.defineProperty(Score.prototype, 'value', {
		get : function() {
			return this.valuation.value;
		}
	});

	return Score;
});
