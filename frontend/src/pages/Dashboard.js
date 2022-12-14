import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { headersConfig } from '../core/Constants';
import Snackbar from '../components/common/Snackbar';
import Spinner from '../components/common/Spinner';
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

import { Bar } from 'react-chartjs-2';
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
  const [alert, setalert] = useState({
    show: false,
    msg: "",
    type: "alert-success"
  })
  const [spinner, setspinner] = useState(false)

  const showAlert = (msg, alert_type) => {
    setalert({
      show: true,
      msg: msg,
      type: alert_type
    })


    setTimeout(() => {
      setalert({
        show: false,
        msg: "",
        type: "alert-success"
      })
    }, 3000);

  }

  const templateFunction = async () => {
    setspinner(true)
    let data = []

    if (data.length == 0) {
      showAlert(`Some thing`, "alert-danger")
      setspinner(false)
    }


    setspinner(false)

  }

  useEffect(() => {

  }, [])

  return (
    <div>
      <section>
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between px-md-1">
                  <div className="align-self-center">
                    <i className="fa fa-bug text-info fa-3x"></i>
                  </div>
                  <div className="text-end">
                    <h5></h5>
                    <p className="mb-0 text-small">Total Issues in Current Testplan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard