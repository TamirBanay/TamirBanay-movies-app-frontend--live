import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import { Link, useParams, useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";

import {
  _movieIsOpen,
  _movieId,
  _currentUserId,
  _isDark,
} from "../../services/atom";

export default function BasicCard() {
  const { movieId } = useParams();
  let navigate = useNavigate();

  const [isDark, setIsDark] = useRecoilState(_isDark);
  const [movie, setMovie] = useState({});
  const imgPath = "https://image.tmdb.org/t/p/original/";
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);

  const fetchMovieData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM3NTJiZjE3MmJlMzNhNTdhY2UyNTAxYjI5MDkyYSIsInN1YiI6IjY1MDE5YWJjNmEyMjI3MDBhYmE5MWFlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6EhZEXn1Bz9SFSO4_zALQKSY6DRvx_O7-tdzP1J_Ls0",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovie(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovieData();
  }, [movieId]);
  return (
    <div>
      <p />
      <Grid
        container
        spacing={0}
        sx={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Card
          sx={{
            backgroundColor: isDark === "dark" ? "#212121" : "",
            width: 520,
          }}
        >
          <div>
            <Typography
              level="title-lg"
              sx={{ color: isDark === "dark" ? "white" : "" }}
            >
              {movie.title}
            </Typography>

            <Typography
              level="body-sm"
              sx={{ color: isDark === "dark" ? "white" : "" }}
            >
              Release: {movie.release_date}
            </Typography>
          </div>
          <AspectRatio ratio={4 / 5}>
            {movie.poster_path && (
              <img src={`${imgPath + movie.poster_path}`} alt={movie.title} />
            )}
          </AspectRatio>
          <CardContent orientation="horizontal">
            <div>
              <Typography
                level="body-md"
                sx={{ color: isDark === "dark" ? "white" : "" }}
              >
                Rating: {movie.vote_average}
              </Typography>
              <Typography
                fontSize="lg"
                fontWeight="lg"
                sx={{ color: isDark === "dark" ? "white" : "" }}
              >
                Overview:{" "}
                <Typography fontSize="lg" fontWeight="sm">
                  {movie.overview}
                </Typography>
              </Typography>
            </div>
            <Link to={`/${currentUserId}`} style={{ marginTop: "auto" }}>
              <Button
                onClick={() => navigate(-1)}
                variant="solid"
                size="lg"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{
                  alignSelf: "center",
                  fontWeight: 600,
                  m: "auto",
                }}
              >
                Back
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
