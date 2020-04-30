import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import * as users from "../mock/user-mock.json";
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
    minHeight: 400,
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

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [userExist, setuserExist] = useState(false);
  const [error, setError] = useState(false);

  function handleRegister() {
    users.default.forEach((user) => {
      if (email == user.email) {
        setuserExist(true);
        return;
      }
    });

    if (!userExist) {
      const newUser = {
        id: Math.floor(Math.random() * 100000),
        name: name,
        CPF: cpf,
        email: email,
        password: pass,
      };
      users.default = [...users.default, newUser];
      fetch(
        "https://my-json-server.typicode.com/renanfeluck/boticario-fakeapi/users",
        {
          method: "POST", // or 'PUT'
          mode: "no-cors", // no-cors, *cors, same-origin
          body: JSON.stringify(newUser),
        }
      )
        .then((data) => {
          console.log("Success:", data);
          history.push("/login");
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(true);
        });
    } else {
      setuserExist(false);
    }
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
              <Typography variant="body1">Registrar nova conta</Typography>
              <Alert
                style={{ display: error == true ? "flex" : "none" }}
                severity="error"
              >
                Não foi possível realizar seu cadastro. Tente novamente mais
                tarde
              </Alert>
              <Alert
                style={{ display: userExist == true ? "flex" : "none" }}
                severity="error"
              >
                Email já cadastrado
              </Alert>
            </Box>
            <Box>
              <TextField
                id="email-input"
                label="Nome Completo"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                style={{ width: 100 + "%" }}
              />
              <TextField
                id="email-input"
                label="CPF"
                value={cpf}
                onChange={(event) => {
                  setCpf(event.target.value);
                }}
                style={{ width: 100 + "%" }}
              />
              <TextField
                id="email-input"
                label="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                style={{ width: 100 + "%" }}
              />
              <TextField
                id="pass-input"
                label="Senha"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={{ width: 100 + "%" }}
              />
              <TextField
                id="pass-input"
                label="Confirmar Senha"
                value={passConfirm}
                onChange={(e) => setPassConfirm(e.target.value)}
                style={{ width: 100 + "%" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRegister()}
                style={{ margin: 12 }}
              >
                Registrar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/login")}
              >
                Voltar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
