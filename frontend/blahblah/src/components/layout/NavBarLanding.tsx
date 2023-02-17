import React, { useEffect, useState } from "react";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SignupModal from "../auth/SignupModal";
import SigninModal from "../auth/SigninModal";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { Badge, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileImage from "../common/ProfileImage";
import { getAccessToken, removeToken } from "../../redux/modules/user/token";
import { getMeWithTokenAction } from "../../redux/modules/user";

// import Badge from "@mui/material/Badge";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { Link } from "react-router-dom";

const pages = ["인트로 메뉴1", "인트로 메뉴2"];
const menuWithLogin = ["Profile", "Account", "Dashboard", "Logout"];

export default function NavBarLanding() {
  const loggedUser = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const [openSigninModal, setOpenSigninModal] = useState<boolean>(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onClickSignup = () => {
    handleCloseNavMenu();
    setOpenSignupModal((prev) => !prev);
  };

  const onClickSignin = () => {
    handleCloseNavMenu();
    setOpenSigninModal((prev) => !prev);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    removeToken();
    // console.log("로그아웃");
    window.location.replace("/");
  };

  useEffect(() => {
    if (getAccessToken()) {
      if (!loggedUser.isLoggedIn) {
        dispatch(getMeWithTokenAction());
      }
    }
  }, []);
  return (
    <Box position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* (md) 왼쪽 상단 로고 영역 */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            LOGO
          </Typography>

          {/* (xs) 왼쪽 상단 메뉴 영역 */}
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* (xs) 가운데 로고 영역 */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            LOGO
          </Typography>

          {!loggedUser.isLoggedIn && (
            <>
              {/* 로그인 버튼 */}
              <Box
                sx={{
                  justifyContent: "flex-end",
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Button
                  onClick={onClickSignin}
                  sx={{ my: 2, display: "block" }}
                >
                  로그인
                </Button>
              </Box>
              {/* 회원가입 버튼 */}
              <Box>
                <Button
                  onClick={onClickSignup}
                  sx={{ my: 2, display: "block" }}
                >
                  회원가입
                </Button>
              </Box>
            </>
          )}

          {/* 알림과 프로필 영역 */}

          {loggedUser.isLoggedIn && (
            <>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </MenuItem>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <ProfileImage />
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
                  {menuWithLogin.map((item) => (
                    <MenuItem
                      key={item}
                      onClick={item === "Logout" ? logout : handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{item}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
      {openSignupModal && (
        <SignupModal open={openSignupModal} setOpen={setOpenSignupModal} />
      )}
      {openSigninModal && (
        <SigninModal open={openSigninModal} setOpen={setOpenSigninModal} />
      )}
    </Box>
  );
}
