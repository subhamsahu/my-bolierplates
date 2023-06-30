import React from 'react'
import Scrollbar from 'react-perfect-scrollbar';
import { Box, List, ListItem, styled } from '@mui/material';
import SideBarLink from '../SideBar/SideBarLink';
import { sideBarItems } from '../SideBar/constants';

const StyledScrollBar = styled(Scrollbar)(() => ({
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'relative'
}));

const SideBarFooter = styled('div')(({ theme }) => ({
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'absolute',
    width: '100%',
    bottom: 0
}));

const SideNavOptions = () => {
    return (
        <React.Fragment>
            <StyledScrollBar>
                <hr />
            </StyledScrollBar>
            <SideBarFooter>
                <List>
                    {sideBarItems.map((item, index) => (
                        <SideBarLink item={item} />
                    ))}
                </List>
            </SideBarFooter>
        </React.Fragment>

    )
}

export default SideNavOptions