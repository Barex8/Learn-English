import { useState } from 'react'
import './App.css'
import { ObtenerDatos } from './FireStoreManager'
import Header from './Header'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import { News, Home } from './Routes';

function App() {

  return (<>
    <Router>
      <Header />
      <NavBar />
        
        <button onClick={ObtenerDatos} > Obten los datos</button>

        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="./Header" element = {<News />} />
        </Routes>
    </Router>
      
    </>)
}

export default App
