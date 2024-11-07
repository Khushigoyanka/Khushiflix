// TrendingMovies.js
import React, { useState, useEffect } from 'react';
import Movies from './Movies';

function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
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
        setTrendingMovies(result.results);
      } catch (error) {
        setError('Failed to fetch trending movies');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trending Movies</h1>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="movie-grid">
          {trendingMovies.length > 0 ? (
            trendingMovies.map((movie, index) => (
              <Movies
                key={index}
                title={movie.title}
                year={movie.release_date?.split('-')[0] || 'N/A'}
                rating={movie.vote_average}
                image={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
              />
            ))
          ) : (
            !loading && <p>No trending movies found.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default TrendingMovies;
