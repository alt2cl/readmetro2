import { useState } from "react";
import Image from 'next/image';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Button from '@mui/material/Button';

const NewspaperBox = (props) => {
    const [imageError, setImageError] = useState(false);
    const {width, height, foto, link, title,audioContents, pagina} = props

  
    const pinpagina =  audioContents.map((item, i)=>{
            if (item.pagina == pagina) {
                return(
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
                    label={Number(item.recorte) + 1 } />
                    )}
        })

    const audios =  audioContents.map((item, i)=>{
        if (item.pagina == pagina) {
            return(
                <Box sx={{display: 'flex', alignItems: 'center', mr: '1rem',position: 'relative', pl: {xs:'1rem', md: '0' }} }>
                <Chip sx={{backgroundColor: (theme) => theme.palette.primary.main ,color: 'white', position: 'absolute',top: '0',zIndex:' 2',left:'10px',width: '22px',height: '22px',textAlign: 'center', '& .MuiChip-label': {padding:'0'} }} 
                label={Number(item.recorte) + 1 } 
                />
                    <audio controls >
                        <source src={item.audio} type="audio/mpeg" />
                    </audio>

                </Box>

            )
            
        }
    })


    return(
        <Box sx={{position: 'relative'}} key={foto}>

            <Box sx={{alignItems: 'center',display:'flex', position: 'sticky', top: '0px', zIndex: '20', background: 'linear-gradient(to bottom, rgba(58,58,70,1) 20%,rgba(58,58,70,0))', p: '5px 0 2rem 5px', marginLeft: '-5px',width: 'calc(100% + 10px)'  }}>
                <Button size="small" variant="contained" sx={{height: '50px',minWidth:'140px',fontSize: '11px',width: '132px',textAlign: 'left',lineHeight: '18px'}} 
                startIcon={<HeadphonesIcon />}>Escuchar esta página
                </Button>
                <Box sx={{display: 'inline-flex', overflowX:'auto', flexGrow: '1', pl:{xs:'0', md:'1rem'}}}>
                {audios}
                </Box>
            </Box>
            <Box sx={{position: 'relative'}}>
                <Image src={foto} 
                    layout="responsive"
                    width={width}
                    height={height}
                    alt={link}
                    onError={() => setImageError(true)}
                    />
                    {pinpagina}
            </Box>
        </Box>

    )

}

export default NewspaperBox