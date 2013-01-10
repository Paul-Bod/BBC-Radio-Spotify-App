define([
    'jquery',
    'BbcRadio',
    'TrackManager'
], function ($, BbcRadio, TrackManager) {

    var exports = {};

    exports.init = function () {

        $('#station-switcher').change(function () {

            handleSwitch($('#station-switcher option:selected').attr('value'));
        });

        handleSwitch('bbc_radio_one');
    };

    function handleSwitch (service) {

        console.log(TrackManager);
        BbcRadio.fetchOnAirNowData(service, TrackManager.handleTrackData);
    }

    return exports;
});
