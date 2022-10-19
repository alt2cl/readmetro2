
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

  '& .MuiOutlinedInput-input': {
    padding:'13px 12px'

  },
  

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


    


const SearchDate = (props) => {

  const {defaultValueCountry, menupaises, lang } = props
  

  //console.log('props search: ',props)

  const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
 
    const [valueDate, setValueDate] = useState(new Date());


    const handleChangeDate = (newValue) => {
      setValueDate(newValue);
      const formatDate = newValue.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })
      const arrayDate = formatDate.split("-")
      const dateString = arrayDate.length > 2 ? `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}` : null
      
      dispatch(updateDateSlice(dateString))

      if(defaultValueCountry == "/"){
        //console.log('search estoy en el home')
        router.push(`/?_date=${dateString.replaceAll('/','')}`)
      }

      // if (landingArchivo) {
      //   //console.log('search estoy en el archivo')
      //   router.push(`/${lang}/${country}/${edition}/${dateString.replaceAll('/','')}`)

      // }

      // if (landingEdition) {
      //   //console.log('search estoy en el landing edicion', router)
      //   router.push(`/${lang}/${country}/${edition}/${dateString.replaceAll('/','')}`)
      // }
      
    };

    //console.log('date value', valueDate)


    //console.log('router:::', ' - ', router.query.country ,' - ', router.asPath)
    
    
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    const listEnableDates = useSelector(state => state.date.arrayEnableDates)
    

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
    



    const handleChangeSelectcountry = (e) => {
      console.log('e.target.value', e.target.value)
      if(e.target.value == '/'){
        router.push("/")
      } else {
        router.push(`/${lang ? lang : 'ES'}/${e.target.value}`)
      }
      
    }

   
    const dataOptions = menupaises.map((item)=>{
      return(
        <option value={item.slug} key={item.slug}>{item.name}</option>
      )
    })


    const countrySelect = (countryvalue) => {

      return(

        <NativeSelect css={pullproduct}
          defaultValue={countryvalue}
          inputprops={{
            name: 'country',
            id: 'uncontrolled-native',
          }}
          onChange={handleChangeSelectcountry}
        >
          {
            menupaises.map((item)=>(
                <option value={item.slug} key={item.slug}>{item.name}</option>
              )
            )
          }

          
        </NativeSelect>

      )
    }




      



      
console.log('defaultValueCountry currentSection', defaultValueCountry)
        

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }} css={boxSearch}>

          {countrySelect(defaultValueCountry)}

        <Box sx={{height:'45px', flexGrow: '1'}}>

        {defaultValueCountry != "/" ? 
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
            <Stack spacing={3} >
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
                  const d =  ("0" + dateParam.getDate()).slice(-2);
                  const stringDate = `${d}-${m}-${y}`
                  return listEnableDates.includes(stringDate) ? false : true;
                  //console.log('shouldDisableDate(dateParam)', shouldDisableDate(dateParam))
                  //return disableDates(dateParam)
                }}
              />
              
            </Stack>
            </LocalizationProvider>
        
        : null}

        </Box>
         

            



            <div>
      <div>

      </div>
    </div>

   

      </Box>
    )

}

export default SearchDate