import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, makeStyles } from '@material-ui/core';

const useStlyes =  makeStyles({
    root: {
        display: 'block'
    }
});

export default function ReportAccordion({report, index}) {
    const classes = useStlyes();
    return (
        <ExpansionPanel key={report._id}>
            <ExpansionPanelSummary
                expandIcon={"x"}
            >
                <Typography>Report of User: {`${report.submitter}`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.root}>
                <Typography variant="caption">Submitted on: <Typography variant="body1">{report.date}</Typography></Typography>
                <Typography variant="caption">Details: <Typography variant="body1">{report.details}</Typography></Typography>
                <Typography variant="caption">Precondition: <Typography variant="body1">{report.precondition}</Typography></Typography>
                <Typography variant="caption">Symptoms: <Typography variant="body1">{report.symptoms}</Typography></Typography>
                <Typography variant="caption">From infected area:<Typography variant="body1">{report.infected_area ? 'yes': 'no' }</Typography></Typography>
                <Typography variant="caption">Infected from a person: <Typography variant="body1">{report.person_from_infected ? 'yes' : 'no'}</Typography></Typography>
                <Typography variant="caption">Infected: <Typography variant="body1">{report.infected_person ? 'yes': 'no'}</Typography></Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
