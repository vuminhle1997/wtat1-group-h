import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import AppBar from './components/Header';
import Maps from './components/Maps';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './components/screens/LandingPage';
import RegisterPage from './components/screens/RegisterPage';
import './App.css'
import jsCookie from 'js-cookie';
import Dashboard from './components/screens/Dashboard';
import Axios from 'axios';

const themeInstance = createMuiTheme({
  palette: {
    
  },
  spacing: 2
});

function App() {
  const [ appState, setAppState ] = useState(0);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async() => {
    if (jsCookie.get('authToken')) {
      setAppState(1);
      setTimeout(async() => {
        await Axios.post('http://localhost:5000/api/v1.0/users/refresh', {}, {
          headers: {
            Authorization: `Bearer ${jsCookie.get('authToken')}`
          }
        }).then(res => {
          if (res.status === 200) {
            setAppState(2);
            console.log("succesfull");
            jsCookie.set('authToken', res.data.token);
          }
        })
        .catch(err => {
          console.log(err)
        })
      }, 3000)
    }
  }

  return (
    <div>
      <ThemeProvider theme={themeInstance}>
        <Router>
          <Switch>
            <Route exact path="/">
              {
                appState === 0 ? <LandingPage /> : <Dashboard appState={appState}/>
              }
            </Route>
            
            <Route path="/register">
              <RegisterPage setAppState={setAppState}/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
