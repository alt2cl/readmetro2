import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box  from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { ConstructionOutlined } from "@mui/icons-material";




const useMultiAudio = urls => {

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
            console.log('playall ended agregado')
        }
    })

    console.log('playall:',sources[0].audio)

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
    console.log('targetIndex', targetIndex)
    const newPlayers = [...players];

    //si devielve -1 es porque esta detenido sino devuelve el index en el array
    const currentIndex = players.findIndex(p => p.playing === true);

    console.log('current index:', currentIndex, targetIndex)

    if (currentIndex !== -1 && currentIndex !== targetIndex) {
        alert('1')
        //entra si el target distinto al que esta sonanado
        //detiene al que esta sonanado
      newPlayers[currentIndex].playing = false;
      //play al del target requerido
      newPlayers[targetIndex].playing = true;

    } else if (currentIndex !== -1) {
        alert('2')
        //entra si es igual el current y el target y detiene
      newPlayers[targetIndex].playing = false;
    } else if (targetIndex == 100){
        alert('4')
        //este pone play al current
        console.log('current->',  newPlayers[0])
        newPlayers[0].playing = true;
    } else  {
        alert('3')
        //este pone play al current
        console.log('current->',  targetIndex, currentIndex)
      newPlayers[targetIndex].playing = true;
    }

    console.log('los new pplayers:', newPlayers)
    setPlayers(newPlayers);

    
  };

  useEffect(() => {

    //esto recorre los players y revisa si hay cambio en el estado de de su valor playing... si alguno esta entrue, le pone play sino le pone pausa a todo
    console.log('useEffect 1', sources , players)
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        //toma el actual estado de los players y cuendo termina el audio, setea todos lo states a false
        const newPlayers = [...players];
        console.log('aldo newPlayers =.....', newPlayers);
        newPlayers[i].playing = false;
        //newPlayers[i+1].playing = true;
        console.log('aldo newPlayers[i.playing = false].....', newPlayers[i]);
        setPlayers(newPlayers);
        //playAll();
        console.log('aldo ended audio.....', newPlayers);
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
            label={player.playing ? `${player.num} Detener ` : `${player.num} Escuchar ` }
            icon={<HeadphonesIcon fontSize='small' />}
            variant="outlined"
            iconsmall= {true}
            onClick={toggle}
            />
            </Box>
         
        </>

       
);

export default MultiPlayer;
