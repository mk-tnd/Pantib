import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
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
import { formatDateTime } from "../../utils/customize";
import { Context } from "../../contexts/ContextProvider";

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
    justifyContent: "space-between",
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

  const { pid } = useParams();
  const { thisPost, setThisPost } = useContext(PostContext);
  const [text, setText] = useState("");
  const [commends, setCommends] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { isAuth } = useContext(Context);

  const [likeColor, setLikeColor] = useState("disabled");
  const [likePlus, setLikePlus] = useState(false);
  const [recPlus, setRecPlus] = useState(false);
  const [recColor, setRecColor] = useState("disabled");
  const [rec, setRec] = useState(false);
  const [like, setLike] = useState(false);

  const handleRec = async () => {
    try {
      await axios.patch(`/promote/recommend/${+pid.split(":")[1]}`);
      if (!rec) {
        setRecColor("secondary");
        setRec(true);
        setRecPlus(true);
      }
      setTimeout(() => {
        setRecPlus(false);
        setRecColor("disabled");
      }, 500);
    } catch (err) {}
  };

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
        setLikeColor("disabled");
      }, 500);
    } catch (err) {}
  };

  // const handleAlrLike = async () => {
  //   try {
  //     const res = await axios.get("/promote");
  //     setCheckLike(res.data.promote);
  //   } catch (err) {}
  // };

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
    setIsloading(true);
  };

  const handleAddCommend = async (e) => {
    if (isAuth) {
      await axios.post(`/commend/${+pid.split(":")[1]}`, { text });
    } else {
      alert("เข้าสู่ระบบก่อนใช้งาน");
      history.push("/");
    }
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
        </Toolbar>
      </AppBar>

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
            {thisPost.Images ? (
              <div className="mx-auto" style={{ width: "700px" }}>
                <img
                  src={thisPost.Images}
                  alt={thisPost.TopicName}
                  className="img-fluid mx-auto d-flex my-4"
                  style={{ maxHeight: "500px" }}
                />
              </div>
            ) : null}
            <CardActions className={classes.bottom}>
              <div className="d-flex">
                <Typography
                  className="mr-3"
                  variant="body2"
                  color="textSecondary"
                  component="h5"
                >
                  {isloading &&
                    `Posted by ${thisPost.User.FirstName} ${thisPost.User.LastName}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="h5"
                >
                  {isloading &&
                    `${formatDateTime(new Date(thisPost.createdAt))}`}
                </Typography>
              </div>
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <Button size="small" color="primary">
                    <ThumbUpIcon
                      onClick={() => handlePushLike()}
                      color={likeColor}
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
