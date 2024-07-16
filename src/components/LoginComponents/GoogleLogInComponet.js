import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  _userIsLoggedIn,
  _currentUserId,
  _user,
  _isDark,
} from "../../services/atom";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import googleImagLogIn from "../../images/googleImagLogIn.png";

import { useRecoilState } from "recoil";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

function GoogleLogInComponet() {
  const [user, setUser] = useRecoilState(_user);
  const [succesSignUp, setSuccesSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const navigate = useNavigate();
  const [connectionDetails, setConnectionDetails] = useState([]);

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setConnectionDetails(codeResponse);
      getUserGoogleProfile(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const getUserGoogleProfile = (codeResponse) => {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${codeResponse.access_token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(async (data) => {
        setUser(data);

        const googleUserData = {
          first_name: data.given_name,
          last_name: data.family_name,
          username: data.email,
          email: data.email,
          password: 1234,
          isGoogleUser: true,
          googleID: data.id,
          isFaceBookUser: false,
          FaceBookID: null,
        };

        try {
          const response = await fetch(
            "https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/signup/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(googleUserData),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
          } else {
            const userData = await response.json();
            console.log("Signup successful", userData);
            setUser(userData);
            handleLoginGoogle(
              googleUserData.username,
              googleUserData.password,
              userData
            );
            return;
          }

          handleLoginGoogle(
            googleUserData.username,
            googleUserData.password,
            user
          );
          setUser(data);
        } catch (error) {
          console.error("Network error", error);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (!succesSignUp) {
    } else {
    }
  };

  const handleLoginGoogle = async (username, password, user) => {
    const url =
      "https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/login/";
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
      <IconButton
        sx={{ borderRadius: 0, padding: 0, width: "100%" }}
        onClick={() => loginGoogle()}
      >
        <img src={googleImagLogIn} sx={{ width: "100%" }} />
      </IconButton>
    </div>
  );
}

export default GoogleLogInComponet;
