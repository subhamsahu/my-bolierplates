import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
    useLocation,
    Navigate,
} from "react-router-dom";
import Login from '../pages/Authentication/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Search from '../pages/Search/Search';
import Users from '../pages/Users/Users/Users';
import PageNotFound from '../pages/404NotFound/PageNotFound'
import SimulationDashboard from '../pages/Simulation/SimulationDashboard';
import UserSimulation from '../pages/Simulation/SimulationAgents/UserSimulation';
import Orders from '../pages/Orders/Orders';
import Restaurant from '../pages/Restaurant/Restaurant';
import { isExpired, decodeToken } from "react-jwt";
import Payment from '../pages/Payments/Payment';
import PaymentCreate from '../pages/Payments/PaymentCreate';
import RestaurantAction from '../pages/Restaurant/RestaurantAction';


const CustomRoutes = () => {
    const enableSimulation = true
    return (
        <Routes >
            <Route exact path="/" element={
                <RouteShield>
                    <Dashboard />
                </RouteShield>
            }></Route>
            <Route exact path="/dashboard" element={
                <RouteShield>
                    <Dashboard />
                </RouteShield>
            }></Route>
            <Route exact path="/users" element={
                <RouteShield>
                    <Users />
                </RouteShield>

            }></Route>
            <Route exact path="/orders" element={
                <RouteShield>
                    <Orders />
                </RouteShield>

            }></Route>
            <Route exact path="/restaurants" element={
                <RouteShield>
                    <Restaurant />
                </RouteShield>
            }></Route>
            <Route exact path="/restaurantaction" element={
                <RouteShield>
                    <RestaurantAction />
                </RouteShield>
            }></Route>
            <Route exact path="/payment" element={
                <RouteShield>
                    <Payment />
                </RouteShield>
            }></Route>
            <Route exact path="/paymentcreate" element={
                <RouteShield>
                    <PaymentCreate />
                </RouteShield>
            }></Route>
            {
                enableSimulation && (
                    <>
                        <Route exact path="/simulation" element={<SimulationDashboard />}></Route>
                        <Route exact path="/simulation-user" element={<UserSimulation />}></Route>
                    </>
                )
            }

            <Route path="/*" element={<PageNotFound />}></Route>
            <Route exact path="/login" element={
                <CheckAuth>
                    <Login />
                </CheckAuth>
            }></Route>
            <Route exact path="/logout" element={
                <Logout>
                    <Login />
                </Logout>
            }></Route>
        </Routes>
    )
}

const checkTokenExpired = (exp)=>{
    return exp*1000 > Date.now()
}

const RouteShield = (props) => {
    const { children, accessBy } = props
    let location = useLocation();
    let token = localStorage.getItem('Token')
    token = JSON.parse(token || '{}')
    const decodedToken = decodeToken(token.access);
    const isTokenExpired = isExpired(token.access);
    let user = localStorage.getItem('User');
    user = JSON.parse(user || '{}');

    if (!isTokenExpired && (user.is_admin || user.is_executive)) { return children }
    else return <Navigate to="/login" state={{ from: location }} replace />;
}
const Logout = (props) => {
    const { children, accessBy } = props
    localStorage.removeItem('Token')
    localStorage.removeItem('User')
    return children
}
const CheckAuth = (props) => {
    const { children, accessBy } = props
    let location = useLocation();
    let token = localStorage.getItem('Token')
    token = JSON.parse(token || '{}')
    const decodedToken = decodeToken(token.access);
    const isTokenExpired = isExpired(token.access);
    console.log(decodedToken)
    console.log(isTokenExpired)
    let user = localStorage.getItem('User');
    user = JSON.parse(user || '{}');
    console.log(user)
    console.log(!isTokenExpired && (user.is_admin || user.is_executive))

    if (!isTokenExpired && (user.is_admin || user.is_executive)) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
    else {
        return children
    }
}

export default CustomRoutes
