import { useState, useRef, useEffect } from "react";
//import { useRouter } from 'next/router'
import Image from 'next/image';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import HeadphonesIcon from '@mui/icons-material/Headphones';
//import Button from '@mui/material/Button';
import AudioPlayer from '@/components/UI/Organismo/AudioPlayer'
import AudioPlayList from '@/components/UI/Organismo/AudioPlayList'
import fallback from '@/public/img/fallback.jpg'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link'


const NewsPagesList = (props) => {
    const {dataImages, date, edition, page, scrolltoPosition} = props
    // const router = useRouter()

    // const routerpage = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null

    //const pagina = page


    const audioContents = dataImages.recortes
    const postLink = dataImages.link


    const itemsRef = useRef([])

    const [imageError, setImageError] = useState(false);
    const [loopCompleto, setLoopCompleto] = useState(false);

    const YYYY = date.slice(0,4)
    const MM = date.slice(4,6)
    const DD = date.slice(6,8)

    const formatDate = YYYY+'/'+MM+'/'+DD

    

    
    
    let newsPage = []

    const getPinPagina = (pagina) => {
        const pinpagina =  audioContents.map((item, i)=>{
                if (item.pagina == pagina) {
                    return(
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
                            label={pagina +'.'+(Number(item.recorte) + 1)  } 
                            />
                        </Box>
                        )
                    }
            })
        return pinpagina
    }

    const getPinLink = (pagina) => {
        const pinlink =  audioContents.map((item, i)=>{
                if (item.pagina == pagina && item.url != "") {
                    console.log('valor de item', item)
                    return (
                        <Box key={`chiplink-${i}`}>
                            <Link href={item.url}>
                                <Chip sx={{
                                position: 'absolute',
                                left: `calc(${item.x*100/1354}% - 10px)`, 
                                top: `calc(${item.y*100/1500}% + 20px)`,
                                background: 'black',
                                color: 'white',
                                height: '20px', 
                                opacity: '0.6', 
                                '& .MuiChip-label': {paddingLeft:'10px', paddingRight:'10px'}
                                
                                }} 
                                icon={<OpenInNewIcon  sx={{width: '15px', marginLeft: '9px', marginRight: '-8px',fill: 'white', }} />} 
                                label={"Leer..."  } 
                                />

                            </Link>
                            
                        </Box>
                        )
                    }
            })
        return pinlink
    }

    const getListAudios = (pagina) => {

        const listAudios = []

        if(audioContents){
            audioContents.map((item, i)=>{
                if (item.pagina == pagina) {
                    listAudios.push({
                        url: item.audio,
                        numitem: `${pagina}.${Number(item.recorte)+1}`,
                    })
                }
            })
        }



        return listAudios

    }

   

    useEffect(() => {
        scrolltoPosition(itemsRef)
    },[])

    for (let index = 1; index < dataImages.countpages; index++) {
        newsPage.push(
            <Box sx={{position: 'relative', pb: '1rem'}} key={`itemNewspaper${index}`} id={`page-${index}`} ref={el => itemsRef.current[index] = el}>
                <Box sx={{alignItems: 'center',display:'flex', top: '0px', zIndex: '20', background: getListAudios(index).length > 0 ? 'linear-gradient(to bottom, rgba(58,58,70,1) 20%,rgba(58,58,70,0))': 'linear-gradient(to bottom, rgba(58,58,70,0.3) 20%,rgba(58,58,70,0))', p: '5px 0 1rem 5px' }}>
                    <AudioPlayList urls={getListAudios(index)} page={index} cantPages={dataImages.countpages}/>
                    <AudioPlayer urls={getListAudios(index)} page={index} />
                </Box>
                <Box sx={{position: 'relative'}}>
                    <Image src={`https://rm.metrolatam.com/${formatDate}/${edition}/full_${index}-${dataImages.newcode}.webp`} 
                        layout="responsive"
                        width={dataImages.width}
                        height={dataImages.height}
                        alt={dataImages.link}
                        blurDataURL={`https://rm.metrolatam.com/${formatDate}/${edition}/thumb_${index}-${dataImages.newcode}.jpg`}
                        placeholder="blur"
                        onError={() => setImageError(true)}
                        priority={index == 1 ? true : false}
                        />
                        {audioContents && audioContents.length > 0 && getPinPagina(index)}
                        {audioContents && audioContents.length > 0 && getPinLink(index)}
                </Box>
            </Box>

        )

        
        
    }


    return newsPage
}

export default NewsPagesList;