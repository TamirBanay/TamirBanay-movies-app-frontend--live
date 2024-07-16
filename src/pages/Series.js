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

import SeriesCards from "../components/Series/SeriesCards";

function Series() {
  const [airingTodaySerisList, setAiringTodaySerisList] = useRecoilState(
    _airingTodaySerisList
  );

  return (
    <div>
      <SeriesCards />
    </div>
  );
}

export default Series;
