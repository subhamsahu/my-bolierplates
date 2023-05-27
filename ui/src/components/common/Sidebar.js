import React from 'react'
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
                <div className="position-sticky">
                    <div className="p-3">
                        <p>Tools</p>
                        <hr />
                        <div className='mt-1'>
                            <Link to="/"
                                className="">
                                <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Sidebar