define(['jquery'
], function ($) {

    var exports = {};

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

	}

	exports.voteSong = function(numberSong){
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

	exports.renderQuizSongs = function(){
		var field = "votesForSong"+numberSong;
		var QuizObject = Parse.Object.extend("QuizObject");
		var query = new Parse.Query(QuizObject);
		query.descending("createdAt");

		query.first({
		  success: function(object) {
		  	
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}



 return exports;
});