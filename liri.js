require("dotenv").config();
//requirements for calls
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require("fs");
//variable for all CLI inputs
var args = process.argv;
// pulls action from CLI
var action = process.argv[2];
//array for gathering search terms
var input = [];
//variable for final search input
var inputFull = "";

//======================================//
// Axios/OMDB

//switch for statements for determining which action gets called
function liriAction(){

switch (action) {
  case "movie-this":
    return movieThis()

  case "concert-this":
    return concertThis()

  case "do-what-it-says":
    return doWhatItSays()

  case "spotify-this-song":
    return spotifyThis()

};
}

    //===============================================
    // do what it says function

    function doWhatItSays() {
      // reads from random.txt file
      fs.readFile("./random.txt", "utf8", function (err, data) {
        // splits the text from the file
        var dataArr = data.split(",");
        action = dataArr[0];
        inputFull = dataArr[1].toString();
        liriAction();
      });
    };


    //================================================
    //spotify function

    function spotifyThis() {

      generateInput();

      //if left blank it defaults to "The Sign" by Ace of Base
      if (inputFull.length == 0) {

        spotify
          .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function (data) {
            console.log("Track: " + data.name);
            console.log("Artist: " + data.artists[0].name);
            console.log("Album: " + data.album.name);
            console.log("Spotify link to track: " + data.external_urls.spotify);
          })
          .catch(function (err) {
            console.error('Error occurred: ' + err);
          });

      }

      // if content is entered
      else {

        // spotify search query
        spotify.search({ type: 'track', query: inputFull }, function (err, data) {

          if (err) {
            return console.log('Error occurred: ' + err);
          }
          //display for track, artist, album and a link to track on spotify
          console.log("Track: " + data.tracks.items[0].name);
          console.log("Artist: " + data.tracks.items[0].artists[0].name);
          console.log("Album: " + data.tracks.items[0].album.name);
          console.log("Spotify link to track: " + data.tracks.items[0].external_urls.spotify);
        });
      };

    };

    //=============================================
    // Bands In Town

    function concertThis() {

      generateInput();
      //url for bands in town search
      var queryUrl = "https://rest.bandsintown.com/artists/" + inputFull + "/events?app_id=codingbootcamp"

      //axis request to bands in town
      axios.get(queryUrl)
        .then(
          function (response) {
            console.log("\nHere are their next 5 shows: ");
            // loop to display the 5 next concerts found
            for (var i = 0; i < 5; i++) {
              console.log("");
              console.log("Venue: " + response.data[i].venue.name);
              console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
              // time conversion using momentjs
              var time = response.data[i].datetime
              var format = "YYYY-MM-DD, hh:mm:ss"
              var convertedDate = moment(time, format);
              console.log("Date: " + convertedDate.format("MM/DD/YYYY"))

            };
          });
    };



    //=================================
    //function for movie-this
    function movieThis() {

      generateInput();

      //if nothing is input into the console after movie-this, the default search is mr. nobody
      if (inputFull.length == 0) {

        inputFull = "mr+nobody"
      }



      // url for omdb api search
      var movieUrl = "http://www.omdbapi.com/?t=" + inputFull + "&y=&plot=short&apikey=trilogy"

      axios.get(movieUrl)
        .then(
          function (response) {

            //console logs all movie data retrieved
            console.log("Movie title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("Country :" + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
          }
        ).catch(function (error) {
          //logging error
          console.log(error.config);
        });
    };



    // function for generating input
    function generateInput() {

      //pushes user input into array and creates the input for the search
      for (var i = 3; i < args.length; i++) {
        input.push(args[i])
        inputFull = input.join(" ")
      }
    };

  liriAction();