import { NavLink } from 'react-router-dom';

import './css/category.css';

function Category() {

  return (
    <div className='categories'>
      <NavLink to={'/genres/28'}>Action</NavLink>
      <NavLink to={'/genres/16'}>Animation</NavLink>
      <NavLink to={'/genres/35'}>Comedy</NavLink>
      <NavLink to={'/genres/80'}>Crime</NavLink>
      <NavLink to={'/genres/18'}>Drama</NavLink>
      <NavLink to={'/genres/99'}>Documentary</NavLink>
      <NavLink to={'/genres/27'}>Horror</NavLink>
      <NavLink to={'/genres/10402'}>Music</NavLink>
      <NavLink to={'/genres/10749'}>Romance</NavLink>
      <NavLink to={'/genres/878'}>Sci-Fi</NavLink>
      <NavLink to={'/genres/10752'}>War</NavLink>
      <NavLink to={'/genres/37'}>Western</NavLink>
    </div>
  )
}

export default Category
