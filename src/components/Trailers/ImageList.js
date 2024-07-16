import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";

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
} from "../../services/atom";
import { useRecoilState } from "recoil";

export default function QuiltedImageList(props) {
  const [images, setImages] = useRecoilState(_imagesForCurrentMoive);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [imagesOn, setImagesOn] = useRecoilState(_imagesOn);
  const handleNextImage = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleImagesOn = () => {
    setImagesOn(!imagesOn);
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
  };

  return (
    <Modal
      open={imagesOn}
      onClose={handleImagesOn}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={modalStyle}>
        {images.length > 0 && (
          <div>
            <img
              src={images[currentIndex].img}
              alt={`Backdrop Image ${currentIndex + 1}`}
              style={{ width: "100%", maxHeight: "500px", margin: "20px 0" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <Button onClick={handlePrevImage} disabled={currentIndex === 0}>
                Previous
              </Button>
              <Button
                onClick={handleNextImage}
                disabled={currentIndex === images.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
