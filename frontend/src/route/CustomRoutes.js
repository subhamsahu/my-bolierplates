import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Dashboard from '../pages/Dashboard';


const CustomRoutes = () => {
    return (
        <Routes >
            <Route exact path="/" element={<Dashboard />}></Route>
        </Routes>
    )
}

export default CustomRoutes