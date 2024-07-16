import { useParams } from "react-router-dom";
import MovieTrailer from "../components/Trailers/MovieTrailer";
import SeriesTrailer from "../components/Trailers/SeriesTrailer";

function Trailer(props) {
  let { mediaType } = useParams(); // Extract the type from URL parameter

  return (
    <div>
      {mediaType === "movie" && <MovieTrailer />}
      {mediaType === "series" && <SeriesTrailer />}
    </div>
  );
}

export default Trailer;
