define(['View', 'BbcRadio', 'TrackManager'], function (View, BbcRadio, TrackManager) {

    var exports = {};

    function handleChartEntryClick (e) {

        var id = e.srcElement.id,
            params=id.split("%"),
            data = {};

            data['artist'] = params[0],
            data['track'] = params[1],
            data['musicBrainzId'] = params[2];

        TrackManager.playNewTrackSelection(data);
    }

    function handleChartData (data) {

        View.renderChartEntries(data.chart.entries, handleChartEntryClick);
        console.log(data);
    }

    exports.init = function () {

        BbcRadio.fetchChartData(handleChartData);
    };

    return exports;
});
