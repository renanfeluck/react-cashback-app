import React from "react";
import headerLogo from "../assets/header-logo.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Header(props) {
  console.log(props);
  return (
    <Grid
      container
      spacing={0}
      style={{
        minHeight: 80,
        backgroundColor: "rgb(25,25,25)",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Grid item xs={12} md={4} style={{ height: 80, display: "inline-flex" }}>
        <img
          src={headerLogo}
          style={{
            height: 100 + "%",
            display: "inline-flex",
          }}
        />
      </Grid>
      <Grid item xs={12} md={4} style={{ height: 80, display: "inline-flex" }}>
        <Typography variant="h4">Portal de reembolso</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        style={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          textAlign: "right",
          padding: 12,
        }}
      >
        <Typography variant="body1">
          Saldo disponível: {props.avaliable}
        </Typography>
        <Typography variant="body1">Saldo pendente: {props.pending}</Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
