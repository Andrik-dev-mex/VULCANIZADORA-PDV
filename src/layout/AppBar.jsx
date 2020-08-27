import React from 'react';
import {AppBar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

function Nav() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant = "h6">Vulcanizadora JAM</Typography>
        <Typography variant = "h6" left>Punto de Venta</Typography>
      </Toolbar>
    </AppBar>
  )
};

export default Nav;