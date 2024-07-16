import "./App.css";
import Home from "./pages/Home";
import { createContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  HashRouter,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
  _moviesList,
  _currentPage,
  _movieId,
  _currentUserId,
  _userIsLoggedIn,
  _user,
  _isDark,
  _selectType,
  _favoriteSeries,
} from "./services/atom";
import Navbar from "./components/Navbar";
import Movie from "./pages/Movie";
import Login from "./pages/Loginpage";
import Profile from "./pages/Profile";
import CheckToken from "./components/CheckToken";
import SignUp from "./pages/SignUp";
import FavoritMovies from "./pages/FavoritMovies";
import Trailer from "./pages/Trailer";
import Series from "./pages/Series";
export const ThemeContext = createContext(null);

function App(props) {
  const [movies, setMovies] = useRecoilState(_moviesList);
  const [currentPage, setCurrentPage] = useRecoilState(_currentPage);
  const [movieId, setMovieId] = useRecoilState(_movieId);
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  let { userId } = useParams();
  const [user, setUser] = useRecoilState(_user);
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const [selectType, setSelectType] = useRecoilState(_selectType);
  const UserID = localStorage.getItem("userID");
  const [favoriteSeries, setFavoriteSeries] = useRecoilState(_favoriteSeries);
  const fetchUserData = () => {
    if (currentUserId) {
      fetch(`https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/user_detail/${userId}/`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          console.log(currentUserId);
          if (currentUserId == null) {
            setUserIsLoggedIn(false);
          } else {
            setUserIsLoggedIn(true);
            setCurrentUserId(UserID);
          }
        })
        .catch((error) =>
          console.error("There was a problem with the fetch:", error)
        );
    }
  };
  const fetchMoviesData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${selectType}?language=en-US&page=${currentPage}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMoviesData();
  }, [currentPage, selectType]);

  useEffect(() => {
    localStorage.setItem("theme", isDark);
  }, [isDark]);

  useEffect(() => {
    fetchUserData();
  }, [userId]);
  const toggleIsDark = () => {
    setIsDark((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <div className="App" id={isDark} style={{ minHeight: "100vh" }}>
      <HashRouter>
        <CheckToken />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/null" />} />
          <Route path="/:currentUserId" element={<Home />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:currentUserId/profile" element={<Profile />} />
          <Route path="/:currentUserId/favorits" element={<FavoritMovies />} />
          <Route path="/:currentUserId/series" element={<Series />} />
          <Route
            path="/:currentUserId/trailer/:mediaType/:mediaId"
            element={<Trailer />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
