import React, { useState, useEffect } from "react";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
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
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState } from "recoil";
import { Button, Modal } from "@mui/material";

function MovieReviews(props) {
  const [reviews, setReviews] = useRecoilState(__reviewsForCurrentMoive);
  const [reviewsOn, setreviewsOn] = useRecoilState(_reviewsOpen);

  const handleReviewsOn = () => {
    setreviewsOn(!reviewsOn);
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    width: "80%",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    maxHeight: "80vh",
  };

  return (
    <Modal
      open={reviewsOn}
      onClose={handleReviewsOn}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={modalStyle}>
        {reviews.length === 0 ? (
          <Typography level="body-lg" color="#000" sx={{ mt: "2%" }}>
            There are no reviews
          </Typography>
        ) : (
          reviews.map((review) => (
            <CardContent key={review.id} sx={{ mt: "1%" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <StarPurple500SharpIcon sx={{ color: "#FFB000", mr: "1%" }} />

                <Typography level="body-lg" color="#000">
                  {review.author_details.rating}{" "}
                </Typography>
                <Typography
                  sx={{ alignSelf: "flex-end" }}
                  level="body-sm"
                  color="#000"
                >
                  /10
                </Typography>
              </Box>
              <Typography level="title-lg" color="#000" sx={{ mt: "1%" }}>
                {review.author}
              </Typography>
              <Typography sx={{ mt: "1%" }} level="body-xs" color="#000">
                {review.created_at.split("T")[0]}
              </Typography>
              <Typography level="body-sm" color="#000" sx={{ mt: "2%" }}>
                {review.content}
              </Typography>
              <Divider
                orientation="horizontal"
                sx={{ bgcolor: "#fff", mt: "2%" }}
              />
            </CardContent>
          ))
        )}
      </div>
    </Modal>
  );
}

export default MovieReviews;
