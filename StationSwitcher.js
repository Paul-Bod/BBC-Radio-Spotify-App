define(['jquery', './lib/eventEmitter'], function ($, Pubsub) {

    var exports = {};

    exports.init = function () {

        $('#station-switcher').change(function () {

            var selected = $('#station-switcher option:selected').attr('value');
            Pubsub.emitEvent('bbcradio:switch_station', [selected]);
        });

        Pubsub.emitEvent('bbcradio:switch_station', ['bbc_radio_one']);
    }

    return exports;
});
