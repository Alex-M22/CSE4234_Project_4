import { useState, useContext } from 'react'
import './Register.css'
import Navigation from './../Navigation/Navigation.jsx'
import User from "./../User/User.jsx"
import {useNavigate} from "react-router-dom";



function Register() {

    const navigate = useNavigate();
    const {us, loggedIn} = useContext(User);
    const [user, setUser] = us;
    const [signedIn, setSignedIn] = loggedIn;

    let incorrectForm = false;

  // when submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    // post to api
    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // send data from form
        body: JSON.stringify({
          'fName':event.target.fName.value,
          'lName': event.target.lName.value,
          "email": event.target.email.value,
          "password":event.target.password.value})
      })
    .then(data => data.json())
    .then(d => {
      if (d.message === "error"){
        incorrectForm = true;
      } else {
        incorrectForm = false;
      }
      setUser(d)})
    .then(() => setSignedIn(true))
    .then(() => navigate("/sign-in")) // go to sign in after registering to actually sign in

}


  return (
    <>
    <Navigation isForm={true}/>
    <div id="regDiv">
      <h3>Register</h3>
      <form onSubmit={handleSubmit} id='regForm'>
      <div className='inputDiv'>
        <label htmlFor="fName">First Name</label>
        <input className="regInput" id="fName" name="fName" type="text"/>
      </div>
      <div className='inputDiv'>
        <label htmlFor="lName">Last Name</label>
        <input className="regInput" id="lName" name="lName" type="text"/>
       </div>
       <div className='inputDiv'> 
        <label htmlFor="email">Email</label>
        <input className="regInput" id="email" name="email" type="text"/>
       </div>
       <div className='inputDiv'> 
        <label htmlFor="password">Password</label>
        <input className="regInput" id="password" name="password" type="password"/>
       </div> 
        <input className='submitBut' name='submit' type="submit"/>
        {() => {if (incorrectForm) {
          <p>Filled out form incorectly</p>
        }}}
      </form>
      <p id="subnote">*You will be redirected to the sign in page once you click register</p>
    </div>
    </>
  )
}

export default Register
