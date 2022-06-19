// ALL PAGES IN HERE

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Searched from './Searched';
import Home from './Home';
import NotFound from './NotFound';
import Genres from './Genres';
import Details from './Details';
import WatchList from '../Components/Lists/WatchList';
import Watched from '../Components/Lists/Watched';

function Pages() {

  // for animation
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route exact path='/react-movie-app' element={
          <Home />
        } />
        <Route path='/search/:search' element={
          <Searched />
        } />
        <Route path='/*' element={
          <NotFound />
        } />
        <Route path='/genres/:category' element={
          <Genres />
        } />
        <Route path='/details/:name' element={
          <Details />
        } />
        <Route path='/watchlist' element={
          <WatchList />
        } />
        <Route path='/watched' element={
          <Watched />
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages;
