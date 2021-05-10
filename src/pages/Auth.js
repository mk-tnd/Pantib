import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import axios from "../config/axios";
import localStorageService from "../services/localStorageService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Pantib
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  link: {
    cursor: "pointer",
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [errorAuth, setErrorAuth] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const { setIsAuth } = useContext(Context);

  function validateInput() {
    const newError = {};
    if (!username) newError.username = "Username is required";
    if (!password) newError.password = "Password is required";
    setError(newError);
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      validateInput();
      const res = await axios.post("/login", { username, password });
      localStorageService.setToken(res.data.token);
      setIsAuth(true);
      history.push("/");
    } catch (err) {
      setErrorAuth(err.response.data.message);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleLogin} className={classes.form} noValidate>
            {errorAuth && (
              <span className="help-block" style={{ color: "red" }}>
                {errorAuth}
              </span>
            )}
            <TextField
              error={error.username ? true : false}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={error.username ? "outlined-error-helper-text" : "username"}
              label={error.username ? "Error" : "Username"}
              helperText={error.username || null}
              name="Username"
              autoComplete="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              error={error.password ? true : false}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Password"
              id={error.password ? "outlined-error-helper-text" : "password"}
              label={error.password ? "Error" : "Password"}
              helperText={error.password || null}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className={classes.link}
                  onClick={() => {
                    history.push("/register");
                  }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Auth;
