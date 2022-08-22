
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
import { useRouter } from 'next/router'
import FormHelperText from '@mui/material/FormHelperText';
import NativeSelect from '@mui/material/NativeSelect';

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

  const {data} = props

  console.log('data search', data)

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

      

     

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }} css={boxSearch}>

        <NativeSelect
          defaultValue={'mundo'}
          inputProps={{
            name: 'country',
            id: 'uncontrolled-native',
          }}
          onChange={handleChangeSelectcountry}
        >
          {dataOptions}
       

        </NativeSelect>



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

      </div>
    </div>
   

      </Box>
    )

}

export default SearchDate