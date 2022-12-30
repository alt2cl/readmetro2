import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useDispatch } from 'react-redux'
import {updateCurrentPlay, updatePlayList, updatePlayListAll} from '@/redux/features/audioplayer/audioplayerSlice'
import { useSelector } from 'react-redux'





const AudioPLayList = (props) => {
    const {urls, page, cantPages} = props


    const checkedplay = useSelector(state => state.audioplayer.currentPlay.play)
    const showplayer = useSelector(state => state.audioplayer.currentPlay.show)
    const pageplayer = useSelector(state => state.audioplayer.currentPlay.page)
    const indexplayer = useSelector(state => state.audioplayer.currentPlay.index)
    const playListAll = useSelector(state => state.audioplayer.playListAll)
    const langCurrent = useSelector(state => state.lang.currentLang)
    const langData = useSelector(state => state.lang.dataCurrentLang)



    const dispatch = useDispatch()

    let sources = playListAll.length > 0 ? playListAll[0] : []
    let counter = 0
    let currentPage = page - 1

    const pausaAll =()=>{
        const myPlaylist = [...playListAll[0]]
        let indicePrimerNodo =  myPlaylist.findIndex(element => element.length > 0)

        if(myPlaylist[pageplayer].length == 0 ) {
            myPlaylist[indicePrimerNodo][indexplayer].audio.pause()
            //myPlaylist[indicePrimerNodo][indexplayer].audio.currentTime = 0

        } else {
            myPlaylist[pageplayer][indexplayer].audio.pause()
            //myPlaylist[pageplayer][indexplayer].audio.currentTime = 0
        }

        dispatch(updateCurrentPlay({
            show: true,
            play: false,
            title: `Página ${pageplayer}`,
            index :  indexplayer,
            page: pageplayer
        }))

    }
    

    const plaiall =()=> {
 

        const myPlaylist = [...playListAll[0]]
        const lengtlist = myPlaylist[page - 1].length 
        //const currentplay = myPlaylist[currentPage].findIndex(currentAudio => currentAudio.play == true)

       


        let indicePrimerNodo =  myPlaylist.findIndex(element => element.length > 0)

      

        // console.log('a-- myPlaylist:', myPlaylist[currentPage])
        // console.log('a-- pageplayer currentPage', pageplayer )
        // console.log('a-- indexplayer counter', indexplayer , counter)
        // console.log('a-- lengtlist', lengtlist, checkedplay)

        // console.log('myPlaylist[currentPage]',indicePrimerNodo, myPlaylist , myPlaylist[pageplayer][indexplayer],  pageplayer, indexplayer)


        
        if(myPlaylist[pageplayer].length == 0 ) {
            myPlaylist[indicePrimerNodo][indexplayer].audio.pause()
            myPlaylist[indicePrimerNodo][indexplayer].audio.currentTime = 0

        } else {
            myPlaylist[pageplayer][indexplayer].audio.pause()
            myPlaylist[pageplayer][indexplayer].audio.currentTime = 0
        }
        

        

        
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
        
        //esto controla el counter del playlist, si el playlist se acaba vuelve a 0
        if(counter < lengtlist) {
            console.log('counter y lenglist', counter, lengtlist)
            counter = counter + 1

        } else  {
            console.log('a-- counter mayor q leng', counter , lengtlist)
            counter = 1
            dispatch(updateCurrentPlay({
                show: false,
                play: false,
                title: `Página ${page}`,
                index : counter ,
                page: currentPage
            }))
        }

        //esto reploduce la siguiente si hay

        console.log('myPlaylist[currentPage]',currentPage, myPlaylist[currentPage])

        myPlaylist[currentPage].map((item, i)=>{
            if(item.audio != null){
                return (
                    item.audio.onended = function(){
                        plaiall()
                }
                )
            }
            
            
        })

        

    }



    useEffect(()=>{

        if(sources.length > 0){
            dispatch(updatePlayList(sources))
        }


        

        return ()=>{
            sources.forEach((source, i) => {
                //quita todos los event listener del dom html
                if(source.audio != null) {
                    source.audio.removeEventListener("ended", (event) => {
                        plaiall()
                    });

                }
                
              });

            //   {sources.length > 0 && dispatch(updatePlayList(sources))}            
              
        }

        
    },[])

   


    return(
        <>  
            {sources[page - 1] != undefined && sources[page - 1].length > 0 ? 
                checkedplay && pageplayer + 1 == page ?
                <Button size="small" variant="contained" sx={{height: '35px',minWidth:'180px',fontSize: '11px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />} onClick={()=> pausaAll()}>  { `${langData.listWords.audio.listening} ${langData.listWords.audio.page} ${page}`}
                </Button>
                :<Button size="small" variant="contained" sx={{height: '35px',minWidth:'165px',fontSize: '11px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />} onClick={() => plaiall()}>  { `${langData.listWords.audio.listen} ${langData.listWords.audio.page} ${page}`}
                </Button>
                :
                <Button disabled size="small" variant="contained" sx={{height: '35px',minWidth:'165px',fontSize: '11px',width: '132px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />}>{langData.listWords.audio.noAudio}
                </Button>
            }
        </>

    )
    
}

export default AudioPLayList;