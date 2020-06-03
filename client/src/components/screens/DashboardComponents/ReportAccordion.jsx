import React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'

export default function ReportAccordion({report, index}) {
    return (
        <ExpansionPanel key={report._id}>
            <ExpansionPanelSummary
                expandIcon={"x"}
            >
                <Typography>Report of User: {`${report.submitter}`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <p><b>Submitted on: </b>{report.createdAt}</p><br/>
                <p><b>Diagnosed on: </b>{report.date}</p><br/>
                <p><b>Details: </b>{report.details}</p><br/>
                <p><b>Precondition: </b>{report.precondition}</p><br/>
                <p><b>Symptoms: </b>{report.symptoms}</p><br/>
                <p><b>From infected area:</b>{report.infected_area ? 'yes': 'no' }</p><br/>
                <p><b>Infected from a person: </b>{report.person_from_infected ? 'yes' : 'no'}</p><br/>
                <p><b>Infected: </b> {report.infected_person ? 'yes': 'no'}</p>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
