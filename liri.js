require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');


var action = process.argv[2]

//======================================//
// Axios/OMDB

//grabs action from cli
if (action == "movie-this") {
 
  //if nothing is input into the console after movie-this, the default search is mr. nobody
  if (process.argv[3] == undefined){
    movieInput = "mr+nobody"
  }
  //if a movie is put into the console
  else{
    var args = process.argv;
    var movie = [];

  //pushes user input into array and creates the input for the search
  for (var i = 3; i < args.length; i++) {
    movie.push(args[i])
    var movieInput = movie.join(" ")
  };
}

// url for omdb api search
  var movieUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy"

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
//if left blank it defaults to "The Sign" by Ace of Base
  if (process.argv [3] === undefined){
    
    spotify
  .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
  .then(function(data) {
    console.log("Track: " + data.name);
    console.log("Artist: " + data.artists[0].name);
    console.log("Album: " + data.album.name);
    console.log("Spotify link to track: " + data.external_urls.spotify); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
  
  }

  // if content is entered
  else {
  // sets variable for user input
  var args = process.argv;
  //array to hold track name
  var track = []
//loop to format track nameinput for search
  for (var i = 3; i < args.length; i++) {
    track.push(args[i]);
    var musicQuery = track.join(" ");
    

  }
  // spotify search query
  spotify.search({ type: 'track', query: musicQuery }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //display for track, artist, album and a link to track on spotify
    console.log("Track: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Spotify link to track: " + data.tracks.items[0].external_urls.spotify);
  })
}}