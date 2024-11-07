import React, { useState, useEffect } from 'react';
import { getMovieTitles } from './MoviesList'; 
//import Movies from './Movies';
import TVShows from './TVShows'
import axios from 'axios';
import TrendingMovies from './TrendingMovies';

const API_KEY = '7c39292dfdmsh9eb86ff59e4d473p113fb0jsn55f44db05c63';

function TvShowsPage() {
  const [movies, setMovies] = useState([]); // State to hold movie titles
  const [loading, setLoading] = useState(false); // Loading state
  
	
	useEffect(() => {
		const fetchMovies = async () => {
		try {
				const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
				const options = {
				method: 'GET',
				headers: {
						accept: 'application/json',
						Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzc4MzI4M2M1NTA2ODNmMmE5ZmM1NDZlNGY3MTNkNyIsIm5iZiI6MTcyOTY5Mjk3NC40MzA3MjUsInN1YiI6IjY3MTkwNDhlNzY5MTA3ZDc3YjQ3NWJkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e02pNt4uA6HN6Fb4nHCKR712OEJQCwBtOcM8WZr3imI'
				}
				};
		const response = await fetch(url, options);
		const result = await response.json();
		console.log("tv shows result --------->", result.results);
		// const data = await response.json(); // Parse JSON data
		setMovies(result.results); // Set the movies state with fetched data
		} catch (error) {
			console.log('Failed to fetch movies:', error);
		}
		};
		fetchMovies();
  }, []);

  return <div>
    <h1>TV Shows</h1>

        <div className="movie-grid">
      {movies.length > 0 ? (
          movies.map((movie, index) => (
            <TVShows
              key={index}
							id={movie.id}
              title={movie.name} 
              //year={movie.year} 
              //rating={movie.rating} 
              image={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`} 
            />
          ))
        ) : (
          !loading && <p>No movies found.</p>
        )}
        
        </div>
        </div>
}

export default TvShowsPage;
