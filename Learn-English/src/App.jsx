import { useState } from 'react'
import './App.css'
import Header from './Header'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Vocabulary from './Vocabulary';
import AddVocabularyWord from './AddVocabularyWord';
import Login from './Login';

function App() {

  return (<>
    <Router>
      <Header />
      <NavBar />
        <Routes>
          <Route path="/Login" element = {<Login />} />
          <Route path="/Vocabulary" element = {<Vocabulary />} />
          <Route path="/AddVocabularyWord" element = {<AddVocabularyWord />} />
        </Routes>
    </Router>
      
    </>)
}

export default App
