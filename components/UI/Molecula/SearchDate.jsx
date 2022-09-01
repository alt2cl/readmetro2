
import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from '@/src/Link';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Menu from '@mui/material/Menu';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/redux/features/counter/counterSlice'
import { update } from '@/redux/features/countryselect/countrySlice'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router'
import FormHelperText from '@mui/material/FormHelperText';
import NativeSelect from '@mui/material/NativeSelect';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
//import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
//Documentacion abreviaciones y traducciones datepeacker
//https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
//https://mui.com/x/react-date-pickers/localization/
//https://mui.com/x/react-date-pickers/localization/#date-engine-locale
//https://mui.com/x/api/date-pickers/mobile-date-picker/#main-content

import enLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import bgLocale from 'date-fns/locale/bg';

const boxSearch = (theme) => css({
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color:theme.palette.common.white,
    [theme.breakpoints.up('xs')]: {
        marginRight: '0px',
        borderRadius: '0px',
    },
    [theme.breakpoints.up('md')]: {
        marginRight: '1rem',
        borderRadius: '4px',
    },

    

})

const pullproduct = (theme) =>css ({
  paddingLeft:'20px',
  color: theme.palette.common.white,
  fontWeight: 'bold',

  '&::after': {
    display: 'none',
  },
  '&::before': {
    display: 'none',
  }

})


const textfielddate = (theme) => ({
  

  '& .MuiInputLabel-root': {
    display: 'none'
  },

  '& .MuiOutlinedInput-input:first-of-type': {
    color: theme.palette.common.white,
  },

  '& .MuiPickersToolbar-penIconButton': {
    color: 'red',

  }
})


    


const SearchDate = (props) => {

  const {data} = props


    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const [valueDate, setValueDate] = useState(new Date());

    console.log('date value', valueDate)

    const handleChangeDate = (newValue) => {
      setValueDate(newValue);
    };


    //console.log('router:::', ' - ', router.query.country ,' - ', router.asPath)
    
    
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const count = useSelector(state => state.counter.value)
    const countrycurrent = useSelector(state => state.country.value)
    const [countryvalue, setCountryValue] = useState('Mundo');

    

    const dispatch = useDispatch()

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

    

    const handleCalendarMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleChangeSelectcountry = (e) => {
      
      router.push("/"+e.target.value)
    }



  


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

   
        const dataOptions = data.map((item)=>{
          return(
            <option value={item.link} key={item.slug}>{item.name}</option>
          )
        })


        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
      
      
        const modalDate =(

          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

      
        )


      

        

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }} css={boxSearch}>

         
          <NativeSelect css={pullproduct}
          defaultValue={router.asPath ? router.asPath : '/'}
          inputprops={{
            name: 'country',
            id: 'uncontrolled-native',
          }}
          onChange={handleChangeSelectcountry}
        >
          {dataOptions}
       

        </NativeSelect>
          

        



            {/* <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleClickOpen}
                color="inherit"
                sx={{display: 'flex', justifyContent: 'space-between',flexGrow: 1}}
                >
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                    >
                        Hoy - Domingo 17 de Sept 2022
                    </Typography>
                    <CalendarMonthIcon sx={{ mr: 2 }}/>
            </IconButton> */}

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
              <Stack spacing={3} sx={{flexGrow: '1'}}>
                <MobileDatePicker
                  label="Fecha de edición"
                  inputFormat="EEEE dd LLLL yyyy"
                  value={valueDate}
                  onChange={handleChangeDate}
                  renderInput={(params) => <OutlinedInput css={textfielddate} endAdornment={<InputAdornment position="end"><CalendarMonthIcon sx={{color: 'white'}} /></InputAdornment>} {...params}  />}
                  dayOfWeekFormatter={(day) => day.charAt(0).toUpperCase()}
                  toolbarFormat="dd MMMM"
                  disableFuture
                />
                
              </Stack>
            </LocalizationProvider>
            {renderMenu}

            <div>
      <div>

      </div>
    </div>

   

      </Box>
    )

}

export default SearchDate