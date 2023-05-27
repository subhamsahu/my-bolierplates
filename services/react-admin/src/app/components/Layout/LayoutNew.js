import React from 'react'

const Layout = () => {
    return (
        <Grid container>
            <Navbar />
            <Sidebar />
            <Grid
                xs={10}
                className='p-5'
            >
                <Snackbar />
                <CustomRoutes />
            </Grid>
        </Grid>
    )
}

export default Layout