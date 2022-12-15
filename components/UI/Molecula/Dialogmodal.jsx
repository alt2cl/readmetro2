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

    const playList = useSelector(state => state.audioplayer.playList)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handlePauseAudio = () => {
      //console.log('contador handle pause:', pageplayer, indexplayer, playList[pageplayer][indexplayer].audio.pause() )
      playList[pageplayer][indexplayer].audio.pause()
      dispatch(updateCurrentPlay({
        show: showplayer,
        play: true,
        title: `Página ${pageplayer}`,
        index: indexplayer,
        page: pageplayer,
      }))
    }

    const handleNextAudio = () => {

      console.log('playListtt', playList)

      //esto detiene el current audio
      if(playList[pageplayer][indexplayer]){
        playList[pageplayer][indexplayer].audio.pause();
        playList[pageplayer][indexplayer].audio.currentTime = 0
      }

      //esto revisa si hay un siguiente audio
      if(playList[pageplayer][indexplayer + 1]) {
        console.log('no hay entre al 1', pageplayer, indexplayer + 1 , playList[pageplayer])
        
        //si hay un sig audio le pone play
        playList[pageplayer][indexplayer + 1].audio.play()


        //actualiza el redux con el audio player en curso
        dispatch(updateCurrentPlay({
          show: showplayer,
          play: true,
          title: `Página ${pageplayer}`,
          index: indexplayer + 1,
          page: pageplayer,
        }))
      } else {
        
        console.log('no hay entre al 2', pageplayer, indexplayer, playList[pageplayer + 1])

        // playList[pageplayer][indexplayer].audio.pause()
        // playList[pageplayer][indexplayer].audio.currentTime = 0


        if (playList[pageplayer + 1][0]) {
            //playList[pageplayer + 1][0].audio.play()

            dispatch(updateCurrentPlay({
              show: showplayer,
              play: true,
              title: `Página ${pageplayer + 1}`,
              index: -1,
              page: pageplayer + 1,
            }))

        } 
        
      }
      

      

    }

    const handlePlayAudio = () => {

      playList[pageplayer][indexplayer].audio.play()
      dispatch(updateCurrentPlay({
        show: showplayer,
        play: true,
        title: `Página ${pageplayer}`,
        index: indexplayer,
        page: pageplayer,
      }))
      

      // let myPlaylist = [...playList]

      // console.log('contador playList pageplayer', myPlaylist[pageplayer][indexplayer].audio.play())
      // myPlaylist[pageplayer][indexplayer].audio.play()

      // if(pageplayer != 0) {
      //   myPlaylist[pageplayer]

      // }

      

      // console.log('playList', playList[0].find(audio => audio.num === '1.1'))
      // const first = playList[0].find(audio => audio.num === '1.1')
      // //first.playing = true
      // first.audio.play()

      

      // dispatch(updateCurrentPlay({
      //   show: showplayer,
      //   play: true,
      //   title: "",
      //   index: indexplayer,
      //   page: pageplayer,
      // }))
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
                    <IconButton color="secondary" aria-label="Previo Audio" size="large">
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
                    <IconButton color="primary" aria-label="Siguiente Audio" size="large" onClick={() => handleNextAudio()}>
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

