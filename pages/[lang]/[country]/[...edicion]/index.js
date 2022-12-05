import React from 'react';
import { useState,  useEffect, useRef } from "react";
import Image from 'next/image';
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import Dialogmodal from '@/components/UI/Molecula/Dialogmodal'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import { useRouter } from 'next/router'
import {  updateEnableDatesSlice } from '@/redux/features/date/dateSlice'
import AnchorSection from '@/components/UI/Molecula/AnchorSection'

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
// import CloseIcon from '@mui/icons-material/Close';
// import Link from 'next/link';

import Skeleton from '@mui/material/Skeleton';
import {updateCurrentPlay} from '@/redux/features/audioplayer/audioplayerSlice'
import Suscription from '@/components/UI/Organismo/Suscription';
import Breadcumb from '@/components/UI/Molecula/Breadcumb'
import HeadSectionCenter from '@/components/UI/Molecula/headSectionCenter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function EdicionTemplate({data}) {

  const originalData = typeof(data[0]) != "undefined" ?  data[0] :  data;

  data = data[0] == undefined ? data : data[0].cities[0]

  const langData = useSelector(state => state.lang.dataCurrentLang)
  const langCurrent = useSelector(state => state.lang.currentLang)


  //console.log('data del data', data, data.allEditions)

  //return false

  const scrollRef = useRef(null)

  const router = useRouter()

  const [dataImages,setDataImages] = useState(null)


  const lang = router.query.lang ? router.query.lang : null
  const country = router.query.country ? router.query.country : null
  const city = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  const routeEdition = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
  const routedate = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] != 'archivo' ? router.query.edicion[1] : null
  const page = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null

  // const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false
  // const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] == undefined ? true : false

  //return false
  //const {slug} = router.query || []
  //const [lang, country, city, edition, page] = slug
  const routervalues = { lang: lang, country: country, city:city, edition:routeEdition, page:page}
  //const widthItem = 250
  //const [imageError, setImageError] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const [counterShow, setCounterShow] = useState(10)
  //const [noData,setNoData] = useState('')







  const dispatch = useDispatch();

  // const dialogImagesArrayState = useSelector(state => state.dialog.imagesvalues.arrayimages)
  // const dialogDatesState = useSelector(state => state.dialog.imagesvalues)



  // const handleCloseModal = () => {
  //   setOpenModal(false)
  // };


    // const handleOpenModal = () => {
    //   setOpenModal(true)
    // };


    const handleBackModal = () => {
      //setDataImages(null)
      console.log('window.history.state',window.history.state, window.history, window.history.length)
      if(window.history.length > 2){
        router.back()
      } else {

        router.push(`/${langCurrent}/${country}/`)

      }
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

      if(arrayDates.length == 0){
        data.allEditions.map((currentEdition, i)=> {
          let date = currentEdition.date
          let arrayDate = date.split('-')
          let formatDate = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
            arrayDates.push(formatDate)
        })

      }


      dispatch(updateEnableDatesSlice(arrayDates))

      const cityslug = data.cityslug
      const cityname = data.cityname
      //const vertical = data.vertical


      data.allEditions.map((currentEdition, i) => {
        let date = currentEdition.date.replaceAll('-','/')

        if(i < counterShow){
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


    const searchEditions = (index, bigimages) => {
      //setOpenModal(true)
      setDataImages(bigimages)
    }

    const handledata =(i, dataimages)=> {
      setOpenModal(true)
      setDataImages(dataimages)
      router.push(`/${langCurrent}/${country}/${cityslug}/${date.replaceAll('/', '')}/${i+1}`)

    }

    let enterDate

    //console.log('arrayEditions>', arrayEditions)

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


      function titleMonth(enterMonth){

        let currentMonth = 'no month'

        //console.log('month', String(date).slice(0,7) , enterMonth, String(enterMonth).slice(0,7) )


        if(String(date).slice(0,7) != String(enterMonth).slice(0,7)){
          let splitDate = date.split('/')
          enterDate = date
          switch (String(splitDate[1])) {
            case '01':
              currentMonth = langData.listWords.months.january + " " + String(enterMonth).slice(0,4)
              break;
              case '02':
                currentMonth = langData.listWords.months.february + " "+ String(enterMonth).slice(0,4)
                break;
                case '03':
                  currentMonth = langData.listWords.months.march + " "+ String(enterMonth).slice(0,4)
                  break;
                  case '04':
                    currentMonth = langData.listWords.months.april + " "+ String(enterMonth).slice(0,4)
                    break;
                    case '05':
                      currentMonth = langData.listWords.months.may + " "+ String(enterMonth).slice(0,4)
                      break;
                      case '06':
                        currentMonth = langData.listWords.months.june + " "+ String(enterMonth).slice(0,4)
                        break;
                        case '07':
                          currentMonth = langData.listWords.months.july + " "+ String(enterMonth).slice(0,4)
                          break;
                          case '08':
                            currentMonth = langData.listWords.months.august + " "+ String(enterMonth).slice(0,4)
                            break;
                            case '09':
                              currentMonth = langData.listWords.months.september + " "+ String(enterMonth).slice(0,4)
                              break;
                              case '10':
                                currentMonth = langData.listWords.months.octuber + " "+ String(enterMonth).slice(0,4)
                                break;
                                case '11':
                                  currentMonth = langData.listWords.months.november + " "+ String(enterMonth).slice(0,4)
                                  break;
                                  case '12':
                                  currentMonth = langData.listWords.months.december + " "+ String(enterMonth).slice(0,4)
                                  break;
            default:
              currentMonth = "No Month"
              break;
          }

        } else {
          currentMonth = null
        }

    return currentMonth

      }



      const month = titleMonth(enterDate)

      return(
        <>

        {month != null && i > 0 && <HeadSectionCenter title={month} />}

        <Box >
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

        </Box>




        </>
      )


    })

    const scrolltoPosition = (itemsRef) => {
      console.log('itemsRef', itemsRef.current, page)
      if (itemsRef && itemsRef.current) {
        itemsRef.current[page].scrollIntoView( { behavior: 'smooth', block: 'start' } );
      } else {
        console.log("div has NOT been mounted...");
      }
    }








    useEffect(()=>{
      if(page != null && dataImages !== null){
        setOpenModal(true)
      } else {
        setOpenModal(false)
      }
    }, [dataImages, page, routedate, openModal])

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


      <Suscription data={originalData}  />

      <Breadcumb router={router} />


        {data ? newlistsections : 'Cargando'}

        <Box sx={{display:'flex', justifyContent:'center', pb: '4rem'}}>
          {routedate ? <Button variant="outlined" onClick={()=>router.push(`/${lang}/${country}/${cityslug}`)}>{langData.listWords.bottons.goLastEditions}</Button>
          :<Button variant="outlined" onClick={()=>setCounterShow(counterShow + 10)}>{langData.listWords.bottons.loadEditions}</Button>
          }

        </Box>

        <Dialogmodal openModal={openModal} onCloseModal={handleBackModal}  >
          <Box  ref={scrollRef} >
            <Box sx={{display:'flex', p:'.5rem', justifyContent: 'space-between', position: 'sticky',
                top: '0px',
                width: '100%',
                zIndex: '999',
                background: '#fff',
                boxShadow: '0 4px 10px #5c5c5c',
                }}  >
                <Button  variant="outlined" size="small" startIcon={<ArrowBackIcon />} onClick={handleBackModal}>
                    {langData.listWords.bottons.back}
                </Button>
                <Box sx={{display: 'flex'}}>
                  <Button variant="outlined"  size="small" endIcon={<ShareIcon />} sx={{mr:'.5rem'}}>
                    {langData.listWords.bottons.share}
                  </Button>
                  <a href={`https://rm.metrolatam.com/pdf/${formatdatePdf()}/${routedate}_${routeEdition}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer">
                    <Button  variant="outlined"  size="small" endIcon={<PictureAsPdfIcon />}>
                      {langData.listWords.bottons.download}
                    </Button>
                  </a>
                </Box>
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
  console.log('les paramszzz', params.edicion, params.edicion[0], params.edicion[1], params.edicion[2])

  let res = ""
  if(params.edicion[0] && params.edicion[1] && params.edicion[1] != 'archivo') {
    const YYYY = params.edicion[1].slice(0,4)
    const MM = params.edicion[1].slice(4,6)
    const DD = params.edicion[1].slice(6,8)
    const formatDate = `${YYYY}-${MM}-${DD}`
    res = await fetch(`https://pdfserv2.readmetro.com/readmetro.php?country=${params.country}&editions=${params.edicion[0]}&date=${formatDate}`)

  } else {
    res = await fetch(`https://api.readmetro.com/${params.country}/${params.edicion[0]}/full.json`)

  }

  let data = await res.json()

    // Pass data to the page via props
    return { props: {
      data
    }}
  //const res = await fetch(`https://api.readmetro.com/${params.archivo}/index.json`)
  //const res = await fetch(`https://api.readmetro.com/${params.country}/${params.edicion[0]}/full.json`)
  //const res = await fetch(`https://api.readmetro.com/${params.country}/${params.edicion[0]}/full.json`)

}










export default EdicionTemplate
