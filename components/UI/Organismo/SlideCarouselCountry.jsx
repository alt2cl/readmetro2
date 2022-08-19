import React from 'react';
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import Slide from '@mui/material/Slide';
import Image from 'next/image';
import { Typography } from '@mui/material';
import fallback from '@/public/img/fallback.jpg'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';



export default function SlideCarouselCountry(props){

    const {cities, todayEdition, slug, widthItem} = props
    const [imageError, setImageError] = useState(false);
    const scrollElement = useRef(null);

    console.log('fallback', fallback.src)

    const handleNext = () => {
        //setChecked((prev) => !prev);
        //scrollElement.current.scrollLeft += 250;
        scrollElement.current.scrollLeft += widthItem

    };

    const handlePrev = () => {
        //setChecked((prev) => !prev);
        scrollElement.current.scrollLeft -= widthItem;
    };

    const slideCSS =  {
        wrapslide: (theme) => css({
            width: 'calc(100% + 30px)',
            marginLeft: '-15px',
            position: 'relative',
            scrollBehavior: 'smooth',
            transition: 'all .5s ease-out',
  
            [theme.breakpoints.up('md')]: {
                padding: '0 20px',
            },
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
            'scroll-behavior': 'smooth',
        }),
        slidepost: (theme) => css({
            width: widthItem ? widthItem+'px' : '250px',
            height: '350px',
            overflow: 'hidden',
            'scroll-snap-align': 'center',
            
            [theme.breakpoints.up('xs')]: {
                flex: widthItem ? '0 0 '+widthItem+'px' : '0 0 250px',
                
            },
            [theme.breakpoints.up('md')]: {
                flex: '0 0 300px',
            }
            
    
        })
    
    }

    const controlCSS = {
        btnSig: (theme) => css({
            background: '#fff',
            position: 'absolute',
            top: '50%',
            right: '0',
            borderRadius: '50%',
            [theme.breakpoints.up('md')]: {
                right: '-30px',
            },
        }),
        btnAnt: (theme) => css({
            background: '#fff',
            position: 'absolute',
            top: '50%',
            left: '0',
            borderRadius: '50%',
            [theme.breakpoints.up('md')]: {
                left: '-30px',
            },
        })
    }

    function addClass(name, element) {
        let classesString;
        classesString = element.className || "";
        if (classesString.indexOf(name) === -1) {
          element.className += " " + name;
        }
      }

    function removeClass(name, arrayElements){

        for (let index = 0; index < arrayElements.length; index++) {
            const el = arrayElements[index];

            if (el.classList.contains(name)) {
                // Has my-class in it
                el.classList.remove(name);
            } else {
                // No my-class :(

            }
        }

    }

    let isScrolling;

    function listenerScroll(e){
        
          let element = e.target;
          let childElements = element.children;
          let scrollLeftElement = element.scrollLeft;
          let anchoventana = window.innerWidth

        console.log('scroll event', scrollLeftElement, anchoventana, childElements[0].offsetWidth, 'ancho total:',childElements.length, childElements.length * 250)
      
        //element.clearTimeout( isScrolling );
        const firstScroll = childElements[0].offsetWidth - ((anchoventana - childElements[0].offsetWidth)/2)
        console.log('firstScroll', firstScroll)
      
          isScrolling = setTimeout(function() {
      
      
              if(scrollLeftElement < firstScroll){
                console.log('scroll event 1')
                  removeClass('current',childElements);
                  addClass('current', childElements[0])
                  //element.childNodes[0].className = element.childNodes[1].className + ' ' +  'current'
      
              } else if (scrollLeftElement > firstScroll && scrollLeftElement < (firstScroll + childElements[0].offsetWidth)) {
                console.log('scroll event 2')
                  removeClass('current',childElements);
                  addClass('current', childElements[1])
      
              } else if (scrollLeftElement > (firstScroll + childElements[0].offsetWidth) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 2)) {
                console.log('scroll event 3')
                  removeClass('current',childElements);
                  addClass('current', childElements[2])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 2)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 3)) {
                console.log('scroll event 4')
                  removeClass('current',childElements);
                  addClass('current', childElements[3])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 3)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 4)) {
                console.log('scroll event 5')
                  removeClass('current',childElements);
                  addClass('current', childElements[4])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 4)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 5)) {
                console.log('scroll event 6')
                  removeClass('current',childElements);
                  addClass('current', childElements[5])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 5)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 6)) {
                console.log('scroll event 7')
                  removeClass('current',childElements);
                  addClass('current', childElements[6])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 6)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 7)) {
                console.log('scroll event 7')
                  removeClass('current',childElements);
                  addClass('current', childElements[7])
              }
              
      
              // Run the callback
      
      
      
          }, 200);
      
      
      
      
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
                //item slide landing country
                <div css={slideCSS.slidepost} key={item.cityname}>
                <Box sx={{ boxShadow: 3, m: 1 }}>
                    {imagenes != null ? 
                         <Image src={imageError ? fallback.src : item.foto} 
                         layout="responsive"
                         width={widthItem}
                         height={300}
                         alt={item.link}
                         priority = {i == 0 ? 'true': 'false'}
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
                //item slide homepage
                <Box css={slideCSS.slidepost} key={item.cityname} >
                    <Box sx={{ml:1 , mr:1,p: 1, border: '1px solid #f1ecec', borderRadius:'5px'}}>
                        <Typography 
                            variant="button"
                            noWrap
                            component="h6"
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
                </Box>
                )
            })
      }


    
    return (
        <div css={slideCSS.wrapslide}>
            <Slide onScroll={listenerScroll} direction="right" in={true} mountOnEnter unmountOnExit ref={scrollElement}>
                <div css={slideCSS.wrap}>
                    {todayEdition != null ? dataSlidePostCountry : dataSlidePost}
                </div>
            </Slide>
            <Box css={controlCSS}>
                <Box css={controlCSS.btnSig} sx={{ boxShadow: 2 }}>
                    <IconButton aria-label="next" onClick={handleNext}>
                        <NavigateNextIcon />
                    </IconButton>
                    
                </Box>
                <Box css={controlCSS.btnAnt} sx={{ boxShadow: 2 }}>
                    <IconButton aria-label="before" onClick={handlePrev}>
                        <NavigateBeforeIcon />
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
}