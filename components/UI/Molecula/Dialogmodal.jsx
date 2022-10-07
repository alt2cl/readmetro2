import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function Dialogmodal(props) {

    const {openModal,onCloseModal} = props

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return(
        <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'lg'}
        open={openModal}
        onClose={()=>onCloseModal()}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent sx={{padding: {xs:'0px 5px', md:'20px 24px'}}}>
          {/* <DialogContentText> */}

            {props.children}
            
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'space-between',  boxShadow: '0px -6px 10px 2px #8f91955e', position: 'relative'}}>
          <Button onClick={()=>onCloseModal()} endIcon={<ArrowUpwardIcon/>} autoFocus>
            Ir al audio en curso
          </Button>
         
        </DialogActions>
      </Dialog>
    )

}

