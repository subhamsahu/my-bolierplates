import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from '../../Common/MatxComponents';
import { themeShadows } from '../../MatxTheme/themeColors';
import { NotificationProvider } from '../../../context/NotificationContext';
// import useAuth from 'app/hooks/useAuth';
import useSettings from '../../../hooks/useSettings';
import { topBarHeight } from '../../../core/constants';
import MenuIcon from '@mui/icons-material/Menu';

import { Span } from '../../Common/MatxComponents/Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';


const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));

const LayoutTopbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  // const { logout, user } = useAuth();
  const { logout, user } = {}
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <MenuIcon/>
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />

          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{"User"}</strong>
                  </Span>
                </Hidden>
                <Avatar src={"user"} sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Span> Settings </Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(LayoutTopbar);
