import { atom } from "recoil";

export const _moviesList = atom({
  key: "_moviesList",
  default: [],
});
export const _currentPage = atom({
  key: "_currentPage",
  default: 1,
});
export const _movieIsOpen = atom({
  key: "_movieIsOpen",
  default: false,
});
export const _movieId = atom({
  key: "_movieId",
  default: null,
});
export const _userIsLoggedIn = atom({
  key: "_userIsLoggedIn",
  default: localStorage.getItem("isLoggedIn") || false,
});

export const _currentUserId = atom({
  key: "_currentUserId",
  default: null,
});
export const _user = atom({
  key: "_user",
  default: [],
});
export const _favoritMovies = atom({
  key: "_favoritMovies",
  default: [],
});
export const _favoritMoviesDetails = atom({
  key: "_favoritMoviesDetails",
  default: [],
});

export const _isLiked = atom({
  key: "_isLiked",
  default: false,
});
export const _isDark = atom({
  key: "_isDark",
  default: localStorage.getItem("theme") || "light",
});
export const _selectType = atom({
  key: "_selectType",
  default: "now_playing",
});
export const _recommendadMovies = atom({
  key: "_recommendadMovies",
  default: [],
});
export const _imagesOn = atom({
  key: " _imagesOn",
  default: false,
});
export const _imagesForCurrentMoive = atom({
  key: " _imagesForCurrentMoive",
  default: [],
});
export const _reviewsOpen = atom({
  key: " _reviewsOpen",
  default: false,
});
export const __reviewsForCurrentMoive = atom({
  key: " __reviewsForCurrentMoive",
  default: [],
});
export const _showAlertDeleteMovie = atom({
  key: " _showAlertDeleteMovie",
  default: false,
});

export const _showAlertSuccessAddMovie = atom({
  key: " _showAlertSuccessAddMovie",
  default: false,
});

export const _airingTodaySerisList = atom({
  key: "_airingTodaySerisList",
  default: [],
});
export const _onTheAirSeries = atom({
  key: "_onTheAir",
  default: [],
});
export const _popularSeries = atom({
  key: "_popularSeries",
  default: [],
});

export const _topRate = atom({
  key: "_topRate",
  default: [],
});
export const _favoriteSeries = atom({
  key: "_favoriteSeries",
  default: [],
});
export const _favoriteSeriesDetails = atom({
  key: "_favoriteSeriesDetails",
  default: [],
});
