import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
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
  _imagesOn,
  _imagesForCurrentMoive,
  __reviewsForCurrentMoive,
  _reviewsOpen,
} from "../../services/atom";
import { useRecoilState } from "recoil";
import { useMediaQuery } from "@mui/material";

import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import RatingStars from "../Movies&cards/RatingStars";
import ImageList from "../Trailers/ImageList";
import Skeleton from "@mui/material/Skeleton";
import RecommendationsForYou from "../Trailers/RecommendationsForYou";
import FilterIcon from "@mui/icons-material/Filter";
import { IconButton } from "@mui/material";
import MovieReviews from "../Trailers/MovieReviews";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddToFavoritList from "../Movies&cards/AddToFavoritList";
function SeriesTrailer(props) {
  const [videoKey, setVideoKey] = useState(null);
  const { mediaId } = useParams();
  const [series, setSeries] = useState({});
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const [showSkeleton, setShowSkeleton] = useState(true); // New state for Skeleton timeout
  const [imagesOn, setImagesOn] = useRecoilState(_imagesOn);
  const [images, setImages] = useRecoilState(_imagesForCurrentMoive);
  const [reviews, setReviews] = useRecoilState(__reviewsForCurrentMoive);
  const [reviewsOn, setreviewsOn] = useRecoilState(_reviewsOpen);
  const isMobile = useMediaQuery("(max-width:500px)");
  const handleReviewsOn = () => {
    setreviewsOn(!reviewsOn);
  };
  const handleImagesOn = () => {
    setImagesOn(!imagesOn);
  };
  let navigate = useNavigate();
  const imgPath = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    // Logic for hiding the skeleton after 2 seconds
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 500);

    return () => clearTimeout(skeletonTimer);
  }, []);
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${mediaId}/videos?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
            },
          }
        );
        const data = await response.json();

        // Find a YouTube video or return undefined if not found
        const youtubeVideo = data.results.find(
          (video) => video.site === "YouTube"
        );

        // Check if a YouTube video is found before trying to access the key property
        if (youtubeVideo) {
          setVideoKey(youtubeVideo.key);
        } else {
          // Handle the situation where no YouTube video is found
          console.error("No YouTube video found for this media.");
          // You might want to set some state here to inform your component's users
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [mediaId]);

  const fetchMovieData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
      },
    };
    fetch(`https://api.themoviedb.org/3/tv/${mediaId}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setSeries(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchMovieData();
  }, [mediaId]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
      },
    };

    fetch(`https://api.themoviedb.org/3/tv/${mediaId}/images`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.backdrops) {
          const processedImages = data.backdrops.map((img) => ({
            ...img,
            img: imgPath + img.file_path,
          }));
          setImages(processedImages);
        } else {
          setImages([]);
        }
      })
      .catch((err) => console.error(err));
  }, [mediaId]);

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
      `https://api.themoviedb.org/3/tv/${mediaId}/reviews?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setReviews(response.results))
      .catch((err) => console.error(err));
  }, [mediaId]);
  console.log(series);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: isDark == "dark" ? "#D0E7D2" : "#191717",
            display: "flex",
            // width: "70%",
            justifyContent: "space-between",
            alignItems: "center",
            width: "fitContent",
          }}
        >
          {series.name}
        </h1>
        <RatingStars rating={series.vote_average} />
      </div>
      <br />

      {/* Flex container */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Image */}
        {series.poster_path && (
          <img
            src={`${imgPath + series.poster_path}`}
            alt={series.title}
            style={{
              width: isMobile ? "70%" : "15%",
              objectFit: "cover",
              marginRight: "0.2%",
              height: "415px",
              display: "flex",
            }}
          />
        )}

        {/* Video */}
        {videoKey ? (
          <iframe
            width={isMobile ? "70%" : "40%"} // Adjusted width to 65% to take into account the image and potential margins
            height="415"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          showSkeleton && (
            <Skeleton
              variant="rectangular"
              width="60%"
              height="615px"
              animation="wave"
            />
          )
        )}

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            justifyContent: "space-between",
            width: isMobile ? "70%" : "15%",
            marginLeft: "0.3%",
            height: isMobile ? "200px" : "415px",
            gap: isMobile ? "1%" : "",
          }}
        >
          <div
            style={{
              height: "206px",
              width: "100%",
              backgroundColor: "#393E46",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleImagesOn}
              sx={{ flexDirection: "column", width: "100%", height: "100%" }}
            >
              <FilterIcon sx={{ color: "#FFFFFF" }} />
              <Typography
                fontSize="lg"
                fontWeight="lg"
                sx={{
                  display: "flex",
                  color: "#fff",
                }}
              >
                PHOTOS {images.length}
              </Typography>
            </IconButton>
          </div>
          <div
            style={{
              height: "206px",
              width: "100%",
              backgroundColor: "#393E46",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleReviewsOn}
              sx={{ flexDirection: "column", width: "100%", height: "100%" }}
            >
              <ReviewsIcon sx={{ color: "#FFFFFF" }} />
              <Typography fontSize="lg" fontWeight="lg" sx={{ color: "#fff" }}>
                REVIEWS {reviews?.length}
              </Typography>
            </IconButton>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize="lg"
            fontWeight="sm"
            sx={{
              display: "flex",
              width: "70%",
              textAlign: "left",
              color: isDark == "dark" ? "#D0E7D2" : "#191717",
            }}
          >
            {series.overview}
          </Typography>
        </div>
        <p />
        <Divider orientation="horizontal" />
      </div>
      <RecommendationsForYou movieId={mediaId} />
      {imagesOn ? <ImageList movieId={mediaId} /> : ""}
      {reviewsOn ? <MovieReviews movieId={mediaId} /> : ""}
    </div>
  );
}

export default SeriesTrailer;
