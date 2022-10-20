import React from 'react';
import { useState,  useEffect, useRef } from "react";
import Image from 'next/image';
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import Dialogmodal from '@/components/UI/Molecula/Dialogmodal'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import { useRouter } from 'next/router'
import {  updateEnableDatesSlice } from '@/redux/features/date/dateSlice'

import { useSelector, useDispatch } from 'react-redux'
//import NewspaperBox from '@/components/UI/Organismo/NewspaperBox'
import NewsPagesList from '@/components/UI/Organismo/NewsPagesList'

import Box from '@mui/material/Box';
import HeadSeo from '@/components/Layout/headSeo'
import siteMetadata from '@/src/siteMetadata'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
//import Link from 'next/link'
//import { updateDialogSlice, closeDialog } from '@/redux/features/dialog/dialogSlice/'
//import useFormatDate from '@/components/CustomHooks/useFormatDate'
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

import Skeleton from '@mui/material/Skeleton';
import {updateCurrentPlay} from '@/redux/features/audioplayer/audioplayerSlice'
import Suscription from '@/components/UI/Organismo/Suscription';



function EdicionTemplate({data}) {

  const scrollRef = useRef(null)

  const router = useRouter()

  const [dataImages,setDataImages] = useState(null)


  const lang = router.query.lang ? router.query.lang : null
  const country = router.query.country ? router.query.country : null
  const city = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  const routeEdition = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  const routedate = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] != 'archivo' ? router.query.edicion[1] : null
  const page = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null

  const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false
  const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] == undefined ? true : false

  //return false
  //const {slug} = router.query || []
  //const [lang, country, city, edition, page] = slug
  const routervalues = { lang: lang, country: country, city:city, edition:routeEdition, page:page}
  //const widthItem = 250
  //const [imageError, setImageError] = useState(false);
  const [openModal, setOpenModal] = useState(false)






  const dispatch = useDispatch();

  // const dialogImagesArrayState = useSelector(state => state.dialog.imagesvalues.arrayimages)
  // const dialogDatesState = useSelector(state => state.dialog.imagesvalues)






    const handleOpenModal = () => {
      setOpenModal(true)
    };
    const handleCloseModal = () => {
      //setDataImages(null)
      setOpenModal(false)
      dispatch(updateCurrentPlay({
        show: false,
        play: false,
        title: 'Titulo playlist 1',
        index : 1,
        page: 1
    }))
    };


    let arrayEditions = []
    let arrayDates = []
    //let oldArrayEditions = []



      //fechas con ediciones vigentes enviadas a redux para leerlas en el componente SearchDate
      data.allEditions.map((currentEdition)=> {
        let date = currentEdition.date
        let arrayDate = date.split('-')
        let formatDate = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
        arrayDates.push(formatDate)
      })

      dispatch(updateEnableDatesSlice(arrayDates))

      const cityslug = data.cityslug
      const cityname = data.cityname
      const vertical = data.vertical


      data.allEditions.map((currentEdition, i) => {
        let date = currentEdition.date.replaceAll('-','/')

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


      })


    const searchEditions = (index, bigimages) => {
      setOpenModal(true)
      setDataImages(bigimages)
    }

    const handledata =(i, dataimages)=> {
      setOpenModal(true)
      setDataImages(dataimages)
      router.push(`/${lang}/${country}/${cityslug}/${date.replaceAll('/', '')}/${i+1}`)

    }



    const newlistsections = arrayEditions.map((edition, i)=>{
      const pages = edition.pages
      const cityslug = edition.cityslug
      const cityname = edition.cityname
      const date = edition.date
      const newcode = edition.newcode
      const width = edition.width
      const height = edition.height
      const recortes = edition.recortes

      //console.log('ruta newcode', i , newcode)

      let numberedition = i



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
                        />
                </Box>
            </>
          )
        }
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

      if( routeEdition ==  cityslug && dataImages == null && date.replaceAll('/', '') == routedate ){
          setDataImages(bigimages())
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

    const scrolltoPosition = (itemsRef) => {
      console.log('itemsRef', itemsRef.current)
      if (itemsRef && itemsRef.current) {
        itemsRef.current[page].scrollIntoView( { behavior: 'smooth', block: 'start' } );
      } else {
        console.log("div has NOT been mounted...");
      }
    }




    useEffect(()=>{
      if(page != null && dataImages !== null){
        setOpenModal(true)
//        console.log('dataImages open', dataImages)
      } else {
        setOpenModal(false)
      }
    }, [])

    const formatdatePdf = () => {
      let YYYY =""
      let MM =""
      let DD =""
      let formatDate = null
      if(routedate) {
        YYYY = routedate.slice(0,4)
        MM =  routedate.slice(4,6)
        DD =  routedate.slice(6,8)
        formatDate = YYYY+'/'+MM+'/'+DD
      }
      return formatDate
    }


console.log("jano eqiis",data);

  return (
    <>
      <HeadSeo
          title={
            page ?  `ReadMetro - Página ${page}. Edición ${routeEdition}. ${city}, ${country}` :
            page == undefined && routeEdition ? `ReadMetro - Edición ${routeEdition}. ${city}, ${country}` :
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

      <Suscription data={data} />


        {data ? newlistsections : 'Cargando'}

        <Dialogmodal openModal={openModal} onCloseModal={()=>handleCloseModal()}  >
          <Box sx={{  ml:'-5px', width:'calc(100% + 10px)'}} ref={scrollRef} id={"refdialogcontent"} >
          <Box sx={{display:'flex', p:'.5rem', justifyContent: 'space-between'}}  >
              <Box sx={{display: 'flex'}}>
                <Button variant="outlined"  size="small" endIcon={<ShareIcon />} sx={{mr:'.5rem'}}>
                  Compartir
                </Button>
                <a href={`https://rm.metrolatam.com/pdf/${formatdatePdf()}/${routedate}_${routeEdition}.pdf`}
                target="_blank"
                rel="noopener noreferrer">
                  <Button  variant="outlined"  size="small" endIcon={<PictureAsPdfIcon />}>
                    Descargar
                  </Button>
                </a>
              </Box>


              <Link href={`/${lang}/${country}/${routeEdition}/`} passHref>
                <Button  variant="outlined" sx={{ml:'.5rem'}}  size="small" endIcon={<CloseIcon />} onClick={()=>handleCloseModal()}>
                  Cerrar
                </Button>
              </Link>


            </Box>
            {
              page && routedate && dataImages ?
              <NewsPagesList  dataImages={dataImages} date={routedate} edition={routeEdition} page={page} scrolltoPosition={scrolltoPosition}/>
              : <>
              <Skeleton variant="rectangular" width={"calc(100% - 1rem"} height={400} sx={{m:'1rem .5rem'}} />
              <Skeleton variant="rectangular" width={"calc(100% - 1rem"} height={400} sx={{m:'1rem .5rem'}} />
              <Skeleton variant="rectangular" width={"calc(100% - 1rem"} height={400} sx={{m:'1rem .5rem'}} /></>
            }


          </Box>


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
