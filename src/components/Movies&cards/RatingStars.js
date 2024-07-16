import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  5.5: "Useless",
  6: "Useless+",
  6.5: "Poor",
  7: "Poor+",
  7.5: "Ok",
  8: "Ok+",
  8.5: "Good",
  9: "Good+",
  9.5: "Excellent",
  10: "Excellent+",
};
export default function TextRating(props) {
  const value = props.rating / 2;
  return (
    <Box
      sx={{
        // width: 200,
        display: "flex-end",
        alignItems: "right",
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
  );
}
