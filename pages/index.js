import { useState, useEffect, useRef, useCallback } from "react";
import Layout from '@/components/Layout/layout'
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Image from 'next/image';
import fallback from '@/public/img/fallback.jpg'





export default function Home({data}) {

  const [imageError, setImageError] = useState(false);
  

    const listCountry = data.map((item, index) => {

        //console.log('valor item desde el index:', item.cities)

        const dataSlidePost = item.cities.map((item, i) => {
          
          const date = item.allEditions  && item.allEditions[0] && item.allEditions[0].date ? item.allEditions[0].date : null;
          const fecha = date != null ? date.replaceAll("-","/") : null;
          let foto = null
          if(fecha) {
              foto = `https://rm.metrolatam.com/${fecha}/${item.cityslug}/thumb_1-${item.allEditions[0].newcode}.webp`
          }
          // const myLoader = ({ src, width, quality }) => {
          //     return `${foto}?w=${200}&q=${quality || 70}`
          //   }
          return (
              //item slide homepage
            
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
              
              )
          })
      
        return(
        
        <SectionBox key={`sectionbox-${index}`}>
          <HeadSection titleSection={item.countryname} slug={item.countryslug} linksite={item.website} linkedition  
          colorBullet={'green'} 
          data={item}
          pretext={'Hoy en: '}
          />

          <SlideCarouselCountry citySlug={item.countryslug} widthItem={250} content={dataSlidePost} optionsbtnsoff goeditionon/>

        </SectionBox>)


        });

  return (
    <>
    {listCountry}
    </>
     
        
      
  )
}

  export async function getStaticProps() {
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
