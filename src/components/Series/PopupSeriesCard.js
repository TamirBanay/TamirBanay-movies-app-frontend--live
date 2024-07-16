import Typography from "@mui/joy/Typography";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/joy/IconButton";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { useState, useEffect, useRef } from "react";
import {
  _isDark,
  _favoriteSeries,
  _currentUserId,
  _reviewsOpen,
  __reviewsForCurrentMoive,
} from "../../services/atom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import MovieReviews from "../Trailers/MovieReviews";
function Popup({ series, position }) {
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const { mediaId } = useParams();

  const [seriesDetails, setSeriesDetails] = useState([]);
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const [favoriteSeries, setFavoriteSeries] = useRecoilState(_favoriteSeries);
  const favoriteSeriesStorage = localStorage.getItem("favoriteSeries");
  const favoriteSeriesInStorage = JSON.parse(favoriteSeriesStorage || "[]");
  const [reviewsOn, setreviewsOn] = useRecoilState(_reviewsOpen);
  const [reviews, setReviews] = useRecoilState(__reviewsForCurrentMoive);

  const isSeriesFavorite = favoriteSeriesInStorage.some(
    (seriesItem) => seriesItem.tmdb_series_id === series.id
  );
  const UserID = localStorage.getItem("userID");
  const csrfToken = localStorage.getItem("token");

  const handleReviewsOn = () => {
    setreviewsOn(!reviewsOn);
  };
  const handleRoutToTrailer = (seriesId) => {
    navigate(`/${currentUserId}/trailer/series/${seriesId}`);
  };
  useEffect(() => {
    const popupRect = document
      .getElementById("popup-root")
      .getBoundingClientRect();
  }, []);

  const imgPath = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/reviews?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setReviews(response.results))
      .catch((err) => console.error(err));
  }, [mediaId]);

  const removeFromSeriesFavorit = (seriesId) => {
    const url = `https://my-movie-app-backend-f2e367df623e.herokuapp.com/remove_favoriteSeries/${seriesId}/${UserID}/`;
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
          // Update the state
          setFavoriteSeries((prevState) =>
            prevState.filter((series) => series.tmdb_series_id !== seriesId)
          );

          // Update localStorage
          const currentFavoriteSeries = JSON.parse(
            localStorage.getItem("favoriteSeries") || "[]"
          );
          const updatedFavoriteSeries = currentFavoriteSeries.filter(
            (series) => series.tmdb_series_id !== seriesId
          );
          localStorage.setItem(
            "favoriteSeries",
            JSON.stringify(updatedFavoriteSeries)
          );
        } else {
          console.error("Failed to remove movie");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchSeriesDetails = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/tv/${series.id}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const extractedData = {
          backdrop_path: response.backdrop_path,
          name: response.name,
          adult: response.adult,
          vote_average: response.vote_average,
          number_of_seasons: response.number_of_seasons,
          number_of_episodes: response.number_of_episodes,
          genres: response.genres,
        };
        setSeriesDetails(extractedData);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchSeriesDetails();
  }, [series.id]);

  const addSeriesToFavorite = async (tmdbSeriesId) => {
    const UserId = localStorage.getItem("userID");
    const apiUrl = "https://my-movie-app-backend-f2e367df623e.herokuapp.com/add_favorite_series/";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tmdb_series_id: tmdbSeriesId,
          user: UserId,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update favoriteSeries state
        setFavoriteSeries((prevState) => {
          const updatedSeries = [
            ...prevState,
            { tmdb_series_id: tmdbSeriesId },
          ];

          // Update favoriteSeries in localStorage
          localStorage.setItem("favoriteSeries", JSON.stringify(updatedSeries));

          return updatedSeries;
        });
      } else {
        const errorData = await response.json();
        console.error("Error adding series:", errorData);
      }
    } catch (error) {
      console.error("Error while making the request:", error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 2,
        transform: "translate(-50%, -50%)", // This will adjust based on the popup's own size.

        background: isDark == "dark" ? "#000" : "#fff",
        width: "400px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "auto",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

        borderRadius: "2px",
      }}
      key={series.id}
    >
      <img
        loading="lazy"
        style={{
          height: "50%",
          width: "100%",
          objectFit: "cover",
          display: "block",
        }}
        src={`${imgPath + series.backdrop_path}`}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingTop: "10px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "10px" }}
        >
          <IconButton
            sx={{
              width: "45px",
              height: "45px",
              "&:hover": {
                "& .MuiSvgIcon-root": {
                  bgcolor: isDark == "dark" ? "#212121" : "",
                },
              },
            }}
          >
            {isSeriesFavorite ? (
              <HighlightOffIcon
                sx={{
                  width: "45px",
                  height: "45px",
                  color: isDark == "dark" ? "#fff" : "#000",
                }}
                onClick={() => removeFromSeriesFavorit(series.id)}
              />
            ) : (
              <AddCircleOutlineOutlinedIcon
                sx={{
                  width: "45px",
                  height: "45px",
                  color: isDark == "dark" ? "#fff" : "#000",
                }}
                onClick={() => addSeriesToFavorite(series.id)}
              />
            )}
          </IconButton>
          <IconButton
            onClick={() => handleRoutToTrailer(series.id)} // Here is the attachment
            sx={{
              width: "45px",
              height: "45px",
              "&:hover": {
                "& .MuiSvgIcon-root": {
                  bgcolor: isDark == "dark" ? "#212121" : "",
                },
              },
            }}
          >
            <PlayCircleFilledOutlinedIcon
              sx={{
                width: "45px",
                height: "45px",
                color: isDark == "dark" ? "#fff" : "#000",
              }}
            />
          </IconButton>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", marginRight: "10px" }}
        >
          <IconButton
            onClick={handleReviewsOn}
            sx={{
              width: "45px",
              height: "45px",
              "&:hover": {
                "& .MuiSvgIcon-root": {
                  bgcolor: isDark == "dark" ? "#212121" : "",
                },
              },
            }}
          >
            <ArrowDropDownCircleIcon
              sx={{
                width: "45px",
                height: "45px",
                color: isDark == "dark" ? "#fff" : "#000",
              }}
            />
          </IconButton>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          level="body-lg"
          fontWeight="lg"
          textColor="#212121"
          sx={{ padding: "10px", color: isDark === "dark" ? "white" : "" }}
        >
          {series.name}{" "}
          {series.adult ? (
            <Typography
              fontSize="lg"
              fontWeight="sm"
              sx={{ color: isDark === "dark" ? "white" : "" }}
            >
              {" "}
              "18+"{" "}
            </Typography>
          ) : (
            <Typography
              fontSize="lg"
              fontWeight="sm"
              sx={{ color: isDark === "dark" ? "white" : "" }}
            >
              {" "}
              +13{" "}
            </Typography>
          )}
        </Typography>
        <div
          style={{ marginRight: "10px", display: "flex", flexDirection: "row" }}
        >
          <Typography
            level="body-lg"
            color="#000"
            sx={{ color: isDark === "dark" ? "white" : "" }}
          >
            {series.vote_average}
          </Typography>
          <StarPurple500SharpIcon sx={{ color: "#FFB000", mr: "1%" }} />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize="lg"
          fontWeight="sm"
          sx={{ marginLeft: "10px", color: isDark === "dark" ? "white" : "" }}
        >
          {seriesDetails.number_of_seasons} Seasons{"   "}
          {seriesDetails.number_of_episodes} Episodes
        </Typography>
      </div>
      <div
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {seriesDetails &&
          seriesDetails.genres &&
          seriesDetails.genres.slice(0, 3).map((genre, index, array) => (
            <div
              key={genre.id}
              style={{
                marginLeft: "10px",
                color: isDark === "dark" ? "white" : "",
              }}
            >
              <div>
                {genre.name}
                {index !== array.length - 1 && " |"}
              </div>
            </div>
          ))}
      </div>
      {reviewsOn ? <MovieReviews movieId={mediaId} /> : ""}
    </div>
  );
}
export default Popup;
