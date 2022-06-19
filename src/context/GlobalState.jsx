import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from './AppReducer';

// initial State
const initialState = {
    watchlist: localStorage.getItem('watchlist')
        ? JSON.parse(localStorage.getItem('watchlist'))
        : [],
    watched: localStorage.getItem('watched')
        ? JSON.parse(localStorage.getItem('watched'))
        : [],
};

// create contex
export const GlobalContext = createContext(initialState);

// ----------- GLOBAL PROVIDER ----------- //
// Provider Components
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Triggerd whenever the State is changed 
    // When a movie is added our watchlist the useEffect is treggered
    useEffect(() => {
        // LS watchlist
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));

        // LS watched
        localStorage.setItem('watched', JSON.stringify(state.watched));
    }, [state]);

    // actions -- ADD to WATCHLIST
    const addMovieToWatchlist = (movie) => {
        dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
    }

    // actions -- REMOVE from WATCHLIST
    const removeMovieFromWatchlist = (id) => {
        dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: id });
    }

    // actions -- ADD to WATCHED
    const addMovieToWatched = (movie) => {
        dispatch({ type: 'ADD_MOVIE_TO_WATCHED', payload: movie });
    }

    // actions -- MOVEBACK to WATCHLIST
    const moveToWatchlist = (movie) => {
        dispatch({ type: 'MOVE_TO_WATCHLIST', payload: movie });
    }

    // actions -- REMOVE from WATCHED
    const removeFromWatched = (id) => {
        dispatch({ type: 'REMOVE_FROM_WATCHED', payload: id });
    }

    return (
        // GlobalContext.Provide value içerisindeki değerlere, diğer componentlardan ulaşabiliriz
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                addMovieToWatchlist,
                removeMovieFromWatchlist,
                addMovieToWatched,
                moveToWatchlist,
                removeFromWatched
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}