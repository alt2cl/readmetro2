import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Pinmap from '@/components/UI/Atomo/PinMap'
import {useState} from 'react'
import Grow from '@mui/material/Grow';


export default function CountryMaps(params) {

    const langData = useSelector(state=>state.lang.currentLang)
    const [checked, setChecked] = useState(false);
 


    return (
        <Box sx={{
            backgroundImage: 'url("/img/bgmap.png")', 
            backgroundSize: 'auto 670px', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition:['24% top','17% top','28% top','center top' ], 
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: '3rem',
            marginLeft: '-15px',
            minWidth: '520px',
        }}>

        
        <Box sx={{
             
            aspectRatio: ['4 / 5', '4 / 5','4/5' ],  
            position: 'relative',
            maxWidth:['500px','557px','462px'],
            marginLeft: ['0%','11%','12%','8%'],
            height:'670px',
            }}>

              <Pinmap x={'5%'} y={'30%'} name={'Canada'} bp={'l'} link={`/${langData}/canada`} />


            
            <Pinmap x={'11%'} y={'45%'} name={'USA'} bp={'l'} link={`/${langData}/usa`} />
            <Pinmap x={'25%'} y={'54%'} name={'Pto. Rico'} bp={'l'} link={`/${langData}/puerto-rico`} />
            <Pinmap x={'-4%'} y={'55%'} name={'México'} bp={'r'} link={`/${langData}/mexico`} />
            <Pinmap x={'9%'} y={'73%'} name={'Ecuador'} bp={'r'} link={`/${langData}/ecuador`} />
            <Pinmap x={'26%'} y={'68%'} name={'Colombia'} bp={'l'} link={`/${langData}/colombia`} />
            <Pinmap x={'43%'} y={'76%'} name={'Brazil'} bp={'l'} link={`/${langData}/brazil`}/>
            <Pinmap x={'9%'} y={'62%'} name={'Guatemala'} bp={'l'} link={`/${langData}/guatemala`}/>
            <Pinmap x={'20%'} y={'83%'} name={'Perú'} bp={'r'} link={`/${langData}/peru`}/>
            <Pinmap x={'39%'} y={'85%'} name={'Argentina'} bp={'l'} link={`/${langData}/argentina`}/>
            <Pinmap x={'19%'} y={'92%'} name={'Chile'} bp={'r'} link={`/${langData}/chile`}/>
            <Pinmap x={'88%'} y={'30%'} name={'Rusia'} bp={'r'} link={`/${langData}/rusia`}/>
            <Pinmap x={'78%'} y={'43%'} name={'Italia'} bp={'r'} link={`/${langData}/italy`}/>



        </Box>
        </Box>
    )
    
}