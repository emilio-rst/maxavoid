'use strict';

define(['app/components/blink_text'], function(BlinkText) {
	/**
	 * Name space How to play tutorial
	 * @namespace
	 */
	var HowToPlaySprite = {};

	/**
	 * Finger
	 * @class HowToPlaySprite.Thumb
	 * @constructor
	 * @param {Phaser.Game} game
	 */
	HowToPlaySprite.Thumb = function(game) {
		/**
		 * Game object
		 * @property game
		 * @type {Phaser.Game}
		 */
		this.game = game;

		/**
		 * Event listener
		 * @property listener
		 * @type {HowToPlaySprite.Listener}
		 */
		this.listener = null;

		/**
		 * Sprite object
		 * @property sprite
		 * @type {Phaser.Sprite}
		 */
		this.phaserSprite = this.game.add.sprite(260, 140, 'how_to_play');

		var frames = Phaser.Animation.generateFrameNames('thumb_', 1, 2, '', 2);

		var anim = this.phaserSprite.animations.add('touch', frames, 2, false, false);
		anim.onComplete.add(this.onTouchComplete, this);

		this.phaserSprite.animations.add('up', frames.reverse(), 2, false, false);

		this.phaserSprite.animations.add('tap', ['thumb_01', 'thumb_02', 'thumb_01'], 2, false, false);
	};

	HowToPlaySprite.Thumb.prototype = {
		/**
		 * Touch
		 * @method touch
		 */
		touch: function() {
			this.phaserSprite.animations.play('touch');
		},

		/**
		 * On complete
		 * @method onTouchComplete
		 */
		onTouchComplete : function() {
			if(this.listener !== null) this.listener.onTouchComplete();
		},

		/**
		 * Finger up
		 * @method touch
		 */
		up: function() {
			this.phaserSprite.animations.play('up');
		},

		/**
		 * Tap
		 * @method tap
		 */
		tap: function() {
			this.phaserSprite.animations.play('tap');
		}
	};

	/**
	 * Add title
	 *
	 * @method HowToPlaySprite.title
	 * @param {Phaser.Game} game
	 */
	HowToPlaySprite.title = function(game) {
		game.add.sprite(220, 20, 'how_to_play', 'title');
	};

	/**
	 * Description
	 *
	 * @method HowToPlaySprite.descriptionText
	 * @param {Phaser.Game} game
	 * @return {Phaser.Text}
	 */
	HowToPlaySprite.description= function(game) {
		var style = { font: "bold 24px Sans-Serif", fill: "#FFFFFF"};
		return game.add.text(270, 300, "", style);
	};

	/**
	 * Add arrows
	 *
	 * @method HowToPlaySprite.arrowKeys
	 * @param {Phaser.Game} game
	 */
	HowToPlaySprite.arrowsKeys = function(game) {
		game.add.sprite(170, 100, 'how_to_play', 'arrows_keys');
	};

	/**
	 * Adid background
	 *
	 * @method HowToPlaySprite.background
	 * @param {Phaser.Game} game
	 */
	HowToPlaySprite.background = function(game) {
		game.stage.backgroundColor = '#6359FF';
	};

	/**
	 * Add arrows to start
	 *
	 * @method HowToPlaySprite.arrowsStart
	 * @param {Phaser.Game} game
	 */
	HowToPlaySprite.arrowsStart = function(game) {
		game.add.sprite(200, 370, 'how_to_play', 'arrows_start');
	};

	/**
	 * Add touch to start
	 *
	 * @method HowToPlaySprite.touchStart
	 * @param {Phaser.Game} game
	 */
	HowToPlaySprite.touchStart = function(game) {
		game.add.sprite(240, 370, 'how_to_play', 'touch_start');
	};

	/**
	 * Event listener
	 *
	 * @class HowToPlaySprite.Listener
	 * @constructor
	 * @abstract
	 */
	HowToPlaySprite.Listener = function() {};

	HowToPlaySprite.Listener.prototype = {
		/**
		 * End animation
		 * @method onTouchComplete
		 * @abstract
		 */
		onTouchComplete : function() {}
	};

	/**
	 * Load images
	 * @method load
	 * @param {Phaser.Game} game
	 */
	HowToPlaySprite.load = function(game) {
		game.load.atlasJSONHash('how_to_play', 'assets/sprites/how_to_play.png', 'assets/sprites/how_to_play.json');
	};

	return HowToPlaySprite;
});
