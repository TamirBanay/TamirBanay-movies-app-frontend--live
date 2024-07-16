import { useRecoilState } from "recoil";
import {
  _moviesList,
  _currentPage,
  _movieId,
  _currentUserId,
  _userIsLoggedIn,
  _user,
  _isDark,
  _selectType,
} from "../services/atom";
import { useEffect, useState } from "react";

function Profile() {
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token"); // Replace with the actual token
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const [user, setUser] = useRecoilState(_user);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const fetchUserData = () => {
    if (currentUserId) {
      fetch(`https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/user_detail/${userID}/`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("userData", JSON.stringify(data));

          if (currentUserId == null) {
            setUserIsLoggedIn(false);
          } else {
            setUserIsLoggedIn(true);
          }
        })
        .catch((error) =>
          console.error("There was a problem with the fetch:", error)
        );
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Enhanced shadow for frame effect
        maxWidth: "400px",
        margin: "3rem auto",
        borderRadius: "12px", // More rounded corners for a smoother frame
        backgroundColor: isDark === "dark" ? "#212121" : "#f9f9f9",
        border: "8px solid #d1d1d1",
        color: isDark === "dark" ? "#F5F5F5" : "#333",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          borderBottom: "2px solid #e0e0e0",
          paddingBottom: "1rem",
        }}
      >
        User Name: {userData.username}
      </div>
      <div style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
        First Name: {userData.first_name}
      </div>
      <div style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
        Email: {userData.email}
      </div>
    </div>
  );
}

export default Profile;
