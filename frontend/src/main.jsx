import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App.jsx'
import data from "./assets/data/movies.json"

createRoot(document.querySelector('main')).render(
  
    <App />,
)
