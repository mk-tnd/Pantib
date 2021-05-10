import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";

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
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  position: {
    position: "relative",
    right: "-60px",
    top: "-10px",
    cursor: "pointer",
  },
}));

function Edit(prop) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    FirstName: prop.user.FirstName,
    LastName: prop.user.LastName,
    Email: prop.user.Email,
    Details: prop.user.Details,
  });
  const [error, setError] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setData({
      FirstName: prop.user.FirstName,
      LastName: prop.user.LastName,
      Email: prop.user.Email,
      Details: prop.user.Details,
    });
  };

  function handleDataChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (name === "Email") {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        setError((prev) => ({ ...prev, Email: "invalid email address" }));
      } else {
        setError((prev) => ({ ...prev, Email: false }));
      }
    }
  }

  const handleSubmit = (e) => {
    const { FirstName, LastName, Email, Details } = data;
    e.preventDefault();
    axios
      .patch("/users/edit", { FirstName, LastName, Email, Details })
      .then((res) => {
        prop.setTriggerEdit(true);
        setOpen(false);
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

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleOpen}
        >
          Edit
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper2}>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <div className="d-flex align-items-center flex-column m-4">
                <Avatar src={prop.user.ProfileImg} className={classes.large}>
                  <LockOutlinedIcon />
                </Avatar>
              </div>
              <Container maxWidth="sm">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="FirstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={data.FirstName}
                      onChange={handleDataChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="LastName"
                      autoComplete="lname"
                      value={data.LastName}
                      onChange={handleDataChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="Email"
                      autoComplete="email"
                      value={data.Email}
                      onChange={handleDataChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      rows={4}
                      name="Details"
                      label="Detail"
                      type="text"
                      id="Detail"
                      value={data.Details}
                      onChange={handleDataChange}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Container>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default Edit;
