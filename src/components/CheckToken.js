import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { _userIsLoggedIn } from "../services/atom";

export default function CheckToken() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.setItem("isLoggedIn", false);
        setUserIsLoggedIn(false);
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    }
  }, [navigate]);

  return null;
}
