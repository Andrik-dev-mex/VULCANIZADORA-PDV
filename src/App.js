import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import AppBar from './layout/AppBar';


function App() {
  return (
      <Router>
        <AppBar />
        <Routes />
      </Router>
  );
}

export default App;
