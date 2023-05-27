import { useEffect, useRef, memo } from 'react';
import { ThemeProvider, useMediaQuery, Box, styled, useTheme, Grid } from '@mui/material';
import Scrollbar from 'react-perfect-scrollbar';
import LayoutTopBar from './LayoutTopBar';
import LayoutSideBar from './LayoutSideBar';
import useSettings from '../../../hooks/useSettings';
import { sidenavCompactWidth, sideNavWidth } from '../../../core/constants';
import SidenavTheme from '../../MatxTheme/SidenavTheme/SidenavTheme';

const LayoutRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    background: theme.palette.background.default
}));

const ContentBox = styled(Box)(() => ({
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between'
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column'
}));

const LayoutContainer = styled(Box)(({ width, open }) => ({
    height: '100vh',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
    verticalAlign: 'top',
    marginLeft: width,
    position: 'relative',
    transition: 'all 0.3s ease',
    marginRight: open ? 50 : 0
}));

const Layout = ({ children }) => {
    const { settings, updateSettings } = useSettings();
    const { layout1Settings, secondarySidebar } = settings;
    const topbarTheme = settings.themes[layout1Settings.topbar.theme];
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav }
    } = layout1Settings;

    const getSidenavWidth = () => {
        switch (sidenavMode) {
            case 'full':
                return sideNavWidth;

            case 'compact':
                return sidenavCompactWidth;

            default:
                return '0px';
        }
    };

    const sidenavWidth = getSidenavWidth();
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

    const ref = useRef({ isMdScreen, settings });
    const layoutClasses = `theme-${theme.palette.type}`;

    useEffect(() => {
        let { settings } = ref.current;
        let sidebarMode = settings.layout1Settings.leftSidebar.mode;
        if (settings.layout1Settings.leftSidebar.show) {
            let mode = isMdScreen ? 'close' : sidebarMode;
            updateSettings({ layout1Settings: { leftSidebar: { mode } } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMdScreen]);

    return (
        <LayoutRoot className={layoutClasses}>
            {showSidenav && sidenavMode !== 'close' && (
                <SidenavTheme>
                    <LayoutSideBar />
                </SidenavTheme>
            )}
            <LayoutContainer width={sidenavWidth} open={secondarySidebar.open}>
                <ThemeProvider theme={topbarTheme}>
                    <LayoutTopBar fixed={true} className="elevation-z8" />
                </ThemeProvider>
                <ContentBox>
                    {children}
                </ContentBox>
            </LayoutContainer>
        </LayoutRoot>

    )
}

export default Layout