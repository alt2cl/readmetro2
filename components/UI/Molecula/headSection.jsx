import { Box, Typography } from '@mui/material';
import Link from 'next/link'
import Divider from '@mui/material/Divider';
import { css } from '@emotion/react';
import MoreOptions from '@/components/UI/Atomo/MoreOptions'


const headSectionCSS = {
    headWrapper : (theme) => css({
        display: 'flex',
        marginBottom:theme.spacing(3),

    }),
    titlebullet: css({
        display:'flex',
        alignItems: 'center',
        width: '100%',
    }),
    boxOptions: (theme) => css({
        display: 'flex',
        alignItems:'center',
        // [theme.breakpoints.up('xs')]: {
        //     width: '100%'
        // },
        // [theme.breakpoints.up('md')]: {
        //     width: 'auto'
        // }

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
    const {slug, colorBullet, titleSection, options, pretext, linksite, linkedition, data} = props;

    

    const arrayOptions = []

    if(linksite) {
        arrayOptions.push(
            {item:'Ir al sitio', link: linksite, target: '_blank'}
        )
    }

    if(linkedition) {
        arrayOptions.push(
            {item:'Ir a la Edición', link: '/country/'+slug, target: '_top'}
        )

    }

    return (
        <>
            <Box css={headSectionCSS.headWrapper} {...props} sx={{
                flexDirection: { xs: props.options != null ? 'column' : 'row', md: 'row' },
                alignItems: {xs: 'flex-start', md: 'center'},
            }}>
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
                    {pretext}
                    {titleSection}
                    </Typography>
                </Link>
                <Divider light sx={{flexGrow: 1, ml: '1rem', mr: '1rem', height: '1px'}} />
                </div>
                <Box css={headSectionCSS.boxOptions} {...props} sx={{
                    width: { xs: props.options != null ? '100%' : 'auto', md: 'auto' },
                }}>
                {options?
                <Box css={headSectionCSS.wrapOptions} >
                    {options}

                </Box>
                    :
                    null
                }
                <MoreOptions options={arrayOptions} />
                </Box>


            </Box>
        </>
     );
}

export default HeadSection;
