import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
// import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useSelector } from 'react-redux'
import Slide from '@mui/material/Slide';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { useDispatch } from 'react-redux'
import {updateCurrentPlay} from '@/redux/features/audioplayer/audioplayerSlice'

export default function Dialogmodal(props) {

  const dispatch = useDispatch()

    const {openModal,onCloseModal} = props

    const checkedplay = useSelector(state => state.audioplayer.currentPlay.play)
    const showplayer = useSelector(state => state.audioplayer.currentPlay.show)
    const pageplayer = useSelector(state => state.audioplayer.currentPlay.page)
    const indexplayer = useSelector(state => state.audioplayer.currentPlay.index)

    const playList = useSelector(state => state.audioplayer.playListAll)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const currentPlayList = playList[0]

    const handlePauseAudio = () => {
      //console.log('contador handle pause:', pageplayer, indexplayer, playList[pageplayer][indexplayer].audio.pause() )
      currentPlayList[pageplayer][indexplayer].audio.pause()
      dispatch(updateCurrentPlay({
        show: showplayer,
        play: false,
        title: `Página ${pageplayer}`,
        index: indexplayer,
        page: pageplayer,
      }))
    }

    const handlePrevNextAudio = (direction) => {

      //esto detiene el current audio
      if(currentPlayList[pageplayer] && currentPlayList[pageplayer][indexplayer] && currentPlayList[pageplayer][indexplayer].audio){
        currentPlayList[pageplayer][indexplayer].audio.pause();
        currentPlayList[pageplayer][indexplayer].audio.currentTime = 0
      }
      //esto revisa si hay un siguiente audio
      let sigIndex = direction == "next" ? indexplayer + 1 : indexplayer - 1

      if(currentPlayList[pageplayer] && currentPlayList[pageplayer][sigIndex]?.audio) {
        console.log('entre al 1')
        //si hay un sig audio le pone play
        currentPlayList[pageplayer][sigIndex].audio.play()
        //actualiza el redux con el audio player en curso
        dispatch(updateCurrentPlay({
          show: showplayer,
          play: true,
          title: `Página ${pageplayer}`,
          index: sigIndex,
          page: pageplayer,
        }))
      } else {
        console.log('entre al 2')

        if ( pageplayer < currentPlayList.length) {
          console.log('entre al 3')
          
          // entro si hay mas nodos

            function isArrayIndex(element, index) {
              if (element.length > 0 && index > pageplayer) {
                return true
              }
              return false
            }

            function isArrayIndexPrev(element, index) {
              if (index < pageplayer && element.length > 0 ) {
                return true
              }
              return false
            }

            let cloneCurrentPlayList = [...currentPlayList]
            let reverseCloneCurrentPlayList = cloneCurrentPlayList.reverse()

            console.log('reverse::', reverseCloneCurrentPlayList)

            //obtengo el siguiente nodo con mas de 0 elementos y que este con index mayor al current index
            let sigIndexWithContent = currentPlayList.findIndex(direction == "next" ? isArrayIndex : isArrayIndexPrev)

            dispatch(updateCurrentPlay({
              show: showplayer,
              play: true,
              title: `Página ${sigIndexWithContent  }`,
              index: -1,
              page: sigIndexWithContent ,
            }))
        } else {
          console.log('entre al 4')
          //entro si es el ultimo nodo y mando el indice del primero
          let indicePrimerNodo =  currentPlayList.findIndex(element => element.length > 0)

          dispatch(updateCurrentPlay({
            show: showplayer,
            play: true,
            title: `Página ${indicePrimerNodo}`,
            index:  -1,
            page: indicePrimerNodo,
          }))

        }
      }
    }

    const handlePlayAudio = () => {

      currentPlayList[pageplayer][indexplayer].audio.play()
      dispatch(updateCurrentPlay({
        show: showplayer,
        play: true,
        title: `Página ${pageplayer}`,
        index: indexplayer,
        page: pageplayer,
      }))
      


    }

    useEffect(()=>{
      
    }, [])



    return(
        <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'lg'}
        open={openModal}
        onClose={()=>onCloseModal()}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent sx={{padding: {xs:'0px', md:'0px 0px'}}}>
          {/* <DialogContentText> */}

            {props.children}
            
          {/* </DialogContentText> */}
        </DialogContent>
        {/* showplayer */}
        <Slide direction="up" in={showplayer} mountOnEnter unmountOnExit> 
          <DialogActions sx={{
            display: 'flex', 
            justifyContent: 'space-between',  
            boxShadow: '0px -6px 10px 2px #8f91955e', 
            padding:'0px',
            position: 'relative'}}>

            <Box sx={{display: 'flex', width: '100%', justifyContent:'space-between', alignItems: 'center'}}>
              <Box sx={{display:'flex', alignItems: 'center'}}>
                <Box sx={{display: 'flex'}}>
                    <IconButton color="secondary" aria-label="Previo Audio" size="large" onClick={() => handlePrevNextAudio("prev")}>
                      <SkipPreviousIcon  fontSize="inherit" />
                    </IconButton>
                    {checkedplay ? 
                    <IconButton color="primary" aria-label="Pause Audio" size="large" onClick={() => handlePauseAudio()}>
                      <PauseCircleOutlineIcon  fontSize="inherit" />
                    </IconButton>
                    :
                    <IconButton color="primary" aria-label="Play Audio" size="large" onClick={() => handlePlayAudio()}>
                      <PlayCircleOutlineIcon  fontSize="inherit" />
                    </IconButton>
                    }
                    <IconButton color="primary" aria-label="Siguiente Audio" size="large" onClick={() => handlePrevNextAudio("next")}>
                      <SkipNextIcon  fontSize="inherit" />
                    </IconButton>
                </Box>
                <Box>
                  <Box>
                    <Typography variant="caption" display="block" >
                      Página: {pageplayer + 1} / Audio: {pageplayer + 1}.{indexplayer + 1}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Button variant="outlined" onClick={()=>onCloseModal()} endIcon={<ArrowUpwardIcon/>} autoFocus sx={{mr:'10px'}}>
                <Typography variant="caption" display="block" >
                  IR
                </Typography>
              </Button>

            </Box>
            
          </DialogActions>
        </Slide>
        
      </Dialog>
    )

}

