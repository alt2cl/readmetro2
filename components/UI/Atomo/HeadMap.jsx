import Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";


const HeadMap = ({title, link}) => {
    return(
        <Box sx={{
            backgroundColor:(theme)=> `${theme.palette.gray.level1}`,
            borderRadius:'5px',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '10px 30px',
            position: 'relative',
            marginBottom: '3rem',
            borderTop: '1px solid #fff',
            width: 'fit-content',
            margin: '0 auto 3rem',
            '&:before':{
                content:'""',
                borderLeft: (theme)=> `14px solid transparent`,
                borderRight: (theme)=>  `14px solid transparent`,
                borderTop: (theme)=> `16px solid ${theme.palette.gray.level1}`,
                width: '28px',
                bottom:'-15px',
                left: '0px',
                right:  '0px',
                position:'absolute',
                left: '50%',
                marginLeft: '-14px',
            },

            '&:after': {
                content:'""',
                position:'absolute',
                width:'90%',
                height: 'calc(100% - 30px)',
                backgroundColor:(theme)=> `${theme.palette.shadow.dark}`,
                borderRadius:'110px',
                filter: 'blur(15px)',
                zIndex: '-1',
                bottom:'-18px',
                left:'5%',



            }
            }}>
                    <Typography variant={"h6"} display={"block"} >
                        {title}
                    </Typography>
              
            
        </Box>
        

    )
}

export default HeadMap