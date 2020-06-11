import React from 'react'
import { Container, Paper, Typography, makeStyles, TextField, FormControl, InputLabel, Select, Grid, MenuItem, Divider, ButtonGroup, Button, Backdrop } from '@material-ui/core'
import { useState } from 'react';
import Axios from 'axios';
import jsCookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    overlay: {
        background: 'rgba(50,50,50, 0.65)',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    root: {
        position: 'relative',
        top: '1.5em',
    },
    paper: {
        
    },
    select: {
        width: '100%'
    },
    wrapper: {
        width: '85%',
        margin: '0 auto',
        padding: '1em 0',
        "& .MuiFormControl-root": {
            padding: '1em 0 .5em 0'
        }
    },
    headline: {
        textAlign: 'center',
        padding: '10px 0',
    },
    button: {
        margin : '.75em 1em',

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ReportForm({handleClose, openReportForm}) {
    const classes = useStyles();

    const [ symptoms, setSymptoms ] = useState('');
    const [ precondition, setPrecondition ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ infectedPerson, setInfectedPerson ] = useState(false);
    const [ infectedArea, setInfectedArea ] = useState(false);

    const [ lat, setLat ] = useState(0);
    const [ lng, setLng ] = useState(0);

    const [ disabled, setDisabled ] = useState(false)

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude);
        });
    }

    const submitReport = async() => {
        const config = {
            headers: {
                Authorization: `Bearer ${jsCookie.get('authToken')}`
            }
        }
        const body = {
            report: {
                latitude: lat,
                longitude: lng,
                symptoms: symptoms,
                precondition: precondition,
                infected_area: infectedArea,
                person_from_infected: infectedPerson,
                date: new Date(),
                details: details
            }
        }

        await setDisabled(true);
        await Axios.post('http://localhost:5000/api/v1.0/reports/report', body, config)
        .then(res => {
            console.log(res);
            setTimeout(() => handleClose(), 1500);
        })
        .catch(err => {
            console.log(err);
            setDisabled(false);
        })
    }

    return (
        <>
            <div className={classes.overlay}>
                <Container className={classes.root}>
                    <Paper elevation={3}>
                        <Typography className={classes.headline} variant="h4">
                            Submit report
                        </Typography>
                        <Divider />
                        <div className={classes.wrapper}>
                            <TextField
                                label="Symptoms"
                                variant="outlined"
                                fullWidth
                                onChange={e => setSymptoms(e.target.value)}
                            />
                            <TextField
                                label="Precondition"
                                variant="outlined"
                                fullWidth
                                onChange={e => setPrecondition(e.target.value)}
                            />
                            <TextField
                                label="Details"
                                multiline
                                rows={4}
                                rowsMax={10}
                                variant="outlined"
                                fullWidth
                                onChange={e => setDetails(e.target.value)}
                            />
                            <Grid container>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Contacted with infected person</InputLabel>
                                        <Select
                                            value={infectedPerson}
                                            variant="outlined"
                                            autoWidth={true}
                                            onChange={e => setInfectedPerson(e.target.value)}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Came from infected area</InputLabel>
                                        <Select
                                            value={infectedArea}
                                            variant="outlined"
                                            autoWidth={true}
                                            onChange={e => setInfectedArea(e.target.value)}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography variant="body1">
                                The app needs to localize your current location for submitting the report. Please accept the permission, so the app can access your current geolocation.
                                This is necessary, so that you aware other people, where the virus might be. The provided data will inform the user, where COVID might be located by displaying it on the map.
                                You will keep friends, family and yourself safe.
                            </Typography>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                disabled={disabled}
                                onClick={submitReport}
                            >
                                Submit
                            </Button>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Paper>
                </Container>
            </div>
        </>
    )
}
