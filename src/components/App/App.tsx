import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { getTrendingMovies, searchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const data = await searchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.", {
          duration: 3000,
        });
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className={css.container}>
      <h1>React Movies</h1>

      <Toaster position="top-right" />

      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;