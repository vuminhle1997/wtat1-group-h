import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Axios from 'axios'
import { useEffect, useState } from 'react';
import ReportAccordion from './DashboardComponents/ReportAccordion';
import { Container } from '@material-ui/core';
import Maps from '../Maps';

export default function Dashboard({
    appState
}) {
    const [ reports, setReports ] = useState(null);
    const [ offset, setOffset ] = useState(0);

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

    return (
        <>
        <Header>

        </Header>
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
                            return <ReportAccordion report={report}/>
                        })
                    }
                </Container>
            </main>
        }
        <Footer>

        </Footer>
        </>
    )
}
