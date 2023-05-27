import { lazy } from 'react';
import Loadable from '../components/Common/MatxComponents/Loadable';
import AppLayout from '../components/AppLayout/AppLayout';
import DummyTest from '../pages/DummyTest/DummyTest';
import { AdminAuthGuard } from '../auth/AuthGuard';
import AccessForbidden from '../pages/403AccessForbidden/AccessForbidden';
// import MatxLayout from './components/MatxLayout/MatxLayout'

const NotFound = Loadable(lazy(() => import('../pages/404NotFound/PageNotFound')));
const Login = Loadable(lazy(() => import('../pages/Authentication/JwtLogin')));

// dashboard page
const Analytics = Loadable(lazy(() => import('../pages/Analytics/Analytics')));
const Orders = Loadable(lazy(() => import('../pages/Orders/Orders')));
const Users = Loadable(lazy(() => import('../pages/Users/Users/Users')));
const Restaurant = Loadable(lazy(() => import('../pages/Restaurant/Restaurant')));
const Payment = Loadable(lazy(() => import('../pages/Payments/Payment')));
const PaymentCreate = Loadable(lazy(() => import('../pages/Payments/PaymentCreate')));
const Test = Loadable(lazy(() => import('../pages/DummyTest/DummyTest')));

const Logout = (props) => {
    const { children, accessBy } = props
    localStorage.removeItem('Token')
    localStorage.removeItem('User')
    return children
}

const routes = [
    {
        path: '/',
        element:
            <AppLayout>
                <Analytics />
            </AppLayout>
    },
    {
        path: '/dashboard',
        element:
            <AppLayout>
                <Analytics />
            </AppLayout>
    },
    { path: '/users', element: <AppLayout><Users /></AppLayout> },
    { path: '/orders', element: <AppLayout><Orders /></AppLayout> },
    { path: '/test', element: <AppLayout><DummyTest /></AppLayout> },
    { path: '/restaurants', element: <AppLayout><Restaurant /></AppLayout> },
    { path: '/payments', element: <AppLayout><Payment /></AppLayout> },
    { path: '/paymentcreate', element: <AppLayout><PaymentCreate /></AppLayout> },
    { path: '/session/404', element: <NotFound /> },
    { path: '/session/403', element: <AccessForbidden /> },
    { path: '/session/signin', element: <Login /> },
    { path: '/logout', element: <Logout><Login /></Logout> },
    { path: '*', element: <AppLayout><NotFound /></AppLayout> }
];


export default routes;