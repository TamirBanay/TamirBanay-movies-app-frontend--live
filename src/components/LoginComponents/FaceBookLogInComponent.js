import { LoginSocialFacebook } from "reactjs-social-login";

import { FacebookLoginButton } from "react-social-login-buttons";
import {
  _userIsLoggedIn,
  _currentUserId,
  _user,
  _isDark,
} from "../../services/atom";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FaceBookLogInComponent() {
  const [user, setUser] = useRecoilState(_user);
  const [error, setError] = useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const navigate = useNavigate();
  const faceBookLogIn = (response) => {
    FaceBookConnections(response);
  };
  const FaceBookConnections = async (data) => {
    const faceBookUserData = {
      first_name: data.data.first_name,
      last_name: data.data.last_name,
      username: data.data.email,
      email: data.data.email,
      password: 1234,
      isGoogleUser: false,
      googleID: null,
      isFaceBookUser: true,
      FaceBookID: data.data.userID,
    };
    try {
      const response = await fetch("https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(faceBookUserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
      } else {
        const userData = await response.json();
        console.log("Signup successful", userData);
        setUser(userData);
        handleLoginFaceBook(
          faceBookUserData.username,
          faceBookUserData.password,
          userData
        );
        return;
      }

      handleLoginFaceBook(
        faceBookUserData.username,
        faceBookUserData.password,
        user
      );
      setUser(data);
    } catch (error) {
      console.error("Network error", error);
    }
  };

  const handleLoginFaceBook = async (username, password, user) => {
    const url = "https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/login/";
    const credentials = {
      username,
      password,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.non_field_errors || "Login failed");
      } else {
        const user = await response.json();
        localStorage.setItem("token", user.access);
        localStorage.setItem("userID", user.user.id);
        localStorage.setItem("isLoggedIn", true);
        setUserIsLoggedIn(true);
        setCurrentUserId(user.user.id);
        setUser(user);

        if (user.user.id) {
          navigate(`/${user.user.id}`);
        } else {
          console.error("User ID is null or undefined:", user);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <div>
      {" "}
      <LoginSocialFacebook
        appId="660093776268943"
        onResolve={faceBookLogIn}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
}

export default FaceBookLogInComponent;
