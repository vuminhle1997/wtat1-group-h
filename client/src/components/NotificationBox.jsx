import React from 'react'
import { Paper, Card, Typography } from '@material-ui/core'

export default function NotificationBox({report}) {
    console.log(report);
    return (
        <div className="">
            <Card>
                <Typography variant="body1">
                    Total new cases: {report.NewConfirmed}
                </Typography>
            </Card>
        </div>
    )
}
