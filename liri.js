require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');


var action = process.argv[2]

//======================================//
// Axios/OMDB


if (action == "movie-this") {
  var args = process.argv;
  var movie = [];

  for (var i = 3; i < args.length; i++) {
    movie.push(args[i])
    var movieInput = movie.join(" ")
  };

  var movieUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy"

  axios.get(movieUrl)
    .then(
      function (response) {
        console.log(movieUrl);
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
        
       
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {

        console.log(error.request);
      } else {

        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

//======================================//
// Bands In Town

if (action == "concert-this") {
  var args = process.argv;
  var artist = []


  for (var i = 3; i < args.length; i++) {
    artist.push(args[i])
    var artistInput = artist.join("+")

  }
  var queryUrl = "https://rest.bandsintown.com/artists/" + artistInput + "/events?app_id=codingbootcamp"


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
};

//================================================
//spotify
if (action == "spotify-this") {
  var args = process.argv;
  var track = []

  for (var i = 3; i < args.length; i++) {
    track.push(args[i]);
    var musicQuery = track.join(" ");

  }

  spotify.search({ type: 'track', query: musicQuery }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
  })
}