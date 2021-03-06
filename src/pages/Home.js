import React, { useContext, useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Feed from "../components/Feed";
import { Context } from "../contexts/ContextProvider";
import axios from "../config/axios";
import localStorageService from "../services/localStorageService";
import { useHistory } from "react-router-dom";
import AddPost from "./post/AddPost";
import Profile from "./Profile";
import Zone from "./Zone";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  rootAvatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  palette: {
    primary: {
      main: "#ffc107",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Home() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [triggerEdit, setTriggerEdit] = useState(false);
  const [triggerEditImg, setTriggerEditImg] = useState(false);
  const { setIsAuth, user, setUser } = useContext(Context);
  const [error, setError] = useState({});
  const [isAddPost, setIsAddPost] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isZone, setIsZone] = useState(false);
  const [search, setSearch] = useState("");
  const { isAuth } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/me");
        if (user) setUser(res.data.user);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    getUser();
  }, [triggerEdit, triggerEditImg]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogo = () => {
    history.push("/");
    setIsAddPost(false);
    setIsProfile(false);
    setIsZone(false);
  };

  const gotoProfile = () => {
    setIsAddPost(false);
    setIsZone(false);
    setIsProfile(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorageService.clearToken();
    setIsAuth(false);
    history.push("/");
  };

  const handleAddPost = () => {
    if (isAuth) {
      setIsAddPost(true);
    } else {
      alert("???????????????????????????????????????????????????????????????");
      history.push("/");
    }
  };

  const handleSearchText = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      setOpen(true);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => gotoProfile()}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root + " container-fluid"}>
      <CssBaseline />
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography
            onClick={handleLogo}
            className={classes.title}
            variant="h6"
            noWrap
          >
            Pantib
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search???"
              value={search}
              onChange={handleSearchText}
              onKeyPress={handleSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div>
            <IconButton color="inherit">
              <Badge badgeContent={null} color="secondary">
                <Icon onClick={() => handleAddPost()} style={{ fontSize: 30 }}>
                  add_circle
                </Icon>
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionDesktop}>
            {isAuth ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt={user.FirstName} src={user.ProfileImg} />
                <h5
                  style={{ margin: "0 10px" }}
                >{`${user.FirstName} ${user.LastName}`}</h5>
              </IconButton>
            ) : (
              <IconButton
                edge="end"
                aria-label="back to register"
                aria-haspopup="true"
                onClick={() => history.push("/")}
                color="inherit"
              >
                <h5 style={{ margin: "0 10px" }}>????????????????????????????????? / ?????????????????????????????????</h5>
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div className="container mt-4">
        <div className={classes.drawerHeader} />
        {isAddPost ? (
          <AddPost setIsAddPost={setIsAddPost} />
        ) : isProfile ? (
          <Profile
            setTriggerEdit={setTriggerEdit}
            setTriggerEditImg={setTriggerEditImg}
          />
        ) : isZone ? (
          <Zone />
        ) : (
          <Feed
            Zone={setIsZone}
            open={open}
            setOpen={setOpen}
            search={search}
            setSearch={setSearch}
          />
        )}
      </div>
    </div>
  );
}
export default Home;
