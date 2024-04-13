import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Header.scss'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <Link to={'/'} className="navbar-brand" href="#">CoinX</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={'/'} className="nav-link active" aria-current="page" href="#">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={'/exchange'} className="nav-link" href="#">Exchange</Link>
        </li>
        <li className="nav-item">
          <Link to={'/coins'} className="nav-link" href="#">Coins</Link>
        </li>
        
       
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Header