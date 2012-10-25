define(['jquery'], function ($) {

  var sp = getSpotifyApi(1);
  var models = sp.require('sp://import/scripts/api/models');
  var $; 
  var player = models.player;

  var exports = {};

  exports.init = function () {

    fetchOnAirNowData('bbc_radio_one');
  };

  function fetchOnAirNowData (service) {

    $.ajax({
      url: "http://www.bbc.co.uk/radio/player/" + service + "/realtime",
      type: 'GET',
      data: '',
      dataType: 'jsonp',
      jsonp: false,
      async: false,
      jsonpCallback: 'pollingCallback',
      success: function (data) {

        pollingCallback(data);
      }
    });
  }

  function pollingCallback (data) {

    var onAirNow = $(data.html);
    

    var artist = onAirNow.find('#artists').html().trim(),
        track = onAirNow.find('#track').html().trim();

    console.log(onAirNow);
    console.log(track);

    renderOnAirNowData(artist, track);
    searchForTrack(artist, track);
    searchForArtist(artist);
  }

  function renderOnAirNowData (artist, track) {

    var content = $('<p><b>' + artist + '</b> - ' + track + '</p>');
    $('#oan').append(content);
  }

  function searchForTrack (artist, track) {

    artist = artist.replace(" ", "%20");
    track = track.replace(" ", "%20");

    var searchTerm = artist + "%20" + track;

    $.ajax({
      url : "http://ws.spotify.com/search/1/track?q=" + searchTerm,
      dataType: 'xml',
      success : function (data) {

        handleTrackSearchResult(data);
      }
    });

  }

  function handleTrackSearchResult(data) {  

    var results = $(data);
    console.log(data);
    var spotifyTrackCode = results.find('track').attr('href');

    var track = new models.Track(spotifyTrackCode);

    models.player.play(spotifyTrackCode);

    console.log(track);
  }

  function searchForArtist (artist) {

    artist = artist.replace(" ", "%20");

    console.log("http://ws.spotify.com/search/1/artist?q=" + artist);
    $.ajax({
      url : "http://ws.spotify.com/search/1/artist?q=" + artist,
      dataType: 'xml',
      success : function (data) {

        handleArtistSearchResult(data);
      }
    });
  }

  function handleArtistSearchResult (data) {

    var results = $(data);
    console.log(data);
    var spotifyArtistCode = results.find('artist').attr('href').split(':')[2];

    console.log(spotifyArtistCode);

    $.ajax({
      url : "http://developer.echonest.com/api/v4/artist/similar?api_key=FILDTEOIK2HBORODV&id=spotify-WW:artist:" + spotifyArtistCode,

      success : function (data) {

        var artists = data['response']['artists'];
        for (var index in artists) {

          $('#related').append(artists[index]['name'] + "<br/>");
        }
      }
    });
  }

  
  return exports;
});
