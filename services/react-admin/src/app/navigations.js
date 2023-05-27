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

export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: <DashboardIcon /> },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Users',
    icon: <PeopleIcon />,
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' }
    ]
  }
];
