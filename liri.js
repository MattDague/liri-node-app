require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require("fs");
var args = process.argv;
var action = process.argv[2]
var input = [];
var inputFull = ""

//======================================//
// Axios/OMDB

//grabs action from CLI


if (action == "movie-this") {

  movieThis()
};

if (action == "concert-this") {
  concertThis();
};


if (action == "spotify-this-song") {

  spotifyThis();
};

if (action == "do-what-it-says") {

  doWhatItSays();
};

//===============================================
// do what it says function

function doWhatItSays() {

  fs.readFile("./random.txt", "utf8", function (err, data) {

    var dataArr = data.split(",");

    if (dataArr[0] == "spotify-this-song") {
      inputFull = dataArr[1].toString();
      spotifyThis();
    }
    else if (dataArr[0] == "movie-this") {
      inputFull = dataArr[1].toString();
      movieThis();
    }
    if (dataArr[0] == "concert-this") {
      inputFull = dataArr[1].toString();
      concertThis();
    }
    // console.log(dataArr);

  })
};


//================================================
//spotify function

function spotifyThis() {
  //if left blank it defaults to "The Sign" by Ace of Base

  generateInput();

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
      console.log(inputFull)
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //display for track, artist, album and a link to track on spotify
      console.log("Track: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Spotify link to track: " + data.tracks.items[0].external_urls.spotify);
    })
  }

};

//=============================================
// Bands In Town

function concertThis() {
  
  generateInput();

  var queryUrl = "https://rest.bandsintown.com/artists/" + inputFull + "/events?app_id=codingbootcamp"


  axios.get(queryUrl)
    .then(
      function (response) {
        console.log("\nHere are their next 5 shows: ");

        for (var i = 0; i < 5; i++) {
          console.log("");
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
          // console.log(response.data[i].datetime);

          var time = response.data[i].datetime
          var format = "YYYY-MM-DD, hh:mm:ss"
          var convertedDate = moment(time, format);
          console.log(convertedDate.format("MM/DD/YYYY"))

        }
      });
}



//=================================
//function for movie-this
function movieThis() {

  generateInput();

  //if nothing is input into the console after movie-this, the default search is mr. nobody
  if (inputFull.length == 0) {
    
    inputFull = "mr+nobody"
  }
  //if a movie is put into the console
 
 

  // url for omdb api search
  var movieUrl = "http://www.omdbapi.com/?t=" + inputFull + "&y=&plot=short&apikey=trilogy"

  axios.get(movieUrl)
    .then(
      function (response) {

        //console logs all movie data retrieved
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log("IMDB rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
      }
    ).catch(function (error) {
      if (error.response) {

        //console.logs for errors
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}



// function for generating input
function generateInput (){

//pushes user input into array and creates the input for the search
for (var i = 3; i < args.length; i++) {
  input.push(args[i])
  inputFull = input.join(" ")
}
}