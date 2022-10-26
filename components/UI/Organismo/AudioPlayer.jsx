import React, { useState, useEffect } from "react";
import Box  from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import {  useDispatch } from 'react-redux'
import {updateCurrentPlay} from '@/redux/features/audioplayer/audioplayerSlice'





const useMultiAudio = urls => {

  const dispatch = useDispatch()

    //const [currentplay, setCurrentplay] = useState(0);
    const [nextplay, setNextplay] = useState(1);

  const [sources] = useState(
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

  const [players, setPlayers] = useState(
    urls.map(item => {
      const  url = item.url
      const num = item.numitem
      return {
        url,
        num,
        playing: false,
        next: false
      };
    })
  );

  const [counteritem, setCounterItem] = useState(0)

  let item = -1

  const nextItem = (i) => {
    
    sources[i].audio.play()

  }


 





  const playall = targetIndex => () => {
    console.log('targetIndex 2', targetIndex)

    let currentplay = 0;
    const newPlayers = [...players];

    //const cantSources = sources.length
    
    const currentIndex = players.findIndex(p => p.playing === true);

    

    // sources.map(source => {
    //     source.audio.onended = function(){
    //         console.log('playall ended agregado')
    //     }

    // })

  

    sources.map((source, i) => {
        source.audio.onended = function(){
            newPlayers[i].playing = true;
            setPlayers(newPlayers);
            //console.log('playall ended agregado')
        }
    })

    //console.log('playall:',sources[0].audio)

    if(targetIndex == 'all' ) {
        newPlayers[currentplay].playing = true;
    } 

    setPlayers(newPlayers);

    
    // const cantSources = sources.length

    // console.log('entre', targetIndex, sources, cantSources)

    // item ++
    // let nextItem = item + 1

    // sources[item].audio.onended = (event) => {
    //     sources[nextItem].audio.play()
    // }

    // sources[item].audio.play()

    // if (cantSources > item) {
    //     playAll()
    // }

    //sources[item].audio.onended = nextItem

    
  }



 

  const toggle = targetIndex => () => {
    
    const newPlayers = [...players];

    //si devielve -1 es porque esta detenido sino devuelve el index en el array
    const currentIndex = players.findIndex(p => p.playing === true);
    const paginaindice = newPlayers[targetIndex].num
    const splitpagina = paginaindice.split('.')


    //console.log('current index:', currentIndex, targetIndex)

    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      console.log('entre 01')
        //entra si el target distinto al que esta sonanado
        //detiene al que esta sonanado
      newPlayers[currentIndex].playing = false;
      //play al del target requerido
      newPlayers[targetIndex].playing = true;

    } else if (currentIndex !== -1) {
      console.log('entre 02')
        //entra si es igual el current y el target y detiene
      newPlayers[targetIndex].playing = false;
      dispatch(updateCurrentPlay({
        show: false,
        play: false,
        title: 'Titulo 1',
        index : splitpagina[1] - 1,
        page: splitpagina[0] - 1
      }))
    } else if (targetIndex == 100){
        //este pone play al current
        console.log('entre 03')
        newPlayers[0].playing = true;
    } else  {
        //este pone play al current
        console.log('entre 04')
        
      newPlayers[targetIndex].playing = true;

      

      console.log('data audio player targetIndex', splitpagina[1] - 1, splitpagina[0] - 1 )

      dispatch(updateCurrentPlay({
        show: false,
        play: true,
        title: 'Titulo 1',
        index : splitpagina[1] - 1,
        page: splitpagina[0] - 1
      }))

      
    }

    setPlayers(newPlayers);

    
  };

  useEffect(() => {


    //console.log('sourceee',  sources)
    //esto recorre los players y revisa si hay cambio en el estado de de su valor playing... si alguno esta entrue, le pone play sino le pone pausa a todo
    //console.log('useEffect 1', sources , players)
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        //toma el actual estado de los players y cuendo termina el audio, setea todos lo states a false
        const newPlayers = [...players];
        //console.log('aldo newPlayers =.....', newPlayers);
        newPlayers[i].playing = false;
        //newPlayers[i+1].playing = true;
        //console.log('aldo newPlayers[i.playing = false].....', newPlayers[i]);
        setPlayers(newPlayers);
        //playAll();
        //console.log('aldo ended audio.....', newPlayers);
        dispatch(updateCurrentPlay({
          show: false,
          play: false,
          title: 'Titulo 1',
          index : i ,
          page:  Number(source.num.slice(0,1)) - 1
        }))
      });
    });
    return () => {
      sources.forEach((source, i) => {
        //quita todos los event listener del dom html
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, toggle, playall];
};

const MultiPlayer = ({ urls }) => {
  const [players, toggle, playall] = useMultiAudio(urls);

  return (
    <>
    
    <Box sx={{display: 'inline-flex', overflowX:'auto', flexGrow: '1', pl:{xs:'0', md:'1rem'}}}>
        {players.map((player, i) => (
            <Player key={i} player={player} toggle={toggle(i)} />
        ))}
    </Box>
      
    </>
  );
};



const Player = ({ player, toggle }) => (
        <>
            <Box sx={{position: 'relative', pl: '.5rem'}}>
            <Chip sx={{
            textAlign: 'center', 
            background: player.playing ? '#fff!important': '#ccc!important',
            }} 
            label={player.playing ? `${player.num} Detener ` : `Audio ${player.num}` }
            icon={<HeadphonesIcon fontSize='small' />}
            variant="outlined"
            size="small"
            onClick={toggle}
            />
            </Box>
         
        </>

       
);

export default MultiPlayer;
