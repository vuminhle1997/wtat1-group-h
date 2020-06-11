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

const themeType = jsCookie.get('themeType') === 'dark' ? 'dark' : 'light' ;

const themeInstance = createMuiTheme({
  palette: {
    type: themeType
  },
  spacing: 2
});

function App() {
  const [ appState, setAppState ] = useState(0);
  const [ auth, setAuth ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    checkToken();
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
    await Axios.get('http://localhost:5000/api/v1.0/users/profile', config)
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
        await Axios.post('http://localhost:5000/api/v1.0/users/refresh', {}, {
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
