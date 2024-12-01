import { useState, useContext } from 'react'
import './MainLayout.css'
import Navigation from './../Navigation/Navigation.jsx'
import MoviesHolder from './../MoviesHolder/MoviesHolder.jsx'
import User from "./../User/User.jsx"
import CookieBanner from './../CookieBanner/CookieBanner.jsx'



function MainLayout() {

  // Get variables from context
  const {us, loggedIn, dis} = useContext(User);
  const [user, setUser] = us;
  const [signedIn, setSignedIn] = loggedIn;
  const [dismiss, setDismiss] = dis;




  // Show cookie banner on default
  if (!dismiss) {
    return (
      <>
        <Navigation isMain={true}/>
        <MoviesHolder/> 
        <CookieBanner/>
    
      </>)
  } else {

  
  // Dont show cookie banner if it has been shown and dismissed
  return (
    <>
      <Navigation isMain={true}/>
      <MoviesHolder/> 
    </>
  )}
}

export default MainLayout
