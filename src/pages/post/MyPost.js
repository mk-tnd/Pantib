import React, { useContext } from "react";
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
import CommentIcon from "@material-ui/icons/Comment";
import { useHistory } from "react-router-dom";
import { formatDateTime } from "../../utils/customize";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "../../config/axios";
import { PostContext } from "../../contexts/PostContextProvider";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  detail: {
    overflow: "hidden",
  },
  bottom: {
    justifyContent: "space-between",
  },
  justifyContent: {
    justifyContent: "flex-start",
  },
  content: {
    flexBasis: "40%",
  },
});

function MyPost(prop) {
  const history = useHistory();
  const classes = useStyles();
  const { setPosts } = useContext(PostContext);

  const handlePostPage = () => {
    history.push(`/post/:${prop.id}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/post/${postId}`);
      prop.setTriggerDelete((prev) => !prev);
      setPosts((prevPost) => prevPost.filter((item) => item.id !== postId));
    } catch (err) {}
  };

  return (
    <div>
      <Card className={classes.root + " m-2 m-md-3"}>
        <CardActionArea
          className={classes.justifyContent}
          onClick={() => handlePostPage()}
          style={{ display: prop.Images ? "flex" : "block" }}
        >
          {prop.Images ? (
            <div className={classes.content}>
              <CardMedia
                className={classes.width}
                component="img"
                alt={prop.Images}
                height="140"
                image={prop.Images}
                title={prop.TopicName}
              />
            </div>
          ) : null}
          <CardContent>
            <Typography gutterBottom component="h2">
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
          <Typography variant="body2" color="textSecondary" component="h5">
            Posted by {prop.User.FirstName} {prop.User.LastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h5">
            {formatDateTime(new Date(prop.createdAt))}
          </Typography>
          <div className="d-flex">
            <div className="d-flex align-items-center mx-3">
              <h4 className="m-0">{prop.Likes}</h4>
              <Button size="small" color="primary">
                <ThumbUpIcon color="primary" />
              </Button>
            </div>
            <div className="d-flex align-items-center mx-3">
              <h4 className="m-0">{prop.Recommend}</h4>
              <Button size="small" color="secondary">
                <StarsIcon />
              </Button>
            </div>
            <div className="d-flex align-items-center mx-3">
              <h4 className="m-0">{prop.Commend}</h4>
              <Button size="small" color="primary">
                <CommentIcon color="disabled" />
              </Button>
            </div>
            <div className="d-flex align-items-center mx-3">
              <Button size="small" onClick={() => handleDeletePost(prop.id)}>
                <DeleteForeverIcon color="secondary" />
              </Button>
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default MyPost;
