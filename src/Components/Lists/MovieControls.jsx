// DELETE and ADD TO WATCHEDLIST BUTTONS

import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import '../css/movie_css/movie.css';

import { FaTimes } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const MovieControls = ({ movie, type }) => {

    // grab action from GlobalContext with useContext
    const {
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched } = useContext(GlobalContext);

    return (
        <div className="inner-card-controls">
            {type === 'watchlist' && (
                <>
                    <button
                        className="ctrl-btn"
                        onClick={() => addMovieToWatched(movie)}
                    >
                        <FaEye />
                    </button>

                    <button
                        className="ctrl-btn"
                        onClick={() => removeMovieFromWatchlist(movie.id)}
                    >
                        <FaTimes />
                    </button>
                </>
            )}

            {/* // DELETE and MOVEBACK TO WATCHEDLIST BUTTONS */}

            {/*  TYPE: WATCHED ise */}
            {/* WATCHED listesinden kaldırıp WATCHLIST'e eklemek için buton */}
            {/* WATCHED listesinden de tamamen silmek için buton */}
            {type === 'watched' && (
                <>
                    <button
                        className="ctrl-btn"
                        onClick={() => moveToWatchlist(movie)}
                    >
                        <FaEyeSlash />
                    </button>

                    <button
                        className="ctrl-btn"
                        onClick={() => removeFromWatched(movie.id)}
                    >
                        <FaTimes />
                    </button>
                </>
            )}

        </div>
    )
}

export default MovieControls;