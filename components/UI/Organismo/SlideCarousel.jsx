import React from 'react';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import Slide from '@mui/material/Slide';



export default function SlideCarousel(props){

    const slideCSS = {
        wrapslide: css({
            width: '100%',
        }),
        wrap: css({
            display: 'flex',
            overflowX: 'scroll',
            overflowY: 'hidden',
            padding: '0 15px',
            transition: 'all 1s ease',
            '-webkit-overflow-scrolling': 'touch',
            'scroll-snap-type': 'x mandatory',
            'scroll-padding': '0 0 0 0',
            'scroll-behavior': 'smooth'
        }),
        slidepost: (theme) => css({
            width: '250px',
            height: '250px',
            
            [theme.breakpoints.up('xs')]: {
                flex: '0 0 40vw',
                'scroll-snap-align': 'center none',
            },
            [theme.breakpoints.up('md')]: {
                flex: '0 0 30vw',
                'scroll-snap-align': 'left none',
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
    
    return (
        <div css={slideCSS.wrapslide}>

        
        <Slide onScroll={listenerScroll} direction="up" in={true} mountOnEnter unmountOnExit>
        <div css={slideCSS.wrap}>
            
            
                <div css={slideCSS.slidepost}>
                    <Box  >
                    <h3>slide 1</h3>
                    </Box>
                </div>
                <div css={slideCSS.slidepost}>
                    <Box >
                    <h3>slide 2</h3>
                    </Box>
                </div>
                <div css={slideCSS.slidepost}>
                    <Box  >
                    <h3>slide 3</h3>
                    </Box>
                </div>
                <div css={slideCSS.slidepost}>
                    <Box  >
                    <h3>slide 4</h3>
                    </Box>
                </div>
                <div css={slideCSS.slidepost}>
                    <Box  >
                    <h3>slide 5</h3>
                    </Box>
                </div>
                <div css={slideCSS.slidepost}>
                    <Box  >
                    <h3>slide 6</h3>
                    </Box>
                </div>
                <div css={slideCSS.slidepost}>
                    <Box >
                    <h3>slide 7</h3>
                    </Box>
                </div>
                
            
    </div>
    </Slide>
    </div>
    )
}