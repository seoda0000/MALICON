import React, { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject, css } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
// import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import FeedIcon from "@mui/icons-material/Feed";
import { ReactNode } from "react";
import Menu from "@mui/material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import AvatarShortcutButton from "./AvatarShortcutButton";
// import ProfileAvatar from "../auth/ProfileAvatar";
import { getAccessToken, removeToken } from "../../redux/modules/user/token";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import {
  getMeWithTokenAction,
  getSubscribersAction,
} from "../../redux/modules/user";
import SigninModal from "../auth/SigninModal";
import SignupModal from "../auth/SignupModal";
import ProfileImage from "../common/ProfileImage";
import { auto } from "@popperjs/core";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BoldKoreanFont } from "../../theme/font";
import { ThemeProvider } from "@mui/material/styles";
import SubscriberItem from "../auth/SubscriberItem";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FaceIcon from "@mui/icons-material/Face";
import BroadcastModal from "../broadcast/BroadcastModal";
import CloseIcon from "@mui/icons-material/Close";
import VideoRoomComponent from "../openvidu/VideoRoomComponent";
import { RootState } from "../../redux/configStore";
import { useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountModal from "../auth/AccountModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import SendIcon from "@mui/icons-material/Send";
import { Favorite } from "@mui/icons-material";

const LayoutContainer = styled(Box)<{ open: boolean }>`
  ${({ open }) =>
    open &&
    css`
      .badge-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .badge-inner {
          position: absolute;
          .badge-alart {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(10px, -84px);
          }
          .badge-setting {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(25px, 25px);
          }
          .badge-subscribers {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-112px, 5px);
          }
          .badge-userid {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(34px, -43px);
          }
          .badge-nickname {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-117px, -84px);
          }
        }
      }
    `};
`;

interface LayoutProps {
  children: ReactNode;
}

