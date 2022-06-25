import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import Movie from "../Components/Movie";
import Slider from "../Components/Slider";

// Popular Movies
const FEATURED_API = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

function Home() {

    // USE-STATE --> Movies
    const [movies, setMovies] = useState([]);

    // FETCH MOVIES
    const getMovies = async () => {
        const moviesRespond = await fetch(FEATURED_API);
        const moviesData = await moviesRespond.json();

        setMovies(moviesData.results);
    }

    // When Page DidMount
    // USE-EFFECT
    useEffect(() => {
        getMovies();
    }, []);


    // grab action from GlobalContext with useContext
    const {
        addMovieToWatchlist,
        addMovieToWatched,
        watchlist,
        watched } = useContext(GlobalContext);

    return (
        <>
            <Slider />

            <div className="movie-container">
                {movies.map((movie) => {

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
                            <Link to={'/details/' + movie.id} >
                                <Movie {...movie} movie={movie} />
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
        </>
    )
}

export default Home
