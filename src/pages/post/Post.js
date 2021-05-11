import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import StarsIcon from "@material-ui/icons/Stars";
import CommentIcon from "@material-ui/icons/Comment";
import { useHistory } from "react-router-dom";
import { formatDateTime } from "../../utils/customize";

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

function Post(prop) {
  const history = useHistory();
  const classes = useStyles();

  const handlePostPage = () => {
    history.push(`/post/:${prop.id}`);
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
          <Typography variant="body2" color="textSecondary" component="h5">
            Posted by {prop.User.FirstName} {prop.User.LastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h5">
            {formatDateTime(new Date(prop.createdAt))}
          </Typography>
          <div className="d-flex">
            <div className="d-flex align-items-center mx-3">
              <h4 style={{ cursor: "default" }} className="m-0">
                {prop.Likes}
              </h4>
              <ThumbUpIcon className="ml-2" color="primary" />
            </div>
            <div className="d-flex align-items-center mx-3">
              <h4 style={{ cursor: "default" }} className="m-0">
                {prop.Recommend}
              </h4>
              <StarsIcon className="ml-2" color="secondary" />
            </div>
            <div className="d-flex align-items-center mx-3">
              <h4 style={{ cursor: "default" }} className="m-0">
                {prop.Commend}
              </h4>
              <CommentIcon className="ml-2" color="disabled" />
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
