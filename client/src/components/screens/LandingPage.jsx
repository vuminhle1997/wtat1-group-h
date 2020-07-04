import React, { useEffect } from 'react'
import { Container, Grid, FormGroup, TextField, FormControlLabel, Checkbox, Button, makeStyles, Typography, rgbToHex } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import jsCookie from 'js-cookie';

import docter from '../../img/doctor-woman.svg';
import woman from '../../img/remote-work-woman.svg';
import logo from '../../img/logo.svg';

const year = new Date().getFullYear();

const useStyles = makeStyles({
    root: {
        paddingTop: '3em',
    },
    wrapper: {
        padding: '1em 0',
        "& .MuiFormControl-root": {
            padding: '.75em 0 .5em 0'
        },
    },
    headline: {
        padding: '.75em 0',
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#8a8a8a'
    }
});

const loginURL = window.location.href.includes('local') ? 'http://localhost:5000/api/v1.0/users/login' : 'https://covid-19-wtat1-group-h.herokuapp.com/api/v1.0/users/login';

export default function LandingPage({setAppState}) {
    const history = useHistory();

    const classes = useStyles();
    const [ email, setEmail ] = useState(localStorage.getItem('email') || '');
    const [ password, setPassword ] = useState(localStorage.getItem('password') || '');
    const [ error, setError ] = useState(false);
    const [ rememberMe, setRememberMe ] = useState(localStorage.getItem('rememberMe') === "true" ? true : false);

    useEffect(() => {
        return () => {
            console.log('clears landingpage');
        }
    }, [])

    useEffect(() => {

    }, [error])

    const storeLoginData = (e) => {
        if (e.target.checked === true) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        } else {
            localStorage.clear();
        }

        localStorage.setItem('rememberMe', e.target.checked);
        setRememberMe(e.target.checked)
    }

    const login = async() => {
        const body = {
            user: {
                email: email,
                password: password,
            },
        }
        await Axios.post(loginURL, body)
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                setError(false);
                jsCookie.set('authToken', res.data.token);
                setAppState(1);
                setTimeout(() => {
                    setAppState(2);
                }, 1000)
            }
        })
        .catch(err => {
            console.log(err);
            setError(true);
        });
    }
    
    return (
        <>
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={4}>
                    <img src={docter} alt="" srcset=""/>
                </Grid>
                <Grid item xs={4}>
                    <img src={woman} alt="" srcset=""/>
                </Grid>
                <Grid item xs={4} className={classes.wrapper}>
                    <FormGroup>
                        <img height="100px" src={logo} alt="" srcset=""/>
                        <Typography variant="h4" align="center" className={classes.headline}>
                            COVID-19 APP
                        </Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            variant="outlined"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={storeLoginData}
                                />
                            }
                            label="Remember me"
                        />
                        {
                            error ? <Typography variant="subtitle2">
                                Your email or password is wrong. Please try again!
                            </Typography>: ''
                        }
                        <Grid container>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={login}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => history.push('/register')}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </Grid>
                
                
            </Grid>
            <Typography variant="body1" align="center">
                &copy;
                {
                ` ${year} | Minh Manh Cong - All rights reserved`
                }
            </Typography>
        </Container>
        </>
    );
}
