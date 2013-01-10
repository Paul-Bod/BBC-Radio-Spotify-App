define([
    'jquery',
    'View',
    'StationSwitcher',
    'BbcRadio',
    'Spotify',
    'Echonest',
    'Musicbrainz', 
    'Votes'
], function ($, View, StationSwitcher, BbcRadio, Spotify, Echonest, Musicbrainz, Votes) {

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
        BbcRadio.fetchTrackChartData(data['musicBrainzId'], handleTrackChartData);
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

    function handleTrackChartData (data) {

        View.renderTrackChartData(data);
    }

    function handleRelatedArtistClick (e) {

        var id = e.srcElement.id,
            params=id.split("%"),
            data = {};

            data['artist'] = params[0],
            data['track'] = params[1],
            data['musicBrainzId'] = params[2];

        handleOnAirNow(data);
    }

    function addMusicbrainzIdtoRelatedArtists (index, relatedArtists) {

        Musicbrainz.getIdForArtist(relatedArtists[index].name, function (id) {

            relatedArtists[index]['musicbrainzid'] = id;

            if ((index+1) >= relatedArtists.length) {
                return true;
            }

            addMusicbrainzIdtoRelatedArtists(index+1, relatedArtists)
        });
    }

    function handleArtistSearchResult (spotifyArtistCode) {

        Echonest.getRelatedArtistsData(spotifyArtistCode, function (relatedArtists) {

            var id = '';

            console.log(relatedArtists);
            //addMusicbrainzIdtoRelatedArtists(0, relatedArtists);

            View.renderRelatedArtists(relatedArtists, handleRelatedArtistClick);
        });
    }

    return exports;
});
