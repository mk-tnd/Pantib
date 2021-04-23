import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router";
import { Context } from "../../contexts/ContextProvider";
import axios from "../../config/axios";
import localStorageService from "../../services/localStorageService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Pantib
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    cursor: "pointer",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const [data, setData] = useState({
    Username: "",
    Password: "",
    ConfirmPassword: "",
    FirstName: "",
    LastName: "",
    Email: "",
  });
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState({});
  const { setIsAuth } = useContext(Context);

  function gotoLogin() {
    history.push("/");
  }

  function handleDataChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (name === "Email") {
      if (!value) {
        setError((prev) => ({ ...prev, Email: "email is required" }));
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        setError((prev) => ({ ...prev, Email: "invalid email address" }));
      } else {
        setError((prev) => ({ ...prev, Email: false }));
      }
    }
    if (name === "Username") {
      if (!value) {
        setError((prev) => ({ ...prev, Username: "Username is required" }));
      } else {
        setError((prev) => ({ ...prev, Username: false }));
      }
    }
    if (name === "Password") {
      if (!value) {
        setError((prev) => ({ ...prev, Password: "Password is required" }));
      } else {
        setError((prev) => ({ ...prev, Password: false }));
      }
    }
    if (name === "FirstName") {
      if (!value) {
        setError((prev) => ({ ...prev, FirstName: "Firstname is required" }));
      } else {
        setError((prev) => ({ ...prev, FirstName: false }));
      }
    }
    if (name === "LastName") {
      if (!value) {
        setError((prev) => ({ ...prev, LastName: "Lastname is required" }));
      } else {
        setError((prev) => ({ ...prev, LastName: false }));
      }
    }
  }

  const handleSubmit = (e) => {
    const {
      Username,
      Password,
      ConfirmPassword,
      FirstName,
      LastName,
      Email,
    } = data;
    e.preventDefault();
    if (Password === ConfirmPassword) {
      axios
        .post("/register", {
          Username,
          Password,
          ConfirmPassword,
          FirstName,
          LastName,
          Email,
        })
        .then((res) => {
          history.push("/");
        })
        .catch((err) => {
          if (err.response) {
            setError({ server: err.response.data.message });
          } else {
            setError({ front: err.message });
          }
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.FirstName ? true : false}
                autoComplete="fname"
                name="FirstName"
                variant="outlined"
                required
                fullWidth
                type="text"
                id={
                  error.FirstName ? "outlined-error-helper-text" : "firstName"
                }
                label={error.FirstName ? "Error" : "First Name"}
                helperText={error.FirstName || null}
                autoFocus
                value={data.FirstName}
                onChange={handleDataChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.LastName ? true : false}
                variant="outlined"
                required
                fullWidth
                id={error.LastName ? "outlined-error-helper-text" : "lastName"}
                label={error.LastName ? "Error" : "Last Name"}
                helperText={error.LastName || null}
                name="LastName"
                autoComplete="lname"
                value={data.LastName}
                onChange={handleDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.Username ? true : false}
                variant="outlined"
                required
                fullWidth
                name="Username"
                label="Username"
                type="username"
                id="username"
                autoComplete="current-username"
                value={data.Username}
                onChange={handleDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.Password ? true : false}
                variant="outlined"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.Password}
                onChange={handleDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="ConfirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.ConfirmPassword}
                onChange={handleDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.Email ? true : false}
                variant="outlined"
                required
                fullWidth
                id={error.Email ? "outlined-error-helper-text" : "Email"}
                label={error.Email ? "Error" : "Email"}
                helperText={error.Email || null}
                name="Email"
                autoComplete="email"
                value={data.Email}
                onChange={handleDataChange}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                className={classes.link}
                onClick={() => gotoLogin()}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;
