import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import HeadphonesIcon from '@mui/icons-material/Headphones';




const AudioPLayList = (props) => {
    const {urls} = props

    const [currentplay, setCurrentplay] = useState(0);

    const [sources, setSources] = useState(
        urls.map(item => {
          const  url = item.url
          const num = item.numitem
          const audio = new Audio(url)
          audio.addEventListener("ended",(event) => {})
          return {
            url ,
            num,
            audio
          };
        })
      );

    
    


    const play = (index) => {
        
        //console.log('click currentplay', index)
        sources[index].audio.play()
        //setCurrentplay(currentplay + 1)
        index = index + 1

        sources.map((source, i)=>(
            source.audio.onended = function(){
                //console.log('click termine ======>', i, sources.length, index)
            
                if(sources.length > index){
                    play(index)
                }
            }

        ))
    }

    const next = () => {

    }

    const runplay = () => {
        play(0)


    }

    


    return(
        <>  
            {urls.length > 0 ? 
                <Button size="small" variant="contained" sx={{height: '35px',minWidth:'140px',fontSize: '11px',width: '132px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />} onClick={() => play(0)}>Escuchar todo
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