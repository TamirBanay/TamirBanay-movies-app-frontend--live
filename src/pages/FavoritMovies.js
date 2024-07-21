import { useRecoilState } from "recoil";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Grid from "@mui/joy/Grid";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useHistory } from "react";
import DisplayFavoriteMovies from "../components/Favorites/DisplayFavoriteMovies";
import DisplayFavoriteSeries from "../components/Favorites/DisplayFavoriteSeries";
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
  _favoritMoviesDetails,
  _isDark,
  _favoriteSeries,
  _favoriteSeriesDetails,
} from "../services/atom";
import Favorite from "@mui/icons-material/Favorite";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Divider from "@mui/joy/Divider";

function FavoritMovies() {
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [favoriteMovies, setFavoriteMovies] = useRecoilState(_favoritMovies);
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const navigate = useNavigate();
  const [favoriteSeries, setFavoriteSeries] = useRecoilState(_favoriteSeries);

  const [favoritMoviesDetails, setFavoritMovieDetails] = useRecoilState(
    _favoritMoviesDetails
  );
  const [favoritSeriesDetails, setFavoritSeriesDetails] = useRecoilState(
    _favoriteSeriesDetails
  );

  const initializeFavoritesMoviesFromLocalStorage = () => {
    const storedFavoriteMovies = localStorage.getItem("favoriteMovies");
    if (storedFavoriteMovies) {
      setFavoriteMovies(JSON.parse(storedFavoriteMovies));
    }
  };

  const initializeFavoritesSeriesFromLocalStorage = () => {
    const storedFavoriteSeries = localStorage.getItem("favoriteSerie");
    if (storedFavoriteSeries) {
      setFavoriteSeries(JSON.parse(storedFavoriteSeries));
    }
  };

  useEffect(() => {
    initializeFavoritesMoviesFromLocalStorage();
    initializeFavoritesSeriesFromLocalStorage();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <p />
      <Divider>MOVIES</Divider>
      <DisplayFavoriteMovies />
      <Divider>SERIES</Divider> <DisplayFavoriteSeries />
    </div>
  );
}

export default FavoritMovies;
