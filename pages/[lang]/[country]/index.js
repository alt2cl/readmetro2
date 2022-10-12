import React from 'react';
import { useState,  useEffect } from "react";
import Image from 'next/image';
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
// import Dialogmodal from '@/components/UI/Molecula/Dialogmodal'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import { useRouter } from 'next/router'
import {  updateEnableDatesSlice } from '@/redux/features/date/dateSlice'

import { useSelector, useDispatch } from 'react-redux'
// import NewspaperBox from '@/components/UI/Organismo/NewspaperBox'
// import NewsPagesList from '@/components/UI/Organismo/NewsPagesList'
import Box from '@mui/material/Box';
import HeadSeo from '@/components/Layout/headSeo'
import siteMetadata from '@/src/siteMetadata'
// import fallback from '@/public/img/fallback.jpg'
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import Button from '@mui/material/Button';
// import ShareIcon from '@mui/icons-material/Share';
//import Link from 'next/link'
//import { updateDialogSlice, closeDialog } from '@/redux/features/dialog/dialogSlice/'
//import useFormatDate from '@/components/CustomHooks/useFormatDate'
import Suscription from '@/components/UI/Organismo/Suscription';



function CountryTemplate({data}) {


  const router = useRouter()

  const [dataImages,setDataImages] = useState(null)

   
  const lang = router.query.lang ? router.query.lang : null
  const country = router.query.country ? router.query.country : null
  const city = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  const routeEdition = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  const date = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] != 'archivo' ? router.query.edicion[1] : null
  const page = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null
  
  const landingHome = !router.query.country ? true : false
  const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false
  const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] == undefined ? true : false
  const landingCountry = router.query.country && !router.query.edicion ? true : false






  //return false
  //const {slug} = router.query || []
  //const [lang, country, city, edition, page] = slug
  const routervalues = { lang: lang, country: country }
  const widthItem = 250
  const [imageError, setImageError] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const [titlehead, setTitleHead] = useState('')



  const dispatch = useDispatch();
  //dispatch(updateCountrySlice({countryName:country}))
  //const dialogState = useSelector(state => state.dialog.open)
  const dialogImagesArrayState = useSelector(state => state.dialog.imagesvalues.arrayimages)
  const dialogDatesState = useSelector(state => state.dialog.imagesvalues)
  // const dialogPaginaArrayState = useSelector(state => state.dialog.imagesvalues.pagina)
  // const dialogFechaArrayState = useSelector(state => state.dialog.imagesvalues.fecha)
  // const dialogEdicionArrayState = useSelector(state => state.dialog.imagesvalues.edicion)
  // const metatagsTitleState = useSelector(state => state.metatags.title)
  const stringDateState = useSelector(state => state.date.stringDate)
  //console.log('dialogImagesArrayState', dialogImagesArrayState)
  //console.log('estado openModal', dialogState)


    const handleCloseModal = () => {
      //console.log('router values: click modal')
      //router.push(`/${lang}/${country}`)
      //dispatch(closeDialog())
      router.back();
    };

    let listsections



   

    let arrayEditions = []
    let arrayDates = []

    
      //console.log('aldito entre porque hay fecha', stringDateState)
      //recorro las ediciones santiago, nuevamujer ..
      data.cities.map((city, index) => {
        //entre a santiago
        if(city.allEditions.length > 0) {
          const cityslug = city.cityslug
          const cityname = city.cityname
          const vertical = city.vertical
          //console.log('aldito --',city.allEditions.length, city.cityslug)

          //fechas con ediciones vigentes enviadas a redux para leerlas en el componente SearchDate
          city.allEditions.map((currentEdition)=> {
            let date = currentEdition.date
            let arrayDate = date.split('-')
            let formatDate = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
            //let realdate = new Date(date)
            //let formatDate = realdate.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })
            //console.log('xcvbb', date, formatDate)
            arrayDates.push(formatDate)
          })

          //console.log('los arrayDates', arrayDates)

          if(stringDateState){
            city.allEditions.map((currentEdition, i) => {
              let date = currentEdition.date.replaceAll('-','/')
              
              //console.log('aldito ---', date ,stringDateState )
              if(date == stringDateState) {
                //console.log('alditoo encontre la fecha_________')
                arrayEditions.push(
                  {
                    cityslug: cityslug,
                    cityname: cityname,
                    date: date,
                    pages: currentEdition.pages,
                    newcode: currentEdition.newcode,
                    width: currentEdition.width,
                    height: currentEdition.height,
                    inserts: currentEdition.inserts,
                    recortes: currentEdition.recortes,
                  }
                )
                
              }
            })

          } else {
            
            

            const lastEdition = city.allEditions[0]
            let date = lastEdition.date.replaceAll('-','/')
            arrayEditions.push(
              {
                cityslug: cityslug,
                cityname: cityname,
                date: date,
                pages: lastEdition.pages,
                newcode: lastEdition.newcode,
                width: lastEdition.width,
                height: lastEdition.height,
                inserts: lastEdition.inserts,
                recortes: lastEdition.recortes,
              }
            )

          }
          
        }
      })
     
      //console.log('aldito arrayDates', arrayDates)

      dispatch(updateEnableDatesSlice(arrayDates))

     

    const newlistsections = arrayEditions.map((edition, i)=>{
      const pages = edition.pages
      const cityslug = edition.cityslug
      const cityname = edition.cityname
      const date = edition.date
      const newcode = edition.newcode
      const width = edition.width
      const height = edition.height
      const recortes = edition.recortes

      let numberedition = i

      

      

      //console.log('height edition', edition, height, width/12)

      const dataSlide = () => {
        let data = []
        for (let i = 0; i < pages; i++) {
          data.push(
            <>
                <Box key={`section-${i}`}>
                        <Image src={`https://rm.metrolatam.com/${date}/${cityslug}/thumb_${i+1}-${newcode}.webp`} 
                        layout="responsive"
                        width={width / 12}
                        height={height / 12}
                        alt={cityslug}
                        //priority = {i <= 2 ? 'true': 'false'}
                        onError={() => setImageError(true)}
                          />
                   
                </Box>
            </>
          )
        }
        //console.log('ardo dataslide:', data)
        return data
      }

      const bigimages = () => {
        return (
          {
            link: `google.com`,
            recortes: recortes != null && recortes.length > 0 ? recortes : null,
            width: width,
            height: height,
            newcode: newcode,
            countpages: pages,
          }
        ) 
      }

      if(i == 0 && routeEdition ==  cityslug && dataImages == null){
        //console.log('encontre', i, routeEdition, cityslug, dataImages, bigimages())
          setDataImages(bigimages())
      }

      const searchEditions = (index, bigimages) => {
        setOpenModal(true)
        setDataImages(bigimages)
      }
    

      const handledata =(i, dataimages)=> {
        setDataImages(dataimages)
        if(landingArchivo) {
            router.push(`/${lang}/${country}/${cityslug}/${date.replaceAll('/', '')}/${i+1}`)
        } else if (landingEdition) 
        {
            router.push(`/${lang}/${country}/${cityslug}/${date.replaceAll('/', '')}/${i+1}`)
        }else {
            router.push(`/${lang}/${country}/${cityslug}/${date.replaceAll('/', '')}/${i+1}`)
        }
      }

     

      return(
        <SectionBox key={`${cityslug}-${i}`} >
          <HeadSection datesection={date} country={country} titleSection={cityname} slug={cityslug} colorBullet={"#ccc"} linksite={data.website} routervalues={routervalues}/>
          {cityslug &&  
          <SlideCarouselCountry 
          widthItem={width / 12} 
          content={dataSlide()} 
          bigimages={bigimages()} 
          data={edition}
          handledata={handledata}
          searchEditions={searchEditions}
          />
          }
        </SectionBox>
      )
    }) 

 





  return (
    <>
      <HeadSeo
          title={country ? `ReadMetro - ${country}` :'Readmetro'}
          description={`Description country`}
          canonicalUrl={siteMetadata.siteUrl}
          ogTwitterImage={siteMetadata.siteLogoSquare}
          ogType={"article"}
      />

      <Suscription />
     

 
        {data ? newlistsections : 'Cargando'}
     
        
    </>
  )
}



export async function getServerSideProps({ params }) {

  //https://api.readmetro.com/chile/mujeres/full.json


  // Fetch data from external API
  const res = await fetch(`https://api.readmetro.com/${params.country}/index.json`)
  //const res = await fetch(`https://api.readmetro.com/${params.country[0]}/${params.country[1]}/full.json`)
  const data = await res.json()


  // Pass data to the page via props
  return { props: {
    data
  }}
}










export default CountryTemplate