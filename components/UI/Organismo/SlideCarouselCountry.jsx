import React from 'react';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import Slide from '@mui/material/Slide';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { shadows } from '@mui/system';
import theme from '@/src/theme';



export default function SlideCarouselCountry(props){

    const {cities, todayEdition, slug} = props

    const slideCSS = {
        wrapslide: css({
            width: '100%',
        }),
        wrap: css({
            display: 'flex',
            overflowX: 'scroll',
            overflowY: 'hidden',
            padding: '0px',
            transition: 'all 1s ease',
            '-webkit-overflow-scrolling': 'touch',
            'scroll-snap-type': 'x mandatory',
            'scroll-padding': '0 0 0 0',
            // 'scroll-behavior': 'smooth'
        }),
        slidepost: (theme) => css({
            width: '250px',
            height: '350px',
            overflow: 'hidden',
            'scroll-snap-align': 'center',
            
            [theme.breakpoints.up('xs')]: {
                flex: '0 0 250px',
                
            },
            [theme.breakpoints.up('md')]: {
                flex: '0 0 300px',
            }
            
    
        })
    
    }

    function listenerScroll(e){
        
          let element = e.target;
          let childElements = element.childNodes;
          let scrollLeftElement = element.scrollLeft;
          let anchoventana = window.innerWidth

        //   console.log('scroll event', childElements.lenght, scrollLeftElement)
      
          //element.clearTimeout( isScrolling );
      
          // isScrolling = setTimeout(function() {
      
      
          //     if(scrollLeftElement < anchoventana - 100){
          //         removeClass('current',childElements);
          //         addClass('current', element.childNodes[0])
          //         //element.childNodes[0].className = element.childNodes[1].className + ' ' +  'current'
      
          //     } else if (scrollLeftElement > ((anchoventana * 1) - 100) && scrollLeftElement < ((anchoventana * 2) - 101)) {
          //         removeClass('current',childElements);
          //         addClass('current', element.childNodes[1])
      
          //     } else if (scrollLeftElement > ((anchoventana * 2) - 100) && scrollLeftElement < ((anchoventana * 3) - 101)) {
          //         removeClass('current',childElements);
          //         addClass('current', element.childNodes[2])
          //     } else if (scrollLeftElement > ((anchoventana * 3) - 100) && scrollLeftElement < ((anchoventana * 4) - 101)) {
          //         removeClass('current',childElements);
          //         addClass('current', element.childNodes[3])
          //     } else if (scrollLeftElement > ((anchoventana * 4) - 100) && scrollLeftElement < ((anchoventana * 5) - 101)) {
          //         removeClass('current',childElements);
          //         addClass('current', element.childNodes[4])
          //     } else if (scrollLeftElement > ((anchoventana * 5) - 100) && scrollLeftElement < ((anchoventana * 6) - 101)) {
          //         removeClass('current',childElements);
          //         addClass('current', element.childNodes[5])
          //     } else if (scrollLeftElement > ((anchoventana * 6) - 100) && scrollLeftElement < ((anchoventana * 7) - 101)) {
          //         removeClass('current',childElements);
          //         addClass('current', element.childNodes[6])
          //     }
      
          //     // Run the callback
      
      
      
          // }, 200);
      
      
      
      
      }

      let dataSlidePost = ""
      let dataSlidePostCountry = ""

      if(todayEdition != null){
        
        const cantPages = todayEdition.pages;
        const imagenes = [];
        const date = todayEdition.date ? todayEdition.date : null;
        const fecha = date != null ? date.replaceAll("-","/") : null;

        for (let index = 1; index < cantPages; index++) {
            imagenes.push(
                {
                foto:`https://rm.metrolatam.com/${fecha}/${slug}/thumb_${index}-${todayEdition.newcode}.webp`,
                link: `google.com`
                }

            )
            
        }

        dataSlidePostCountry = imagenes.map((item, i) => {

            return (
                <div css={slideCSS.slidepost} key={item.cityname}>
                <Box sx={{ boxShadow: 3 }}>
                    {imagenes != null ? 
                         <Image src={item.foto} 
                         layout="responsive"
                         width={200}
                         height={250}
                         alt={item.link}
                         priority = {i == 0 ? 'true': 'false'}
                         
                          />
                    : null}
                </Box>
            </div>
            )
        })


      } else {
        dataSlidePost = cities.map((item) => {
            const date = item.allEditions  && item.allEditions[0] && item.allEditions[0].date ? item.allEditions[0].date : null;
            const fecha = date != null ? date.replaceAll("-","/") : null;
            let foto = null
            if(fecha) {
                foto = `https://rm.metrolatam.com/${fecha}/${item.cityslug}/thumb_1-${item.allEditions[0].newcode}.webp`
            }
            const myLoader = ({ src, width, quality }) => {
                return `${foto}?w=${200}&q=${quality || 70}`
              }
            return (
                <Box css={slideCSS.slidepost} key={item.cityname} >
                    <Box sx={{mr: 3,p: 1, border: '1px solid #f1ecec', borderRadius:'5px'}}>
                        <Typography 
                            variant="button"
                            noWrap
                            component="h6"
                             >
                        {item.cityname} 
                        </Typography>
                        {fecha && foto != null ? 
                             <Image src={foto} 
                             loader={myLoader}
                             layout="responsive"
                             width={200}
                             height={250}
                             alt={item.cityname}
                             sx={{
                                boxShadow: 3
                             }}
                              />
                        : null}
                        
                    </Box>
                </Box>
                )
            })
      }


    
    return (
        <div css={slideCSS.wrapslide}>
            <Slide onScroll={listenerScroll} direction="right" in={true} mountOnEnter unmountOnExit>
                <div css={slideCSS.wrap}>
                        {todayEdition != null ? dataSlidePostCountry : dataSlidePost}
                </div>
            </Slide>
            
        </div>
    )
}