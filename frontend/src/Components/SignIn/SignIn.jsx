import React, { useState } from 'react'
import './SignIn.css'

function SignIn() {

  const formElement= document.querySelector('.form');
  formElement.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(formElement);
    const data = new URLSearchParams(formData)

    // not sure where to fetch to
    fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      body: data
    }).then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
  });

  return (
      <>
        <form>
          <input name="firstName" type="text" placeholder="First Name"/>
          <input name="lastName" type="text" placeholder="Last Name"/>
          <input name="email" type="text" placeholder="Email Address"/>
          <input name="password" type="password" placeholder="Password"/>
          <button type="submit">Submit
            <button/>
        </form>
      </>
)
}

export default SignIn
