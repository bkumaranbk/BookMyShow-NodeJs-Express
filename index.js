const MoviesModel = require("./database/movies");
const UserModel = require("./database/users");
require('dotenv').config()
const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));

// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the BookMyShow`});
});

/*
Route            /movies
Description      Get all the movies
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
// http://localhost:3000/movies
app.get("/movies", async (req, res) => {
    const getAllMovies = await MoviesModel.find();
    return res.json(getAllMovies);
});


/*
Route            /movies/1wefvwevewewv
Description      Get sinlge movie details in Movies collection
Access           PUBLIC
Parameter        NONE
Methods          get
*/
// http://localhost:3000/movies/1wefvwevewewv
app.get("/movies/:id", async (req, res) => {

    const { id } = req.params;
    const getSingleMovies = await MoviesModel.findOne( {_id: id} );
    // if (getSingleMovies === null) {
    //     return res.json({ "error": `No Movies found for the Id of ${id}` });
    // }
    return res.json(getSingleMovies);
});


/*
Route            /user-register
Description      Post sinlge user details in users collection
Access           PUBLIC
Parameter        NONE
Methods          POST
*/
// http://localhost:5000/user-register
app.post("/user-register", async (req, res) => {
    const addNewUser = await UserModel.create(req.body);
    return res.json( {userAdded: addNewUser, message: "User was added !!!"} );
});

app.listen(5000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});


