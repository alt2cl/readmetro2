import { Box, Typography } from '@mui/material';
import Link from 'next/link'
import Divider from '@mui/material/Divider';
import { css } from '@emotion/react';
import MoreOptions from '@/components/UI/Atomo/MoreOptions'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'





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

    const router = useRouter();

    const langRedux = useSelector(state => state.lang.currentLang)
    const langData = useSelector(state => state.lang.dataCurrentLang)



//const country = router.query.country ? router.query.country : null
// const city = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
// const edition = router.query.edicion && router.query.edicion[0] ? router.query.edicion[0] : null
// const date = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] != 'archivo' ? router.query.edicion[1] : null
// const page = router.query.edicion && router.query.edicion[2] ? router.query.edicion[2] : null

const landingHome = !router.query.country ? true : false
// const landingArchivo = router.query.edicion && router.query.edicion[1] && router.query.edicion[1] == 'archivo' ? true : false
const landingEdition = router.query.edicion && router.query.edicion[0] && router.query.edicion[1] == undefined ? true : false
// const landingCountry = router.query.country && !router.query.edicion ? true : false



    const {slug, colorBullet, titleSection, options, pretext, linksite, datesection, country} = props;

    const todaydate = new Date


    //return false

    const arrayOptions = []

    if(linksite) {
        arrayOptions.push(
            {item: langData.listWords.headSection.goWeb, link: linksite, target: '_blank'}
        )
    }

    if(!landingHome) {
        arrayOptions.push(
            {item:langData.listWords.headSection.goEdition , link: '/'+langRedux+'/'+country+'/'+slug, target: '_top'}
        )
    } else {
        arrayOptions.push(
            {item: langData.listWords.headSection.goEdition, link: '/'+langRedux+'/'+slug, target: '_top'}
        )

    }
 
    if(!landingHome) {
        arrayOptions.push(
            {item: langData.listWords.headSection.archive, link: '/'+langRedux+'/'+country +'/'+slug+'/archivo/', target: '_top'}
        )
    }

    

    

    const fecha1 = datesection ? datesection.split('/') : null
    const fecha2 = fecha1 ? fecha1[2] +'-'+ fecha1[1] +'-'+ fecha1[0] : null

    const fechahoy = todaydate.toLocaleDateString('es-CL', { year: 'numeric',month: '2-digit',day: '2-digit' })

    const titlefecha = () => {
        if(fecha2 == fechahoy) {
            return `${langData.listWords.headSection.today}  ${fechahoy}`
        } else if (landingEdition) {
            return `${langData.listWords.headSection.edition}  ${fecha2}`
        } else {
            return `${langData.listWords.headSection.lastEdition} ${fecha2}`
        }
        
    }

    console.log('colorBullet', colorBullet)

    return ( 
        <>
            <Box css={headSectionCSS.headWrapper} {...props} sx={{
                flexDirection: { xs: props.options != null ? 'column' : 'row', md: 'row'},
                alignItems: {xs: 'flex-start', md: 'center'},
            }}>
                <Box css={headSectionCSS.titlebullet}>
                    <Box sx={{
                        height: 10,
                        width: 10,
                        backgroundColor: colorBullet ? colorBullet : (theme)=> theme.palette.primary.main,
                        borderRadius: '50%',
                        mr: '0.5rem',
                        mt: datesection ? '-19px': null
                    }}/>
                    <Box>
                    <Link href={`/${langRedux}/${country}/${slug}`}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'block', sm: 'block', cursor: 'pointer', fontFamily: '"Bitter", serif', } }}
                        >
                        {pretext ? pretext + ' ' : null}
                        {titleSection}
                        </Typography>
                    </Link>
                    <Typography
                            variant="caption"
                            noWrap
                            component="span"
                            sx={{ display: { xs: 'block', sm: 'block' }, color: '#82868b' }}
                        >
                        {datesection ? titlefecha() : null}
                        </Typography>
                    </Box>
                    
                    <Divider light sx={{flexGrow: 1, ml: '1rem', mr: '1rem', height: '1px'}} />
                </Box>
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
                <Box sx={{mt: datesection ? '7px': null }}>
                    <MoreOptions options={arrayOptions} />
                </Box>
                
                </Box>
                
                
            </Box>
        </>
     );
}
 
export default HeadSection;