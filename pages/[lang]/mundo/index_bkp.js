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

export default function Home({data}) {

  const originalData = typeof(data[0]) != "undefined" ?  data[0] :  data;

  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch()

  const langData = useSelector(state => state.lang.dataCurrentLang)
  const langCurrent = useSelector(state => state.lang.currentLang)

  const triggerAnchor = useSelector(state => state.anchorsection.trigger)

  const refSection = useRef([])

  const listSections = data.map((item)=>{
  return item.countryname
  })


  

  

    const listCountry = data.map((item, index) => {

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
                      
                      {/* <Box sx={{display:'flex', position: 'absolute', bottom: '19px', left: '19px'}}>
                          <Box css={slideCSS.counter}>
                              {i}
                          </Box>
                      </Box> */}
                      
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
      dispatch(updateAnchorsectionSlice(listSections))
      handleAnchor(triggerAnchor)
      },[triggerAnchor, listSections])

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
    {listCountry}
    </>
      
  )
}

  export async function getServerSideProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://api.readmetro.com/country.json');
    const data = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
    }
  }
