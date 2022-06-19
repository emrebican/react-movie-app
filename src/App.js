import { BrowserRouter, Link } from 'react-router-dom';
import { BiMoviePlay } from 'react-icons/bi';
import './index.css';
import { useEffect, useState } from "react";
import { GlobalProvider } from './context/GlobalState';

import Search from "./Components/Search";
import Pages from "./Pages/Pages";
import Category from './Components/Category';
import MenuBar from './Components/Menu/MenuBar';

function App() {

  // ------- GET SCROLL POSITION ------- //
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScroll(position);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, []);
  // ------- GET SCROLL POSITION ------- //

  // If scroll Position Change
  const onchangeSc = (scroll) => {
    return scroll > 0 ? 'change-scroll-bg' : '';
  }

  return (
    <GlobalProvider>
      <BrowserRouter>
        <header id='myHeader' className={`${onchangeSc(scroll)}`}>
          <Link to="/" className='home-link'>
            <BiMoviePlay />
            <span>MovieList</span>
          </Link>

          <MenuBar />

          <div className='myList'>
            <Link className='watch-list' to="/watchlist">Watchlist</Link>
            <Link className='watch-ed' to="/watched">Watched</Link>
          </div>
          <Search />
        </header>
        <Category />
        <Pages />
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;