define(['jquery'], function ($) {

    var exports = {};
     var sp = getSpotifyApi(1),
        models = sp.require('sp://import/scripts/api/models');

    function normalizeTrackResults (data) {

        return data[0];
    }

    function normalizeArtistResults (data) {

        console.log(data[0].uri.split(":")[2]);
        return data[0].uri.split(":")[2];
    }

    exports.searchForTrack = function (artist, track, callback) {

        var searchTerm = track + " "+artist,
            search = new models.Search(searchTerm);

        search.searchPlaylists=false;
        search.searchAlbums=false;
        search.searchArtist=false;

        search.observe(models.EVENT.CHANGE, function() {
            callback(normalizeTrackResults(search.tracks));
        });

        search.appendNext();
    }

    exports.searchForArtist = function (artist, callback) {


        var search2 = new models.Search(""+artist);

        search2.searchPlaylists=false;
        search2.searchAlbums=false;
        search2.searchTrack=false;


        search2.observe(models.EVENT.CHANGE, function() {
            
            callback(normalizeArtistResults(search2.artists));
        });

        search2.appendNext();

    }

    return exports;
});
