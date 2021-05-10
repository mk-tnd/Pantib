import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { formatDateTime } from "../utils/customize";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function TopPost(prop) {
  const classes = useStyles();
  const history = useHistory();

  const handlePostPage = (id) => {
    history.push(`/post/:${id}`);
  };

  return (
    <div>
      {prop.posts.map((item) => (
        <Card key={item.id} className={classes.root}>
          <CardActionArea onClick={() => handlePostPage(item.id)}>
            <CardContent>
              <div>
                {item.Images ? (
                  <img
                    src={item.Images}
                    alt={item.TopicName}
                    className="img-fluid mb-3"
                  />
                ) : null}
              </div>
              <Typography variant="h5">{item.TopicName}</Typography>
              <Typography className={classes.pos} color="textSecondary">
                {item.Details}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Typography variant="body2" color="textSecondary" component="h5">
              Posted by {item.User.FirstName} {item.User.LastName}
            </Typography>
            <Typography
              style={{ margin: "0" }}
              variant="body2"
              color="textSecondary"
              component="h5"
            >
              At {formatDateTime(new Date(item.createdAt))}
            </Typography>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default TopPost;
