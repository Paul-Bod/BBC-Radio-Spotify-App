define(function () {

    var exports = {};

    function normalizeArtistData (data) {

        var $data = $(data);

        console.log($data);
        console.log($data.find('artist')[0]);
        return $data.find('artist')[0].attr('id');
    }

    exports.getIdForArtist = function (artist, callback) {

        var artistQuery = encodeURIComponent(artist);

        console.log(artistQuery);
        $.ajax({
          url : 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artistQuery, 
          dataType: 'xml',
          success : function (data) {

            console.log('hi');
            callback(normalizeArtistData(data));
          }
        });
        
    }

    return exports;
})
