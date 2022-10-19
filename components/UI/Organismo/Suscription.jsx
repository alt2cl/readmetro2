import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default  function Suscription() {

    const [state, setState] = React.useState({
        publimetro: true,
        autos: false,
        nuevamujer: false,
        mail:false,
        telegram: false,
        whatsapp: false
      });

    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

      const { publimetro, autos, nuevamujer, mail, telegram, whatsapp } = state;
      const error = [publimetro, autos, nuevamujer, mail, telegram, whatsapp].filter((v) => v).length !== 2;



    return (
        <Accordion sx={{mt:'2rem', mb: '3rem'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box sx={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="caption">Directo en tus plataformas</Typography>
                    <Typography variant="h6">Suscríbete a nuestras ediciones AQUÍ</Typography>
                </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', mb:'1rem',  flexDirection: {xs: 'column', sm: 'row'}}}>
                <Box sx={{border: '1px dashed #ccc',p: '10px', flexGrow: '1', borderRadius: {xs: '5px 5px 0px 0px', sm: '5px'}  }}>
                    <Box>Selecciones las ediciones que desea recibir y cuando:</Box>
                    <Box>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column'}}}>
                                <Box sx={{display: 'flex', flexDirection:'column'}}>
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={publimetro} onChange={handleChange} name="publimetro" />
                                        }
                                        label="Publimetro"
                                    />


                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="frecuencia"
                                            defaultValue="diario"
                                            name="frecuencia"
                                            sx={{display:'flex', flexDirection: 'row'}}
                                        >
                                            <FormControlLabel value="diario" control={<Radio />} label="Diario" />
                                            <FormControlLabel value="semanal" control={<Radio />} label="Semanal" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                
                                    
                            

                                <FormControlLabel
                                    control={
                                    <Checkbox checked={autos} onChange={handleChange} name="autos" />
                                    }
                                    label="Autos RPM"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox checked={nuevamujer} onChange={handleChange} name="nuevamujer" />
                                    }
                                    label="Nueva Mujer"
                                />
                            </FormGroup>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{border: '1px dashed #ccc', borderRadius: {xs: ' 0px 0px 5px 5px', sm: '5px'} , p: '10px', ml: {xs:'0px', sm: '1rem'} , flexGrow: '1'}}>
                    <Box>Selecciona tus plataformas favoritas</Box>
                    <Box>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup sx={{display: 'flex', flexDirection: {xs: 'row', sm: 'column'}}}>
                                <FormControlLabel
                                    control={
                                    <Checkbox checked={mail} onChange={handleChange} name="mail" />
                                    }
                                    label="Mail"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox checked={telegram} onChange={handleChange} name="telegram" />
                                    }
                                    label="Telegram"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox checked={whatsapp} onChange={handleChange} name="whatsapp" />
                                    }
                                    label="Whatsapp"
                                />
                            </FormGroup>
                        </FormControl>

                    </Box>
                </Box>
            </Box>
            <Box>
                <Box sx={{display:'flex', flexDirection: {xs:'column', sm:'row'}}} component="form" noValidate autoComplete="off">
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>      
                            <TextField id="inputNombre" label="Nombre" variant="outlined" fullWidth />
                        </Box>
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>      
                            <TextField id="inputMail" label="Mail" variant="outlined" fullWidth />
                        </Box>
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>      
                            <TextField id="inputTelefono" label="Telefono" variant="outlined"  fullWidth
                            inputprops={{
                                startAdornment: <InputAdornment position="start">+56 9</InputAdornment>,
                            }} />
                        </Box>
                        <Box sx={{flexGrow: '1'}}>
                            <Button variant="contained" fullWidth>Suscribir</Button>
                        </Box>
                
                </Box>

            </Box>
        </Box>

        </AccordionDetails>
        </Accordion>
        
    )

}