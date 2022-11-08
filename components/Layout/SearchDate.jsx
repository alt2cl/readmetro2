
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
import ptLocale from 'date-fns/locale/pt-BR';
import frLocale from 'date-fns/locale/fr';
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

  const {defaultValueCountry, menupaises, lang, landingCountry, landingEdition, landingArchivo, router } = props

  const langCurrent = useSelector(state=> state.lang.currentLang)

  let langDatePicker 

console.log('langCurrent>', langCurrent)
  switch (langCurrent) {
    case 'ES':
      langDatePicker = esLocale
      break;
    case 'EN':
      langDatePicker = enLocale
      break;
    case 'NE':
      langDatePicker = enLocale
      break;
    case 'PT':
      langDatePicker = ptLocale
      break;
    case 'FR':
      langDatePicker = frLocale
      break;
  
    default:
      langDatePicker = esLocale
      break;
  }

  //console.log('props search: ',props)

  const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null);
 
    const [valueDate, setValueDate] = useState(new Date());

    const [fechasCalendario, setFechasCalendario] = useState([]);


    const handleChangeDate = (newValue) => {

      console.log('datepicker', newValue)
      setValueDate(newValue);
      const formatDate = newValue.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })
      const arrayDate = formatDate.split("-")
      const dateString = arrayDate.length > 2 ? `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}` : null

      console.log('datepicker 2', dateString , defaultValueCountry, router)
      
      dispatch(updateDateSlice(dateString))

      if(defaultValueCountry == "/"){
        console.log('search estoy en el home')
        router.push(`/?_date=${dateString.replaceAll('/','')}`)
      }

      if (landingArchivo || landingEdition ) {
        console.log('search estoy en el archivo')
        router.push(`/${router.query.lang}/${router.query.country}/${router.query.edicion[0]}/${dateString.replaceAll('/','')}`)

      }

      if (landingCountry) {
        console.log('search estoy en el landing edicion', router)
        router.push(`/${router.query.lang}/${router.query.country}/?_date=${dateString.replaceAll('/','')}`)
      }
      
    };

    //console.log('date value', valueDate)


    //console.log('router:::', ' - ', router.query.country ,' - ', router.asPath)
    
    
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    // const listEnableDates = useSelector(state => state.date.arrayEnableDates)

    // console.log('listEnableDates',listEnableDates)


    

    // const handleMobileMenuClose = () => {
    //     setMobileMoreAnchorEl(null);
    //   };
    



    const handleChangeSelectcountry = (e) => {
      dispatch(updateDateSlice(null))
      //console.log('e.target.value', e.target.value)
      if(e.target.value == '/'){
        router.push("/")
      } else {
        router.push(`/${lang ? lang : 'ES'}/${e.target.value}`)
      }
      
    }

   
    // const dataOptions = menupaises.map((item)=>{
    //   return(
    //     <option value={item.slug} key={item.slug}>{item.name}</option>
    //   )
    // })


    const countrySelect = () => {
      // console.log('countryvalue',countryvalue )
     

      return(

        <NativeSelect css={pullproduct}
          defaultValue={router.query.country ? router.query.country : '/'}
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

    


    useEffect(()=>{



      

      if(router.query.country){
        fetch(`https://api.readmetro.com/${router.query.country}/dates_editions_by_country.json`)
      .then((response)=>response.json())
      .then((fechas=>{

        let arrayfechas = []
        let arrayfechasCountry = []

        console.log('valor router', router.query.edicion)

        for (const key in fechas) {
            if (fechas.hasOwnProperty(key) && router.query.edicion && router.query.edicion[0] && fechas[key].indexOf(router.query.edicion[0]) > -1) {
              const YYYY = key.slice(0,4)
              const MM = key.slice(5,7)
              const DD = key.slice(8,10)
              arrayfechas.push(`${DD}-${MM}-${YYYY}`)
            } else if ( fechas.hasOwnProperty(key)) {
              const YYYY = key.slice(0,4)
              const MM = key.slice(5,7)
              const DD = key.slice(8,10)
              arrayfechasCountry.push(`${DD}-${MM}-${YYYY}`)

            }
        }

        if(router.query.edicion == undefined){
          setFechasCalendario(arrayfechasCountry)
        } else {
          setFechasCalendario(arrayfechas)
        }


        // if(arrayfechas.ediciones.includes('mujeres')) {
          
        // }
        
      }))

      }

      

    },[router.query.country])

      


 
        

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }} css={boxSearch}>

          {countrySelect()}

        <Box sx={{height:'45px', flexGrow: '1'}}>

        {defaultValueCountry != "/" ? 
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={langDatePicker}>
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
                  return fechasCalendario.includes(stringDate) ? false : true;
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