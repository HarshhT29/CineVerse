import React from 'react'
import "./style.css"
import HeroBanner from './heroBanner/HeroBanner'
HeroBanner
const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner />
      {/* <div className="h-[1000px]"></div> */}
    </div>
  )
}

export default Home
