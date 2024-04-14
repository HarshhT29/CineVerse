import React from 'react'
import "./style.css"
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './Trending'
const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
      {/* <div className="h-[1000px]"></div> */}
    </div>
  )
}

export default Home
