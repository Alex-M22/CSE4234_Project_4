import { useState, useContext} from 'react'
import './Navigation.css'
import {useNavigate} from "react-router-dom";
import User from "./../User/User.jsx"

function Navigation(props) {

    // navigation and use context
    const navigate = useNavigate();
    const {us, loggedIn} = useContext(User);
    const [user, setUser] = us;
    const [signedIn, setSignedIn] = loggedIn;

    // uses navigation to go to account
    const toAccount = () => {
        navigate("/account");
    }

    // uses navigation to go to index
    const toMain = () => {
        navigate("/")
    }

    // uses navigation to go to register
    const toReg = () => {
        navigate("/register");
    }

    // uses navigation to go to sign in
    const toSignIn = () => {
        navigate("/sign-in");
    }


    // if signed in and on main page
    if (signedIn && props.isMain) {
        // return useraccount button
        return (
            <nav>
                <button className="navButton" id="UANav" onClick={toAccount}>Welcome, {user.firstName}</button>
            </nav>
            ) 
    // if on main page and not signed in
    } else if (props.isMain) {
        // return sign in and register
        return (
            <nav>
                <button className="navButton" id="SignNav" onClick={toSignIn}>Sign In</button>            
                <button className="navButton" id="RegNav" onClick={toReg}>Register</button>
            </nav>
            )
    // if one of form pages
    } else if (props.isForm) {
        // return and render a back button
        return (
            <nav>
                <button className="navButton" id ="backButton" onClick={toMain}>Back to Main</button>
            </nav>
            )

    } else {
        return (
            <nav>
                <button className="navButton" id ="backButton" onClick={toMain}>Back to Main</button>
            </nav>

        )
    }



}

export default Navigation
