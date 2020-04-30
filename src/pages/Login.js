import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import boticarioImage from "../assets/boticario.png";
import grupoBoticarioImage from "../assets/grupo-boticario.png";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
  loginBox: {
    border: 1,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
    height: 400,
    width: 400,
    alignSelf: "center",
    justifySelf: "center",
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    textAlign: "center",
    padding: 20,
  },
  mainDiv: {
    alignContent: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  loginColumn: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});

function Login(props) {
  const classes = useStyles();
  let history = useHistory();

  const [email, setEmail] = useState("user1@gmail.com");
  const [pass, setPass] = useState("1234");
  const [invalidPass, setInvalidPass] = useState(false);

  function handleLogin() {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(
      "https://my-json-server.typicode.com/renanfeluck/boticario-fakeapi/users",
      { signal: signal }
    )
      .then((res) => res.json())
      .then((users) => {
        users.forEach((user) => {
          if (email == user.email) {
            if (pass == user.password) {
              localStorage.setItem("user", user.id);
              history.push("/someRoute");
            } else {
              setPass("");
            }
          }
          setInvalidPass(true);
        });
      });
    return function cleanup() {
      abortController.abort();
    };
  }

  return (
    <Box display="flex" className={classes.mainDiv}>
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              backgroundImage: `url(${boticarioImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></Grid>
        </Hidden>
        <Grid item xs={12} md={8} className={classes.loginColumn}>
          <Box display="flex" className={classes.loginBox}>
            <Box>
              <img
                src={grupoBoticarioImage}
                style={{
                  width: 50 + "%",
                }}
              ></img>
              <Typography variant="h4">Portal Cashback</Typography>
              <Typography variant="body1">Login</Typography>
            </Box>
            <Box>
              <Alert
                style={{ display: invalidPass == true ? "flex" : "none" }}
                severity="error"
              >
                Usuário ou senha inválidos
              </Alert>
              <TextField
                id="email-input"
                label="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                style={{ width: 100 + "%", marginBottom: 12 }}
              />
              <TextField
                id="pass-input"
                label="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={{ width: 100 + "%" }}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin()}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/signup")}
                style={{ margin: 12 }}
              >
                Registrar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
