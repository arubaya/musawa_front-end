import {
  Button, Divider, Drawer, List, ListItem, ListItemText, makeStyles,
} from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: '100px',
  },
  navButton: {
    textDecoration: 'none',
    color: '#222D40',
  },
}));

function SideNavbar() {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List>
        <NavLink className={classes.navButton} to="/admin/dashboard" color="primary">
          <ListItem button>
            <ListItemText>
              Dashboard
            </ListItemText>
          </ListItem>
        </NavLink>
        <NavLink className={classes.navButton} to="/admin/rooms" color="primary">
          <ListItem button>
            <ListItemText>
              Rooms
            </ListItemText>
          </ListItem>
        </NavLink>
        <NavLink className={classes.navButton} to="/admin/users" color="primary">
          <ListItem button>
            <ListItemText>
              Users
            </ListItemText>
          </ListItem>
        </NavLink>
        {/* {['Dashboard', 'Rooms', 'Users'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
    </Drawer>
  );
}

export default SideNavbar;
