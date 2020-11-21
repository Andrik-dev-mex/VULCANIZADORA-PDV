import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import AppBar from "./layout/AppBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#801313',
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme = {theme}>
        <AppBar>
          <Routes />
        </AppBar>
      </ThemeProvider>
    </Router>
  );
}

export default App;
