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


const useStyles = makeStyles({
    addIcon: {
        position: 'absolute',
        bottom: '1em',
        right: '1em',
    }
})


export default function Dashboard({
    appState
}) {
    const classes = useStyles();
    const history = useHistory();

    const [ reports, setReports ] = useState(null);
    const [ offset, setOffset ] = useState(0);

    const [ openReportForm, setOpenReportForm ] = useState(null);

    useEffect(() => {
        retrieveReports();
    }, []);

    useEffect(() => {

    }, [offset]);

    const retrieveReports = async() => {
        await Axios.get('http://localhost:5000/api/v1.0/reports/')
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
        <Header />
        {
            appState === 1 ? 
            <div>
                Loading
            </div> :
            <main>
                <Maps />
                <Container>
                    
                    {
                        reports.map((report, index) => {
                            return <ReportAccordion key={index} report={report}/>
                        })
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
