import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  _userIsLoggedIn,
  _currentUserId,
  _user,
  _isDark,
} from "../services/atom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleLogInComponet from "../components/LoginComponents/GoogleLogInComponet";
import FaceBookLogInComponent from "../components/LoginComponents/FaceBookLogInComponent";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©  "}
      <Link color="inherit">Tamir Banay</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [succesSignUp, setSuccesSignUp] = useState(false);
  const [user, setUser] = useRecoilState(_user);
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const [error, setError] = useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [connectionDetails, setConnectionDetails] = useState([]);

  useEffect(() => {
    setUserIsLoggedIn(false);
    setIsDark("light");
  }, []);

  const handleLogin = async () => {
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
        const data = await response.json();
        localStorage.setItem("token", data.access);
        localStorage.setItem("userID", data.user.id);
        localStorage.setItem("isLoggedIn", true);
        setUserIsLoggedIn(true);
        setCurrentUserId(data.user.id);
        setUser(data);
        if (data.user.id) {
          navigate(`/${data.user.id}`);
        } else {
          console.error("User ID is null or undefined:", data);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <FaceBookLogInComponent />
              <br />
              <GoogleLogInComponet />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/#/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Login;
