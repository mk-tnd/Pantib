import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { DropzoneArea } from "material-ui-dropzone";
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
  const [file, setFile] = useState(null);
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
    const formData = new FormData();
    formData.append("TopicName", TopicName);
    formData.append("Images", file);
    formData.append("Details", Details);
    formData.append("zoneId", prop.zid);
    e.preventDefault();
    await axios.post("/post", formData);
    prop.setIsZoneChoose(false);
    prop.setIsAddPost(false);
  };

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
              <DropzoneArea
                name="Images"
                acceptedFiles={["image/*"]}
                filesLimit={1}
                onChange={(files) => setFile(files[0])}
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
