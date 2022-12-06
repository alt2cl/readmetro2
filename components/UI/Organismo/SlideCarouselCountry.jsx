import React from 'react';
import {  useRef } from "react";
import Box from '@mui/material/Box';
import { css } from '@emotion/react';
import Slide from '@mui/material/Slide';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip'
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { useRouter } from 'next/router'
import ExpandIcon from '@mui/icons-material/Expand';
//import Link from '@/src/Link';
import Link from 'next/link'
//import { Typography } from '@mui/material';
//import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Button from '@mui/material/Button';
//import Image from 'next/image';
//import Chip from '@mui/material/Chip';
//import HeadphonesIcon from '@mui/icons-material/Headphones';
//import useScrollTrigger from '@mui/material/useScrollTrigger';
import {useSelector } from 'react-redux';
//import { updateDialogSlice, closeDialog } from '@/redux/features/dialog/dialogSlice/'
//import Dialogmodal from '@/components/UI/Molecula/Dialogmodal'
//import { openDialog } from '@/redux/features/dialog/dialogSlice';


export default function SlideCarouselCountry(props){

    const { widthItem, content, optionsbtnsoff,  bigimages,  handledata, data, searchEditions} = props

    //console.log('content', data)

    //return false

    //const dispatch = useDispatch();
    const scrollElement = useRef(null);
    //const audioref = useRef(null)
    const router = useRouter();
    //console.log('router', router)
    //const [openModal, setOpenModal] = useState(false);

    const lang = router.query.lang ? router.query.lang : null
    const country = router.query.country ? router.query.country : null
    // const city = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
    // const edition = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
    // const date = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] != 'archivo' ? router.query.edicion[1] : null
    // const page = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null

    // const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false
    // const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] == undefined ? true : false

    const langData = useSelector(state => state.lang.dataCurrentLang)
    


    //const [scrollTarget, setScrollTarget] = useState(undefined) 
    // const scrollTrigger = useScrollTrigger({ 
    //     disableHysteresis: true,
    //     threshold:0,
    //     target: scrollTarget 
    // });

    ////console.log('scrollTrigger', scrollTrigger)

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
            webkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollPadding: '0 0 0 0',
            scrollBehavior: 'smooth',
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
            padding: '20px 20px 200px 150px',
            width: '100%',
            height: 'calc(100% - 45px)',
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


    //const handleOpenModal = () => setOpenModal(true);
    // const handleCloseModal = () => {
    //     setOpenModal(false);
    //     router.back();
    // };
    //const fullListImage = () => setFullListImage([]);
    //const theme = useTheme();
    //const [bigImages, setBigImages] =useState([])
    //const [recortes, setRecortes] =useState([])

   

    // const handleRecortes = () => {
    //     if (todayEdition.recortes.length > 0) {
    //         setRecortes(todayEdition.recortes)
    //     }
    // }


    const handleNext = () => {
        scrollElement.current.scrollLeft += widthItem
    };

    const handlePrev = () => {
        scrollElement.current.scrollLeft -= widthItem;
    };

    //console.log('la data desde [...country] ', data)

    // const handleOpenPage =(i, data)=> {
    //     //console.log('landingEdition', landingEdition ,router, router.query.edicion[1])
    //     dispatch(updateDialogSlice({
    //         arrayimages: bigimages,
    //         pagina: i,
    //         fecha: data.date,
    //         edicion: data.cityslug,
    //         recortes: data.recortes.length > 0 ? data.recortes : [],
    //         width: data.width,
    //         height: data.height,
    //       }))
    //     dispatch(openDialog())

    //     if(archivo) {
    //         router.push(`/${lang}/${country}/${edition}/${data.date.replaceAll('/', '')}/${i}`)
    //     } else if (landingEdition) 
    //     {
    //         router.push(`/${lang}/${country}/${edition}/${data.date.replaceAll('/', '')}/${i}`)
    //     }else {
    //         router.push(`/${lang}/${country}/${data.cityslug}/${data.date.replaceAll('/', '')}/${i}`)
    //     }
    // }

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
        //console.log('firstScroll', firstScroll)
      
          isScrolling = setTimeout(function() {
      
              if(scrollLeftElement < firstScroll){
                //console.log('scroll event 1')
                  removeClass('current',childElements);
                  addClass('current', childElements[0])
                  //element.childNodes[0].className = element.childNodes[1].className + ' ' +  'current'
      
              } else if (scrollLeftElement > firstScroll && scrollLeftElement < (firstScroll + childElements[0].offsetWidth)) {
                //console.log('scroll event 2')
                  removeClass('current',childElements);
                  addClass('current', childElements[1])
      
              } else if (scrollLeftElement > (firstScroll + childElements[0].offsetWidth) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 2)) {
                //console.log('scroll event 3')
                  removeClass('current',childElements);
                  addClass('current', childElements[2])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 2)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 3)) {
                //console.log('scroll event 4')
                  removeClass('current',childElements);
                  addClass('current', childElements[3])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 3)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 4)) {
                //console.log('scroll event 5')
                  removeClass('current',childElements);
                  addClass('current', childElements[4])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 4)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 5)) {
                //console.log('scroll event 6')
                  removeClass('current',childElements);
                  addClass('current', childElements[5])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 5)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 6)) {
                //console.log('scroll event 7')
                  removeClass('current',childElements);
                  addClass('current', childElements[6])
              } else if (scrollLeftElement > (firstScroll + (childElements[0].offsetWidth * 6)) && scrollLeftElement < firstScroll + (childElements[0].offsetWidth * 7)) {
                //console.log('scroll event 7')
                  removeClass('current',childElements);
                  addClass('current', childElements[7])
              }
              // Run the callback
          }, 200);
      }

 
      //console.log('itemsss:',data)

      const wrapContent = content.map((item, i)=>{

        return(
            <Box css={slideCSS.slidepost} key={`${i}-slide`}>
                <Box sx={{ boxShadow: 3, m: 1, position: 'relative' }}>
                    
                    {item}

                    {optionsbtnsoff ? null :
                        <>
                        <Box css={slideCSS.counterOptions} sx={{display:'flex',justifyContent:'space-between'}}>
                        <Chip label={i+1} variant="outlined" sx={{background: '#fff', ml:'0.5rem', borderColor: (theme) => theme.palette.primary.main, color: (theme) => theme.palette.primary.main, opacity:'0.8'}} />
                            {/* <Button sx={{background: 'white'}} variant="outlined">
                            {i+1}
                            </Button> */}
                           
                            <Link href={`/${lang}/${country}/${data.cityslug}/${data.date.replaceAll('/', '')}/${i+1}`}>
                                <Button variant="contained" endIcon={<ExpandIcon />} onClick={()=>searchEditions(i, bigimages)} sx={{opacity:'0.8'}} >
                                    {langData.listWords.bottons.expand}
                                </Button>
                            </Link>
                            
                           
                        </Box>
                        <Link href={`/${lang}/${country}/${data.cityslug}/${data.date.replaceAll('/', '')}/${i+1}`} passHref>
                            <IconButton css={slideCSS.zoom} aria-label="zoom" onClick={()=>searchEditions(i, bigimages)}  >
                                <ZoomInOutlinedIcon />
                            </IconButton>
                        </Link>
                        
                        </>
                    }

                 
                    
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





   
        </>
        
    )
}