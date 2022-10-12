import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useDispatch } from 'react-redux'
import {updateCurrentPlay} from '@/redux/features/audioplayer/audioplayerSlice'
import { useSelector } from 'react-redux'





const AudioPLayList = (props) => {
    const {urls, page} = props

    const checkedplay = useSelector(state => state.audioplayer.currentPlay.play)
    const showplayer = useSelector(state => state.audioplayer.currentPlay.show)
    const pageplayer = useSelector(state => state.audioplayer.currentPlay.page)
    const indexplayer = useSelector(state => state.audioplayer.currentPlay.index)

    

    const dispatch = useDispatch()

    const [encurso, setEnCurso] = useState(false);
    const [audioIndex, setAudioIndex] = useState(0);
    const [update, setUpdate] = useState(checkedplay);

    const [sources, setSources] = useState(
        urls.map(item => {
          const  url = item.url
          const num = item.numitem
          const audio = new Audio(url)
          audio.addEventListener("ended",(event) => {})
          return {
            url ,
            num,
            audio,
            playing : false,
            next: false
          };
        })
      );

    //let currentplay = 0
    //let encurso = false
   

    const pausa = (audioIndex) => {
        setEnCurso(false)
        sources[audioIndex].audio.pause();

        dispatch(updateCurrentPlay({
            show: true,
            play: false,
            title: 'Titulo playlist 1',
            index : audioIndex,
            page: page
        }))
    }

    const plai = (audioIndex) => {

        setEnCurso(true)
        sources[audioIndex].audio.play();

        dispatch(updateCurrentPlay({
            show: true,
            play: true,
            title: 'Titulo playlist 1',
            index : audioIndex ,
            page: page
        }))



        sources.map((source, i)=>(

            source.audio.onended = function(){
                if(sources.length > audioIndex +1){
                    setAudioIndex( audioIndex + 1)
                    //plai(audioIndex)
                    // dispatch(updateCurrentPlay({
                    //     show: true,
                    //     play: true,
                    //     title: 'Titulo playlist 1',
                    //     index : audioIndex + 1,
                    //     page: page
                    // }))
                }
            }
        ))
    }




    useEffect(()=>{
        if(audioIndex != 0 && encurso ) {         
            plai(audioIndex)
        }

        
    },[audioIndex])

   



    return(
        <>  
            {urls.length > 0 ? 
                encurso ? 
                <Button size="small" variant="contained" sx={{height: '35px',minWidth:'140px',fontSize: '11px',width: '132px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />} onClick={() => pausa(audioIndex)}>Pausar todo
                </Button>
                :
                <Button size="small" variant="contained" sx={{height: '35px',minWidth:'140px',fontSize: '11px',width: '132px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />} onClick={() => plai(audioIndex)}> Escuchar todo
                </Button>
                :
                <Button disabled size="small" variant="contained" sx={{height: '35px',minWidth:'165px',fontSize: '11px',width: '132px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />}>Audio no disponible
                </Button>
            }
        </>

    )
    
}

export default AudioPLayList;