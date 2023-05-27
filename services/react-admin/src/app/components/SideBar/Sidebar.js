import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { sideBarItems } from './constants';
import { sidebarStyles } from './styles';
import { Typography } from '@mui/material';
import SideBarLink from './SideBarLink';
import { APPNAME } from '../../core/constants';

const Sidebar = (props) => {
  return (
    <Drawer
      sx={sidebarStyles.drawer}
      variant="permanent"
      anchor="left"
    >
      <Toolbar >
        <Typography component="div" sx={sidebarStyles.navBrand} className='text-blue'>
            <h6><b>{APPNAME}</b></h6>
        </Typography>
      </Toolbar>
      {/* <Divider /> */}
      <List>
        {sideBarItems.map((item, index) => (
            <SideBarLink  item={item}/>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar