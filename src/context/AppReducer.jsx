export default (state, action) => {
    switch (action.type) {
        case 'ADD_MOVIE_TO_WATCHLIST':
            return {
                ...state,
                watchlist: [action.payload, ...state.watchlist],
            }
        case 'REMOVE_MOVIE_FROM_WATCHLIST':
            return {
                ...state,
                watchlist: state.watchlist.filter((movie) => movie.id !== action.payload),
            }
        case 'ADD_MOVIE_TO_WATCHED':
            return {
                ...state,
                // REMOVE from WATCHLIST and
                watchlist: state.watchlist.filter((movie) => movie.id !== action.payload.id),
                // then ADD WATCHED
                watched: [action.payload, ...state.watched],
            }
        case 'MOVE_TO_WATCHLIST':
            return {
                ...state,
                // REMOVE from WATCHED then
                watched: state.watched.filter((movie) => movie.id !== action.payload.id),
                // then MOVE WATHCLIST
                watchlist: [action.payload, ...state.watchlist],

            }
        case 'REMOVE_FROM_WATCHED':
            return {
                ...state,
                // REMOVE from WATCHED
                watched: state.watched.filter((movie) => movie.id !== action.payload),
            }
        default:
            return state;
    }
}