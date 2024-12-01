// Imports
import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from './../Register/Register.jsx';
import SignIn from './../Signin/SignIn.jsx';
import User from './../User/User.jsx'
import MainLayout from './../MainLayout/MainLayout.jsx'
import UserAccount from './../UserAccount/UserAccount.jsx'



function App() {

  // Create variables to pass to context
  const [dismiss, setDismiss] = useState(false);
  const [user, setUser] = useState({});
  const [signedIn, setSigned] = useState(false);

  // When app is rendered, check if there are cookies
  useEffect(() => {
    fetch("/api/get-session", {
        method: "GET"})
    .then(
      res => res.json())
    .then(d => {
      if (d.noUser) {
        return;
      } else {
        setUser(d);
        setSigned(true);
      }
    })


  },[]);


    // Pass to child nodes for context
  return (

    <BrowserRouter>
    <User.Provider value={{us: [user, setUser], loggedIn :[signedIn, setSigned], dis:[dismiss, setDismiss]}}>
        <Routes>
            <Route path="/" element={<MainLayout/>} /> 
            <Route path="/register" element={<Register/>}/> 
            <Route path="/sign-in" element={<SignIn/>}/> 
            <Route path="/account" element={<UserAccount/>}/>
        </Routes>
    </User.Provider>
    </BrowserRouter>
  )
}

export default App;
