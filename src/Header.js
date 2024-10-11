import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './index.css';

const Header = () => {
    return (
        <AppBar position="static" className='header-book'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              Storyteller's corner
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      );

}

export default Header;