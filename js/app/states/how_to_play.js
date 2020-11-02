'use strict';

define(['app/entities/how_to_play'], function(HowToPlay) {
    function HowToPlayState() {}

    HowToPlayState.prototype = {
        create: function() {
            this.howToPlay = new HowToPlay(this.game);
        },
        
        update: function() {
			this.howToPlay.update();
		}
    };

    return HowToPlayState;
});
