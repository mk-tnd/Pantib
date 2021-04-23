import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import StarsIcon from "@material-ui/icons/Stars";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import axios from "../../config/axios";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "20px",
  },

  detail: {
    overflow: "hidden",
  },

  bottom: {
    justifyContent: "space-between",
  },
  fadein: {
    opacity: 0,
    transition: "opacity 0.5s",
  },
  fadeout: {
    opacity: 1,
    transition: "opacity 0.5s",
  },
});

function Post(prop) {
  const [likeColor, setLikeColor] = useState("disabled");
  const [likePlus, setLikePlus] = useState(false);
  const [recPlus, setRecPlus] = useState(false);
  const [recColor, setRecColor] = useState("disabled");
  const [like, setLike] = useState(false);
  const [rec, setRec] = useState(false);
  const [ulike, setUlike] = useState([]);
  const classes = useStyles();
  const [liked, setLiked] = useState([]);

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
      await axios.patch(`/promote/like/${prop.id}`);
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
    const check = ulike.filter((item) => item.PLikeId === prop.id);
    setLiked(check);
  };

  useEffect(() => {
    handleAlrLike();
  }, []);

  useEffect(() => {
    handleDisabled();
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea style={{ display: prop.Images ? "flex" : "block" }}>
          {prop.Images ? (
            <CardMedia
              className={classes.width}
              component="img"
              alt={prop.Images}
              height="140"
              image={prop.Images}
              title={prop.TopicName}
            />
          ) : null}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {prop.TopicName}
            </Typography>
            <Typography
              className={classes.detail}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {prop.Details}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.bottom}>
          <div>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center mx-3">
              <h4 className="m-0">{prop.Likes}</h4>
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
            <div className="d-flex align-items-center mx-3">
              <h4 className="m-0">{prop.Recommend}</h4>
              <Button size="small" color="primary">
                <StarsIcon onMouseDown={() => handleRec()} color={recColor} />
              </Button>
              <ExposurePlus1Icon
                className={recPlus ? classes.fadeout : classes.fadein}
              />
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
