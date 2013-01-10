define(['jquery'], function ($) {

    var exports = {},
        sp = getSpotifyApi(1),
        models = sp.require('sp://import/scripts/api/models');

    function normalizeRelatedArtistsResults (data) {

        var normalizedData = [],
            item,
            artists = data['response']['artists'];

        for (var index in artists) {

            item = {};

            item.name = artists[index]['name'];
            item.track = artists[index]['songs'][0]['title'];
            item.musicbrainzid = artists[index]['foreign_ids'][0]['foreign_id'].replace('musicbrainz:artist:', '');

            normalizedData.push(item);
        }

        return normalizedData;
    }

    exports.getRelatedArtistsData = function (spotifyArtistCode, callback) {

        $.ajax({
            url : "http://developer.echonest.com/api/v4/artist/similar?api_key=FILDTEOIK2HBORODV&id=spotify-WW:artist:"
                + spotifyArtistCode
                + '&bucket=songs&bucket=id:musicbrainz',

            success : function (data) {

                callback(normalizeRelatedArtistsResults(data));    
            }
        });
    };

    exports.getMusicBrainzId = function(spotifyArtistId, spotifyTrackId,  callback){

          $.ajax({
            url : "http://developer.echonest.com/api/v4/artist/profile?api_key=FILDTEOIK2HBORODV&id=spotify-WW:artist:"
                + spotifyArtistId,

            success : function (data) {
                console.log(data);
                callback(data.response.artist.id, spotifyTrackId);    
            }
        });
    
    };

    return exports;
});
