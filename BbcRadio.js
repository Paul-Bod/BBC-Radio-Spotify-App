define(function () {

    var exports = {};

    function normalizeOnAirNowData(data) {

        var normalizedData = {},
            onAirNow = $(data.html),
            artists = onAirNow.find('#artists'),
            artistsWithLink = artists.find('a'),
            normalizedArtists,
            musicBrainzId = onAirNow.find('#data-uid').html().trim();

            if (artistsWithLink.length > 0) {
                normalizedArtists = artistsWithLink.html().trim();
            }
            else {
                normalizedArtists = artists.html().trim();
            }

            normalizedData['artist'] = normalizedArtists;
            normalizedData['track'] = onAirNow.find('#track').html().trim();
            normalizedData['musicBrainzId'] = musicBrainzId;

        return normalizedData;
    };

    function normalizeArtistData (data) {

        var normalizedData = {};

        normalizedData['name'] = data['artist']['name'];
        normalizedData['image'] = data['artist']['image']['src'];
        normalizedData['reviews'] = data['artist']['reviews'];

        if (data['artist']['wikipedia_article']) { 
            normalizedData['bio'] = data['artist']['wikipedia_article']['content'];
        }
        else {
            normalizedData['bio'] = '';
        }

        return normalizedData;
    }

    function normalizeArtistClips (data) {

        var normalizedData = {};

        normalizedData['clips'] = data['artist']['clips'];
        normalizedData['artistName'] = data['artist']['name'];

        return normalizedData;
    }

    function filterChartDataForTrack (data, musicBrainzId) {

        var entries = data.chart.entries;

        for (var index in entries) {

            if (entries[index].musicBrainzId === musicBrainzId) {

                return entries[index];
            }
        }

        return [];
    }

    function normalizeTrackChartData (data) {

        var normalizedData = {};

        if (data['position']) {

            normalizedData['position'] = data['position'];
            normalizedData['lastweek'] = data['lastweek'];
            normalizedData['weeksinchart'] = data['weeksinchart'];
        }
        else {

            normalizedData['nochartposition'] = 'This track is not in the Top 40 this week!';
        }

        return normalizedData;
    }

    function normalizeChartData (data) {

        if (data.chart.description === '(none)') {
            data.chart.description = '';
        }

        if (data.chart.short_name === '(none)') {
            data.chart.short_name = '';
        }

        for (var index in data.chart.entries) {

            var entry = {};

            entry.artist = data.chart.entries[index].artist;
            entry.track = data.chart.entries[index].title;
            entry.musicBrainzId = data.chart.entries[index].gid;

            entry.position = data.chart.entries[index].position;
            entry.lastweek = data.chart.entries[index].lastweek;
            entry.weeksinchart = data.chart.entries[index].weeksinchart;

            data.chart.entries[index] = entry;
        }

        return data;
    }

    exports.fetchArtistData = function (musicBrainzId, callback) {

        $.ajax({
          url : 'http://www.bbc.co.uk/music/artists/' + musicBrainzId + '.json',
          dataType: 'json',
          success : function (data) {

            callback(normalizeArtistData(data));
          }
        });
    };

    exports.fetchArtistClips = function (musicBrainzId, callback) {

        $.ajax({
          url : 'http://www.bbc.co.uk/music/artists/' + musicBrainzId + '/clips.json',
          dataType: 'json',
          success : function (data) {

            callback(normalizeArtistClips(data));
          }
        });
    };

    exports.fetchOnAirNowData = function (service, callback) {

        $.ajax({
            url: "http://www.bbc.co.uk/radio/player/" + service + "/realtime",
            type: 'GET',
            data: '',
            dataType: 'jsonp',
            jsonp: false,
            async: false,
            jsonpCallback: 'pollingCallback',
            success: function (data) {

                callback(normalizeOnAirNowData(data));
            }
        });
    };

    exports.fetchChartData = function (callback) {
        $.ajax({
            url : 'http://www.bbc.co.uk/radio1/chart/singles.json',
            dataType: 'json',
            success : function (data) {

                callback(normalizeChartData(data));
            }
        });
    };

    exports.fetchTrackChartData = function (musicBrainzId, callback) {

        exports.fetchChartData(function (data) {

            var filteredData = filterChartDataForTrack(data, musicBrainzId);
            callback(filteredData);
        });
    };

    return exports;
});
