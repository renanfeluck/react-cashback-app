import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Header from "../components/Header";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

function Home() {
  const [buys, setBuys] = useState([]);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [cashAvailable, setCashAvailable] = useState("");
  const [cashPending, setCashPending] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const user = localStorage.getItem("user");
  let history = useHistory();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    fetch(
      "https://my-json-server.typicode.com/renanfeluck/boticario-fakeapi/users/" +
        user
    )
      .then((response) => response.json())
      .then((data) => {
        setBuys(data.buys);
        setCashAvailable(data.cashAvailable);
        setCashPending(data.cashPending);
        console.log("Success:", buys);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [user]);

  function handleClose() {
    setOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    history.push("/login");
  }

  function handleAdd() {
    const newBuy = {
      id: 0,
      code: code,
      value: value,
      date: date,
      percent: "10%",
      cashback: value * 0.1,
      status: "em analise",
    };
    console.log("newBuy", newBuy);
    const newBuys = [...buys, newBuy];
    setBuys(newBuys);
    const newCash = parseFloat(cashPending) + parseFloat(value);
    setCashPending(newCash);
    setOpen(false);
  }

  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <Header avaliable={cashAvailable} pending={cashPending} />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Registrar nova compra
          </DialogTitle>
          <DialogContent>
            <TextField
              style={{ width: 100 + "%" }}
              id="code-input"
              label="Código da compra"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
              }}
            />
            <TextField
              style={{ width: 100 + "%" }}
              id="value-input"
              label="Valor"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
            <TextField
              id="date"
              label="Data"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleAdd} color="primary">
              Adicionar compra
            </Button>
          </DialogActions>
        </Dialog>
        <Box style={{ display: "flex", justifyContent: "center", margin: 36 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: 12 }}
            onClick={() => setOpen(true)}
          >
            Registrar nova compra
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: 12 }}
            onClick={() => handleLogout()}
          >
            Desconectar
          </Button>
        </Box>
        {buys.map((buy, index) => {
          return (
            <ExpansionPanel style={{ marginBottom: 12 }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography>Código do reembolso: {buy.code}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      Status:{" "}
                      <Typography
                        style={{
                          color:
                            buy.status === "aprovado"
                              ? "green"
                              : buy.status === "em analise"
                              ? "orange"
                              : "red",
                        }}
                      >
                        {" "}
                        {buy.status}
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid item item xs={12} md={3}>
                    <Typography>Data: {buy.date}</Typography>
                  </Grid>
                  <Grid item item xs={12} md={3}>
                    <Typography>Valor: {buy.value}</Typography>
                  </Grid>
                  <Grid item item xs={12} md={3}>
                    <Typography>% CashBack: {buy.percent}</Typography>
                  </Grid>
                  <Grid item item xs={12} md={3}>
                    <Typography>Valor CashBack: R${buy.cashback}</Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

export default Home;
