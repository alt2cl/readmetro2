import React from 'react';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import Slide from '@mui/material/Slide';
import Image from 'next/image';



export default function SlideCarousel(props){

    const {cities} = props
    //https://rm.metrolatam.com/2022/08/10/metro-sao-paulo/thumb_1-0c13345a768dec6623a4ab663a980c84.jpg
    //const urlimagen = `https://rm.metrolatam.com/${data.allEditions[0].date}/${data.allEditions[0].date}`

    console.log('data>', cities)

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
            height: '250px',
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

          console.log('scroll event', childElements.lenght, scrollLeftElement)
      
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
        const fecha = date != null ? date.replaceAll("-","/") : null
        return (
            <div css={slideCSS.slidepost} key={item.cityname}>
                <Box>
                    {fecha != null ? 
                         <Image src={`https://rm.metrolatam.com/${fecha}/${item.cityslug}/thumb_1-${item.allEditions[0].newcode}.jpg`} width='300' height="350" />
                    : null}
                
                <h6>{item.cityname}</h6>
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