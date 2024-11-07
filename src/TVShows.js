import React from 'react';
import './Movie.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const TVShows = ({ id, title, image }) => {
  return (
    <Link to={`/tvshows/${id}`}> {/* Link to the movie details page */}
   <div className="movie-tile" style={{ backgroundImage: `url(${image})` }}>
      <div className="movie-details">
        <h2>{title}</h2>
        
      </div>
    </div>
  </Link>
  );
};

export default TVShows;