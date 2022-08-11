
import * as React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '@/public/img/logos/read-metro-color.svg';
import Image from 'next/image'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from '@/src/Link';
import SearchDate from '@/components/UI/Molecula/SearchDate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { css } from '@emotion/react';
import ESflag from '@/public/img/flags/ES@3x.png'
import FRflag from '@/public/img/flags/FR@3x.png'
import NEflag from '@/public/img/flags/NE@3x.png'
import PTflag from '@/public/img/flags/PT@3x.png'
import USflag from '@/public/img/flags/US@3x.png'


import useScrollTrigger from '@mui/material/useScrollTrigger';


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 35,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const elevationFixedWrap = css({
  '& [elevation="4"]':{
    position:'fixed',
    top:0,
    width: '100%',
    zIndex: 10
  }

})

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);




  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCalendarMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar color="inherit" position="relative" sx={{ boxShadow: 1 }} >
        <Toolbar>
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="Read Metro Logo"
                    sx={{ mr: 2 }}
                >
                    <Image src={Logo} alt="Read Metro Logo"/>
                </IconButton>
            </Box>

            <Box sx={{flexGrow:1}}>
              <Box sx={{ display: { xs: 'none', md: 'block' }}}>
                <SearchDate  />
              </Box>
            </Box>
         
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 0 }}>
            <Button
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{mr: 0}}
                >
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Nuestros Portales
                    </Typography>
                    <KeyboardArrowDownIcon />
            </Button>
            <Button
              size="large"
              edge="end"
              aria-label="About Read Metro"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{mr: 0}}
            >   
                <Link 
                    href="https://www.metroworldnews.com/about-us/" 
                    color="#000"  
                    variant="subtitle2"
                >
                     Acerca de Metro
                </Link>
            </Button>
          </Box>
         
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          <Button
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{mr: 0}}
            >
                <Typography
                    variant="subtitle2"
                    noWrap
                    component="div"
                >
                    <Image src={ESflag} title="Idioma Español" width={30} height={20}/>
                </Typography>
              <KeyboardArrowDownIcon />
            </Button>

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
        <Box sx={{flexGrow:1}} css={elevationFixedWrap}>
          <ElevationScroll {...props}>
          <Box sx={{ display: { xs: 'block', md: 'none' }}}>
              <SearchDate  />
          </Box>
          </ElevationScroll>
        </Box>
      
     
     
      
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
