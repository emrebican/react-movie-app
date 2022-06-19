import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { motion } from 'framer-motion';
import '../css/movie_css/movie.css';

import MovieListCard from './MovieListCard';
import MovieControls from './MovieControls';

const Watched = () => {

    // We can reach watched with useContext(GlobalContext)
    const { watched } = useContext(GlobalContext);

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {watched.length > 0 ? (
                <div className="movie-container">
                    <span className='count-movie'>
                        {watched.length} {watched.length > 1 ? 'Movies' : 'Movie'}
                    </span>
                    {watched.map((movie) => {
                        return (
                            <div key={movie.id} className="inner-buttons">
                                <MovieControls type='watched' movie={movie} />

                                <Link to={'/details/' + movie.id} >
                                    <MovieListCard movie={movie} type='watched' />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            ) : (<h2 className="no-movies">No Movies in Your Watched List</h2>)}
        </motion.div>
    )
}

export default Watched;