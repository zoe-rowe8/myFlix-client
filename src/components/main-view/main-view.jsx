import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://my-flix-app-cfzr.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      const moviesFromApi = data.map((doc) => {
        return {
          id: doc._id,
          Title: doc.Title,
          Description: doc.Description,
          Genre: doc.Genre,
          Director: doc.Director,
          ImagePath: doc.ImagePath,
          Featured: doc.Featured
        }
      });
      setMovies(moviesFromApi);
    })
}, [token])

// user must first either login or signup
if (!user) {
  return (
    <Row className="justify-content-md-center">
      <Col md={5}>
      <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }} />
      or
      <SignupView />
      </Col>
    </Row>
  )
}

  // displays movie-view when movie is selected (clicked)
  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
      <Col md={8}>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout 
      </button>
      <MovieView 
      movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} />
      </Col>
      </Row>
    );
  }  

  // displays text message if list of movies is empty
  if (movies.length === 0) {
    return (
      <Row className="justify-content-md-center">
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout
      </button>
      <div>The list is empty!</div>
    </Row>
    );
  }

  return (
    <Row className="justify-content-md-center">
      {movies.map((movie) => (
        <Col className="mb-5" key={movies.id} md={3}>
        <MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}
    </Row>
  );
};