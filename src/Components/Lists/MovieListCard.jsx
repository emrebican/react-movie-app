// CARD for our WATCHLIST

import React from 'react';
// import MovieControls from './MovieControls';

const IMAGE_API = "https://image.tmdb.org/t/p/w200";

const MovieListCard = ({ movie, type, noImage }) => {

  // RATING COLOR
  const onVoteClass = (vote) => {
    return vote >= 8 ? 'green' : vote >= 6 ? 'orange' : 'red';
  }

  return (
    <div className='movie'>
      {/* <MovieControls type={type} movie={movie} /> */}
      <img src={movie.poster_path ? (IMAGE_API + movie.poster_path) : noImage} alt="" />
      <div className='movie-info'>
        <h3>{movie.title.length > 12 ? `${movie.title.slice(0, 12)} ...` : movie.title}</h3>
        <span className={`tag ${onVoteClass(movie.vote_average)}`}>{movie.vote_average}</span>
      </div>
      <div className='movie-overview'>
        <h4>{movie.title}</h4>
        <p>{movie.overview.length > 200 ? `${movie.overview.slice(0, 200)} ...` : movie.overview}</p>
      </div>
    </div>
  )
}

MovieListCard.defaultProps = {
  noImage: 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200'
}

export default MovieListCard;
