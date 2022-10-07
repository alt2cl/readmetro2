import { useState, useRef } from "react";
import Image from 'next/image';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Button from '@mui/material/Button';
import AudioPlayer from '@/components/UI/Organismo/AudioPlayer'
import AudioPlayList from '@/components/UI/Organismo/AudioPlayList'
import fallback from '@/public/img/fallback.jpg'

const NewspaperBox = (props) => {
    const [imageError, setImageError] = useState(false);
    const {width, height, foto, link,audioContents, pagina, fotothumb} = props
    //const audioRef = useRef(null)


    let pinpagina = []
    const listAudios = []

    if(audioContents){
        audioContents.map((item, i)=>{
            if (item.pagina == pagina) {
                pinpagina.push(
                    <Box key={`chip-${i}`}>
                        <Chip sx={{
                        position: 'absolute',
                        left: `calc(${item.x*100/1354}% - 10px)`, 
                        top: `calc(${item.y*100/1500}% - 10px)`,
                        background: 'black',
                        color: 'white',
                        height: '20px', 
                        opacity: '0.6', 
                        '& .MuiChip-label': {paddingLeft:'10px', paddingRight:'10px'}
                        
                    }} 
                    icon={<HeadphonesIcon  sx={{width: '15px', marginLeft: '9px', marginRight: '-8px',fill: 'white', }} />} 
                    label={pagina +'.'+(Number(item.recorte) + 1)  } />

                    </Box>
                    
                    )

                listAudios.push({
                    url: item.audio,
                    numitem: `${pagina}.${Number(item.recorte)+1}`,
                })
                
                }
        })

        

    }
  


    return(
        <Box sx={{position: 'relative', pb: '1rem'}} >
            <Box sx={{alignItems: 'center',display:'flex', position: 'sticky', top: '0px', zIndex: '20', background: listAudios.length > 0 ? 'linear-gradient(to bottom, rgba(58,58,70,1) 20%,rgba(58,58,70,0))': 'linear-gradient(to bottom, rgba(58,58,70,0.3) 20%,rgba(58,58,70,0))', p: '5px 0 1rem 5px', marginLeft: '-5px',width: 'calc(100% + 10px)'  }}>
                 <AudioPlayList urls={listAudios} />
                 <AudioPlayer urls={listAudios}  />
            </Box>
            <Box sx={{position: 'relative'}} >
                <Image src={foto} 
                    layout="responsive"
                    width={width}
                    height={height}
                    alt={link}
                    blurDataURL={fotothumb}
                    placeholder="blur"
                    onError={() => setImageError(true)}
                    priority={pagina == 1 ? true : false}
                    />
                    {audioContents && audioContents.length > 0 && pinpagina}
            </Box>
        </Box>

    )

}

export default NewspaperBox