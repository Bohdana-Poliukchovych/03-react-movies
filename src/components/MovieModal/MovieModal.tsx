import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
        >
          Close
        </button>

        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>

          <p>{movie.overview}</p>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MovieModal;