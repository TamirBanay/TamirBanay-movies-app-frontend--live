import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useNavigate, useParams } from "react-router-dom";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import IconButton from "@mui/joy/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  _isDark,
  _recommendadMovies,
  _currentUserId,
} from "../../services/atom";
import { useRecoilState } from "recoil";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function RecommendationsForYou(props) {
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const [recommendadMovies, setRecommendadMovies] =
    useRecoilState(_recommendadMovies);
  const navigate = useNavigate();
  const { mediaId } = useParams();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.movieId}/recommendations?language=en-US&page=1`,
      options
    ).then((response) => {
      if (response.results) {
        setRecommendadMovies(response.results);
      } else {
        // Handle the case where results are undefined or not as expected.
        setRecommendadMovies([]);
      }
    });
  }, [props.movieId]);
  const imgPath = "https://image.tmdb.org/t/p/original/";
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: 200,
        behavior: "smooth",
      });
    }
  };
  const handleRoutToTrailer = (movieID) => {
    navigate(`/${currentUserId}/trailer/${movieID}`);
  };
  return (
    <div>
      <p />

      {recommendadMovies.length > 0 ? (
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Centers content horizontally
            }}
          >
            <Typography
              level="title-lg"
              textColor={isDark === "dark" ? "#fff" : ""}
            >
              Our Recommendatios{" "}
            </Typography>
          </Box>

          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleScrollRight}
              sx={{
                position: "absolute",
                right: 5,
                zIndex: 1,
                "&:hover": {
                  backgroundColor: isDark === "dark" ? "#000" : "",
                },
              }}
            >
              <ArrowForwardIosIcon
                sx={{ color: isDark == "dark" ? "#fff" : "" }}
              />
            </IconButton>
            <IconButton
              onClick={handleScrollLeft}
              sx={{
                position: "absolute",
                left: 5,
                zIndex: 1,
                "&:hover": {
                  backgroundColor: isDark === "dark" ? "#000" : "", // Change the background color of the IconButton to red on hover
                },
              }}
            >
              <ArrowBackIosIcon
                sx={{ color: isDark === "dark" ? "#fff" : "" }}
              />
            </IconButton>
            <Box
              ref={scrollContainerRef}
              component="ul"
              sx={{
                width: "90%",
                height: "250px",
                justifyContent: "center",
                display: "flex",
                gap: 0.5,
                overflowX: "scroll",
                listStyleType: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {recommendadMovies.map((movie) => (
                <Card component="li" sx={{ flexGrow: 0 }} key={movie.id}>
                  {" "}
                  <CardCover>
                    <img src={`${imgPath + movie.poster_path}`} />
                  </CardCover>
                  <CardCover
                    sx={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                    }}
                  />
                  <CardContent>
                    <Typography
                      level="body-md"
                      fontWeight="lg"
                      textColor="#fff"
                    >
                      {movie.title}
                    </Typography>
                  </CardContent>
                  <IconButton
                    sx={{
                      bgcolor: "#D0E7D2",
                    }}
                    onClick={() => handleRoutToTrailer(movie.id)}
                  >
                    <PlayArrowOutlinedIcon /> Trailer
                  </IconButton>
                </Card>
              ))}
            </Box>
          </Box>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Centers content horizontally
          }}
        >
          <Typography
            level="title-lg"
            textColor={isDark === "dark" ? "#fff" : ""}
          >
            Sorry, We don't have any recommend movie
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default RecommendationsForYou;
