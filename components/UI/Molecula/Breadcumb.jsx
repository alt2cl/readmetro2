import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux'

function handleClick(event) {
  event.preventDefault();
}


const Breadcumb = (props) => {


    const {router} = props

    const langCurrent = useSelector(state => state.lang.currentLang)

   

      let editionRouter
      let countryRouter


      

      if(router.query.country){
        const countryRouterValue = String(router.query.country)
        countryRouter = countryRouterValue.charAt(0).toUpperCase() + countryRouterValue.slice(1)

      }

      if(router.query.edicion && router.query.edicion[0]){
        const editionRouterValue = String(router.query.edicion[0])
        editionRouter = editionRouterValue.charAt(0).toUpperCase() + editionRouterValue.slice(1)
      }

      
      

      return (
        <Stack spacing={2}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
                Home
            </Link>
            { router.query.country ?
                <Link
                underline="hover"
                key="2"
                color="inherit"
                href={`/${langCurrent}/${router.query.country}/` }
              >
                {countryRouter}
              </Link>
            : null
            }
            { router.query.edicion && router.query.edicion[0] ?
                <Link
                underline="hover"
                key="2"
                color="inherit"
                href={ `/${langCurrent}/${router.query.country}/${router.query.edicion[0]}/`}
              >
                {editionRouter}
              </Link>
            : null
            }

          </Breadcrumbs>
        </Stack>
      );
    

}

export default Breadcumb