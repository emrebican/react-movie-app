import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { Link } from 'react-router-dom';
import '@splidejs/react-splide/css';
import { useEffect, useState } from "react";

import './css/slider_css/slider.css';

const SLIDE_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

const IMAGE_API = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

function Slider({ noImage }) {

    const [slide, setSlide] = useState([]);

    const getSlider = async () => {
        const slideRespond = await fetch(SLIDE_API);
        const slideData = await slideRespond.json();

        setSlide(slideData.results);
    }

    useEffect(() => {
        getSlider();
    }, []);

    // RATING COLOR
    const onVoteClass = (vote) => {
        return vote >= 8 ? 'green' : vote >= 6 ? 'orange' : 'red';
    }

    const optionsSlider = {
        perPage: 5,
        arrows: false,
        pagination: false,
        drag: 'free',
        width: '74%',
        gap: '2.6rem',
        autoplay: true,
        // type: 'loop',
        pauseOnHover: 'true',
        resetProgress: true,
        focus: true,
    }

    return (
        <Splide className="wrapper" options={optionsSlider} hasTrack={false}>
            <h2>Upcoming Movies</h2>
            <SplideTrack>
                {slide.map((movie) => (
                    <SplideSlide key={movie.id}>
                        <Link to={'/details/' + movie.id}>
                            <div className="card">
                                <img src={movie.poster_path ? IMAGE_API + movie.poster_path : noImage} alt="" />
                                <h4>{movie.title}</h4>
                                <div className={`vote ${onVoteClass(movie.vote_average)}`}>{movie.vote_average}</div>
                            </div>
                        </Link>
                    </SplideSlide>
                ))}
            </SplideTrack>
        </Splide>
    )
}

Slider.defaultProps = {
    noImage: 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
}

export default Slider;
