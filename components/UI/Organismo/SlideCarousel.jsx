import React from 'react';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import Slide from '@mui/material/Slide';
import Image from 'next/image';
import { Typography } from '@mui/material';



export default function SlideCarousel(props){

    const {cities} = props


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
            //'-webkit-overflow-scrolling': 'touch',
            webkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollPadding: '0 0 0 0',
            // 'scroll-behavior': 'smooth'
        }),
        slidepost: (theme) => css({
            width: '250px',
            height: '350px',
            overflow: 'hidden',
            scrollSnapAlign: 'center',
            
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

      const dataSlidePost = cities.map((item) => {
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
            <div css={slideCSS.slidepost} key={item.cityname}>
                <Box>
                    {fecha && foto != null ? 
                         <Image src={foto} 
                         loader={myLoader}
                         layout="responsive"
                         width={200}
                         height={250}
                         alt={item.cityname}
                          />
                    : null}

                    <Typography 
                        variant="h6"
                        noWrap
                        component="h6"
                         >
                    {item.cityname} 
                    </Typography>
           
                </Box>
            </div>
            )

        })
    
    return (
        <div css={slideCSS.wrapslide}>
            <Slide onScroll={listenerScroll} direction="right" in={true} mountOnEnter unmountOnExit>
                <div css={slideCSS.wrap}>
                        {dataSlidePost}
                </div>
            </Slide>
            
        </div>
    )
}