define([
    'jquery',
    'View',
    'StationSwitcher',
    'BbcRadio',
    'Spotify',
    'Echonest'
], function ($, View, StationSwitcher, BbcRadio, Spotify, Echonest) {

    var sp = getSpotifyApi(1),
        models = sp.require('sp://import/scripts/api/models'),
        $,
        player = models.player,
        exports = {};

    exports.init = function () {

        $('#station-switcher').change(function () {

            handleSwitch($('#station-switcher option:selected').attr('value'));
        });

        handleSwitch('bbc_radio_one');
    };

    function handleSwitch (service) {

        BbcRadio.fetchOnAirNowData(service, handleOnAirNow);
    }

    function handleOnAirNow (data) {

        View.renderOnAirNowData(data['artist'], data['track']);

        BbcRadio.fetchArtistData(data['musicBrainzId'], handleArtistData);
        BbcRadio.fetchArtistClips(data['musicBrainzId'], handleArtistClips);
        Spotify.searchForTrack(data['artist'], data['track'], handleTrackSearchResult);
        Spotify.searchForArtist(data['artist'], handleArtistSearchResult);
    }

    function handleArtistData (data) {

        View.renderArtistData(data);
    }

    function handleArtistClips (data) {

        View.renderArtistClips(data);
    }

    function handleTrackSearchResult (spotifyTrackCode) {  

        models.player.play(spotifyTrackCode);
    }

    function handleArtistSearchResult (spotifyArtistCode) {

        Echonest.searchForRelatedArtists(spotifyArtistCode, function (relatedArtists) {
            View.renderRelatedArtists(relatedArtists);
        });
    }

    return exports;
});
