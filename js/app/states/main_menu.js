'use strict';

define(['app/entities/main_menu'], function(MainMenu) {
    function MainMenuState() {}

    MainMenuState.prototype = {
        create: function() {
            this.mainMenu = new MainMenu(this.game);
        }
    };

    return MainMenuState;
});
