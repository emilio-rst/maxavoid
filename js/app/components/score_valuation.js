'use strict';

define([], function() {
	
	/**
	 * Valoración de puntuación
	 * @class ScoreValuation
	 * @constructor
	 */
	function ScoreValuation() {
		/**
		 * Puntuación
		 * @property _value
		 * @type {Int}
		 * @private
		 */
		this._value = 0;
	};
	
	ScoreValuation.prototype = {
		/**
		 * Adicionar moneda
		 * @method addCoin
		 */
		addCoin : function() {
			this._value += 1;
		}
	}

	/**
	 * Puntuación alcanzada
	 * @property value
	 * @type {Int}
	 * @default 0
	 */
	Object.defineProperty(ScoreValuation.prototype, 'value', {
		get : function() {
			return this._value;
		}
	});

	return ScoreValuation;
});
