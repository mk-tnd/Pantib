import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../config/axios";
import { useState } from "react";

function AddPost2(prop) {
  const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  const [content, setContent] = useState({
    TopicName: "",
    Details: "",
  });

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPost = async (e) => {
    const { TopicName, Details } = content;
    e.preventDefault();
    await axios.post("/post", { TopicName, Details, zoneId: prop.zid });
    prop.setIsZoneChoose(false);
    prop.setIsAddPost(false);
  };
  console.log(content);
  return (
    <div className="container">
      <h2 className="text-center">Create Post</h2>
      <div className="row">
        <form onSubmit={handleAddPost} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="TopicName"
                variant="outlined"
                required
                fullWidth
                id="topicName"
                label="Topic name"
                value={content.TopicName}
                onChange={handleContentChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="details"
                label="Details"
                name="Details"
                onChange={handleContentChange}
                value={content.Details}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddPost2;
