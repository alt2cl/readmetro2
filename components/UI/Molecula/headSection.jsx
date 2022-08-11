import { Box, Typography } from '@mui/material';
import Link from 'next/link'
import Divider from '@mui/material/Divider';
import { css } from '@emotion/react';
import MoreOptions from '@/components/UI/Atomo/MoreOptions'


const headSectionCSS = {
    headWrapper : (theme) => css({
        display: 'flex',
        marginBottom:theme.spacing(3),
        [theme.breakpoints.up('xs')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'center',
        }
    }),
    titlebullet: css({
        display:'flex',
        alignItems: 'center',
        width: '100%',
    }),
    boxOptions: (theme) => css({
        display: 'flex', 
        alignItems:'center', 
        [theme.breakpoints.up('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 'auto'
        }
        
    }),
    wrapOptions:  css({
            flexGrow: 1,
            '& .MuiFormControl-root': {
                width: 'calc(100% - 10px)',

                '& .MuiSelect-select':{
                    padding:'6.5px 14px',
                }
            }
    })

}


const HeadSection = (props) => {
    const {slug, colorBullet, titleSection, options} = props;

    const arrayOptions = [
        {item:'Juan', link: '/link1'}, 
        {item:'Andres', link: '/link2'}
      ]

    return ( 
        <>
            <Box css={headSectionCSS.headWrapper}>
                <div css={headSectionCSS.titlebullet}>
                <Box sx={{
                    height: 10,
                    width: 10,
                    backgroundColor: colorBullet ? colorBullet : 'green' ,
                    borderRadius: '50%',
                    mr: '0.5rem'
                }}/>
                <Link href={`/country/${slug}`}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                    >
                    {titleSection}
                    </Typography>
                </Link>
                <Divider light sx={{flexGrow: 1, ml: '1rem', mr: '1rem', height: '1px'}} />
                </div>
                <div css={headSectionCSS.boxOptions}>
                {options?
                <Box css={headSectionCSS.wrapOptions} >
                    {options}
                    
                </Box>
                    :
                    null
                }
                <MoreOptions options={arrayOptions} />
                </div>
                
                
            </Box>
        </>
     );
}
 
export default HeadSection;