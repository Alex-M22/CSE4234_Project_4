import { useState, useContext } from 'react'
import './UserAccount.css'
import Navigation from './../Navigation/Navigation.jsx'
import User from "./../User/User.jsx"
import {useNavigate} from "react-router-dom";
import Movies from "./../Movies/Movies.jsx"

function UserAccount() {
    // use state
    const {us, loggedIn} = useContext(User);
    const [user, setUser] = us;
    const [signedIn, setSignedIn] = loggedIn;

    // Navigate back to index page
    const navigate = useNavigate();
    const toMain = () => {
        navigate("/");
    }

    console.log(user.likedMovies)

  if (signedIn) {
  // Acts like a Genre Tag with the 
  // given name "Liked Movies" and doesn't use a prop
  return (
    <>
    <Navigation/>
    <h4 id='userTitle'>Liked Movies</h4>
    <div id="userDiv">
      {
        user.likedMovies.map(movie => {
          return <Movies data={movie}/>;

        })
      }
    </div>
    </>
  )
  } else {
    return(
        <div>
          <h1>Access to this page is not allowed</h1>
          <p>Click here to return to index</p>
          <button onClick={toMain}>Back to Index</button>
        </div>
      )
  }
}

export default UserAccount;
