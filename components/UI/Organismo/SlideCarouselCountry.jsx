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
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { useRouter } from 'next/router'
import ExpandIcon from '@mui/icons-material/Expand';
import Link from '@/src/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';



export default function SlideCarouselCountry(props){

    const {cities, todayEdition, slug, widthItem} = props
    const [imageError, setImageError] = useState(false);
    const scrollElement = useRef(null);
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const theme = useTheme();


    const handleNext = () => {
        //setChecked((prev) => !prev);
        //scrollElement.current.scrollLeft += 250;
        scrollElement.current.scrollLeft += widthItem

    };

    const handlePrev = () => {
        //setChecked((prev) => !prev);
        scrollElement.current.scrollLeft -= widthItem;
    };

    const handleOpenPage =(i, item)=> {
        console.log('event trae esto', item, slug, router)
        router.push(`${router.asPath}?edicion=${slug}&&page=${i}`)
        handleOpenModal()

    }

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
            height: 'auto',
            overflow: 'hidden',
            'scroll-snap-align': 'center',
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
                <Box sx={{ boxShadow: 3, m: 1, position: 'relative' }}>

                    {imagenes != null ? 
                         <Image src={imageError ? fallback.src : item.foto} 
                         layout="responsive"
                         width={widthItem}
                         height={300}
                         alt={item.link}
                         priority = {i <= 2 ? 'true': 'false'}
                         onError={() => setImageError(true)}
                          />
                    : <Image src={fallback.src} 
                    layout="responsive"
                    width={fallback.width}
                    height={fallback.height}
                    alt={'error'}
                    />
                    }
                    <Box css={slideCSS.counterOptions} sx={{display:'flex',justifyContent:'space-between'}}>
                        <Box css={slideCSS.counter}>
                            {i+1}
                        </Box>
                        <Box css={slideCSS.expandbtn} onClick={()=>handleOpenPage(i+1, item)}>
                            Expandir
                            <ExpandIcon />
                        </Box>
                        
                    </Box>
                    <IconButton css={slideCSS.zoom} aria-label="zoom" >
                        <ZoomInOutlinedIcon />
                    </IconButton>
                </Box>
            </div>
            )
        })


      } else {
        dataSlidePost = cities.map((item, i) => {
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
                    <Box sx={{ml:1 , mr:1,p: 1,  borderRadius:'5px', position: 'relative', background: 'white', boxShadow: 3 }}>
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
                        
                        <Box sx={{display:'flex', position: 'absolute', bottom: '19px', left: '19px'}}>
                            <Box css={slideCSS.counter}>
                                {i}
                            </Box>
                        </Box>
                        
                    </Box>
                </Box>
                )
            })
      }


    
    return (
        <>
        <div css={slideCSS.wrapslide}>
            <Slide onScroll={listenerScroll} direction="right" in={true} mountOnEnter unmountOnExit ref={scrollElement}>
                <div css={slideCSS.wrap}>
                    {todayEdition != null ? dataSlidePostCountry : dataSlidePost}
                </div>
            </Slide>
            <Box css={controlCSS}>
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

        {/* <Modal
        keepMounted
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}

    <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Disagree
          </Button>
          <Button onClick={handleCloseModal} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        </>
        
    )
}