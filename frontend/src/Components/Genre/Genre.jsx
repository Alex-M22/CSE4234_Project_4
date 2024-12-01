import { useState, useEffect } from 'react'
import './Genre.css'
import Movies from './../Movies/Movies.jsx'


function Genre(props) {

  // Use state variables
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errs, setErrs] = useState(null);

  let mov = [];
  // When rendered
  useEffect(() => {
    //Post to backend to get the top ten
    // movies from genre
    fetch("./api/getTopTen", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      // the genre name is sent to backend
      body: JSON.stringify({
       "genre": props.genre
      })
    })
    .then(res => res.json())
    .then((result) => {
        // save the movies into an array
        result.map(one => mov.push(one));


          // from the slides
        setLoading(false);
        setMovies(mov);
    },
    (error) => {
        setLoading(false);
        setErrs(error);
    })}, {});

    if (errs) {
        return <div>Error occurred: {errs.message} </div>;
    } else if (loading) {
        return <div> Loading Movies... </div>;
    } else {

      return (
        <>
        <h4 className="genreTitle">{props.genre}</h4>
        <div className="genre">
            {movies.map(movie => {
                return <Movies data={movie}/>;
            })}
        </div>
        </>
      )
    }
}
    

export default Genre
