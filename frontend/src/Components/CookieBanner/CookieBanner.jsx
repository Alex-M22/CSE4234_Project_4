import { useState, useContext } from 'react'
import './CookieBanner.css'
import User from "./../User/User.jsx"

function CookieBanner() {

  const {us, loggedIn, dis} = useContext(User);
    const [dismiss, setDismiss] = dis;


  // Make the banner disappear when the dismiss button is clicked
  const goAway = () => {
    setDismiss(true)
    let banner = document.querySelector("#cookieBanner");
    banner.style.display = 'none';

  }


  return (
    <div id="cookieBanner">
      <h5>Privacy and cookies</h5>
      <p>We use cookies on this website. Your interactions and personal data may be collected for in-site purposes only.</p>
      <button id='cookieDismiss' onClick={goAway}>Dismiss</button>
    </div>
  )
}

export default CookieBanner
