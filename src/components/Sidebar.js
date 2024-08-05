import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e293b',
          color: 'white',
        },
      }}
    >
      <List>
        <ListItem button component={NavLink} to="/dashboard">
          <ListItemIcon><DashboardIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/orders">
          <ListItemIcon><ShoppingCartIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><PeopleIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
