
import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from '@/public/img/logos/read-metro-color.svg';
import Image from 'next/image'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { css } from '@emotion/react';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ElevationScroll from '@/components/CustomHooks/ElevationScroll';
import { useDispatch } from 'react-redux'
import { updateLangSlice  } from '@/redux/features/lang/langSlice'
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import LaunchIcon from '@mui/icons-material/Launch';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';




import configsite from '@/src/configSite'


const elevationFixedWrap = css({
  '& [elevation="4"]':{
    position:'fixed',
    top:0,
    width: '100%',
    zIndex: 10
  }

})

const selectLang = css({
  background: 'none',
  '&::before': {
    display: 'none',
  },
  '&::after': {
    display: 'none',
  },

  '& .MuiSelect-standard': {
    display: 'flex',
    alignItems: 'center',

  }

})

export default function Header(props) {

  //console.log('props  del header', props)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const menupaises = configsite.routeCountry;
  const langOptions = configsite.langOptions;

  const{ searchInput} = props

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//console.log('configsite:', menupaises)

const [language, setLanguage] = React.useState('ES');

  const handleChange = (event) => {
    setLanguage(event.target.value);
    dispatch(updateLangSlice(event.target.value))
    
  };


  const handleProfileMenuOpen = (event) => {
    //console.log('handleProfileMenuOpen', event.currentTarget)
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
  const menuLangId = 'primary-lang-menu';
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
      {menupaises.map((item, index) => {
        return(
          <MenuItem onClick={handleMenuClose} key={index+item.name}>
            <Link href={item.externalLink}>
              {item.name} 
            </Link>
          </MenuItem>
        )
      })}

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
      {/* <MenuItem>
      <ListItemText>
        <a 
          href="https://www.metroworldnews.com/about-us/" 
          target="_blank"
          rel="noopener noreferrer">
            Acerca de Metro
        </a>
      </ListItemText>
        
      </MenuItem>
      <Divider />
      <MenuItem>
        
      </MenuItem> */}

      <MenuList dense>
        <MenuItem>
          <ListItemText>
              <Link 
                    href="https://www.metroworldnews.com/about-us/" 
                    color="#000"  
                    variant="subtitle2"
                > 
                     Acerca de Metro
                </Link>
                </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>NUESTROS PORTALES</ListItemText>
        </MenuItem>
        {menupaises.map((item)=>(

          item.name != "Mundo" ?

          <MenuItem key={'menuitem-'+item.name}>
         

          <ListItemButton>
              <ListItemIcon>
                <LaunchIcon />
              </ListItemIcon>
              <ListItemText>
                <Link 
                      href={item.externalLink} 
                      color="#000"  
                      variant="subtitle2"
                      target="_blank"
                  > 
                      {item.name}
                  </Link>

              </ListItemText>
            </ListItemButton>

         
        </MenuItem>
        : null

        ))}
        
        
        
        
        
        
        
      </MenuList>
      
    </Menu>
  );



  const langOptionsRender = langOptions.map((item, i)=>{
    return(
      <MenuItem value={item.slug} key={item.name+i}>
        <Image src={item.flagUrl} alt={item.name} width={20} height={15} priority={i == 0 ? true : false}/>
      </MenuItem>
    )
    })




  return (
    <>
      <AppBar color="inherit" position="relative" sx={{ boxShadow: 1 }} >
        <Toolbar>
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
              <Link href={'/'}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="Read Metro Logo"
                    sx={{ mr: 2 }}
                > 
                  <Image src={Logo} alt="Read Metro Logo"/>
                </IconButton>
                </Link>
            </Box>

            <Box sx={{flexGrow:1}}>
              <Box sx={{ display: { xs: 'none', md: 'block' }}}>
                {searchInput}
                
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
              sx={{mr:0}}
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
         
          <Box sx={{ display: { xs: 'flex', md: 'flex', padding: '0px' } }}>

              <FormControl sx={{ m: 1, minWidth: 50, paddingLeft: '1rem', borderLeft: '1px dotted #ccc', background: '#fff' }} >
                  <Select
                    value={language}
                    onChange={handleChange}
                    //displayEmpty
                    inputprops={{ 'aria-label': 'Without label' }}
                    variant="standard"
                    css={selectLang}
                  >
                    <MenuItem value="">
                      <em>Idioma</em>
                    </MenuItem>
                    {langOptionsRender}
                  </Select>
                </FormControl>
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
          <ElevationScroll threshold={35} {...props}>
          <Box sx={{ display: { xs: 'block', md: 'none' }}}>
            {searchInput}
          </Box>
          </ElevationScroll>
        </Box>
      
     
     
      
      {renderMobileMenu}

      {renderMenu}

      {/* {renderMenuLang} */}
      
    </>
  );
}
