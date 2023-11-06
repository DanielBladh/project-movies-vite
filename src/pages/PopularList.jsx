import React, { useEffect, useState } from "react";
import { fetchPopularMovies, fetchMovieDetails } from "../api/api";
import { Link } from "react-router-dom";

export default function PopularList() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies when the component mounts
    fetchPopularMovies()
      .then((data) => {
        console.log("API Response Data:", data);
        setPopularMovies(data.results);
      })
      .catch((error) =>
        console.error("Error fetching popular movies: ", error)
      );
  }, []);

  useEffect(() => {
    // Fetch movie details for each popular movie
    const fetchMovieDetailsForPopularMovies = async () => {
      const movieDetailsPromises = popularMovies.map((movie) =>
        fetchMovieDetails(movie.id)
      );

      Promise.all(movieDetailsPromises)
        .then((details) => {
          // Merge movie details into popularMovies
          const updatedPopularMovies = popularMovies.map((movie, index) => ({
            ...movie,
            details: details[index],
          }));
          setPopularMovies(updatedPopularMovies);
        })
        .catch((error) => {
          console.error("Error fetching movie details: ", error);
        });
    };

    fetchMovieDetailsForPopularMovies();
  }, [popularMovies]);

  return (
    <div className="popular-list">
      <h2>Popular Movies</h2>
      <ul>
        {popularMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.details?.poster_path}`}
                alt={movie.title}
              />
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
