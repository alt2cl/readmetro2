import { useState, useRef, useEffect } from "react";
// import Layout from '@/components/Layout/layout'
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Image from 'next/image';
import fallback from '@/public/img/fallback.jpg'
//import Link from '@/src/Link';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import HeadSeo from '@/components/Layout/headSeo'
import siteMetadata from '@/src/siteMetadata'
import Suscription from "@/components/UI/Organismo/Suscription";
import IntroText from "@/components/UI/Molecula/IntroText";
import { useDispatch,useSelector } from 'react-redux'
import { updateAnchorsectionSlice } from '@/redux/features/anchorsection/anchorsectionSlice';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router'


export default function Home({data}) {

  const router = useRouter()

  

  const originalData = typeof(data[0]) != "undefined" ?  data[0] :  data;

  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch()

  const langData = useSelector(state => state.lang.dataCurrentLang)
  const langCurrent = useSelector(state => state.lang.currentLang)
  const dateCurrent = useSelector(state => state.date.stringDate)

  

  const triggerAnchor = useSelector(state => state.anchorsection.trigger)

  const refSection = useRef([])

  const listSections = data.map((item)=>{
  return item.countryname
  })

  console.log('dateCurrent:',typeof dateCurrent)
  let fecha1 = "20230111"

  if (dateCurrent) {
    const arrayDate = dateCurrent.split('/')
    const year= arrayDate[2]
    const month= arrayDate[1]
    const day= arrayDate[0]
    fecha1 =  year+month+day

    console.log('dateCurrent 2:',dateCurrent, fecha1)
    
  }

  

  



  const listCountry = data.map((item, index)=>{
    const citie = item.cities[0]
    const allEdition = citie.allEditions[0]
    console.log('allEdition', item.countryname, allEdition ,item  )
    // const date = item.cities[0].allEditions[0].date ;
    // const fecha = date != null ? date.replaceAll("-","/") : null;
    // let foto = null
    // if(fecha) {
    //     foto = `https://rm.metrolatam.com/${fecha}/${item.cityslug}/thumb_1-${item.cities[0].allEditions[0].newcode}.webp`
    // }

    let fecha 

    if(allEdition) {
      fecha = allEdition.date.replaceAll("-","/")
    }

    return(
    
      <Grid item xs={6} md={2} key={'grid-'+item.countryname}>
        {item.countryname}
          {allEdition ?
            <Image src={`https://rm.metrolatam.com/${fecha}/${citie.cityslug}/thumb_1-${allEdition.newcode}.webp`} 
            layout="responsive"
            width={fallback.width}
            height={fallback.height}
            alt={'error'}
            /> 
          : <Image src={fallback.src} 
            layout="responsive"
            width={fallback.width}
            height={fallback.height}
            alt={'error'}
            />
          }
       
      </Grid>
     
    )

  })

  

    const listCountry_ = data.map((item, index) => {

        const countryslug = item.countryslug
        const dataSlidePost = item.cities.map((item, i) => {
          const date = item.allEditions  && item.allEditions[0] && item.allEditions[0].date ? item.allEditions[0].date : null;
          const fecha = date != null ? date.replaceAll("-","/") : null;
          let foto = null
          if(fecha) {
              foto = `https://rm.metrolatam.com/${fecha}/${item.cityslug}/thumb_1-${item.allEditions[0].newcode}.webp`
          }

          return (
              <>    
                       
                  <Box sx={{  borderRadius:'5px', background: 'white' }} key={`listCitys-${i}`}>
                      <Typography 
                          variant="button"
                          noWrap
                          component="h6"
                          sx={{pl: '1rem', pt:'0.5rem'}}
                           >
                      {item.cityname} 
                      </Typography>
                      
                      {fecha != null ? 
                           <Image src={imageError ? fallback.blurDataURL : foto} 
                           layout="responsive"
                           width={200}
                           height={250}
                           alt={item.cityname}
                           sx={{
                              boxShadow: 3
                           }}
                           onError={() => setImageError(true)}
                            />
                      : <Image src={fallback.src} 
                          layout="responsive"
                          width={fallback.width}
                          height={fallback.height}
                          alt={'error'}
                          />
                          }
               
                      
                  </Box>

                  <Box  sx={{position: 'absolute',bottom: '4px',left: '4px',right: '4px',display:'flex',justifyContent:'center', mb:'1rem'}}>
                      <Link href={'/'+langCurrent+'/'+countryslug+'/'+item.cityslug}>
                      <Button variant="contained" endIcon={<ArrowForwardOutlinedIcon />}>
                      {langData.listWords.headSection.goEdition}
                      </Button>
                      </Link>
                  </Box>

                  </>
              
              )
          })


      
        return(
        <Box ref={el => refSection.current[index] = el} key={`sectionbox-${index}`}>
          <SectionBox >
            <HeadSection titleSection={item.countryname} slug={item.countryslug} linksite={item.website} linkedition  
            colorBullet={'green'} 
            data={item}
            pretext={langData.listWords.headSection.lastIn}
            />
            <SlideCarouselCountry 
            widthItem={250} 
            content={dataSlidePost} 
            citySlug={item.countryslug} 
            optionsbtnsoff 
            goeditionon
            />
          </SectionBox>
        </Box>
        )


        });

    const handleAnchor = (i) => {
      if (triggerAnchor != null && refSection && refSection.current) {
        refSection.current[i].scrollIntoView( { behavior: 'smooth', block: 'center' } );
      } else {
        console.log("div has NOT been mounted...");
      }
    }

    useEffect(()=>{
      
      if (!router.query._date) {
        router.push(`/${router.query.lang}/mundo?_date=${fecha1}`)
        console.log('router query',router.query)
      }
      
      dispatch(updateAnchorsectionSlice(listSections))
      handleAnchor(triggerAnchor)
      },[triggerAnchor, listSections, router])

  return (
    <>
    <HeadSeo
        title={`Index Your Awesome Title Here`}
        description={`Your description goes here on every page. Keep character count between 140 to 160 characters`}
        canonicalUrl={siteMetadata.siteUrl}
        ogTwitterImage={siteMetadata.siteLogoSquare}
        ogType={"website"}
    /> 
    <IntroText />
    <Suscription data={originalData} />
    <Grid container spacing={2}>
    {listCountry}
    </Grid>
    
    </>
      
  )
}

  export async function getServerSideProps({params, query}) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library

    let res= null
    const fecha = new Date().toLocaleString(('en-CA'), {year: 'numeric', month: '2-digit', day: '2-digit'}).toString()

   
    if(query._date){
      const splitDate = query._date.split('')
      const y = splitDate.slice(0,4).toString().replaceAll(',','')
      const m = splitDate.slice(4,6).toString().replaceAll(',','')
      const d = splitDate.slice(6,8).toString().replaceAll(',','')
      res = await fetch(`https://pdfserv2.readmetro.com/readmetro.php?date=${y+'-'+m+'-'+d}`);
    } else {
      res = await fetch(`https://pdfserv2.readmetro.com/readmetro.php?date=${fecha}`);
    }


    //const date = splitDate[0]
    
    
    const data = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
    }
  }
