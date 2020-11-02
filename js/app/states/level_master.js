'use strict';

define(['app/systems/fuel_system',
        'app/systems/score_system',
        'app/systems/game_state_system',
        'app/systems/attacker_object_system',
        'app/systems/powers_system',
        'app/systems/level_system',
        'app/entities/player', 
        'app/entities/world',
        'app/entities/fuel_bar',
        'app/entities/score',
        'app/entities/powers',
        'app/entities/level',
        'app/entities/pause_button'], function(FuelSystem, 
										       ScoreSystem, 
                                               GameStateSystem, 
                                               AttackerObjectSystem, 
                                               PowersSystem,
                                               LevelSystem, 
                                               Player, 
                                               World, 
                                               FuelBar, 
                                               Score,
                                               Powers,
                                               Level,
                                               PauseButton) {
			
    function LevelMasterState() {}

    LevelMasterState.prototype = {
        init: function(levelData) {
            
        },
        
        create: function() {
			this.game.physics.startSystem(Phaser.Physics.P2JS);
			
			this.gameStateSystem = new GameStateSystem(this.game);
			
			this.levelSystem = new LevelSystem(this.game);
			
			this.fuelSystem = new FuelSystem(this.game, this.gameStateSystem, this.levelSystem);
			this.scoreSystem = new ScoreSystem(this.game, this.gameStateSystem, this.levelSystem);
			this.attackerObjectSystem = new AttackerObjectSystem(this.game, this.gameStateSystem, this.levelSystem);
			
			this.powersSystem = new PowersSystem(this.game, this.levelSystem, this.gameStateSystem);
			
			this.world = new World(this.game);
			
			this.fuelBar = new FuelBar(this.game, this.fuelSystem);
			this.score = new Score(this.game, this.scoreSystem);
			
			this.levelIndicator = new Level.Indicator(this.game, this.levelSystem);
			
			this.player = new Player(this.game, this.fuelSystem, this.scoreSystem, this.gameStateSystem, this.attackerObjectSystem, this.levelSystem, this.powersSystem);
			
			this.levelSystem.initLevel(1);
			
			this.pauseButton = new PauseButton(this.game);
        },
        
        update : function() {
			this.world.update(this.player);
			this.fuelSystem.update();
			this.scoreSystem.update();
			this.attackerObjectSystem.update();
			this.powersSystem.update();
		}
    };

    return LevelMasterState;
});
