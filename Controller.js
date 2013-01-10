define(['View', 'OnAir', 'Charts', 'Votes'], function (View, OnAir, Charts, Votes) {

    var sp = getSpotifyApi(),
        models = sp.require('sp://import/scripts/api/models'),
        exports = {};

    function handleTabSwitch () {

        var args = models.application.arguments,
            selectedTab = args[0];

        console.log(selectedTab);
        View.switchTabMarkup(selectedTab);
        
        switch (selectedTab) {

            case 'index':
                OnAir.init();
                break;
            case 'charts':
                Charts.init();
                break;
            case 'votes':
                Votes.init();
                break;
        }
    }

    exports.init = function () {

        handleTabSwitch();
        models.application.observe(models.EVENT.ARGUMENTSCHANGED, handleTabSwitch);
    };

    return exports;
});
