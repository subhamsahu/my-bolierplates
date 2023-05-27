import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    registerables
} from 'chart.js'

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Grid } from '@mui/material';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ...registerables,
)
const Dashboard = () => {
    const noofusers = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
        datasets: [{
            label: 'No of Users',
            data: ['2000', '1996', '2015', '3000', '4515', '5000'],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(104, 99, 132, 1)',
                'rgba(204, 99, 132, 1)',
                'rgba(73, 168, 156, 1)',
                'rgba(168, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(104, 99, 132)',
                'rgb(204, 99, 132)',
                'rgb(73, 168, 156)',
                'rgb(168, 99, 132)',
                'rgb(255, 99, 132)'
            ],
            borderWidth: 1
        }]
    }
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3} >
                    <Bar data={noofusers} width={300} height={300} />
                </Grid>
                <Grid item xs={9}>
                    <Line data={noofusers} width={500} height={250} />
                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2} sx={{ marginTop: 'px' }}>
                <Grid item xs={3}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between px-md-1">
                                <div className="align-self-center">
                                    <i className="fa fa-bug text-danger fa-3x"></i>
                                </div>
                                <div className="text-end">
                                    <h5>600</h5>
                                    <p className="mb-0 text-small">Total Issues in Current Testplan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between px-md-1">
                                <div className="align-self-center">
                                    <i className="fa fa-bug text-danger fa-3x"></i>
                                </div>
                                <div className="text-end">
                                    <h5>600</h5>
                                    <p className="mb-0 text-small">Total Issues in Current Testplan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between px-md-1">
                                <div className="align-self-center">
                                    <i className="fa fa-bug text-danger fa-3x"></i>
                                </div>
                                <div className="text-end">
                                    <h5>600</h5>
                                    <p className="mb-0 text-small">Total Issues in Current Testplan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between px-md-1">
                                <div className="align-self-center">
                                    <i className="fa fa-bug text-danger fa-3x"></i>
                                </div>
                                <div className="text-end">
                                    <h5>600</h5>
                                    <p className="mb-0 text-small">Total Issues in Current Testplan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard