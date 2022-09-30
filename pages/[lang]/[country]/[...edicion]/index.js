import React from 'react';
import { useState,  useEffect } from "react";
import Image from 'next/image';
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import Dialogmodal from '@/components/UI/Molecula/Dialogmodal'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import { useRouter } from 'next/router'
import {  updateEnableDatesSlice } from '@/redux/features/date/dateSlice'

import { useSelector, useDispatch } from 'react-redux'
import NewspaperBox from '@/components/UI/Organismo/NewspaperBox'
import Box from '@mui/material/Box';
import HeadSeo from '@/components/Layout/headSeo'
import siteMetadata from '@/src/siteMetadata'
import fallback from '@/public/img/fallback.jpg'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
//import Link from 'next/link'
//import { updateDialogSlice, closeDialog } from '@/redux/features/dialog/dialogSlice/'
//import useFormatDate from '@/components/CustomHooks/useFormatDate'
import CloseIcon from '@mui/icons-material/Close';


function EdicionTemplate(props) {

  const data = props.data

  const router = useRouter()

  console.log('la data___',data, router)

   
//return false
  
  // const lang = router.query.lang
  // const country = router.query.country
  // const city = router.query.edicion[0]
  // const edition = router.query.edicion[0]
  // const date = router.query.edicion[1] != 'archive' ? router.query.edicion[1] : null
  // const page = router.query.edicion[2]


  // const lang = router.query.lang ? router.query.lang : null
  //   const country = router.query.country ? router.query.country : null
  //   const city = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  //   const edition = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  //   const date = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] != 'archivo' ? router.query.edicion[1] : null
  //   const page = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null

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

  //return false
  //const {slug} = router.query || []
  //const [lang, country, city, edition, page] = slug
  const routervalues = { lang: lang, country: country, city:city, edition:edition, page:page}
  //const widthItem = 250
  //const [imageError, setImageError] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const [titlehead, setTitleHead] = useState('')

  useEffect(()=>{
    if(page != null){
      setOpenModal(true)
    } 
  })



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
  const starDateState = useSelector(state => state.date.starDate)
  //console.log('dialogImagesArrayState', dialogImagesArrayState)
  //console.log('estado openModal', dialogState)

  //console.log('starDateState', typeof starDateState)
  


  function getFormattedDate(date, separator, format) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    if(format == 'YYYY/MM/DD') {
      return year + separator + month + separator + day;
    }
    if(format == 'DD/MM/YYYY') {
      return day + separator + month + separator + year;
    }
  
    
  }

