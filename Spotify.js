define(['jquery'], function ($) {

    var exports = {};

    function normalizeTrackResults (data) {

        var results = $(data),
            spotifyTrackCode = results.find('track').attr('href');
            //track = new models.Track(spotifyTrackCode);

        //console.log(results.find('opensearch:totalResults').html());

        return spotifyTrackCode;
    }

    function normalizeArtistResults (data) {

        var results = $(data),
            spotifyArtistCode = results.find('artist').attr('href').split(':')[2];

        return spotifyArtistCode;
    }

    exports.searchForTrack = function (artist, track, callback) {

        artist = artist.replace(" ", "%20");
        track = track.replace(" ", "%20");

        var searchTerm = artist + "%20" + track;

        $.ajax({
          url : "http://ws.spotify.com/search/1/track?q=" + searchTerm,
          dataType: 'xml',
          success : function (data) {

            callback(normalizeTrackResults(data));
          }
        });

    }

    exports.searchForArtist = function (artist, callback) {

        artist = artist.replace(" ", "%20");

        $.ajax({
          url : "http://ws.spotify.com/search/1/artist?q=" + artist,
          dataType: 'xml',
          success : function (data) {

            callback(normalizeArtistResults(data));
          }
        });
    }

    return exports;
});
