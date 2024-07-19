import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  _movieIsOpen,
  _movieId,
  _userIsLoggedIn,
  _currentUserId,
  _isDark,
  _favoritMovies,
  _user,
  _airingTodaySerisList,
} from "../services/atom";
import { useMediaQuery } from "@mui/material";

import SeriesCards from "../components/Series/SeriesCards";
import SeriesCardsMobile from "../components/Series/SeriesCardsMobile";

function Series() {
  const isMobile = useMediaQuery("(max-width:500px)");
  const [airingTodaySerisList, setAiringTodaySerisList] = useRecoilState(
    _airingTodaySerisList
  );

  return <div>{isMobile ? <SeriesCardsMobile /> : <SeriesCards />}</div>;
}

export default Series;
