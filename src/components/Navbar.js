import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRecoilState } from "recoil";
import { styled } from "@mui/material/styles";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import {
  _movieIsOpen,
  _movieId,
  _userIsLoggedIn,
  _currentUserId,
  _isDark,
  _favoritMovies,
  _user,
  _favoriteSeries,
} from "../services/atom";
import { googleLogout } from "@react-oauth/google";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -23,
    top: 13,
    padding: "4px 12px",
  },
}));

function ResponsiveAppBar() {
  const [isDark, setIsDark] = useRecoilState(_isDark);
  const toggleIsDark = () => {
    setIsDark((curr) => (curr === "light" ? "dark" : "light"));
  };
  const favoriteSeriesStorage = JSON.parse(
    localStorage.getItem("favoriteSeries") || "[]"
  );

  const [favoriteMovies, setFavoriteMovies] = useRecoilState(_favoritMovies);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(_userIsLoggedIn);
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);
  const [user, setUser] = useRecoilState(_user);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const token = localStorage.getItem("token"); // Replace with the actual token
  // const userIsLoggedIn = localStorage.getItem("isLoggedIn");
  async function handleLogout() {
    const response = await fetch(
      "https://my-movie-app-backend-f2e367df623e.herokuapp.com/api/logout/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      localStorage.removeItem("userData");
      localStorage.removeItem("favoriteMovies");
      localStorage.setItem("isLoggedIn", false);
      setUserIsLoggedIn(false);
      setIsDark("light");
      setAnchorElUser(false);
      setCurrentUserId(null);
      navigate("/login");
    } else {
      console.error("Logout failed:", response.statusText);
    }

    if (user.isGoogleUser) googleLogout();
  }

  const handleProfile = () => {
    navigate(`/${currentUserId}/profile`);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieCreationTwoToneIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={`/TamirBanay-movies-app-frontend--live/#/${currentUserId}`}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOVIES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {userIsLoggedIn ? (
                <div>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    sx={{ width: "140px" }}
                  >
                    <Link
                      to={`/${currentUserId}/series`}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      SERIES
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    sx={{ width: "130px" }}
                  >
                    <Link
                      to={`/${currentUserId}/favorits`}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      <StyledBadge
                        badgeContent={
                          favoriteMovies.length + favoriteSeriesStorage.length
                        }
                        color="primary"
                      >
                        FAVORITE
                      </StyledBadge>
                    </Link>
                  </MenuItem>
                </div>
              ) : (
                ""
              )}
            </Menu>
          </Box>
          <MovieCreationTwoToneIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={`/TamirBanay-movies-app-frontend--live/#/${currentUserId}`}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOVIES
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                width: "50%",
              },
            }}
          >
            {userIsLoggedIn ? (
              <div
                style={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Button
                  href={`/TamirBanay-movies-app-frontend--live/#/${currentUserId}/series`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  SERIES
                </Button>
                <Button
                  href={`/TamirBanay-movies-app-frontend--live/#/${currentUserId}/favorits`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Badge
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    badgeContent={
                      favoriteMovies.length + favoriteSeriesStorage.length
                    }
                    color="secondary"
                  >
                    MY Favorites
                  </Badge>
                </Button>
              </div>
            ) : (
              <Button
                href="/TamirBanay-movies-app-frontend--live/#/login"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                login
              </Button>
            )}
          </Box>

          {userIsLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 2 }} onClick={toggleIsDark}>
                {isDark === "dark" ? (
                  <Tooltip title="light Mode">
                    <DarkModeOutlinedIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Dark Mode">
                    <DarkModeIcon />
                  </Tooltip>
                )}
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            ""
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
