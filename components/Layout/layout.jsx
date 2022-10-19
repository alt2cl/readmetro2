import {  Container } from '@mui/system';
import Header from '@/components/Layout/Header'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import configsite from '@/src/configSite'
import SearchDate from '@/components/Layout/SearchDate';



function Layout( props ) {

    const {children} = props

    const router = useRouter()
    const landingHome = router.query.country ? false : true
    const landingCountry = router.query.country && !router.query.edicion ? true : false
    const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] == undefined ? true : false
    const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false
    const lang = router.query.lang ? router.query.lang : null

    const menupaises = configsite.routeCountry;


    const [thisSection, setThisSection] = useState('/')

    useEffect(()=>{
        setThisSection(landingHome ? '/' : router.query.country)

    })

    return (
        <>
            <Header searchInput={
                <SearchDate lang={lang}  menupaises={menupaises} defaultValueCountry={landingHome ? `/` : `${router.query.country}`} />
            } />
            
            <main>
            <Container  maxWidth="xl">
                {children}
            </Container>
                
            </main>

            <footer>
              
            </footer>
        
        </>
        
      );
}

export default Layout;  