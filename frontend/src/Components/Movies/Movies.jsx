import { useState, useContext, useEffect } from 'react'
import './Movies.css'
import User from "./../User/User.jsx"
import Image from "../../assets/images/defaultPoster.png"

function Movies(props) {

  // Calculate hours and minutes from seconds
  let minutes = Number(Math.floor(props.data.length / 60));
  const hours = Number(Math.floor(minutes / 60));
  const rem = (minutes % 60).toString().padStart(2,'0');

    // Grab from use context
    const {us, loggedIn} = useContext(User);
    const [user, setUser] = us;
    const [signedIn, setSignedIn] = loggedIn;

    // Check if a movie is liked or not
    function checkMovie() {
      let f = true;

        user.likedMovies.map(movie => {

          if (props.data.title === movie.title && props.data.year == movie.year) {
            f = false;
          }
        })

      return f;

    }



    // Returns "add" or "remove" based on if a movie is liked by user 
    function notInLiked() {
      if (!signedIn) {
        return "Add to Favorites";
      }

      let o = 'Add to Favorites'
      user.likedMovies.map(movie => {
        if (props.data.title === movie.title && props.data.year == movie.year) {
          o = "Remove from Favorites";
        }
      })
      return o;
    }


  // when "add to favorites" is clicked
  const handleClick = (event) => {
    // check if already favorited
    if (signedIn && checkMovie()) {
      // if not then like the movie
      fetch("/api/likeMovie", {
        method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
        body: JSON.stringify({
          "title": props.data.title,
          "year": props.data.year
        })
      }).then(res => res.json())
      .then(newUser => {
          setUser(newUser);
      })
    } else if (signedIn) {
      // if so then unlike the movie
      fetch("/api/unlikeMovie", {
      method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
      body: JSON.stringify({
        "title": props.data.title,
        "year": props.data.year
      })
    }).then(res => res.json())
    .then(newUser => {
        setUser(newUser);
    })
    }else {
      alert("Register/Sign in to like movies!")
    }

  }


  // Return card
  return (
    <div className="movieTile">
      <img src={props.data.image} onError={event => {
        event.target.src = Image;
        event.onerror = null
      }}/>
      <h5>{props.data.title}</h5>
      <p>Rating: {props.data.rating}</p>
      <p>Duration: {hours}h {rem}m</p>
      <button>View Movie</button>
      <button onClick={handleClick}>{notInLiked()}</button>
    </div>
  )
}

export default Movies
