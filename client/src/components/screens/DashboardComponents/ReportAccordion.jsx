import React, { useState } from 'react'
import { Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, makeStyles, ButtonGroup, Snackbar } from '@material-ui/core';
import Axios from 'axios';
import jsCookie from 'js-cookie';
import MuiAlert from '@material-ui/lab/Alert';

const useStlyes =  makeStyles({
    root: {
        display: 'block'
    },
    div: {
        margin: '.5em auto'
    }
});

const positiveURL = window.location.href.includes('local') ? 'http://localhost:5000/api/v1.0/reports/positive' : 'https://covid-19-wtat1-group-h.herokuapp.com/api/v1.0/reports/postive';
const negativeURL = window.location.href.includes('local') ? 'http://localhost:5000/api/v1.0/reports/negative' : 'https://covid-19-wtat1-group-h.herokuapp.com/api/v1.0/reports/negative';

export default function ReportAccordion({report, index, isAdmin}) {
    const classes = useStlyes();
    const [ error, setError ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ open, setOpen ] = useState(false);

    const confirmPositive = async() => {
        await Axios.put(positiveURL, {
            report: {
                id: report._id,
            }
        }, {
            headers: {
                Authorization: `Bearer ${jsCookie.get("authToken")}`
            }
        }).then(res => {
            console.log(res);
            if(res.status === 200) {
                setOpen(true);
                setSuccess(true);
                setError(false);
            } else {
                setSuccess(true);
                setError(false);
            }
        }).catch(err => {
            console.error(err);
            setOpen(false);
            setSuccess(true);
            setError(false);
        });
    }

    const confirmNegative = async() => {
        await Axios.put(negativeURL, {          
            report: {
                id: report._id
            }
        }, {
            headers: {
                Authorization: `Bearer ${jsCookie.get('authToken')}`
            },
        }).then(res => {
            console.log(res);
            if(res.status === 200) {
                setOpen(true);
                setSuccess(true);
                setError(false);
            } else {
                setOpen(false);
                setSuccess(true);
                setError(false);
            }
        }).catch(err => {
            console.error(err);
            setSuccess(true);
            setError(false);
            setOpen(false);
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <>
        {
            success ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert severity="success" onClose={handleClose} variant="filled" elevation={6}>
                    Status of report changed!
                </MuiAlert>
                </Snackbar> : ''
        }
        {
            error ? <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert severity="error" onClose={handleClose} variant="filled" elevation={6}>
                Something went wrong!
            </MuiAlert>
            </Snackbar> : ''
        }
        <ExpansionPanel className={classes.div} key={report._id}>
            <ExpansionPanelSummary
                expandIcon={"x"}
            >
                <Typography>
                    {
                        isAdmin ? `Report of User: ${report.submitter}` : `#${index+1}`
                    }
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.root}>
                <Typography variant="caption">Submitted on: <Typography variant="body1">{report.date}</Typography></Typography>
                <Typography variant="caption">Details: <Typography variant="body1">{report.details}</Typography></Typography>
                <Typography variant="caption">Precondition: <Typography variant="body1">{report.precondition}</Typography></Typography>
                <Typography variant="caption">Symptoms: <Typography variant="body1">{report.symptoms}</Typography></Typography>
                <Typography variant="caption">From infected area:<Typography variant="body1">{report.infected_area ? 'yes': 'no' }</Typography></Typography>
                <Typography variant="caption">Infected from a person: <Typography variant="body1">{report.person_from_infected ? 'yes' : 'no'}</Typography></Typography>
                <Typography variant="caption">Infected: <Typography variant="body1">{report.infected_person ? 'yes': 'no'}</Typography></Typography>
                <Typography variant="caption">Status: <Typography variant="body1">{report?.status ? report.status : 'sent'}</Typography></Typography>
                <ButtonGroup variant="contained">
                    <Button color="primary" onClick={confirmPositive}>
                        Postive
                    </Button>
                    <Button color="secondary" onClick={confirmNegative}>
                        Negative
                    </Button>
                </ButtonGroup>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </>
    )
}
