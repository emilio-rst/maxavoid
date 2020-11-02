'use strict';

define([], function() {
	
	/**
	 * Namespace de tipos de almacenamiento de puntuacion
	 * @namespace
	 */
	var ScoreStorage = {};
	
	/**
	 * Puntuación en local
	 */
	ScoreStorage.Local = {
		/**
		 * Guarda la máxima puntuacion
		 * @method saveMaxScore
		 * @param {number} value
		 */
		saveMaxScore : function(value) {
			localStorage.maxScore = JSON.stringify(value);
		},
		
		/**
		 * Obtiene la máxima puntuacion
		 * @method getMaxScore
		 * @return {number}
		 */
		getMaxScore : function() {
			if(localStorage.maxScore === undefined) return 0;
			
			return JSON.parse(localStorage.maxScore);
		}
	};
	
	return ScoreStorage;
});
