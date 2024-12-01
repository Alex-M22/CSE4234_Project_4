//imports
import { useState, useEffect } from 'react'
import './MoviesHolder.css'
import Genre from './../Genre/Genre.jsx'


function MoviesHolder() {

  // Usestate consts
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errs, setErrs] = useState(null);

  let gen = [];

  useEffect(() => {
    // when rendered get all the genres
    fetch("./api/getGenres", {
      method: "GET"
    })
    .then(res => res.json())
    .then((result) => {
      // save to an array
      result.map(one => {gen.push(one)});

      // from the slides
      setLoading(false);
      setGenres(gen);
      },
      (error) => {
          setLoading(false);
          setErrs(error);
      }
    )
  }, []);

  if (errs) {
      return <div>Error occurred: {errs.message}</div>;
  } else if (loading) {
      return <div>Loading Genres...</div>;
  } else {

        return (
          <div className="moviesHolder">
            {genres.map(genre => {
              return <Genre genre={genre}/>;
            })}
          </div>
        )
  }
}

export default MoviesHolder;
