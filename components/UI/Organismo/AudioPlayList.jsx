import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useDispatch } from 'react-redux'
import {updateCurrentPlay, updatePlayList} from '@/redux/features/audioplayer/audioplayerSlice'
import { useSelector } from 'react-redux'
import { ConstructionOutlined } from "@mui/icons-material";





const AudioPLayList = (props) => {
    const {urls, page} = props

    

    const checkedplay = useSelector(state => state.audioplayer.currentPlay.play)
    const showplayer = useSelector(state => state.audioplayer.currentPlay.show)
    const pageplayer = useSelector(state => state.audioplayer.currentPlay.page)
    const indexplayer = useSelector(state => state.audioplayer.currentPlay.index)
    const playList = useSelector(state => state.audioplayer.playList)

    console.log('page::',pageplayer, page)

    const dispatch = useDispatch()

    

    let sources = []

    for (let index = 0; index < urls.length; index++) {
        const item = urls[index];
        const  url = item.url
        const num = item.numitem
        const audio = new Audio(url)
        //audio.addEventListener("ended",(event) => {})
        sources.push(
            {
                id: `id-audio-${num}`,
                url: url,
                num: num,
                audio: audio,
                playing : false,
                next: false
              }
        )
    }



    // if(checkedplay == false && indexplayer == audioIndex && indexplayer != 0) {
    //     sources[audioIndex].audio.pause();
    // }

 


    let counter = 0
    let currentPage = page - 1
    

    const plaiall =()=> {
 

        const myPlaylist = [...playList]
        const lengtlist = myPlaylist[page - 1].length 
        //const currentplay = myPlaylist[currentPage].findIndex(currentAudio => currentAudio.play == true)

        console.log('a-- pageplayer currentPage', pageplayer , currentPage)
        console.log('a-- indexplayer counter', indexplayer , counter)
        console.log('a-- lengtlist', lengtlist, checkedplay)

        //console.log('myPlaylist[currentPage]', myPlaylist[currentPage])
        myPlaylist[pageplayer][indexplayer].audio.pause()
        myPlaylist[pageplayer][indexplayer].audio.currentTime = 0
        
        if(counter < lengtlist) {
            dispatch(updateCurrentPlay({
                show: true,
                play: true,
                title: `Página ${page}`,
                index :  counter,
                page: currentPage
            }))

            myPlaylist[currentPage][counter].audio.play()

        }
        

        if(counter < lengtlist) {
            counter = counter + 1
        } else  {
            console.log('a-- counter mayor q leng', counter , lengtlist)
            counter = 0
            dispatch(updateCurrentPlay({
                show: false,
                play: false,
                title: `Página ${page}`,
                index : counter ,
                page: currentPage
            }))
        }

        myPlaylist[currentPage].map((item, i)=>(
            item.audio.onended = function(){
                    plaiall()
            }
        ))

    }


    

   





    useEffect(()=>{
  

        if(sources.length > 0) {
            dispatch(updatePlayList(sources))
        }

    },[])

   



    return(
        <>  
            {urls.length > 0 ? 

                checkedplay && pageplayer + 1 == page ?
                <Button size="small" variant="contained" sx={{height: '35px',minWidth:'180px',fontSize: '11px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />}>  { `Escuchando página ${page}`}
                </Button>
                :<Button size="small" variant="contained" sx={{height: '35px',minWidth:'165px',fontSize: '11px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />} onClick={() => plaiall()}>  { `Escuchar página ${page}`}
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