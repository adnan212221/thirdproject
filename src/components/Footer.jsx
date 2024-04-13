import React from 'react'
import '../style/footer.scss'
import img2 from '../assets/footer.jpg'

const Footer = () => {
  return (
    <div className="container-fluid mainfooter">

        <div className="d-flex footer2">
            <p>About us : we are the best crypto trading app</p>
            <img src={img2} alt="" width={'80px'} height={'80px'}  />
        </div>

    </div>
    
  )
}

export default Footer