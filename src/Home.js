import React, { useState, useEffect } from 'react';
import { getMovieTitles } from './MoviesList'; 
import Movies from './Movies';
import axios from 'axios';
import TrendingMovies from './TrendingMovies';

const API_KEY = '7c39292dfdmsh9eb86ff59e4d473p113fb0jsn55f44db05c63';

function Home() {
    const [movies, setMovies] = useState([]); // State to hold movie titles
  const [trendingMovies, setTrendingMovies] = useState([]); // State to hold movie titles
  const [searchMovies, setSearchMovies] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showTrending, setShowTrending] = useState(true); 
  const fetchMovies = async (SearchMovie) => {
    setLoading(true);
    try {
      // const response = await fetch('https://api.example.com/movies'); // Replace with your API URL
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const url = `https://api.themoviedb.org/3/search/movie?query=${SearchMovie}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzc4MzI4M2M1NTA2ODNmMmE5ZmM1NDZlNGY3MTNkNyIsIm5iZiI6MTcyOTY5Mjk3NC40MzA3MjUsInN1YiI6IjY3MTkwNDhlNzY5MTA3ZDc3YjQ3NWJkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e02pNt4uA6HN6Fb4nHCKR712OEJQCwBtOcM8WZr3imI'
        }
      };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log("result --------->", result.results);
      // const data = await response.json(); // Parse JSON data
      setMovies(result.results); // Set the movies state with fetched data
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }finally {
      setLoading(false);
    }
  };
  // Debounced Search with useEffect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        setShowTrending(false); // Switch to search results view
        fetchMovies(searchTerm);
      } else {
        setShowTrending(true); // Show trending if search is cleared
      }
    }, 500); // 500ms delay
    return () => clearTimeout(delayDebounceFn); // Cleanup on each keystroke
  }, [searchTerm]);

  //Handle the search input change
  const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        // const response = await fetch('https://api.example.com/movies'); // Replace with your API URL
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }

        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzc4MzI4M2M1NTA2ODNmMmE5ZmM1NDZlNGY3MTNkNyIsIm5iZiI6MTcyOTY5Mjk3NC40MzA3MjUsInN1YiI6IjY3MTkwNDhlNzY5MTA3ZDc3YjQ3NWJkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e02pNt4uA6HN6Fb4nHCKR712OEJQCwBtOcM8WZr3imI'
  }
};

      const response = await fetch(url, options);
      const result = await response.json();
      console.log("result --------->", result.results);
        // const data = await response.json(); // Parse JSON data
        setTrendingMovies(result.results); // Set the movies state with fetched data
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies('');
    fetchTrendingMovies();

  }, []);
  return <div>
    <h1>Movies and TV shows</h1>
      {/* Search bar */}
          <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchTerm}
            onChange={handleSearchChange} 
            className="search-bar" 
          />
          

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p>{error}</p>}
      <div className="movie-grid">
      {movies.length > 0 ? (
          movies.map((movie, index) => (
            <Movies
              key={index} 
              id={movie.id} 
              title={movie.title} 
              year={movie.year} 
              rating={movie.rating} 
              image={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`} 
            />
          ))
        ) : (
          !loading && <p>No movies found.</p>
        )}

        </div>

        <h1>Trending Movies</h1>

        <div className="movie-grid">
      {trendingMovies.length > 0 ? (
          trendingMovies.map((movie, index) => (
            <Movies
              key={index} 
              id={movie.id} 
              title={movie.title} 
              //year={movie.year} 
              //rating={movie.rating} 
              image={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`} 
            />
          ))
        ) : (
          !loading && <p>No movies found.</p>
        )}
        
        </div>
  </div>;
}

export default Home;
