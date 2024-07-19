import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import Favorite from "@mui/icons-material/Favorite";
import IconButton from "@mui/joy/IconButton";
import { CardMedia } from "@mui/material";
import SelectCategory from "./SelectCategory";
import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import {
  _moviesList,
  _currentPage,
  _movieIsOpen,
  _movieId,
  _currentUserId,
  _user,
  _userIsLoggedIn,
  _favoritMovies,
  _isLiked,
  _isDark,
  _showAlertDeleteMovie,
  _showAlertSuccessAddMovie,
} from "../../services/atom";
import { useRecoilState } from "recoil";
import AddToFavoritList from "./AddToFavoritList";

import Grid from "@mui/joy/Grid";
import DotsMobileStepper from "../DotsMobileStepper";
import MovieCard from "./MovieCard";
import { Link, useParams } from "react-router-dom";
import AlertNotifications from "./AlertNotifications";
export default function GradientCover(props) {
  const [movies, setMovies] = useRecoilState(_moviesList);
  const [movieIsOpen, setMovieIsOpen] = useRecoilState(_movieIsOpen);
  const [movieId, setMovieId] = useRecoilState(_movieId);
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [user, setUser] = useRecoilState(_user);
  let { userId } = useParams();
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(_favoritMovies);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const [isLiked, setIsLiked] = useRecoilState(_isLiked); // Changed to an object
  const UserID = localStorage.getItem("userID");
  const csrfToken = localStorage.getItem("token");
  const [filterLetter, setFilterLetter] = useState("");
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const navigate = useNavigate();
  const [favoritesMovie, setFavoritesMovie] = useState([]);
  const [animatedMovieId, setAnimatedMovieId] = useState(null);
  const isMobile = useMediaQuery("(max-width:500px)");

  const [showAlertSuccessAddMovie, setShowAlertSuccessAddMovie] =
    useRecoilState(_showAlertSuccessAddMovie);

  const [showAlertDeleteMovie, setShowAlertDeleteMovie] = useRecoilState(
    _showAlertDeleteMovie
  );
  const [inputStyle, setInputStyle] = useState({
    borderRadius: "15px",
    height: "20px",
    padding: "10px",
    border: "2px solid #4a90e2",
    outline: "none",
    fontSize: "16px",
    color: "#333",
    maxWidth: "400px",
    width: "100%",
  });

  const addToFavoritesMovie = (movie) => {
    setFavoritesMovie([...favoritesMovie, movie]);
  };

  const normalStyle = {
    transform: "scale(1)",
    transition: "transform 0.5s",
  };

  const blownUpStyle = {
    transform: "scale(1.1)",
    transition: "transform 0.5s",
  };
  const handleAddToFavorites = (movie) => {
    setAnimatedMovieId(movie.id); // Trigger the animation
    addToFavoritesMovie(movie);

    // Reset after the duration of your animation:
    setTimeout(() => {
      setAnimatedMovieId(null);
    }, 500);
  };

  useEffect(() => {
    const updateStyle = () => {
      if (window.innerWidth >= 768) {
        setInputStyle((prevStyle) => ({
          ...prevStyle,

          backgroundColor: isDark === "dark" ? "#212121" : "#fff",
          color: isDark === "dark" ? "#fff" : "",
        }));
      } else {
        setInputStyle((prevStyle) => ({
          ...prevStyle,
          width: "100%",
          // marginLeft: "10%",
          backgroundColor: isDark == "dark" ? "#212121" : "#fff",
          color: isDark === "dark" ? "#fff" : "",
        }));
      }
    };

    window.addEventListener("resize", updateStyle);
    updateStyle();

    return () => window.removeEventListener("resize", updateStyle);
  }, [isDark]);

  useEffect(() => {
    if (userId != undefined) {
      console.log("innnn " + userId);

      fetch(
        `https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/user_detail/${UserID}/`
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setCurrentUserId(UserID);
          setUserIsLoggedIn(true);
        })
        .catch((error) =>
          console.error("There was a problem with the fetch:", error)
        );
    }
  }, [userIsLoggedIn]);

  const handleOpenMovie = (movieID) => {
    setMovieIsOpen(!movieIsOpen);
    setMovieId(movieID);
  };
  const handleRoutToTrailer = (movieID) => {
    navigate(`/${currentUserId}/trailer/movie/${movieID}`);
  };

  const fetchFavoriteMovies = (UserID) => {
    if (userId != undefined) {
      return;
    }

    fetch(
      `https://my-movie-app-backend-f2e367df623e.herokuapp.com/favorite_movies/${UserID}/`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFavoriteMovies(data.movies);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch:", error);
      });
  };

  useEffect(() => {
    const UserID = localStorage.getItem("userID");
    if (userIsLoggedIn && UserID) {
      fetchFavoriteMovies(UserID);
    }
  }, [userIsLoggedIn]);

  const imgPath = "https://image.tmdb.org/t/p/original/";

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filterLetter.toLowerCase())
  );

  return (
    <div>
      <p />
      <Grid
        container
        direction="column-reverse"
        justifyContent="center"
        alignItems="center"
        spacing={0.1}
      >
        <Grid>
          <SelectCategory />
        </Grid>
        <br />
        <Grid>
          <input
            style={inputStyle}
            type="text"
            placeholder=" Search Movie"
            value={filterLetter}
            onChange={(e) => setFilterLetter(e.target.value)}
          />
        </Grid>
      </Grid>
      <p />
      <Grid
        container
        spacing={0}
        sx={{ flexGrow: 1, justifyContent: "center" }}
      >
        {filteredMovies.map((movie) => (
          <Card
            sx={{
              minHeight: isMobile ? "250px" : "280px",
              width: isMobile ? "140px" : "180px",
              m: 1,
            }}
            key={movie.id}
            onClick={() => handleAddToFavorites(movie)}
            style={animatedMovieId === movie.id ? blownUpStyle : normalStyle}
          >
            <CardCover>
              <img src={`${imgPath + movie.poster_path}`} />
            </CardCover>
            <RatingStars rating={movie.vote_average} />

            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />

            <CardContent sx={{ justifyContent: "flex-end" }}>
              <Link
                style={{ color: "#000", textDecoration: "none" }}
                to={`/movie/${movie.id}`}
                key={movie.id}
              >
                <Typography
                  level="title-lg"
                  textColor="#fff"
                  onClick={() => handleOpenMovie(movie.id)}
                >
                  {movie.title}
                </Typography>
              </Link>
              <AddToFavoritList movieTitle={movie.title} movieId={movie.id} />
            </CardContent>
            <IconButton
              sx={{
                bgcolor: "#D0E7D2",
              }}
              onClick={() => handleRoutToTrailer(movie.id)} // Here is the attachment
            >
              <PlayArrowOutlinedIcon /> Watch Trailer
            </IconButton>
          </Card>
        ))}
      </Grid>
      <p />

      {movieIsOpen ? "" : <DotsMobileStepper />}
      {showAlertSuccessAddMovie && (
        <AlertNotifications text={"Movie add to list Successfully"} />
      )}
      {showAlertDeleteMovie && (
        <AlertNotifications text={"Movie deleted from the list Successfully"} />
      )}
    </div>
  );
}
