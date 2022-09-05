import React from 'react';
import { useState, useEffect, useRef, useCallback } from "react";
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import Slide from '@mui/material/Slide';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { useRouter } from 'next/router'
import ExpandIcon from '@mui/icons-material/Expand';
import Link from '@/src/Link';
import { Typography } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Chip from '@mui/material/Chip';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import useScrollTrigger from '@mui/material/useScrollTrigger';




//import { useTheme } from '@mui/material/styles';

import Dialogmodal from '@/components/UI/Molecula/Dialogmodal'



export default function SlideCarouselCountry(props){

    const {todayEdition, citySlug,slug, widthItem, content, optionsbtnsoff, goeditionon, bigimages, data} = props

  

    const [scrollTarget, setScrollTarget] = useState(undefined) 
    const scrollTrigger = useScrollTrigger({ 
        disableHysteresis: true,
        threshold:0,
        target: scrollTarget 
    });

    console.log('scrollTrigger', scrollTrigger)



    const scrollElement = useRef(null);
    const audioref = useRef(null)
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const fullListImage = () => setFullListImage([]);
    //const theme = useTheme();
    const [bigImages, setBigImages] =useState([])
    const [recortes, setRecortes] =useState([])

    const handleRecortes = () => {
        if (todayEdition.recortes.length > 0) {
            setRecortes(todayEdition.recortes)
        }
    }


    const handleNext = () => {
        scrollElement.current.scrollLeft += widthItem
    };

    const handlePrev = () => {
        scrollElement.current.scrollLeft -= widthItem;
    };

 

    const handleOpenPage =(i, item)=> {
        router.push(`/country/${router.query.country}?edition=${slug}&&page=${i}`)
        handleOpenModal()

        setBigImages(bigimages);
        handleRecortes();

    }



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
            height: 'auto',
            overflow: 'hidden',
            scrollSnapAlign: 'center',
            paddingBottom: '1rem',
            

            [theme.breakpoints.up('xs')]: {
                flex: widthItem ? '0 0 '+widthItem+'px' : '0 0 250px',
                
            },
            [theme.breakpoints.up('md')]: {
                flex: '0 0 300px',
            }
        }),
        counterOptions: css({
            position: 'absolute',
            bottom: '4px',
            left: '4px',
            right: '4px',

        }),
        counter: (theme) => css({
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30px',
            height: '30px',
            borderRadius: '3px',
            border:`1px solid ${theme.palette.primary.main}`,
            position: 'relative'
        }),
        expandbtn: (theme) => css({
            background: theme.palette.common.white,
            color: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            height: '30px',
            borderRadius: '3px',
            padding: '0 10px',
            border:`1px solid ${theme.palette.primary.main}`,
            cursor:'pointer'
        }),
        zoom: (theme)=> css({
            position: 'absolute',
            top:0,
            right: 0,
            backgroundImage: `linear-gradient(225deg, rgb(0 0 0) 19%, rgb(0 0 0 / 0%) 51%)`,
            padding: '20px 20px 100px 100px',
            color: theme.palette.common.white,
            borderRadius: 0,
            opacity: 0.4,
            transition: 'opacity .3s ease',

            '& svg':  {
                width: '40px',
                height: '40px',
            },

            '&:hover': {
                opacity: 0.8,
            }


        })
        
    
    }

    const controlCSS = {
        btnSig: (theme) => css({
            background: '#fff',
            position: 'absolute',
            top: 'calc(50% - 40px)',
            right: '0',
            borderRadius: '50%',
            [theme.breakpoints.up('md')]: {
                right: '-30px',
            },
        }),
        btnAnt: (theme) => css({
            background: '#fff',
            position: 'absolute',
            top: 'calc(50% - 40px)',
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

    let isScrolling

    function listenerScroll(e){
          let element = e.target;
          let childElements = element.children;
          let scrollLeftElement = element.scrollLeft;
          let anchoventana = window.innerWidth;

        // console.log('scroll event', scrollLeftElement, anchoventana, childElements[0].offsetWidth, 'ancho total:',childElements.length, childElements.length * 250)
      
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

      // bigimages.push(
            //     {
            //         foto:`https://rm.metrolatam.com/${fecha}/${slug}/full_${index}-${todayEdition.newcode}.webp`,
            //         link: `google.com`
            //         }
            // )


      //console.log('el content:', content)


      const wrapContent = content.map((item, i)=>{
        //console.log('item:',item)

        return(
            <Box css={slideCSS.slidepost} key={`${i}-${item.cityname}`}>
                <Box sx={{ boxShadow: 3, m: 1, position: 'relative' }}>
                    
                    {item}

                    {optionsbtnsoff ? null :
                        <>
                        <Box css={slideCSS.counterOptions} sx={{display:'flex',justifyContent:'space-between'}}>
                            <Button sx={{background: 'white'}} variant="outlined">
                            {i+1}
                            </Button>
                            <Button variant="contained" onClick={()=>handleOpenPage(i+1, item)} endIcon={<ExpandIcon />}>
                            Expandir
                            </Button>
                           
                        </Box>
                        <IconButton css={slideCSS.zoom} aria-label="zoom" onClick={()=>handleOpenPage(i+1, item)} >
                            <ZoomInOutlinedIcon />
                        </IconButton>
                        </>
                    }

                    {goeditionon ? 
                        <Box css={slideCSS.counterOptions} sx={{display:'flex',justifyContent:'center', mb:'1rem'}}>
                            <Link href={'/country/'+citySlug}>
                            <Button variant="contained" endIcon={<ArrowForwardOutlinedIcon />}>
                            Ir a la edición
                            </Button>
                            </Link>
                        </Box>

                        : null
                    }

                    
                    
                </Box>
                
            </Box>
        )
    })

    const readfull = bigImages.map((item, index)=>{

        console.log('item recorte:::', item.recortes.pagina, index)
        let audios = [];
        let audiosPoints = [];

        let wrapAudios = [];

        if (audios.length > 0) {
            audios.map((audio, i)=>{
                wrapAudios.push((
                    <>
                        <Box sx={{display: 'flex', alignItems: 'center', mr: '1rem', position: 'relative', pl: {xs:'1rem', md: '0' }} } key={'audio'+ele.pagina}>
                            <Chip sx={{backgroundColor: (theme) => theme.palette.primary.main ,color: 'white', position: 'absolute',top: '0',zIndex:' 2',left:'10px',width: '22px',height: '22px',textAlign: 'center', '& .MuiChip-label': {padding:'0'} }} label={i+1} />
                            <audio id={'audioplay'+(i+1)} controls ref={audioref}>
                                {audio[i]}
                            Your browser does not support the audio element.
                            </audio> 
                        </Box>
                    </>
                    
    
                ))
                
            })
            

        }

        if(item.recortes.length > 0) {
            console.log('element::',item.recortes.length )
            item.recortes.map((ele, i)=> {
                
                    //console.log('element:',i ,  ele)

                    {ele.pagina == index +1 ?
                        audios.push((
                            <>
                            <Box sx={{display: 'flex', alignItems: 'center', mr: '1rem', position: 'relative', pl: {xs:'1rem', md: '0' }} } key={'audio'+ele.pagina}>
                                <Chip sx={{backgroundColor: (theme) => theme.palette.primary.main ,color: 'white', position: 'absolute',top: '0',zIndex:' 2',left:'10px',width: '22px',height: '22px',textAlign: 'center', '& .MuiChip-label': {padding:'0'} }} label={i+1} />
                                <audio id={'audioplay'+(i+1)} controls ref={audioref}>
                                    <source src={ele.audio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                                </audio> 
                            </Box>
                            </>
                        ))
                        : null
                    }

                    {ele.pagina == index +1 ?
                        audiosPoints.push((
                            <>
                            <Chip sx={{position: 'absolute',left: `calc(${ele.x*100/1354}% - 10px)`, top: `calc(${ele.y*100/1500}% - 10px)`,background: 'black',color: 'white',height: '20px', opacity: '0.4', '& .MuiChip-label': {paddingLeft:'10px', paddingRight:'10px'}}} icon={<HeadphonesIcon  sx={{width: '15px', marginLeft: '9px', marginRight: '-8px',fill: 'white', }} />} label={i+1} />
                            </>
                        ))
                        : null
                    }
                    
                    
                   
                
            })
        }

        //console.log( 'element foto::', item)

        


        return(
            <Box sx={{borderBottom: '1px solid #ccc', mb: '2rem', pb: '2rem', position: 'relative'}} key={`${item.foto}-${index}`} >
                    {/* <Slide direction="up" in={scrollTrigger} mountOnEnter unmountOnExit> */}

                    {audios.length > 0 ?
                        <Box sx={{alignItems: 'center',display:'flex', position: 'sticky', top: '0px', zIndex: '20', background: 'linear-gradient(to bottom, rgba(58,58,70,1) 20%,rgba(58,58,70,0))', p: '5px 0 2rem 5px', marginLeft: '-5px',width: 'calc(100% + 10px)'  }}>
                            <Button size="small" variant="contained" sx={{height: '50px',minWidth:'140px',fontSize: '11px',width: '132px',textAlign: 'left',lineHeight: '18px'}} startIcon={<HeadphonesIcon />}>Escuchar esta página</Button>
                            <Box sx={{display: 'inline-flex', overflowX:'auto', flexGrow: '1', pl:{xs:'0', md:'1rem'}}}>
                            { audios} 
                            </Box>
                        </Box>
                    : null
                    }

                       

                 
                    

                

                <Box sx={{position: 'relative'}}>
                    <Image src={item.foto} 
                        layout="responsive"
                        width={1354}
                        height={1500}
                        alt={item.link}
                        onError={() => setImageError(true)}
                        />

                    {audiosPoints}
                </Box>
                
                  
            </Box>
            
        )

    })




    
    return (
        <>
        <div css={slideCSS.wrapslide}>
            <Slide onScroll={listenerScroll} direction="right" in={true} mountOnEnter unmountOnExit ref={scrollElement}>
                <div css={slideCSS.wrap}>
                {wrapContent}

                </div>
            </Slide>
            <Box>
                <Box css={controlCSS.btnSig} sx={{ boxShadow: 2 }}>
                    <IconButton aria-label="next" onClick={() => handleNext()}>
                        <NavigateNextIcon />
                        
                    </IconButton>
                    
                </Box>
                <Box css={controlCSS.btnAnt} sx={{ boxShadow: 2 }}>
                    <IconButton aria-label="before" onClick={() => handlePrev()}>
                        <NavigateBeforeIcon />
                    </IconButton>
                </Box>
            </Box>
        </div>

        <Dialogmodal openModal={openModal} onCloseModal={()=>handleCloseModal()}>
            { readfull}
        </Dialogmodal>


   
        </>
        
    )
}