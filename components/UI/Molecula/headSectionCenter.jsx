import { Box, Typography } from '@mui/material';


const HeadSectionCenter = (props) => {

    const {title, link} = props

    return(
        <Box sx={{display:'flex', justifyContent:'center', mb:'3rem'}}>
            <Typography variant={'h6'}>
                {title}
            </Typography>
        </Box>
    )

}
 
export default HeadSectionCenter;