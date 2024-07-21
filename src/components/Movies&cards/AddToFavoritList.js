import React, { useState, useEffect } from "react";
import GradientCover from "./GradientCover";
import SkeletonMovies from "../Skeletons/SkeletonMovies";
import AlertNotifications from "./AlertNotifications";
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
  _showAlertSuccessAddMovie,
  _showAlertDeleteMovie,
} from "../../services/atom";

import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Favorite from "@mui/icons-material/Favorite";

function AddToFavoritList(props) {
  const [movieId, setMovieId] = useRecoilState(_movieId);

  const [movies, setMovies] = useRecoilState(_moviesList);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(_favoritMovies);
  const [isLiked, setIsLiked] = useRecoilState(_isLiked); // Changed to an object
  const csrfToken = localStorage.getItem("token");
  const UserId = localStorage.getItem("userID");
  const [showAlertSuccessAddMovie, setShowAlertSuccessAddMovie] =
    useRecoilState(_showAlertSuccessAddMovie);

  const [showAlertDeleteMovie, setShowAlertDeleteMovie] = useRecoilState(
    _showAlertDeleteMovie
  );
  const navigate = useNavigate();

  const handleIsLiked = (movieId, movieTitle) => {
    if (userIsLoggedIn) {
      const isAlreadyFavorite = favoriteMovies.some(
        (favoriteMovie) => favoriteMovie.tmdb_movie_id === props.movieId
      );

      const newIsLiked = !isLiked[props.movieId];
      setIsLiked((prevState) => ({
        ...prevState,
        [props.movieId]: newIsLiked,
      }));

      if (newIsLiked) {
        if (isAlreadyFavorite) {
          return;
        }
        fetch(
          "https://my-movie-app-backend-f2e367df623e.herokuapp.com/add_favorite/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({
              tmdb_movie_id: movieId,
              user: UserId, // Use the state variable
            }),
          }
        )
          .then((response) => response.json())
          .then((response) => {
            setShowAlertSuccessAddMovie(true);
            setTimeout(() => {
              setShowAlertSuccessAddMovie(false);
            }, 3000);
            setFavoriteMovies((prevState) => [
              ...prevState,
              { tmdb_movie_id: props.movieId }, // Assuming the data structure is like this
            ]);
          });
      } else {
        if (!isAlreadyFavorite) {
          console.log("Movie is not in favorites to remove");
          return;
        }
        const url = `https://my-movie-app-backend-f2e367df623e.herokuapp.com/remove_favorite/${movieId}/${UserId}/`;
        fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
        })
          .then((response) => {
            if (response.ok) {
              setShowAlertDeleteMovie(true);
              setTimeout(() => {
                setShowAlertDeleteMovie(false);
              }, 3000);

              setFavoriteMovies((prevState) =>
                prevState.filter((movie) => movie.tmdb_movie_id !== movieId)
              );
            } else {
              console.error("Failed to remove movie");
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Typography
        startDecorator={
          <Favorite
            onClick={() => handleIsLiked(props.movieId, props.movieTitle)}
            color={
              favoriteMovies.some(
                (favoriteMovie) => favoriteMovie.tmdb_movie_id === props.movieId
              )
                ? "warning"
                : ""
            }
          />
        }
        fontSize="sm"
        textColor="neutral.300"
      >
        {favoriteMovies.some(
          (favoriteMovie) => favoriteMovie.tmdb_movie_id === props.movieId
        )
          ? "Remove from list"
          : "Add to favorites"}
      </Typography>
    </div>
  );
}

export default AddToFavoritList;
