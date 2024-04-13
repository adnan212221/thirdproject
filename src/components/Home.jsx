import React from 'react'
import '../style/Home.scss'
import img1 from '../assets/homebanner.jpg'

const Home = () => {
  return (
    
    <div className="container-fluid mainpage">
      <img src={img1} alt="homebanner" width={'100%'} height={'100%'} />
      <h1>Coin X</h1>

    </div>

  )
}

export default Home