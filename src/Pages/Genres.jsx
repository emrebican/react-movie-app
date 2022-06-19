import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { motion } from 'framer-motion';

import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import Movie from '../Components/Movie';

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_genres=`;

function Genres() {

  const [genres, setGenres] = useState([]);

  let params = useParams();

  const getGenres = async (genre_id) => {
    const moviesRespond = await fetch(FEATURED_API + genre_id);
    const moviesData = await moviesRespond.json();

    setGenres(moviesData.results);
  }

  useEffect(() => {
    getGenres(params.category);
    window.scrollTo(0, 0);
  }, [params.category]);

  let m = params.category;

  // grab action from GlobalContext with useContext
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    watchlist,
    watched } = useContext(GlobalContext);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='movie-container'>
        <h2 className='category'>{
          m === '28' ? 'Action' :
            m === '16' ? 'Animation' :
              m === '35' ? 'Comedy' :
                m === '80' ? 'Crime' :
                  m === '18' ? 'Drama' :
                    m === '99' ? 'Documentary' :
                      m === '27' ? 'Horror' :
                        m === '10402' ? 'Music' :
                          m === '10749' ? 'Romance' :
                            m === '878' ? 'Sci-Fi' :
                              m === '10752' ? 'War' :
                                m === '37' ? 'Western' : ''
        } Movies</h2>
        <hr />
        {genres.map((movie) => {

          // _________________________ BUTTON DISABLED _________________________ //
          // watchlist'te zaten aynı film varsa butonu deactive et
          // watchlistte movie.id ile aynı id'ye sahip filmi bul
          let storedMovie = watchlist.find((stored) => stored.id === movie.id);
          let storedWatched = watched.find((stored) => stored.id === movie.id);

          // eğer varsa true / yoksa false dön
          // boolean değerini button--- disabled attribute'unda kullan
          const watchlistDisabled = storedMovie || storedWatched ? true : false;

          const watchedDisabled = storedWatched ? true : false;
          // _________________________ BUTTON DISABLED _________________________ //

          return (
            <div key={movie.id}>
              <Link to={'/details/' + movie.id} key={movie.id} >
                <Movie {...movie} />
              </Link>
              <div className="watch-buttons">
                <button
                  className={watchlistDisabled ? 'watchlist-btn-disabled' : 'watchlist-btn'}
                  disabled={watchlistDisabled}
                  onClick={() => addMovieToWatchlist(movie)}
                >
                  <BsFillPlusSquareFill /> Watchlist
                </button>

                <button
                  className={watchedDisabled ? 'watchlist-btn-disabled' : 'watchlist-btn'}
                  disabled={watchedDisabled}
                  onClick={() => addMovieToWatched(movie)}
                >
                  <BsFillPlusCircleFill /> Watched
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Genres;