// const menuWithLogin = ["Profile", "Account", "Dashboard", "Logout"];
const menuWithLogin = ["Profile", "Logout"];
const menuWithLogout = ["Signup", "Login"];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout(props: LayoutProps) {
  // const navigate = useNavigate();
  const loggedUser = useAppSelector((state) => state.user.userData);
  const subscribers = useAppSelector((state) => state.user.subscribers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openSigninModal, setOpenSigninModal] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ==========================

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const onClickSignin = () => {
    handleCloseUserMenu();
    setOpenSigninModal((prev) => !prev);
  };
  const onClickSignup = () => {
    handleCloseUserMenu();
    setOpenSignupModal((prev) => !prev);
  };

  // 로그아웃
  const onClickLogout = () => {
    removeToken();
    console.log("로그아웃");
    window.location.replace("/main");
  };

  const onClickMyProfile = () => {
    handleCloseUserMenu();
    navigate(`/profile/${loggedUser.id}`);
  };

  const onClickAccount = () => {};

  const onClickDashboard = () => {};

  useEffect(() => {
    dispatch(getSubscribersAction());
  }, []);

  useEffect(() => {
    if (getAccessToken()) {
      if (!loggedUser.isLoggedIn) {
        dispatch(getMeWithTokenAction());
      }
    }
  }, []);

  // 모달 조작
  const [openBroadcastModal, setOpenBroadcastModal] = useState<boolean>(false);
  const onClickBroadcast = () => {
    setOpenBroadcastModal((prev) => !prev);
  };

  // 비디오 조작
  const isViewed = useSelector((state: RootState) => state.feed);

  // 회원정보 수정 모달 조작
  const [openAccountModal, setOpenAccountModal] = useState<boolean>(false);

  // alert
  const [openAlert, setOpenAlert] = React.useState({
    state: false,
    username: "",
  });

  const handleAlert = (e: any) => {
    e.preventDefault();
    console.log("꺼져야함");
    setOpenAlert({ state: !openAlert.state, username: "" });
    // navigate("/avatar");
  };

  const action = (
    <Button color="inherit" size="small" onClick={handleAlert}>
      <CloseIcon />
    </Button>
  );

  return (
    <LayoutContainer open={open} sx={{ display: "flex" }}>
      <CssBaseline />

      <ThemeProvider theme={BoldKoreanFont}>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <AdbIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/main"
              sx={{
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                opacity: open ? 1 : 0,
              }}
            >
              MALICON
            </Typography>
          </DrawerHeader>
          <Divider />

          <List>
            {/* Drawer 열림/닫힘 버튼 */}
            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "flex",
                  justifyContent: open ? "end" : "center",
                },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                // edge="start"
                sx={{
                  Height: 24,
                  Width: 24,
                }}
              >
                {open ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
              </IconButton>
            </Box>

            {/* {open && loggedUser.isLoggedIn && (
              <MenuItem>
              </MenuItem>
            )} */}

            {/* Drawer 열렸을 때 큰 아바타 */}
            {open && (
              <Box
                sx={{
                  display: {
                    xs: "flex",
                    md: "flex",
                    justifyContent: "center",
                    mr: auto,
                    marginBottom: "30px",
                  },
                }}
              >
                <div className="badge-wrapper">
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ mr: 1 }}>
                      {loggedUser.isLoggedIn ? (
                        <ProfileImage big={true} border={true} />
                      ) : (
                        <AccountCircleRoundedIcon
                          sx={{
                            height: 120,
                            width: 120,
                          }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>

                  {/* Drawer 열렸을 때 작은 아이콘들 */}
                  {open && loggedUser.isLoggedIn && (
                    <MenuItem className="badge-inner">
                      {/* 알림 아이콘 */}
                      <IconButton
                        className="badge-alart"
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                      >
                        <Badge badgeContent={17} color="error">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      {/* 설정 아이콘 */}
                      <IconButton
                        className="badge-setting"
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={() => setOpenAccountModal((prev) => !prev)}
                      >
                        <SettingsIcon />
                      </IconButton>
                      <IconButton
                        className="badge-subscribers"
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={() => setOpenAccountModal((prev) => !prev)}
                      >
                        <Favorite />
                        <span>3</span>
                      </IconButton>
                      <ListItemText
                        className="badge-userid"
                        primary={loggedUser.userId}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      <ListItemText
                        className="badge-nickname"
                        primary={loggedUser.nickName}
                        sx={{ opacity: open ? 1 : 0, ml: 2 }}
                      />
                    </MenuItem>
                  )}
                </div>
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
                  {loggedUser.isLoggedIn &&
                    menuWithLogin.map((item) => (
                      <MenuItem
                        key={item}
                        onClick={
                          item === "Profile"
                            ? onClickMyProfile
                            : // : item === "Account"
                              // ? onClickAccount
                              // : item === "Dashboard"
                              // ? onClickDashboard
                              onClickLogout
                        }
                      >
                        <Typography textAlign="center">{item}</Typography>
                      </MenuItem>
                    ))}
                  {!loggedUser.isLoggedIn &&
                    menuWithLogout.map((item) => (
                      <MenuItem
                        key={item}
                        onClick={
                          item === "Login" ? onClickSignin : onClickSignup
                        }
                      >
                        <Typography textAlign="center">{item}</Typography>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            )}

            {/* Drawer 닫혔을 때 작은 아바타 아이콘 */}
            {!open && (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to="/main"
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : auto,
                      justifyContent: "center",
                    }}
                  >
                    {loggedUser.isLoggedIn ? (
                      <ProfileImage />
                    ) : (
                      <AccountCircleRoundedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="홈" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )}

            {/* 홈 버튼 */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to="/main"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="홈" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            {/* 피드 버튼 */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to="/feed"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FeedIcon />
                </ListItemIcon>
                <ListItemText primary="피드" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            {/* 방송하기 버튼 */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={onClickBroadcast}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PodcastsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="방송하기"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            {/* 아바타 수정 버튼 (임시) */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to="/avatar"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="내 아바타"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            {/* 튜토리얼 버튼 (임시) */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to="/tutorial"
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccessibilityNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary="튜토리얼"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <List sx={{ p: 2 }}>
            {subscribers.map((item) => (
              <SubscriberItem key={item.userPK} item={item} open={open} />
            ))}
          </List>
        </Drawer>
      </ThemeProvider>

      {/* 메인 화면: 페이지 랜딩되는 곳 */}

      <Box component="main" sx={{ flexGrow: 1, mx: "8%", my: 5 }}>
        <main className="main">{props.children}</main>
        {/* <AvatarShortcutButton /> */}
      </Box>

      {/* 로그인 모달 */}
      {openSigninModal && (
        <SigninModal
          open={openSigninModal}
          setOpen={setOpenSigninModal}
          setOpenAlert={setOpenAlert}
          openAlert={openAlert}
        />
      )}

      {/* 회원가입 모달 */}
      {openSignupModal && (
        <SignupModal open={openSignupModal} setOpen={setOpenSignupModal} />
      )}

      {/* 회원정보 수정 모달 */}
      {openAccountModal && (
        <AccountModal open={openAccountModal} setOpen={setOpenAccountModal} />
      )}

      {/* 방송 모달 */}
      {openBroadcastModal && (
        <BroadcastModal
          open={openBroadcastModal}
          setOpen={setOpenBroadcastModal}
        />
      )}

      {/* alert */}
      <Snackbar
        open={openAlert.state}
        autoHideDuration={6000}
        onClose={handleAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert variant="filled" severity="success" action={action}>
          <AlertTitle>환영합니다, {openAlert.username}님!</AlertTitle>
          MALICON에 처음 오셨나요? —
          <Link style={{ color: "white" }} to="/avatar" onClick={handleAlert}>
            아바타 만들기
          </Link>
        </Alert>
      </Snackbar>

      {/* 오픈비두 창 */}
      {/* {isViewed && <VideoRoomComponent />} */}
    </LayoutContainer>
  );
}
