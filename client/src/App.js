import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './components/screens/LandingPage';
import RegisterPage from './components/screens/RegisterPage';
import './App.css'
import jsCookie from 'js-cookie';
import Dashboard from './components/screens/Dashboard';
import Axios from 'axios';
import ProfilePage from './components/screens/ProfilePage';
import io from 'socket.io-client';
import NotificationBox from './components/NotificationBox';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const themeType = jsCookie.get('themeType') === 'dark' ? 'dark' : 'light' ;

const themeInstance = createMuiTheme({
  palette: {
    type: themeType
  },
  spacing: 2
});

const mainURL = window.location.href.includes('localhost') ? 'http://localhost:5000/' : 'https://covid-19-wtat1-group-h.herokuapp.com/';
const getProfileURL = window.location.href.includes('localhost') ? 'http://localhost:5000/api/v1.0/users/profile' : 'https://covid-19-wtat1-group-h.herokuapp.com/api/v1.0/users/profile';
const refreshTokenURL = window.location.href.includes('localhost') ? 'http://localhost:5000/api/v1.0/users/refresh' : 'https://covid-19-wtat1-group-h.herokuapp.com/api/v1.0/users/refresh';

function App() {
  const [ appState, setAppState ] = useState(0);
  const [ auth, setAuth ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ intervalReport, setIntervalReport ] = useState(null);
  const [ open, setOpen ] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    checkToken();
    const socket = io(mainURL);
    socket.on('covid daily report', (data) => {
      console.log(data);
      setIntervalReport(data);
      handleClick();
    })
  }, []);

  useEffect(() => {
    if (auth === true) getUserData();
  }, [auth]);

  const getUserData = async() => {
    const config = {
        headers: {
          Authorization: `Bearer ${jsCookie.get('authToken')}`
        }
    }
    await Axios.get(getProfileURL, config)
    .then(res => {
      console.log(res);
      if (res.data.role === 'Employee_Public_Health') setIsAdmin(true);
      setUser(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

  const checkToken = async() => {
    if (jsCookie.get('authToken')) {
      setAppState(1);
      setTimeout(async() => {
        await Axios.post(refreshTokenURL, {}, {
          headers: {
            Authorization: `Bearer ${jsCookie.get('authToken')}`
          }
        }).then(res => {
          if (res.status === 200) {
            setAppState(2);
            setAuth(true);
            jsCookie.set('authToken', res.data.token);
          }
        })
        .catch(err => {
          console.log(err)
        })
      },  1500)
    }
  }

  const handleLogout = async() => {
    await jsCookie.remove('authToken');
    setTimeout(() => {
      setAppState(0);
    }, 1000);
  }

  return (
    <div>
      {
        intervalReport ? 
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert severity="warning" onClose={handleClose} elevation={6} variant="filled">
              Total new cases: {intervalReport.NewConfirmed} <br/>
              Total cases: {intervalReport.TotalConfirmed}
            </MuiAlert>
          </Snackbar>
        : null
      }
      <ThemeProvider theme={themeInstance}>
        <Router>
          <Switch>
            <Route exact path="/">
              {
                appState === 0 ? 
                  <LandingPage 
                    setAppState={setAppState}
                    setAuth={setAuth}
                  /> : 
                  <Dashboard 
                    appState={appState} 
                    auth={auth}
                    setIsAdmin={setIsAdmin}
                    isAdmin={isAdmin}
                    handleLogout={handleLogout}
                  />
              }
            </Route>
            <Route path="/profile">
              <ProfilePage user={user}/>
            </Route>
            <Route path="/register">
              <RegisterPage 
                setAppState={setAppState}
                setAuth={setAuth}  
              />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
