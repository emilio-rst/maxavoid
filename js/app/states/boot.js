'use strict';

define(['app/components/screen_component',
        'app/libs/advertising'], function(ScreenComponent,
                                          Advertising) {

    function Boot() {}

    Boot.prototype = {
        preload: function() {
            // load preloader assets
        },

        create: function() {
            // setup game environment
            // scale, input etc..

			/*
			 * Escalar a resolucion de pantalla
			 */
			ScreenComponent.scale(this.game);

			/*
		     * Cargar publicidad
		     */
		    //Advertising.load(this.game);

            //this.game.state.start('preload');
        //}
    };

    return Boot;
});
