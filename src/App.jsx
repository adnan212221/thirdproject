import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home';
import Exchange from './components/Exchange';
import Coins from './components/Coins';
import Coindetails from './components/Coindetails';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/exchange' element={<Exchange />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/coin/:id' element={<Coindetails />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App