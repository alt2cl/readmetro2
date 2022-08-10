import { Box, Typography } from '@mui/material';
import Link from 'next/link'
import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';


const HeadWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  }));




const HeadSection = (props) => {
    const {slug, colorBullet, titleSection, options} = props;

    return ( 
        <>
            <HeadWrapper className="headSection">
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
                {options?
                    <Box sx={{display: 'flex', alignItems:'center'}}>
                        {options}
                    </Box>
                    :
                    null
                }
                
            </HeadWrapper>
        </>
     );
}
 
export default HeadSection;