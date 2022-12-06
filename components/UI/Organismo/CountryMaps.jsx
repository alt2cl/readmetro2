import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'


const Pinmap = ({x,y,name, bp}) => {
    return(
        <Box sx={{
            backgroundColor:(theme)=> theme.palette.primary.main, 
            position:'absolute',
            top:[`calc(${y} - 55px)`, `calc(${y} - 55px)`, `calc(${y} - 55px)`],
            left:[`${x}`,`${x}`, `${x}` ], 
            minHeight:'35px',
            backgroundImage:'url("/img/logos/globe-green.svg")',
            lineHeight: '34px',
            color: '#fff',
            fontWeight: 'bold',
            padding:'0px 18px 0px 7px',
            backgroundSize: 'auto calc(100% - 8px)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right',
            width:'fit-content',
            fontFamily:'"Bitter",serif',
            borderRadius:'4px',
            

            '&:before':{
                content:'""',
                borderLeft: (theme)=> bp == 'l'?  `14px solid ${theme.palette.primary.main}` :  `0px`,
                borderRight: (theme)=> bp == 'r'?  `14px solid ${theme.palette.primary.main}` :  `0px`,
                borderTop: (theme)=> `0px solid ${theme.palette.primary.main}`,
                borderBottom: '16px solid transparent',
                bottom:'-12px',
                left: bp == 'l' ? '0px': 'inherit',
                right: bp == 'r' ? '0px': 'inherit',
                position:'absolute',
            },

            '&:after': {
                content:'""',
                position:'absolute',
                width:'100%',
                height: 'calc(100% - 30px)',
                backgroundColor:'#0c351d',
                borderRadius:'30px',
                filter: 'blur(5px)',
                zIndex: '-1',
                bottom:'-3px',
                left:'7px',



            }

            }}>
            {name}
        </Box>
    )

}

export default function CountryMaps(params) {
    const langCurrent = useSelector(state => state.lang.currentLang)

    return (
        <Box sx={{
            backgroundImage: `url(${"/img/bgmap.png"})`, 
            backgroundSize: 'auto 670px', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition:['24% top','17% top','28% top','center top' ], 
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: '3rem',
        }}>

        
        <Box sx={{
             
            aspectRatio: ['4 / 5', '4 / 5','4/5' ],  
            position: 'relative',
            maxWidth:['500px','557px','462px'],
            marginLeft: ['0%','11%','12%','8%'],
            height:'670px',
            }}>

            <Pinmap x={'5%'} y={'30%'} name={'Canada'} bp={'l'} link={''} />
            <Pinmap x={'11%'} y={'45%'} name={'USA'} bp={'l'} />
            <Pinmap x={'25%'} y={'54%'} name={'Pto. Rico'} bp={'l'} />
            <Pinmap x={'-4%'} y={'55%'} name={'México'} bp={'r'} />
            <Pinmap x={'9%'} y={'73%'} name={'Ecuador'} bp={'r'} />
            <Pinmap x={'26%'} y={'68%'} name={'Colombia'} bp={'l'} />
            <Pinmap x={'43%'} y={'76%'} name={'Brasil'} bp={'l'} />
            <Pinmap x={'20%'} y={'83%'} name={'Perú'} bp={'r'} />
            <Pinmap x={'39%'} y={'85%'} name={'Argentina'} bp={'l'} />
            <Pinmap x={'19%'} y={'92%'} name={'Chile'} bp={'r'} />
            <Pinmap x={'88%'} y={'30%'} name={'Rusia'} bp={'r'} />
            <Pinmap x={'78%'} y={'43%'} name={'Italia'} bp={'r'} />



        </Box>
        </Box>
    )
    
}