define(['jquery'], function ($) {

    var exports = {};

    function renderArtistImage (src) {

        var image = "<img src='" + src + "'/>";
        $('#oan-track').prepend(image);
    }

    function renderArtistReleaseReviews (artistReviews, artistName) {

        $('#oan-reviews').html('');

        if (artistReviews.length > 0) {

            var aggregatedReviews = '',
                number = artistReviews.length > 1 ? 1 : artistReviews.length,
                releaseTitle,
                releaseImage,
                releaseReview,
                reviewContent;
 
            for (var i = 0; i < number; i++) {

                releaseTitle = '<p>' + artistReviews[i]['release']['title'] + '</p>';
                releaseImage = "<img src='" + artistReviews[i]['release']['artwork']['small'] + "'/>";
                releaseReview = '<p>\"' + artistReviews[i]['short_synopsis'] + '\" - ' + artistReviews[i]['reviewer'] + '</p>';

                aggregatedReviews += '<td>' + releaseImage + releaseTitle + releaseReview + '</td>';
            }

            reviewContent = '<b>Latest releases:</b><table><tr>' + aggregatedReviews + '</tr></table>';

            $('#oan-reviews').html(reviewContent);
        }
    }

    exports.renderOnAirNowData = function (artist, track) {

        var content = '<p><b>' + artist + '</b></p> - ' + track;
        $('#oan-track').html(content);
    };

    exports.renderArtistData = function (data) {

        renderArtistImage(data['image']);
        renderArtistReleaseReviews(data['reviews'], data['name']);
    };

    exports.renderArtistClips = function (data) {

        $('#oan-clips').html('');

        clips = data['clips'];

        if (clips.length > 0) {

            var title,
                thumbnail,
                url,
                brand,
                brandUrl,
                aggregatedClips = '',
                number = clips.length > 1 ? 1 : clips.length,
                clipsContent;

            for (var i = 0; i < number; i++) {

                title = '<p>' + clips[i]['title'] + '</p>';
                thumbnail = "<img src='" + clips[i]['image_thumbnail'] + "'/>";
                url = 'http://www.bbc.co.uk' + clips[i]['url'],
                clipInfo = "<td><a href='" + url + "'>" + thumbnail + "</a><b>" + title + "</b>";

                if (clips[i]['brand']) {
                    brand = clips[i]['brand']['title'];
                    brandUrl = clips[i]['brand']['url'];
                    aggregatedClips += clipInfo + " from <b><a href='" + brandUrl + "'>" + brand + "</a></b>";
                }
                else {

                    aggregatedClips += clipInfo;
                }

            }


            clipsContent = '<b>Latest clips:</b><table><tr>' + aggregatedClips + '</tr></table>';
            $('#oan-clips').html(clipsContent);
            
        }
    };

    exports.renderRelatedArtists = function (artists) {

        var relatedArtists = '';

        for (var index in artists) {
            relatedArtists += artists[index]['name'] + "<br/>";
        }

        $('#related').html(relatedArtists);
    };

    return exports;
});
