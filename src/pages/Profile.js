import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MyPostList from "../components/MyPostList";
import axios from "../config/axios";
import { Context } from "../contexts/ContextProvider";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Edit from "../components/Edit";
import Button from "@material-ui/core/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  bar: {
    width: "500px",
    margin: "0 auto",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

function Profile(prop) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [triggerDelete, setTriggerDelete] = useState(false);
  const { user } = useContext(Context);
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});

  const fetchMyPost = async () => {
    const res = await axios.get("/post/mypost");
    setMyPosts(res.data.posts);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const updateProfileImg = async () => {
    const formData = new FormData();
    formData.append("ProfileImg", file);
    await axios
      .patch("/users/editImg", formData)
      .then((res) => {
        prop.setTriggerEditImg(true);
      })
      .catch((err) => {
        if (err) {
          setError({ server: err.response.data.message });
          alert(JSON.stringify(error));
        } else {
          setError(err.message);
        }
      });
  };

  useEffect(() => {
    fetchMyPost();
  }, [triggerDelete]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="container">
      <div className={classes.root}>
        <div className="d-flex align-items-center flex-column p-4">
          <Avatar
            alt={user.FirstName}
            src={user.ProfileImg}
            className={classes.large}
          />
          {value === 1 ? (
            <div className="d-flex align-items-center my-2">
              <input onChange={handleFileChange} type="file" />
              <Button onClick={() => updateProfileImg()} variant="outlined">
                Upload
              </Button>
            </div>
          ) : null}
        </div>
        <AppBar className={classes.bar} position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs"
          >
            <Tab label="My Topic" {...a11yProps(0)} />
            <Tab label="My Profile" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <MyPostList myPosts={myPosts} setTriggerDelete={setTriggerDelete} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Container component="main" maxWidth="sm">
              <div className="d-flex justify-content-between m-3">
                <div className="d-flex align-items-end">
                  <p className="m-0 font-weight-bold">Firstname:</p>
                  <p className="m-0 pl-3">{user.FirstName}</p>
                </div>
                <div className="d-flex align-items-end">
                  <p className="m-0 font-weight-bold">Lastname:</p>
                  <p className="m-0 pl-3">{user.LastName}</p>
                </div>
              </div>
              <div className="d-flex align-items-end m-3">
                <p className="m-0 font-weight-bold">Email:</p>
                <p className="m-0 pl-3">{user.Email}</p>
              </div>
              <div className="d-flex align-items-end m-3">
                <p className="m-0 font-weight-bold">Detail:</p>
                <p className="m-0 pl-3">{user.Details}</p>
              </div>
              <Edit user={user} setTriggerEdit={prop.setTriggerEdit} />
            </Container>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}

export default Profile;
