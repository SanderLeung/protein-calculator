import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Link to='/groceries/details'>
      To Grocery List
    </Link>
  )
}

export default Home