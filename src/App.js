import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import Home from './Home'; 
import TvShowsPage from './TVShowsPage';
import MoviesPage from './MoviesPage';
import MovieDetails from './MovieDetails';
import TVShowDetails from './TVShowDetails';
function App() {
  
  return (
    <Router>
      <div className="App">
        <header className="navbar">
          <nav>
         <Link to="/" className="nav-link">Home</Link>
         <Link to="/movies" className="nav-link">Movies</Link>
         <Link to="/tvshows" className="nav-link">TV Shows</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tvshows" element={<TvShowsPage />} />
          <Route path="/movies/:id" element={<MovieDetails />} /> 
          <Route path="/tvshows/:id" element={<TVShowDetails />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
