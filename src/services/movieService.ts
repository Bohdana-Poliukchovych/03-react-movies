import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
  results: Movie[];
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response = await api.get<MoviesResponse>("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get<MoviesResponse>("/search/movie", {
    params: {
      query,
    },
  });

  return response.data.results;
};