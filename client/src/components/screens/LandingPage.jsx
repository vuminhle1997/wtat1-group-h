import React from 'react'
import { Container, Grid, FormGroup, TextField, FormControlLabel, Checkbox, Button, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = () => makeStyles({
    root: {
        margin: "20% auto",
    }
})

export default function LandingPage() {
    const history = useHistory();

    const classes = useStyles();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ rememberMe, setRememberMe ] = useState(localStorage.getItem('rememberMe') === "true" ? true : false);

    const storeLoginData = (e) => {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        localStorage.setItem('rememberMe', e.target.checked);
        setRememberMe(e.target.checked)
    }
    
    return (
        <>
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={8}>
                    <div>big image</div>
                </Grid>
                <Grid item xs={4}>
                    <FormGroup>
                        <div className="covid-logo-app">LOGO</div>
                        <TextField
                            label="Email"
                            variant="outlined"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
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
                        <Grid container>
                            <Grid xs={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid xs={6}>
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
        </Container>
        </>
    )
}
