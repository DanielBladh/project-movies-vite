import React, { useEffect, useState } from "react";
import {
  fetchPopularMovies,
  fetchMovieDetails,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMoviesBySearchTerm,
} from "../api/api";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";
import "./PopularList.css";

export default function PopularList() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("popular");

  const handleSelectOption = (selected) => {
    setSelectedOption(selected);
  };

  const dropdownOptions = [
    { value: "popular", label: "Popular" },
    { value: "upcoming", label: "Upcoming" },
    { value: "top_rated", label: "Top Rated" },
  ];

  useEffect(() => {
    let fetchFunction;

    switch (selectedOption) {
      case "popular":
        fetchFunction = fetchPopularMovies;
        break;
      case "upcoming":
        fetchFunction = fetchUpcomingMovies;
        break;
      case "top_rated":
        fetchFunction = fetchTopRatedMovies;
        break;
      default:
        break;
    }

    setLoading(true);

    // Fetch movies based on the selected option
    fetchFunction()
      .then((movies) => {
        console.log(`API ${selectedOption} Movies:`, movies);

        // Fetch movie details for each popular movie
        const movieDetailsPromises = movies.results.map((movie) =>
          fetchMovieDetails(movie.id)
        );

        return Promise.all([movies, Promise.all(movieDetailsPromises)]);
      })
      .then(([movies, details]) => {
        const updatedPopularMovies = movies.results.map((movie, index) => ({
          ...movie,
          details: details[index],
        }));

        setPopularMovies(updatedPopularMovies);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${selectedOption} movies:`, error);
        setLoading(false);
      });
  }, [selectedOption]);

  // Fetch movies based on search input
  const handleSearch = async (searchTerm) => {
    await fetchMoviesBySearchTerm(searchTerm)
      .then((movies) => {
        console.log(`API Searched Movies:`, movies);

        // Fetch movie details for each movie
        const movieDetailsPromises = movies.results.map((movie) =>
          fetchMovieDetails(movie.id)
        );

        return Promise.all([movies, Promise.all(movieDetailsPromises)]);
      })
      .then(([movies, details]) => {
        const updatedPopularMovies = movies.results.map((movie, index) => ({
          ...movie,
          details: details[index],
        }));

        setPopularMovies(updatedPopularMovies);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching ${selectedOption} movies:`, error);
        setLoading(false);
      });
  };

  return (
    <div className="popular-list">
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <>
          <h2 className="title">
            {selectedOption === "popular" && "Popular Movies"}
            {selectedOption === "upcoming" && "Upcoming Movies"}
            {selectedOption === "top_rated" && "Top Rated Movies"}
          </h2>
          <div className="movie-options">
            <SearchBar handleSearch={handleSearch} />
            <Dropdown
              options={dropdownOptions}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
            />
          </div>
          <div className="movie-list">
            {popularMovies.map((movie) => (
              <Link
                to={`/movies/${movie.id}`}
                key={movie.id}
                className="movie-link"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.details?.poster_path}`}
                  alt={movie.title}
                />
                <div className="details">
                  <h1>{movie.title}</h1>
                  <p>Released {movie.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
