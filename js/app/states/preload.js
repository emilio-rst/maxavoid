'use strict';

define(['app/entities/main_menu', 
        'app/entities/player', 
        'app/entities/world',
        'app/entities/fuel_bar',
        'app/entities/fuel',
        'app/entities/coin',
        'app/entities/fireball',
        'app/entities/game_over',
        'app/entities/how_to_play',
        'app/entities/level',
        'app/entities/powers',
        'app/entities/pause_button',
        'app/components/physics_component'], function(MainMenu, 
                                                      Player, 
                                                      World, 
                                                      FuelBar, 
                                                      Fuel, 
                                                      Coin, 
                                                      Fireball, 
                                                      GameOver,
                                                      HowToPlay,
                                                      Level,
                                                      Powers,
                                                      PauseButton,
                                                      PhysicsComponent) {
			
    function Preload() {}

    Preload.prototype = {
        preload: function() {
            MainMenu.load(this.game);
            Player.load(this.game);
            World.load(this.game);
            FuelBar.load(this.game);
            Fuel.load(this.game);
            Coin.load(this.game);
            Fireball.load(this.game);
            GameOver.load(this.game);
            HowToPlay.load(this.game);
            Level.load(this.game);
            Powers.load(this.game);
            PauseButton.load(this.game);
			PhysicsComponent.load(this.game);
			
        },

        create: function() {
            this.game.state.start('main-menu');
        }
    };

    return Preload;
});
