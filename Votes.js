define(['jquery', 'TrackManager', 'Echonest', 'View'], function ($, TrackManager, Echonest, View) {

       var exports = {},
        sp = getSpotifyApi(1),
        models = sp.require('sp://import/scripts/api/models');

    exports.init = function () {
    
		Parse.initialize("qR0ieufBeZNS8uVptjl7CVEEj2gHPZAgxxpinlw8", "xkUCDRNqpML8Z75kMjO7o8q1TZqAINdPDBaoMjKL");
	    
	    var QuizObject = Parse.Object.extend("QuizObject");
	    var quizObject = new QuizObject();
	    quizObject.set("song1", "spotify:track:5PsMbxhgWpJMsouEfDTX6r");
	    quizObject.set("song2", "spotify:track:1mwt9hzaH7idmC5UCoOUkz");
	    quizObject.set("song3", "spotify:track:1R2SZUOGJqqBiLuvwKOT2Y");
	    quizObject.set("votesForSong1", 0);
	    quizObject.set("votesForSong2", 0);
	    quizObject.set("votesForSong3", 0);

	      quizObject.save(null, {
		      success: function(object) {
		        console.log("success");
		      },
		      error: function(model, error) {
		        console.log("error");
		      }
	    });

	    renderQuizSongs();

	};

	function voteSong (numberSong){
		var field = "votesForSong"+numberSong;
		var QuizObject = Parse.Object.extend("QuizObject");
		var query = new Parse.Query(QuizObject);
		query.descending("createdAt");

		query.first({
		  success: function(object) {
		  	var votes=object.get(field);
		    object.set(field, votes++ );
		    object.save();
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}

	function renderQuizSongs (){

		var QuizObject = Parse.Object.extend("QuizObject");
		var query = new Parse.Query(QuizObject);
		query.descending("createdAt");

		query.first({
		  success: function(object) {

		  	var track1= models.Track.fromURI(object.get("song1"));
		  	
		  	Echonest.getMusicBrainzId(track1.artists[0].uri.split(":")[2], object.get("song1"), renderSong);
		  	
		  	var track2= models.Track.fromURI(object.get("song2"));
		  	Echonest.getMusicBrainzId(track2.artists[0].uri.split(":")[2], object.get("song2"), renderSong);

		  	var track3= models.Track.fromURI(object.get("song3"));
		  	Echonest.getMusicBrainzId(track2.artists[0].uri.split(":")[2], object.get("song3"), renderSong);
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});

	}

	function renderSong(musicBrainzId, spotifyId){
			
		var QuizObject = Parse.Object.extend("QuizObject");
		var query = new Parse.Query(QuizObject);
		query.descending("createdAt");

		query.first({
		  success: function(object) {
		  	var trackButton;
		  	var number;
		  	if(object.get("song1")==spotifyId){
		  		trackButton= $('#song1');
		  		number = 1;
		  	}else if(object.get("song2")==spotifyId){
		  		trackButton= $('#song2');
		  		number = 2;
		  	}else if(object.get("song3")==spotifyId){
           		trackButton= $('#song3');
           		number = 3;
           	}
           	var track= models.Track.fromURI(spotifyId);
            var data = {};
            data['artist'] = track.artists[0].name,
            data['track'] = track.name,
            data['musicBrainzId'] = musicBrainzId;
            console.log("data", data);
          
          	var trackButtonName = $("<a>"+data['track']+"</a>");
            trackButtonName.click(function (e) { 
            	TrackManager.playNewTrackSelection(data); 
            });
            trackButton.empty();
            trackButton.append(trackButtonName);
		  	
		  	var trackButtonLink = $("<button> Vote </button>");
		  	trackButtonLink.click(function (e) { 
            	voteSong(number); 
            });
            trackButton.append(trackButtonLink);

		   },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}

    return exports;
});