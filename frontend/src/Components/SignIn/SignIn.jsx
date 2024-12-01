import { useState,useContext } from 'react'
import './SignIn.css'
import Navigation from './../Navigation/Navigation.jsx'
import User from "./../User/User.jsx"
import {useNavigate} from "react-router-dom";


function SignIn() {

    const navigate = useNavigate();

    const {us, loggedIn} = useContext(User);
    const [user, setUser] = us;
    const [signedIn, setSignedIn] = loggedIn;

 const handleSubmit = (event) => {
    event.preventDefault();
    // posts to api with email and password
    fetch("/api/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"email": event.target.email.value,"password":event.target.password.value})
      })
    .then(data => data.json())
    .then(d => setUser(d))
    .then(() => setSignedIn(true))
    .then(() => navigate("/"))

}


  return (
    <>
    <Navigation isForm={true}/>
    <div id="signDiv">
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit} id="sign-in">
        <div className="inputDiv">
          <label htmlFor="email">Email</label>
          <input className="signinput" id="email" name="email" type="text"/>
        </div>
        <div className="inputDiv">
          <label htmlFor="password">Password</label>
          <input className="signinput" id="password" name="password" type="password"/>
        </div>
        <input className='submitBut' name="submit" type="submit"/>
      </form>
    </div>
    </>

  )
}

export default SignIn
