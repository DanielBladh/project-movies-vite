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
    const response = await axios.get(`${baseURL}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch movie details. Status code: ${response.status}`
      );
    }
  } catch (error) {
    throw error;
  }
};

// Function to fetch company details by ID
export const fetchCompanyDetails = async (companyId) => {
  try {
    const response = await axios.get(`${baseURL}/company/${companyId}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch company details. Status code: ${response.status}`
      );
    }
  } catch (error) {
    throw error;
  }
};

// Function to fetch upcoming movies
export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/upcoming`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1, // You can specify the page number as needed
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch top-rated movies
export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${baseURL}/movie/top_rated`, {
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

// Function to fetch movies based on search-term
export const fetchMoviesBySearchTerm = async (searchTerm) => {
  try {
    const response = await axios.get(`${baseURL}/search/movie`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        query: searchTerm,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
