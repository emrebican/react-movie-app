import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import styled from "styled-components";

import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';

import Movie from "../Components/Movie";
import Slider from "../Components/Slider";

// Popular Movies
const FEATURED_API = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=`;

function Home() {

    // USE-STATE --> Movies
    const [movies, setMovies] = useState([]);
    const [numPage, setNumPage] = useState(1);

    // FETCH MOVIES
    const getMovies = async () => {
        const moviesRespond = await fetch(FEATURED_API + numPage);
        const moviesData = await moviesRespond.json();

        setMovies(moviesData.results);
    }

    // When Page DidMount
    // USE-EFFECT
    useEffect(() => {
        getMovies();
    }, [numPage]);


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
            <NumPage>
                <PrevBtn disabled={numPage < 2} onClick={() => setNumPage(numPage - 1)}><FcPrevious /> Prev </PrevBtn>
                <PageNumber>{numPage}</PageNumber>
                <NextBtn disabled={numPage > 19} onClick={() => setNumPage(numPage + 1)}> Next <FcNext /></NextBtn>
            </NumPage>
        </>
    )
}

export default Home;

const NumPage = styled.div`
    max-width: 75%;
    margin: 20px auto;
    padding: .5em 2em;
    background-color: rgba(26, 26, 46, .12);
    border-radius: 5px;
    display: flex;
    gap: 15px;
    justify-content: center;
`

const PageNumber = styled.span`
    width: 30px;
    border-radius: 5px;
    color: #1A1A2E;
    background-color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`

const PrevBtn = styled.button`
    border: none;
    color: white;
    background-color: #1A1A2E;
    padding: 5px 15px;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all ease .1s;

    /* &:active {
        background-color: #fff;
        color: #1A1A2E;
        font-weight: bold;
        box-shadow: 2px 6px 10px #1A1A2E;
    } */

    &:disabled {
        background-color: #414169;
        color: #aaa;
        cursor: unset;
    }
`

const NextBtn = styled.button`
    border: none;
    color: white;
    background-color: #1A1A2E;
    padding: 5px 15px;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all ease .1s;

    /* &:active {
        background-color: #fff;
        color: #1A1A2E;
        font-weight: bold;
        box-shadow: 2px 6px 10px #1A1A2E;
    } */

    &:disabled {
        background-color: #414169;
        color: #aaa;
        cursor: unset;
    }
`