import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes.jsx';
import AppBar from './layout/AppBar.jsx';
import './App.css';

function App() {
  return (
      <Router>
        <AppBar />
        <Routes />
      </Router>
  );
}

export default App;
