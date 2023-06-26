import { lazy } from 'react';
import Loadable from '../components/Core/Loadable'
import AppLayout from '../components/AppLayout/AppLayout';

const NotFound = Loadable(lazy(() => import('../pages/404NotFound/PageNotFound')));


// dashboard page
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));

const routes = [
    {
        path: '/',
        element:
            <AppLayout>
                <Dashboard />
            </AppLayout>
    },
    { path: '*', element: <AppLayout><NotFound /></AppLayout> }
];


export default routes;