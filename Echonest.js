define(['jquery'], function ($) {

    var exports = {};

    function normalizeRelatedArtistsResults (data) {

        return data['response']['artists'];
    }

    exports.searchForRelatedArtists = function (spotifyArtistCode, callback) {

        $.ajax({
            url : "http://developer.echonest.com/api/v4/artist/similar?api_key=FILDTEOIK2HBORODV&id=spotify-WW:artist:" + spotifyArtistCode,

            success : function (data) {

                callback(normalizeRelatedArtistsResults(data));    
            }
        });
    }

    return exports;
});
