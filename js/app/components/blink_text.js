'use strict';

define([], function() {
	/**
	 * Blink text
	 * @class BlinkText
	 */
	function BlinkText(game, x, y, text, style) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Time count until next blink
		 * @property timer
		 * @type {number}
		 */
		this.timer = 0;

		/**
		 * Text object
		 * @property sprite
		 * @type {Phaser.Text}
		 */
		this.text = this.game.add.text(x, y, text, style);
	};

	BlinkText.prototype = {
		/**
		 * Update
		 * @method update
		 */
		update: function() {
			this.timer += this.game.time.elapsed; //this is in ms, not seconds.
			if ( this.timer >= 900 ) {
				this.timer -= 900;
				this.text.visible = !this.text.visible;
			}
		}
	};

	return BlinkText;
});
