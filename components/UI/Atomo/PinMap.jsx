import Box from '@mui/material/Box';
import Link from 'next/link';

const Pinmap = ({x,y,name, bp, link}) => {

    
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
                <Link href={link}>
                {name}
                </Link>
                    
             

            
        </Box>
    )

}

export default Pinmap