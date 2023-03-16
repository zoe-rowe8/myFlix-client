import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import "./movie-view.scss";
import { useState } from "react";
import { useEffect } from "react";

export const MovieView = ({ movies, username, favoriteMovies }) => {
  const { movieId } = useParams();
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const movie = movies.find((m) => m.id === movieId);

  const [movieExists, setMovieExists] = useState(false);
  const [disableRemove, setDisableRemove] = useState(true)
  const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: favoriteMovies);

// AddFavMovie
const addFavoriteMovie = async() => {
  const favoriteMovie = await fetch(`https://my-flix-app-cfzr.herokuapp.com/users/${username}/movies/${movieId}`,
    {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${storedToken}`,
      "Content-Type": "application/json", 
      }
     })

      console.log(storedToken)

    const response = await favoriteMovie.json()
    setUserFavoriteMovies(response.FavoriteMovies)
     if (response) {
        alert("Movie added to favorites");
        localStorage.setItem("user", JSON.stringify (response))
        window.location.reload(); 
      } else {
        alert("Something went wrong");
      }    
  }

  const removeFavoriteMovie = async() => {
    const favoriteMovie = await fetch (`https://my-flix-app-cfzr.herokuapp.com/users/${username}/movies/${movieId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    })     
    const response = await favoriteMovie.json()
    console.log(response)
    if (response) {
      alert("Movie removed from favorites");
      localStorage.setItem("user", JSON.stringify (response))
      window.location.reload(); 
    } else {
      alert("Something went wrong");
    }
  };

    const movieAdded = () => {
      const hasMovie = userFavoriteMovies.some((m) => m === movieId)
      console.log("userFavMov", userFavoriteMovies)
      console.log("movieId", movieId)
      if (hasMovie) {
        setMovieExists(true)
      }
    };

    const movieRemoved = () => {
      const hasMovie = userFavoriteMovies.some((m) => m === movieId)
      if (hasMovie) {
        setDisableRemove(false)
      }
    };

console.log("movieExists", movieExists)

  useEffect (()=> {
    movieAdded()
    movieRemoved()
  },[])


  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
        <br/>
        <br/>
        <Button 
          className="button-add-favorite"
          onClick={addFavoriteMovie}
          disabled={movieExists}
        >
          + Add to Favorites
        </Button>
        <br/>
        <br/>
        <Button 
          variant="danger"
          onClick={removeFavoriteMovie}
          disabled={disableRemove}
        >
          Remove from Favorites
        </Button> 
      </Link>
    </div>
  );
};

//Props constraints for the MovieView

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }).isRequired,
  }).isRequired,
};