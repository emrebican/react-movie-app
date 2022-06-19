import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './MenuBar.css';

const MenuBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <nav className="navbar">
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/genres/28' className='nav-links' onClick={closeMobileMenu}>
                            Action
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/16' className='nav-links' onClick={closeMobileMenu}>
                            Animation
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/35' className='nav-links' onClick={closeMobileMenu}>
                            Comedy
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/80' className='nav-links' onClick={closeMobileMenu}>
                            Crime
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/18' className='nav-links' onClick={closeMobileMenu}>
                            Drama
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/99' className='nav-links' onClick={closeMobileMenu}>
                            Documentary
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/27' className='nav-links' onClick={closeMobileMenu}>
                            Horror
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/10402' className='nav-links' onClick={closeMobileMenu}>
                            Music
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/10749' className='nav-links' onClick={closeMobileMenu}>
                            Romance
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/878' className='nav-links' onClick={closeMobileMenu}>
                            Sci-Fi
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/10752' className='nav-links' onClick={closeMobileMenu}>
                            War
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/genres/37' className='nav-links' onClick={closeMobileMenu}>
                            Western
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MenuBar
