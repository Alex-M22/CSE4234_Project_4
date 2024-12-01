const express = require('express');
const router = express.Router();

// Import functions
const {getAllMovies, getGenres, getTopTen, rmAll, rmUsers} = require("./../controllers/getMovies.js");
const {createUser, signIn, unlikeMovie, likeMovie} = require("./../controllers/createUser.js");
const {validateUser, validateSignIn} = require("./../middleware/userVal.js");
const {getSession} = require("./../controllers/cookies.js")


// Route
router.get("/getMovies", getAllMovies);
router.get("/getGenres", getGenres);
router.post("/getTopTen", getTopTen);
router.post("/register", validateUser, createUser);
router.post("/sign-in", validateSignIn, signIn);
router.get("/rmAllDB", rmAll);
router.get("/rmUsers", rmUsers);
router.get("/get-session", getSession);
router.post("/likeMovie", likeMovie)
router.post("/unlikeMovie", unlikeMovie)


module.exports = router;


