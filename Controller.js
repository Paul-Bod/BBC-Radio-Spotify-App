define(['View', 'OnAir', 'Charts'], function (View, OnAir, Charts) {

    var sp = getSpotifyApi(),
        models = sp.require('sp://import/scripts/api/models'),
        exports = {};

    function handleTabSwitch () {

        var args = models.application.arguments,
            selectedTab = args[0];

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
