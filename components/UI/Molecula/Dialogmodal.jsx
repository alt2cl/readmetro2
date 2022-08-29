import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

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
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>

            {props.children}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>onCloseModal()}>
            Disagree
          </Button>
          <Button onClick={()=>onCloseModal()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    )

}

