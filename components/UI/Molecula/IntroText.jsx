import Typography  from '@mui/material/Typography'
import Box from '@mui/material/Box'
import introtext from '@/src/configSite'
import {useSelector} from 'react-redux'







const IntroText = () => {

  

    const langData = useSelector(state => state.lang.dataCurrentLang)

    


    return (
        <Box sx={{background: `linear-gradient(313deg, #146435, #2A9858)`, mb:'2rem', mt:'1rem', p:['1.5rem 1rem','2rem'], textAlign:'center', color: ((theme) => theme.palette.common.white), borderRadius:'4px'}} >
            <Typography variant="h6" sx={{fontWeight: '600', fontFamily: '"Bitter", serif;', lineHeight: '1.3'}}>
                {langData.listWords.introText.title}
            </Typography>
            <Typography variant="h6" sx={{fontFamily: '"Bitter", serif;', lineHeight: '1.3'}}>
                {langData.listWords.introText.subtitle}
            </Typography>
            <Typography variant="h6" sx={{fontWeight: '600', fontFamily: '"Bitter", serif;', lineHeight: '1.3'}}>
                {langData.listWords.introText.excerpt}
            </Typography>
        </Box>
    )
}

export default IntroText