define(['jquery'], function ($) {

    var exports = {},
        tabIds = {
            index  : 'index',
            charts : 'charts',
            votes  : 'votes'
        };

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

    function renderArtistBio (bio) {
        $bio = $('#oan-bio');
        $bio.empty();
        $bio.append(bio);
    }

    exports.renderOnAirNowData = function (artist, track) {

        var content = '<p><b>' + artist + '</b></p> - ' + track;
        $('#oan-track').html(content);
    };

    exports.renderArtistData = function (data) {

        renderArtistImage(data['image']);
        renderArtistReleaseReviews(data['reviews'], data['name']);

        renderArtistBio(data['bio']);
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

    exports.renderRelatedArtists = function (artists, clickHandler) {

        var relatedArtists = '',
            id = ''

        $('#related').empty();

        for (var index=0; index<4; index++) {
            id = artists[index]['name'] + "%" + artists[index]['track'] + "%" + artists[index]['musicbrainzid']+"%";

            relatedArtists = $('<div id="' + id + '"></div>');
            relatedArtists.html(artists[index]['name'] + "<br/>" + artists[index]['track']);
            relatedArtists.click(function (e) { clickHandler(e) });

            $('#related').append(relatedArtists);
            $('#related').append('<br/><br/>');
        }

    };

    exports.renderChartEntries = function (entries, clickHandler) {

        var chartEntry = '',
            id = '';

        $('#charts-entries').empty();

        for (var index=0; index<10; index++) {

            id = entries[index].artist + "%" + entries[index].track + "%" + entries[index].musicBrainzId+"%";

            chartEntry = $('<div id="' + id + '"></div>');
            chartEntry.html(entries[index]['artist'] + "<br/>" + entries[index]['track']);
            chartEntry.click(function (e) { clickHandler(e) });

            $('#charts-entries').append(chartEntry);
            $('#charts-entries').append('<br/><br/>');
        }
    };

    exports.renderTrackChartData = function (data) {

        if (data.length === 0) {
            $('#oan-chart-uk').html('Track is not in the chart this week!');
            return true;
        }

        var trackInfo = '<b>Position:</b> ' + data['position']
            + '<br/><b>Last Week:</b> ' + data['lastweek']
            + '<br/><b>Weeks In Chart:</b> ' + data['weeksinchart'];

        $('#oan-chart-uk').html(trackInfo);
    };

    exports.switchTabMarkup = function (tab) {

        var current = document.getElementById(tabIds[tab]),
            sections = document.getElementsByClassName('section'),
            currentId = current.getAttribute('id');

        for (var i=0, l = sections.length; i<l; i++){
            if (currentId != sections[i].getAttribute('id')) {
                sections[i].style.display = 'none';
            }
        }
        current.style.display = 'block';
    };

    exports.changeTab = function (tab) {

        window.location='spotify:app:bbcradio:tabs:index';
        exports.switchTabMarkup(tab);
    };

    return exports;
});
