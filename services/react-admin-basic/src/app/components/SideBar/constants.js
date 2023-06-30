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
        id: 6,
        icon: <SettingsInputComponentIcon />,
        label: 'Settings',
        route: 'settings',
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