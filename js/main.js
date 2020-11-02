require.config({
    paths: {
        'phaser': 'vendor/phaser',
        requirejs: 'vendor/require'
    },
    shim: {
        phaser: {
            exports: 'Phaser'
        }
    }
});

require(['app/game'], function (Game) {
	var game = new Game();
	game.start();
});
