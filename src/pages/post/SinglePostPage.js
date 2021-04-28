import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreVert";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import StarsIcon from "@material-ui/icons/Stars";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import CardActions from "@material-ui/core/CardActions";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContextProvider";
import { useEffect } from "react";
import axios from "../../config/axios";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  bottom: {
    justifyContent: "flex-end",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
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
  fadein: {
    opacity: 0,
    transition: "opacity 0.5s",
  },
  fadeout: {
    opacity: 1,
    transition: "opacity 0.5s",
  },
}));

function SinglePostPage() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { pid } = useParams();
  const { thisPost, setThisPost } = useContext(PostContext);
  const [text, setText] = useState("");
  const [commends, setCommends] = useState([]);

  const [likeColor, setLikeColor] = useState("disabled");
  const [likePlus, setLikePlus] = useState(false);
  const [recPlus, setRecPlus] = useState(false);
  const [recColor, setRecColor] = useState("disabled");
  const [rec, setRec] = useState(false);
  const [ulike, setUlike] = useState([]);
  const [liked, setLiked] = useState([]);
  const [like, setLike] = useState(false);

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

  function handleRec() {
    if (!rec) {
      setRecColor("secondary");
      setRec(true);
      setRecPlus(true);
    }
    setTimeout(() => {
      setRecPlus(false);
    }, 500);
  }

  const handlePushLike = async () => {
    try {
      await axios.patch(`/promote/like/${+pid.split(":")[1]}`);
      if (!like) {
        setLikeColor("primary");
        setLike(true);
        setLikePlus(true);
      }
      setTimeout(() => {
        setLikePlus(false);
      }, 500);
    } catch (err) {}
  };

  const handleAlrLike = async () => {
    try {
      const res = await axios.get("/promote");
      setUlike(res.data.promote);
    } catch (err) {}
  };

  const handleDisabled = () => {
    const check = ulike.filter((item) => item.PLikeId === +pid.split(":")[1]);
    setLiked(check);
  };

  const handlePostPage = () => {
    history.push(`/post/:${+pid.split(":")[1]}`);
  };

  useEffect(() => {
    handleAlrLike();
  }, []);

  useEffect(() => {
    handleDisabled();
  }, []);

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
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

  const handleCommend = (e) => {
    const commend = e.target.value;
    setText(commend);
  };

  const fetchCommends = async () => {
    const res = await axios.get(`/commend/${+pid.split(":")[1]}`);
    setCommends(res.data.commends);
  };

  const fetchThisPost = async () => {
    const res = await axios.get(`/post/${+pid.split(":")[1]}`);
    setThisPost(res.data.posts);
  };

  const handleAddCommend = async (e) => {
    await axios.post(`/commend/${+pid.split(":")[1]}`, { text });
  };

  useEffect(() => {
    fetchThisPost();
    fetchCommends();
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
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
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
      <div className="container">
        <div
          className="row p-4 m-4"
          style={{ border: "1px solid grey", borderRadius: "5px" }}
        >
          <div style={{ width: "100%" }}>
            <Typography>
              <h3>{thisPost.TopicName}</h3>
              <p>{thisPost.Details}</p>
            </Typography>
            <CardActions className={classes.bottom}>
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <Button
                    disabled={liked ? true : false}
                    size="small"
                    color="primary"
                  >
                    <ThumbUpIcon
                      onClick={() => handlePushLike()}
                      color={liked ? "primary" : likeColor}
                    />
                  </Button>
                  <ExposurePlus1Icon
                    className={likePlus ? classes.fadeout : classes.fadein}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <Button size="small" color="primary">
                    <StarsIcon
                      onMouseDown={() => handleRec()}
                      color={recColor}
                    />
                  </Button>
                  <ExposurePlus1Icon
                    className={recPlus ? classes.fadeout : classes.fadein}
                  />
                </div>
              </div>
            </CardActions>
          </div>
        </div>
        <div style={{ overflow: "auto", height: "33vh" }}>
          {commends.map((item) => (
            <div
              key={item.id}
              className="row p-4 m-4"
              style={{ border: "1px solid grey", borderRadius: "5px" }}
            >
              <div>
                <p>{item.Text}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="row p-4 m-4"
          style={{ border: "1px solid grey", borderRadius: "5px" }}
        >
          <h4>Comment</h4>
          <form style={{ width: "100%" }} onSubmit={handleAddCommend}>
            <textarea
              name=""
              id=""
              style={{ width: "100%", padding: "10px" }}
              rows="5"
              onChange={handleCommend}
              value={text}
            ></textarea>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
