import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails, fetchCompanyDetails } from "../api/api";
import { BackIcon } from "../icons/Back";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Fetch movie details by ID
    fetchMovieDetails(id)
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Error fetching movie details: ", error);
        }
      });
  }, [id]);

  useEffect(() => {
    // Fetch company details when movieDetails are available
    if (movieDetails && movieDetails.production_companies) {
      const companyDetailsPromises = movieDetails.production_companies.map(
        (company) => fetchCompanyDetails(company.id)
      );

      Promise.all(companyDetailsPromises)
        .then((details) => {
          setCompanyDetails(details);
        })
        .catch((error) => {
          console.error("Error fetching company details: ", error);
        });
    }
  }, [movieDetails]);

  return (
    <article className="detail-container">
      <Link to="/" className="backLink">
        <BackIcon /> Movies
      </Link>

      {notFound ? (
        <div className="notfound-page">
          <h2>Movie Not Found</h2>
          <p>Sorry, the requested movie does not exist.</p>
          <Link to="/">
            <BackIcon /> Back to Movies
          </Link>
        </div>
      ) : (
        <div
          className="background"
          style={{
            backgroundImage: movieDetails
              ? `linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`
              : null,
          }}
        >
          <div className="summary">
            {movieDetails && movieDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w342${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}
            <div className="details-container">
              <div className="details">
                {movieDetails ? (
                  <>
                    <h1>
                      <span className="title">{movieDetails.title}</span>{" "}
                      <span className="rating">
                        {Math.round(movieDetails.vote_average * 10) / 10}
                      </span>
                    </h1>

                    <div className="description-container">
                      {movieDetails && movieDetails.imdb_id && (
                        <a
                          href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          IMDb Page
                        </a>
                      )}
                      <div className="movie-genres">
                        {movieDetails.genres.map((x, index) => (
                          <p key={index}>{x.name}</p>
                        ))}
                      </div>
                      <div className="movie-text">
                        <p className="movie-description">
                          {movieDetails.overview}
                        </p>
                      </div>
                      <div className="production-details">
                        <h4>Production companies</h4>
                        {companyDetails.map((company, index) => (
                          <p key={index}>
                            {company.homepage && (
                              <a
                                href={company.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {company.name}
                              </a>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
