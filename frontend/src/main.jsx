import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App.jsx';
import { useState, } from 'react';
import React from 'react';


// Root of react components
// Strict mode is very important when it comes to 
// compatibility with node
createRoot(document.querySelector('main')).render(
    <React.StrictMode>
    <App/>
    </React.StrictMode>,

)
