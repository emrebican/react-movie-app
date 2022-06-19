import React from 'react';

import './css/movie_css/movie.css';

const IMAGE_API = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

const Movie = ({ title, poster_path, overview, vote_average, noImage }) => {

    // RATING COLOR
    const onVoteClass = (vote) => {
        return vote >= 8 ? 'green' : vote >= 6 ? 'orange' : 'red';
    }

    return (
        <div className='movie'>
            <img src={poster_path ? (IMAGE_API + poster_path) : noImage} alt="" />
            <div className='movie-info'>
                {/* <h3>{title.length > 12 ? `${title.slice(0, 12)} ...` : title}</h3> */}
                <span className={`tag ${onVoteClass(vote_average)}`}>{vote_average}</span>
            </div>

            <div className='movie-overview'>
                <h4>{title}</h4>
                <p>{overview.length > 200 ? `${overview.slice(0, 200)} ...` : overview}</p>
            </div>
        </div>
    )
}

Movie.defaultProps = {
    noImage: 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
}

export default Movie;