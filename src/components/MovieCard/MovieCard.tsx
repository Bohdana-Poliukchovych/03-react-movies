import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <li onClick={() => onSelect(movie)}>
      <div className={css.card}>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          
          alt={movie.title}
          loading="lazy"
        />
        <h2 className={css.title}>{movie.title}</h2>
      </div>
    </li>
  );
}

export default MovieCard;