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

        return normalizedData;
    }

    function normalizeArtistClips (data) {

        var normalizedData = {};

        normalizedData['clips'] = data['artist']['clips'];
        normalizedData['artistName'] = data['artist']['name'];

        return normalizedData;
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
    }


    return exports;
});