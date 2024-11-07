import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TVShowDetails() {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [MovieDetails, setMovieDetails] = useState([]); 

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzc4MzI4M2M1NTA2ODNmMmE5ZmM1NDZlNGY3MTNkNyIsIm5iZiI6MTcyOTY5Mjk3NC40MzA3MjUsInN1YiI6IjY3MTkwNDhlNzY5MTA3ZDc3YjQ3NWJkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e02pNt4uA6HN6Fb4nHCKR712OEJQCwBtOcM8WZr3imI'
          }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
    </div>
  );
}

export default TVShowDetails;
