'use strict';

define(['phaser'], function(Phaser) {
	/**
	 * Physics
	 * @namespace PhysicsComponent
	 */
	var PhysicsComponent = {};

	/**
	 * Data
	 * @var PhysicsComponent.data
	 * @type {Object}
	 */
	PhysicsComponent.data = {};

	/**
	 * Check sprites overlapping using AABB
	 * @method check
	 * @param {Phaser.Sprite} spriteA sprite A
	 * @param {Phaser.Sprite} spriteB sprite B
	 * @return {boolean}
	 */
	PhysicsComponent.overlap = function(spriteA, spriteB) {
		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();

		return Phaser.Rectangle.intersects(boundsA, boundsB);
	};

	/**
	 * Load polygons definition
	 * @method load
	 * @param {Phaser.Game} game
	 */
	PhysicsComponent.load = function(game) {
		game.load.json('physics', 'assets/physics/physics.json');

		game.load.onLoadComplete.add(function() {
			var data = game.cache.getJSON('physics');

			for(var i in data.rigidBodies) {

				var polygons = [];

				for(var j in data.rigidBodies[i].shapes) {

					if(data.rigidBodies[i].shapes[j].type = 'POLYGON') {
						var points = data.rigidBodies[i].shapes[j].vertices.map(function(point) {
							return [point.x, point.y];
						});
					}

					polygons.push(points);
				}

				PhysicsComponent.data[data.rigidBodies[i].name] = polygons;
			}
		});
	};

	/**
	 * Add polygons to sprite
	 * @method loadPolygon
	 * @param {Phaser.Game} game
	 * @param {Phaser.Sprite} sprite
	 * @param {String} key polygon name on JSON file
	 */
	PhysicsComponent.addPolygon = function(sprite, key) {

		sprite.body.clearShapes();

		var unitSize;

		if(sprite.width < sprite.height) {
			unitSize = sprite.width;
		} else {
			unitSize = sprite.height;
		}

		for(var i in PhysicsComponent.data[key]) {

			var yMax = 0;
			PhysicsComponent.data[key][i].forEach(function(point) {
				if(point[1] > yMax) yMax = point[1];
			});

			var points = PhysicsComponent.data[key][i].map(function(point) {
				return [point[0]*unitSize, sprite.height - point[1]*unitSize];
			});

			sprite.body.addPolygon({}, points);
		}
	};

	return PhysicsComponent;
});
