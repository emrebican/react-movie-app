import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { motion } from 'framer-motion';
import '../css/movie_css/movie.css';

import MovieListCard from './MovieListCard';
import MovieControls from './MovieControls';

const WatchList = () => {

    // We can reach watchlist with useContext(GlobalContext)
    const { watchlist } = useContext(GlobalContext);

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {watchlist.length > 0 ? (
                <div className="movie-container">
                    <span className='count-movie'>
                        {watchlist.length} {watchlist.length > 1 ? 'Movies' : 'Movie'}
                    </span>
                    {watchlist.map((movie) => {
                        return (
                            <div key={movie.id} className="inner-buttons">
                                <MovieControls type='watchlist' movie={movie} />

                                <Link to={'/details/' + movie.id} >
                                    <MovieListCard movie={movie} type='watchlist' />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            ) : (<h2 className="no-movies">No Movies in Your Watchlist</h2>)}
        </motion.div>
    )
}

export default WatchList;