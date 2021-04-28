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
import CommentIcon from "@material-ui/icons/Comment";
import { useHistory } from "react-router-dom";

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
});

function Post(prop) {
  const history = useHistory();
  const classes = useStyles();

  const handlePostPage = () => {
    history.push(`/post/:${prop.id}`);
  };

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
            <Button
              onClick={() => handlePostPage()}
              size="small"
              color="primary"
            >
              Learn More
            </Button>
          </div>
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
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default Post;
