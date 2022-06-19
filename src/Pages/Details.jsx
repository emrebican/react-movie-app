import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// const FEATURED_API = `https://api.themoviedb.org/3/movie/${nameId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

const IMAGE_API = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

function Details({ noImage }) {

  const [details, setDetails] = useState({});

  let params = useParams();

  const getDetails = async () => {
    const moviesRespond = await fetch(`https://api.themoviedb.org/3/movie/${params.name}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

    const moviesData = await moviesRespond.json();

    console.log(moviesData)
    setDetails(moviesData);
  }

  useEffect(() => {
    getDetails(params.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='details'>
        <img className='movie_image' src={details.poster_path ? IMAGE_API + details.poster_path : noImage} alt="" />

        <div className='content'>
          <div className="info">
            <h2>{details.title}</h2>
            <h4>{details.tagline}</h4>
            <p>{details.overview}</p>
          </div>
          <div className="index">
            <small>Rating <br /><span>{details.vote_average}</span></small>
            <small>Language<br /><span>{details.original_language}</span></small>
            <small className='release'>Release Date<br /><span>{details.release_date ? details.release_date.substring(0, 4) : '-'}</span></small>
            <small className='duration'>Duration<br /><span>{
              details.runtime > 240 ? `4h ${details.runtime - 240}`
                : details.runtime > 180 ? `3h ${details.runtime - 180}`
                  : details.runtime > 120 ? `2h ${details.runtime - 120}`
                    : details.runtime > 60 ? `1h ${details.runtime - 60}`
                      : details.runtime
            } min</span></small>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

Details.defaultProps = {
  noImage: 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
}

export default Details;
