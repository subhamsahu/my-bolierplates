import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
    return (
        <nav id="main-navbar" className="navbar navbar-expand-md navbar-dark fixed-top app_navbar bg-blue">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu"
                    aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <a className="navbar-brand mx-2" href="#" style={{ 'fontSize': '14px' }}><img src='./assets/img/radisys.png' className='me-3' height={20} width={20}></img>FrontEndService</a>
                <ul className="navbar-nav ms-auto d-flex flex-row">
                    <li className="nav-item dropdown">

                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default navbar