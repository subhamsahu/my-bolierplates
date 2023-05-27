import React from 'react'
import Grid from '@mui/material/Grid';
import CustomRoutes from '../../route/CustomRoutes';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../SideBar/Sidebar';
import Navbar from '../NavBar/Navbar';
import Snackbar from '../SnackBar/Snackbar';

const Layout = ({isAuthenticated}) => {
    return (
        <div className='bg-light-gray' style={{'minHeight':'100vh'}}>
            <BrowserRouter>
                <Grid container>
                    {isAuthenticated && <Navbar />}
                    {isAuthenticated && <Sidebar />}
                    <Grid
                        xs={10}
                        className='p-5'
                    >
                        <Snackbar/>
                        <CustomRoutes />
                    </Grid>
                </Grid>
            </BrowserRouter>
        </div>
    )
}

Layout.defaultProps = {
    isAuthenticated: true,   
}

export default Layout