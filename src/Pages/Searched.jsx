// SEARCHED MOVIES IN HERE

import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { motion } from 'framer-motion';

import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import Movie from '../Components/Movie';

// Query 'den sonra gelen searchTerm aramayı belirler
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=`;

function Searched() {

    // USE-STATE --> Movies
    const [searched, setSearched] = useState([]);

    // GET SEARCH WORD HERE
    let params = useParams();

    // DIDMOUNT PAGE
    useEffect(() => {
        getSearch(params.search);
        window.scrollTo(0, 0);
    }, [params.search]);

    // FETCH SEARCH
    const getSearch = async (name) => {

        const moviesRespond = await fetch(SEARCH_API + name);
        const moviesData = await moviesRespond.json();

        setSearched(moviesData.results);
    }

    // grab action from GlobalContext with useContext
    const { addMovieToWatchlist, addMovieToWatched, watchlist, watched } = useContext(GlobalContext);

    return (
        <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
            {searched.length > 0 ? (
                <div className='movie-container'>
                    <h2 className='category'>Search for | {params.search}</h2>
                    <hr />
                    {searched.map((movie) => {
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
                            <div>
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
            ) : (
                <h2 className='no-movies'>No Results for Your Search</h2>
            )}

        </motion.div>
    )
}

export default Searched;
