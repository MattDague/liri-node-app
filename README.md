# liri-node-app

Introduction 
---------------------------------------------

Welcome to the Liri App! I have created every aspect of this app from start to finish for your entertainment! The purpose of Liri is to allow you to search for information on your favorite movies, songs and bands. It even has a selection for you if you cant decide! 

The catch is that all of the functionality is in the command line. From the user input to the display results there is no need for an additional page to load.

Development
---------------------------------------------

The app is created in a way that it responds to the input from the user and takes that data to make a request through Axios or the Spotify API for a response. The user will use node.js to input the actions for a concert, movie or track search and the app will take that command and call the corresponding function. The search the app chooses is chosen using a series of if statements.

The user must also provide an additional argument in the command line which acts at their search criteria. 

Each function for search immediately calls another function called generateInput. What this function does is take the users argument at the 3 index of their input. The function then uses a for loop to format their text into an array so that it can be sent as part of the query URL.

The search functions for track and movie are set up so that if the array the generateInput function tries to generate is empty, default values are given to the search. If an input is properly generated a request is sent out using the users search criteria. If data is returned it is then displayed to the user in the console. 

The response displays are all pulled from the objects from the response data. The concert search does use functionality from momentjs to display its date in a much more readable format.

If the user chooses to go the do-what-it-says route the respective function is called. From this the app accesses the local filesystem and checks the random.txt document. That text then split into an array. The 0 index is used to pick the action and the 1 index then fed as the full input to the query URL for search purposes.

How To Use
-------------------------------------------

To begin you must go to the directory of the app in your terminal or console. Once you are in the directory you must use Node Package Manager to install the following packages:

- Axios
- Moment.js
- Spotify-Api

Once installed you can start using the app. To being every search through Liri you must type in the following:

    node liri.js 

What is typed in afterwards may vary but these two arguments are required to start it. Now you have a choise to make and you have 4 options to choose from:


To search for a trach you must type in:

    spotify-this-song <The name of the song>

To search for a movie you must type in:

    movie-this <The name of the movie>

To search for a concert by a band you must type in:

    concert-this <The name of the band>

Or if you want Liri to take the wheel you must type:

    do-what-it-says 



For example a search for a movie would look like the following code:

node liri.js movie-this Saving Private Ryan


Each search will return you with an abundance of information on that given topic!


Technologies Used
----------------------------------------
- Node.js
- Javascript
- Axios
- NPM 
- Spotify API
- Moment.js
- OMDB API
- Bands In Town API
- dotenv




GitHub Repository: https://github.com/MattDague/liri-node-app

Video Demonstration: https://youtu.be/XZ0wgsGOyWk