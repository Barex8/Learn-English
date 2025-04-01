import { useState } from 'react'
import './App.css'
import Header from './Header'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import { News, Home } from './Routes';
import Vocabulary from './Vocabulary';

function App() {

  return (<>
    <Router>
      <Header />
      <NavBar />
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/Vocabulary" element = {<Vocabulary />} />
        </Routes>
    </Router>
      
    </>)
}

export default App
