import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useDispatch } from 'react-redux'
import { updateTriggeranchorSlice } from "@/redux/features/anchorsection/anchorsectionSlice"




const AnchorSection = ({listNames }) => {

const dispatch = useDispatch()

const handleDispatch = (i) => {
    console.log('div has anchor section', i)
    dispatch(updateTriggeranchorSlice(i))
}
    

    return(
        <Box sx={{ justifyContent:['left','center'],
            display: 'flex',
            overflowX: 'scroll',
            overflowY: 'hidden',
            padding: '0px',
            transition: 'all 1s ease',
            mb: '2rem',
            //'-webkit-overflow-scrolling': 'touch',
            webkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollPadding: '0 0 0 0',
            scrollBehavior: 'smooth',
            backgroundColor: (theme) => theme.palette.shadow.menu,
            //backgroundImage: 'linear-gradient(to right, #f8fafd, #f1f4f8, #eaedf3, #e3e7ef, #dce1ea, #dce1ea, #dce1ea, #dce1ea, #e3e7ef, #eaedf3, #f1f4f8, #f8fafd)',
}}>
            {listNames.map((item, i)=>{
                return <Button onClick={()=>handleDispatch(i)} sx={{ whiteSpace: 'nowrap', flex: 'none', color: '#fff'}} key={'buttonanchor-'+i}>
                    {item}
                </Button>
            })}
            
            
        </Box>
    )

}

export default AnchorSection