const currentDate = getFormattedDate(starDateState, '/', 'YYYY/MM/DD')





    const handleCloseModal = () => {
      //console.log('router values: click modal')
      //router.push(`/${lang}/${country}`)
      //dispatch(closeDialog())
      router.back();
    };


    let arrayEditions = []
    let arrayDates = []
    let oldArrayEditions = []

    //console.log('dataalleditions',data.allEditions )


    //return false

    //fechas con ediciones vigentes enviadas a redux para leerlas en el componente SearchDate
    data.allEditions.map((currentEdition)=> {
      let date = currentEdition.date
      let arrayDate = date.split('-')
      let formatDate = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
      //let realdate = new Date(date)
      //let formatDate = realdate.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })
      //console.log('xcvbb', date, formatDate)
      arrayDates.push(formatDate)
    })

    const cityslug = data.cityslug
    const cityname = data.cityname
    const vertical = data.vertical

    


    //if(stringDateState || landingArchivo ){//si existe una fecha llena con esto

      //console.log('stringDateState: con fecha' )
      data.allEditions.map((currentEdition, i) => {
        let date = currentEdition.date.replaceAll('-','/')
        
        //if(date == stringDateState || landingArchivo) {
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
          
        //}
      })

    //} 
    // else {// si no existe una fecha llena con esto

    //   console.log('stringDateState: sin fecha', stringDateState )
   
    //   const lastEdition = data.allEditions[0]
    //   let date = lastEdition.date.replaceAll('-','/')
    //   arrayEditions.push(
    //     {
    //       cityslug: cityslug,
    //       cityname: cityname,
    //       date: date,
    //       pages: lastEdition.pages,
    //       newcode: lastEdition.newcode,
    //       width: lastEdition.width,
    //       height: lastEdition.height,
    //       inserts: lastEdition.inserts,
    //       recortes: lastEdition.recortes,
    //     }
    //   )

    // }




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
                        priority = {i <= 2 ? 'true': 'false'}
                        />
                </Box>
            </>
          )
        }
        return data
      }

      const bigimages = () => {
        let data= []
        for (let i = 0; i < pages; i++) {
          data.push(
            {
              foto:`https://rm.metrolatam.com/${date}/${cityslug}/full_${i+1}-${newcode}.webp`,
              fotothumb:`https://rm.metrolatam.com/${date}/${cityslug}/thumb_${i+1}-${newcode}.jpg`,
              link: `google.com`,
              recortes: recortes != null && recortes.length > 0 ? recortes : null,
              width: width,
              height: height,
              }
          )
        }
        //console.log('ardo bigimages:', data)
        return data
      }

     

      return(
        <SectionBox key={cityslug} >
          <HeadSection datesection={date} country={country} titleSection={cityname} slug={cityslug} colorBullet={"#ccc"} linksite={data.website} routervalues={routervalues}/>
          {cityslug &&  
          <SlideCarouselCountry 
          widthItem={width / 12} 
          content={dataSlide()} 
          bigimages={bigimages()} 
          data={edition}
          />
          }
        </SectionBox>
      )
    }) 

 





  return (
    <>
      <HeadSeo
          title={
            page ?  `ReadMetro - Página ${page}. Edición ${edition}. ${city}, ${country}` : 
            page == undefined && edition ? `ReadMetro - Edición ${edition}. ${city}, ${country}` :
            edition == undefined && city ? `ReadMetro - Edición ${city}, ${country}` :
            city == undefined && country ? `ReadMetro - ${country}` :
            'Readmetro'
          }
          description={`Description country`}
          canonicalUrl={siteMetadata.siteUrl}
          ogTwitterImage={siteMetadata.siteLogoSquare}
          ogType={"article"}
      />
     
      {/* <h6>Idioma: {lang}</h6>
      <h6>Pais: {country}</h6>
      <h6>Ciudad: {city}</h6>
      <h6>Edicion: {edition}</h6>
      <h6>Pagina: {page}</h6> */}

      

 
        {data ? newlistsections : 'Cargando'}
     
        <Dialogmodal openModal={openModal} onCloseModal={()=>handleCloseModal()}>
            <Box sx={{display:'flex', p:'.5rem'}}>
              <Button variant="outlined"  size="small" endIcon={<ShareIcon />} sx={{mr:'.5rem'}}>
                Compartir
              </Button>
                <a href={`https://rm.metrolatam.com/pdf/${dialogDatesState.fecha}/${dialogDatesState.fecha.replaceAll('/','')}_${dialogDatesState.edicion}.pdf`}
                target="_blank"
                rel="noopener noreferrer">
                  <Button  variant="outlined"  size="small" endIcon={<PictureAsPdfIcon />}>
                Descargar
              </Button>
             
                </a>
                <Button  variant="outlined" sx={{ml:'.5rem'}}  size="small" endIcon={<CloseIcon />} onClick={()=>handleCloseModal()}>
                Cerrar
              </Button>
            </Box>
            {/* https://rm.metrolatam.com/pdf/2022/09/22/20220922_santiago.pdf */}
            {dialogImagesArrayState.map((item, i)=>(
                <NewspaperBox 
                foto={item.foto} 
                width={item.width  } 
                height={item.height } 
                link={item.link} 
                key={`newspaper-${i}`} 
                pagina={i+1}
                audioContents={item.recortes}
                />
            ))}

        </Dialogmodal>
    </>
  )
}



export async function getServerSideProps({ params }) {

  //https://api.readmetro.com/chile/mujeres/full.json

  // Fetch data from external API
  //const res = await fetch(`https://api.readmetro.com/${params.archivo}/index.json`)
  const res = await fetch(`https://api.readmetro.com/${params.country}/${params.edicion[0]}/index.json`)
  //const res = await fetch(`https://api.readmetro.com/${params.country[0]}/${params.country[1]}/full.json`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: {
    data
  }}
}










export default EdicionTemplate


