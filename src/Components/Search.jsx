import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/search.css';
import { FiSearch } from 'react-icons/fi';

function Search() {
    // USE-STATE --> Input Value
    const [searchTerm, setSearchTerm] = useState('');

    // GET SEARCH WORD FROM URL
    const navigate = useNavigate();

    // FORM
    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm && searchTerm.trim()) {
            // in url .../search/search word
            navigate("/search/" + searchTerm);

            setSearchTerm('');
        }
    }

    // INPUT VALUE
    const onHandleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <form onSubmit={onHandleSubmit}>
            <FiSearch style={{
                position: 'relative',
                color: '#aaa',
                top: '2px',
                left: '30px',
            }} />
            <input
                type="search"
                placeholder='Search a movie'
                className='search'
                value={searchTerm}
                onChange={onHandleChange}
            />
        </form>
    )
}

export default Search;