import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateForm } from "./update-form";
import { FavMovies } from "./fav-movies";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";

export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");
    // const {Username, Birthday, Email, FavoriteMovies} = user;
    const [token] = useState(storedToken ? storedToken : null);
    // const [userFavoriteMovies, setUserFavoriteMovies] = useState([]);
    // const [updatedUser, setUpdatedUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const [allMovies] = useState(storedMovies ? storedMovies: movies);
    const [filteredMovies, setFilteredMovies] = useState([]);


// Show updated user on the profile
const getUser = (token) => {
  fetch(`https://my-flix-app-cfzr.herokuapp.com/users/${user.Username}`,{
    method: "GET",
    headers: { Authorization: `Bearer ${token}`},
  }).then(response => response.json())
  .then((response) => {
    console.log("getUser response", response)
    setUsername(response.Username);
    setEmail(response.Email);
    setPassword(response.Password);
    setBirthday(response.Birthday);
    setFavoriteMovies(response.FavoriteMovies)
  })
}
console.log("userFavMov", favoriteMovies)


useEffect(()=> {
  getUser(token);
},[])

   
  return (
    <Container>
      <Row className= "mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h4>User Details</h4>
                <p>Username: {username}</p>
                <p>Birthday: {birthday}</p>
                <p>Email: {email}</p>
              </div> 
            </Card.Body>
          </Card>
        </Col>
        <Col >
        <Card>
          <Card.Body>
            <UpdateForm user={user}/>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row>
        <FavMovies user={user} movies={movies}/>
        </Row>
    </Container>
  )
};