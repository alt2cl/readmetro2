
import * as React from 'react';
import { useState, useEffect} from "react";
import Box from '@mui/material/Box';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux'
import configsite from '@/src/configSite'


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
import { BorderBottom } from '@mui/icons-material';


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

 

  const menupaises = configsite.routeCountry;

  const langCurrent = useSelector(state=> state.lang.currentLang)
  const countryCurrent = useSelector(state=> state.country.countryName)

  const router = useRouter()

  const landingCountry = router.query.country && !router.query.edicion ? true : false
  const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] != 'archivo' ? true : false
  const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false

  console.log('el rouyer:', router)

  let langDatePicker 

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
      //newValue es lo q devuelve la seleccion del modal del calendario

      //return false
      //aqui seteamos el formato de la fecha q retorna

      let dateString

      if(newValue){
        setValueDate(newValue);
      const formatDate = newValue.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })
      const arrayDate = formatDate.split("-")
      dateString = arrayDate.length > 2 ? `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}` : null

      
      dispatch(updateDateSlice(dateString))

      if(!countryCurrent && router.asPath.includes('mundo')){
        router.push(`/${router.query.lang}/mundo/?_date=${dateString.replaceAll('/','')}`)
      }

     

      if (landingArchivo || landingEdition ) {
        console.log('search estoy en el archivo')
        router.push(`/${router.query.lang}/${router.query.country}/${router.query.edicion[0]}/${dateString.replaceAll('/','')}`)

      }

      if (landingCountry) {
        console.log('search estoy en el landing edicion', router)
        router.push(`/${router.query.lang}/${router.query.country}/?_date=${dateString.replaceAll('/','')}`)
      }

      }
      



     
      
    };

    
    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);

    



    const handleChangeSelectcountry = (e) => {
      dispatch(updateDateSlice(null))
      //console.log('e.target.value', e.target.value)
      if(e.target.value == '/'){
        router.push("/")
      } else {
        router.push(`/${langCurrent ? langCurrent : 'ES'}/${e.target.value}`)
      }
      
    }

   
      
    

 

   
  
    


    useEffect(()=>{

      if(router.query.country){
        fetch(`https://api.readmetro.com/${router.query.country}/dates_editions_by_country.json`)
      .then((response)=>response.json())
      .then((fechas=>{

        let arrayfechas = []
        let arrayfechasCountry = []


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


    },[router.query.country, countryCurrent])

 console.log('el router en search:', router)

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }} css={boxSearch}>

          <Box sx={{
                background: (theme)=> theme.palette.primary.main2,
                position:'relative',
                display:'flex',
                borderRadius: '5px',
              
                '&:before': {
                  content:'""',
                  borderTop: '23px solid transparent',
                  borderBottom: '23px solid transparent ',
                  borderLeft: (theme)=> `13px solid ${theme.palette.primary.main2}`,
                  position: 'absolute',
                  top: '0px',
                  right: '-12px',

                }
              }}>
                <NativeSelect css={pullproduct}
              value={countryCurrent == undefined ? '/': countryCurrent }
              inputprops={{
                name: router.query.country,
                id: router.query.country,
              }}
              onChange={handleChangeSelectcountry}
              sx={{
                background: 'none',
                paddingRight: '0px!important',
                '& select': {
                  padding: '0px!important'
                }
              }}
              
            >
              {
                menupaises.map((item)=>(
                    <option value={item.slug} key={item.slug}>{item.name}</option>
                  )
                )
              }
        </NativeSelect>

          </Box>

        

        <Box sx={{height:'45px', flexGrow: '1', paddingLeft: '10px'}}>

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
                  if(router.query.country){
                    return fechasCalendario.includes(stringDate) ? false : true;
                  } else {
                    return false
                  }
                  
                  //console.log('shouldDisableDate(dateParam)', shouldDisableDate(dateParam))
                  //return disableDates(dateParam)
                }}
              />
              
            </Stack>
            </LocalizationProvider>
        
      

        </Box>
         

            



            <div>
      <div>

      </div>
    </div>

   

      </Box>
    )

}

export default SearchDate