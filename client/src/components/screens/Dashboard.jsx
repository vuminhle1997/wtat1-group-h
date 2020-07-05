import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Axios from 'axios'
import { useEffect, useState } from 'react';
import ReportAccordion from './DashboardComponents/ReportAccordion';
import { Container, Fab, makeStyles } from '@material-ui/core';
import Maps from '../Maps';
import AddIcon from '@material-ui/icons/Add';
import ReportForm from './ReportForm';
import { useHistory } from 'react-router-dom';
import jsCookie from 'js-cookie';

const useStyles = makeStyles({
    addIcon: {
        position: 'fixed',
        bottom: '1em',
        right: '1em',
    },
    accordion: {
        margin: '.5em auto'
    },
});

const getReportsURL = window.location.href.includes('local') ? 'http://localhost:5000/api/v1.0/reports/' : 'https://covid-19-wtat1-group-h.herokuapp.com/api/v1.0/reports/';
const getOwnReportsURL = window.location.href.includes('local') ? 'http://localhost:5000/api/v1.0/reports/user?id=' : 'https://covid-19-wtat1-group-h.herokuapp.com/api/v1.0/reports/user?id=';
export default function Dashboard({
    appState,
    handleLogout,
    isAdmin,
    setIsAdmin,
    auth,
    user
}) {
    const classes = useStyles();
    const history = useHistory();

    const [ reports, setReports ] = useState([]);
    const [ ownReports, setOwnReports ] = useState([]);
    const [ offset, setOffset ] = useState(0);
    const [ lat, setLat ] = useState(52.425);
    const [ lng, setLng ] = useState(78.454787);

    const [ openReportForm, setOpenReportForm ] = useState(null);

    useEffect(() => {
        if (isAdmin) {
            retrieveReports();
        } else {
            getOwnReports();
        }
        getGeolocation();
    }, [user]);

    useEffect(() => {

    }, [offset]);

    const getOwnReports = async() => {
        if (user !== null) {
            const { _id } = user;
            if (_id != undefined) {
                await Axios.get(`${getOwnReportsURL}${_id}`)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            setOwnReports(res.data.reports)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                })
            }
        }
    }

    const getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            });
        }
    }

    const retrieveReports = async() => {
        await Axios.get(getReportsURL)
        .then(res => {
            if (res.status === 200) {
                console.log(res) 
                setReports(res.data.reports);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const handleClick = (event) => {
        setOpenReportForm(event.currentTarget);
    }

    const handleClose = () => {
        setOpenReportForm(null);
    }

    return (
        <>
        <Header handleLogout={handleLogout}/>
        {
            appState === 1 ? 
            <div>
                Loading
            </div> :
            <main>
                <Maps 
                    lat={lat}
                    lng={lng}
                />
                <Container>
                    
                    {
                        (reports.length > 0) ? reports.map((report, index) => {
                            return <ReportAccordion index={index} key={index} report={report} isAdmin={isAdmin}/>
                        }) : <div>
                            {
                                (ownReports.length > 0) ? ownReports.map((report, index) => {
                                    return <ReportAccordion key={report._id} index={index} report={report} isAdmin={isAdmin}/>
                                }) : ''
                            }
                            <h1>FAQ and Tips</h1>
                        </div>
                    }

                    <Fab
                        className={classes.addIcon}
                        color="secondary"
                        aria-label="add"
                        onClick={handleClick}
                    >
                        <AddIcon />
                    </Fab>
                    {
                        openReportForm != null ? (
                            <ReportForm openReportForm={openReportForm} handleClose={handleClose} />
                        ) : ''
                    }
                </Container>
            </main>
        }
        <Footer />
        </>
    )
}
