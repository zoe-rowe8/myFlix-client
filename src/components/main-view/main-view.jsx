import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movie, setMovies] = useState([
    {
      id: 1,
      title: "Harry Potter and the Chamber of Secrets",
      image:
        "https://m.media-amazon.com/images/I/61pGKELm21L._AC_SY606_.jpg",
      director: "Chris Columbus"
    },
    {
      id: 2,
      title: "Scream",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_.jpg",
      director: "Wes Craven"
    },
    {
      id: 3,
      title: "Ready Player One",
      image:
        "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_.jpg",
      director: "Steven Spielberg"
    },
    {
      id: 4,
      title: "I Love You, Man",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTU4MjI5NTEyNV5BMl5BanBnXkFtZTcwNjQ1NTMzMg@@._V1_FMjpg_UX1000_.jpg",
      director: "John Hamburg"
    },
    {
      id: 5,
      title: "Back to the Future",
      image:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      director: "Robert Zemeckis"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movie.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movie.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};