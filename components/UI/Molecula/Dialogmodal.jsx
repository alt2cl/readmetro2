import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
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

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handlePauseAudio = () => {
      dispatch(updateCurrentPlay({
        show: showplayer,
        play: false,
        title: "",
        index: indexplayer,
        page: pageplayer,
      }))
    }

    const handlePlayAudio = () => {
      dispatch(updateCurrentPlay({
        show: showplayer,
        play: true,
        title: "",
        index: indexplayer,
        page: pageplayer,
      }))
    }



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
        <DialogContent sx={{padding: {xs:'0px 5px', md:'20px 24px'}}}>
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

                <IconButton color="primary" aria-label="Siguiente Audio" size="large">
                  <SkipNextIcon  fontSize="inherit" />
                </IconButton>
                
                
              </Box>
              <Box>
                <Box>
                  <Typography variant="caption" display="block" >
                    Página: {pageplayer} / Audio: {indexplayer + 1}
                  </Typography>
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

