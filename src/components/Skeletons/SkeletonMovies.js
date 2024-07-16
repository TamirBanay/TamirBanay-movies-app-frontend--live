import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { _moviesList, _isDark } from "../../services/atom";
import { useRecoilState } from "recoil";

function Media(props) {
  const { loading = false } = props;
  const [movies, setMovies] = useRecoilState(_moviesList);
  const [isDark, setIsDark] = useRecoilState(_isDark);

  const items = loading ? Array.from(new Array(movies.length)) : movies;

  return (
    <div>
      <p />

      <Skeleton
        animation="wave"
        height={60}
        width={600}
        sx={{ m: "auto", bgcolor: isDark === "dark" ? "#4F4A45" : "" }}
      />

      <Grid
        container
        spacing={0}
        sx={{ flexGrow: 1, justifyContent: "center" }}
      >
        {items.map((item, index) => (
          <Grid item key={index}>
            <CardContent>
              <Skeleton
                variant="rectangular"
                sx={{
                  minHeight: "280px",
                  width: 180,
                  borderRadius: "10px",
                  bgcolor: isDark === "dark" ? "#4F4A45" : "",
                }}
              />
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      {/* <Media /> */}
    </Box>
  );
}
