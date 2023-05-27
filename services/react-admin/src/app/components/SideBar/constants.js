import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import DnsIcon from '@mui/icons-material/Dns';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TerminalIcon from '@mui/icons-material/Terminal';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const sideBarItems = [
    {
        id: 0,
        icon: <DashboardIcon />,
        label: 'Dashboard',
        route: '/dashboard',
    },
    {
        id: 1,
        icon: <PeopleIcon />,
        label: 'Users',
        route: '/users',
        children: [
            { label: "Users List", route: "/users" },
            { label: "User Actions", route: "/createTestConfiguration" },
        ],
    },
    {
        id: 2,
        icon: <RestaurantIcon />,
        label: 'Restaurants',
        route: '/restaurant',
        children: [
            { label: "Restaurant List", route: "/restaurants" },
            { label: "Restaurant Actions", route: "/restaurantaction" },
        ],
    },
    {
        id: 3,
        icon: <SystemUpdateAltIcon/>,
        label: 'Orders',
        route: '/orders',
        children: [
            { label: "Orders List", route: "/orders" },
            { label: "Orders Actions", route: "/createTestConfiguration" },
        ],
    },
    {
        id: 4,
        icon: <LocalGroceryStoreIcon />,
        label: 'PED Store',
        route: '/store',
        children: [
            { label: "Store Products", route: "/restaurants" },
            { label: "Store Actions", route: "/createTestConfiguration" },
        ],
    },
    {
        id: 5,
        icon: <CurrencyRupeeIcon />,
        label: 'Payments',
        route: '/payment',
        children: [
            { label: "Payments", route: "/payments" },
            { label: "Payment Action", route: "/paymentcreate" },
        ],
    },
    {
        id: 6,
        icon: <SettingsInputComponentIcon />,
        label: 'My Account',
        route: 'machine-learning',
    },
    // {
    //     id: 7,
    //     icon: <TerminalIcon />,
    //     label: 'Simulation',
    //     route: '/simulation',
    // },
    {
        id: 7,
        icon: <ExitToAppIcon />,
        label: 'Log Out',
        route: '/logout',
    },
]