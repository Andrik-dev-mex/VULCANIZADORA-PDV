import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar : {
    width: '10em',
    height: '10em'
  }
}));

export default function Main() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}></Avatar>
      <Typography variant="h2" color="initial">
        Bienvenido Usuario
      </Typography>
      <Typography variant='body2'>
        SISTEMA DE GESTION DE INVENTARIO Y VENTAS v1.0
      </Typography>
      <a href="https://www.github.com/Andrik-dev-mex">Desarrollador </a>
    </div>

  );
}
