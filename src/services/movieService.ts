import axios from "axios";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await api.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query: string) => {
  const response = await api.get("/search/movie", {
    params: {
      query,
    },
  });

  return response.data.results;
};