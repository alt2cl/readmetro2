
import * as React from 'react';
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
import Input from '@mui/material/Input';
import { useRouter } from 'next/router'

const boxSearch = (theme) => css({
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    color:theme.palette.common.white,
    borderRadius: '4px',
    [theme.breakpoints.up('xs')]: {
        marginRight: '0',
    },
    [theme.breakpoints.up('md')]: {
        marginRight: '1rem',
    }

})
    


const SearchDate = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const router = useRouter()
    
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const count = useSelector(state => state.counter.value)
    const countrycurrent = useSelector(state => state.country.value)
    const [countryvalue, setCountryValue] = React.useState('Mundo');
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
      console.log('handlechange: ', e.target.value)
      router.push('/country/'+e.target.value)
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

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }} css={boxSearch}>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={countrycurrent}
            onChange={handleChangeSelectcountry}
            displayEmpty
          >
            <MenuItem value="">
              <em>{countrycurrent}...</em>
            </MenuItem>
            <MenuItem value={'mexico'}>Mexico</MenuItem>
            <MenuItem value={'brazil'}>Brasil</MenuItem>
            <MenuItem value={'chile'}>Chile</MenuItem>
          </Select>
        </FormControl>
           
        {/* <Button
                size="large"
                edge="end"
                aria-label="account of current user"
                //aria-controls={menuId}
                aria-haspopup="true"
                //onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{bgcolor:'primary.light'}}
                >
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                    >
                        Mundo
                    </Typography>
                    <KeyboardArrowDownIcon />
            </Button> */}
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleCalendarMenuOpen}
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
            </IconButton>
            {renderMenu}

            <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <span>{countrycurrent}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
   

      </Box>
    )

}

export default SearchDate