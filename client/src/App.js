import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/Header';
import Maps from './components/Maps';

function App() {
  return (
    <div>
      <AppBar/>
      <Maps />
    </div>
  );
}

export default App;
