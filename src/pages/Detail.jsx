import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";

export default function Detail() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Use the `fetchMovieDetails` function to fetch details by movie ID
    fetchMovieDetails(id)
      .then((data) => {
        // Update the state with the fetched movie details
        setMovieDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details: ", error);
        // You can handle errors here, e.g., display an error message
      });
  }, [id]); // Make sure to include `id` in the dependencies array

  return (
    <div className="detail-container">
      {movieDetails ? (
        <>
          <h2>{movieDetails.title}</h2>
          <p>{movieDetails.overview}</p>
          <p>Release Date: {movieDetails.release_date}</p>
          <p>
            Genres: {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>Runtime: {movieDetails.runtime} minutes</p>
          <p>Original Language: {movieDetails.original_language}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <img
            src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
          />
        </>
      ) : (
        <p>Loading...</p> // You can replace this with a loading spinner or message
      )}
    </div>
  );
}
