import axios from "axios";

const apiKey = "d107cda141153c9e0bf3c99eed3ad06b";
const baseURL = "https://api.themoviedb.org/3";

// Function to fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/popular`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
