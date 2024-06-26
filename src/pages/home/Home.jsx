import React from 'react'
import "./style.css"
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './Trending'
import Popular from './Popular'
import TopRated from './TopRated'

const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home
