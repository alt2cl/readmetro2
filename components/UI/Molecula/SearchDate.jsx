
import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Menu from '@mui/material/Menu';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux'


import { updateDateSlice  } from '@/redux/features/date/dateSlice'

import { useRouter } from 'next/router'
import NativeSelect from '@mui/material/NativeSelect';

import Stack from '@mui/material/Stack';
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
  fontSize: '14px',
  

  '& .MuiInputLabel-root': {
    display: 'none'
  },

  '& .MuiOutlinedInput-input:first-of-type': {
    color: theme.palette.common.white,
  },

  '& .MuiPickersToolbar-penIconButton': {
    color: 'red',
  },
  '& .MuiOutlinedInput-notchedOutline' : {
    border: '0'
  }
})


    


const SearchDate = ({data}) => {

  //console.log('props search: ',props)

  const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [todayDate, setTodayDate] = useState(new Date())
    const [valueDate, setValueDate] = useState(new Date());

    const lang = router.query.lang ? router.query.lang : null
    const country = router.query.country ? router.query.country : null
    const city = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
    const edition = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
    const date = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] != 'archivo' ? router.query.edicion[1] : null
    const page = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null

    const landingHome = !router.query.country ? true : false
    const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false
    const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] == undefined ? true : false
    const landingCountry = router.query.country && !router.query.edicion ? true : false

    //console.log('data search', router)

    const handleChangeDate = (newValue) => {
      const formatDate = newValue.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })
      const arrayDate = formatDate.split("-")
      const dateString = arrayDate.length > 2 ? `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}` : null
      //console.log('aldito formatDate::', dateString)
      setValueDate(newValue);
      dispatch(updateDateSlice(dateString))

      if(landingHome){
        console.log('search estoy en el home')
        router.push(`/?_date=${dateString.replaceAll('/','')}`)
      }

      if (landingArchivo) {
        console.log('search estoy en el archivo')
        router.push(`/${lang}/${country}/${edition}/${dateString.replaceAll('/','')}`)

      }

      if (landingCountry) {
        console.log('search estoy en el landing pais')
        router.push(`/${lang}/${country}?_date=${dateString.replaceAll('/','')}`)

      }

      if (landingEdition) {
        console.log('search estoy en el landing edicion', router)
        router.push(`/${lang}/${country}/${edition}?_date=${dateString.replaceAll('/','')}`)
      }
      
    };

    //console.log('date value', valueDate)


    //console.log('router:::', ' - ', router.query.country ,' - ', router.asPath)
    
    
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const listEnableDates = useSelector(state => state.date.arrayEnableDates)

    
    //console.log('listEnableDates', listEnableDates)
    

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };


    const handleChangeSelectcountry = (e) => {
      router.push(`/${lang}/${e.target.value}`)
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
            <option value={item.slug} key={item.slug}>{item.name}</option>
          )
        })




      



      
//console.log('router desde searchbox', router.query.country[0])
        

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }} css={boxSearch}>
          <NativeSelect css={pullproduct}
          defaultValue={country ?  country : '/'}
          inputprops={{
            name: 'country',
            id: 'uncontrolled-native',
          }}
          onChange={handleChangeSelectcountry}
        >
          {dataOptions}
       

        </NativeSelect>
          

        



         

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
                  shouldDisableDate={(dateParam) => {
                    const m = (('0'+(dateParam.getMonth()+1))).slice(-2)
                    const y = dateParam.getFullYear()
                    const d = dateParam.getDate()
                    const stringDate = `${d}-${m}-${y}`
                    return listEnableDates.includes(stringDate) ? false : true;
                    //console.log('shouldDisableDate(dateParam)', shouldDisableDate(dateParam))
                    //return disableDates(dateParam)
                  }}
                  // shouldDisableDate={(dateParam)=>{
                  //   //const fecha1 = useFormatDate(dateParam) 
                  //   //const fecha2 = useFormatDate(valueDate) 
                  //   console.log('fechas: formatDateParam dateparam:', typeof dateParam )
                  //   console.log('fechas: formatDateParam valuedate_', typeof valueDate )

                  //   if(dateParam == valueDate ) {
                  //     return true
                  //   } else {
                  //     return false
                  //   }

                     

                  // }}
                  
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