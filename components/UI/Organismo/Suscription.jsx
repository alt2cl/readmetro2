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
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import axios from 'axios';



export default  function Suscription(data) {


    const [state, setState] = React.useState({ mail: true});
    const [suscripcion, setSuscripcion] = React.useState({});
    const [pais, setPais] = React.useState(typeof(data.data.countryslug) != "undefined" ? data.data.countryslug : data.data.country.countryslug);
    const [errorNombre, setErrorNombre] = React.useState(false);
    const [errorApellido, setErrorApellido] = React.useState(false);
    const [errorCorreo, setErrorCorreo] = React.useState(false);
    const [errorEdition, setErrorEdition] = React.useState(false);
    const [errorPlataforma, setErrorPlataforma] = React.useState(false);

    const [alertText, setAlerttext] = React.useState("Estas suscrito, revisa tu casilla de correo!");
    const [alertseverity, setAlertseverity] = React.useState("success");
    const [alertopen, setAlertopen] = React.useState(false);


    const handleChangeSub = (event) => {
      setSuscripcion({
        ...suscripcion,
        [event.target.name]: event.target.checked,
      });
    };
    const handleChange= (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };
    const validateEmail = (email) => {
      const emailRegex = new RegExp(/^\S+@\S+\.\S+$/, "gm");
      return !emailRegex.test(email);
    };
    const handleChangeInfo= (event) => {
      if(event.target.name == "correo" && validateEmail(event.target.value)){
          setErrorCorreo(true);
          return false;
      }else{
          setErrorCorreo(false);
      }
      if(event.target.name == "nombre" && event.target.value.length <= 3){
          setErrorNombre(true);
          return false;
      }else{
          setErrorNombre(false);
      }
      if(event.target.name == "apellido" && event.target.value.length <= 3){
          setErrorApellido(true);
          return false;
      }else{
          setErrorApellido(false);
      }
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    };

    const enviarSuscripcion = (e) => {

      e.preventDefault();

      console.log("data to send",{  suscripcion: suscripcion, state: state, pais:pais  });
      if(state.nombre == undefined){
        setErrorNombre(true);
        return false;
      }
      if(state.apellido == undefined){
        setErrorApellido(true);
        return false;
      }
      if(state.correo == undefined){
        setErrorCorreo(true);
        return false;
      }

      if(Object.keys(suscripcion).length === 0){
        setErrorEdition(true);
      }else{
        setErrorEdition(false);

        if(!errorNombre && !errorApellido && !errorCorreo){
          console.log("enviando",errorNombre,errorApellido,errorCorreo);
          axios.post('https://sub.readmetro.com/', {  suscripcion: suscripcion, state: state, pais:pais  } )
          .then(res => {
            console.log('res', res.data);
            if(res.data.includes("correcto")){
              setAlerttext("Listo!, Revisa tu casilla de correo para confirmar la suscripción!");
              setAlertseverity("success");
            }else{
              setAlerttext("Error al suscribir, intentalo más tarde!");
              setAlertseverity("error");
            }
            setAlertopen(true);
          })
          .catch(err => {
            console.log('error in request', err);
          });
        }

      }



    };



    var tuDate1 = new Date();
    tuDate1.setMonth(tuDate1.getMonth() - 3);
    let listado = [];

    if(data.data.cities != undefined){
      data.data.cities.forEach((city, i) => {
        // console.log("gg",city);

        const fechapub = city.allEditions[0].date+ ' 00:00:00';
        var tuDate2 = new Date(fechapub);

        var a = new Date(tuDate1.getFullYear(),tuDate1.getMonth(),tuDate1.getDate(),tuDate1.getUTCDate());
        var b = new Date(tuDate2.getFullYear(),tuDate2.getMonth(),tuDate2.getDate(),tuDate1.getUTCDate());

        if(a <= b){
          listado.push(<FormControlLabel
              control={
              <Checkbox onChange={handleChangeSub} name={city.cityslug}  />
              }
              label={city.cityname}
          />);
        }else{
          console.log(city.cityname,"tiene que tener fecha mayor a",a.toLocaleDateString(),"y tiene",b.toLocaleDateString());
        }



      });
    }
    if(data.data.cityslug != undefined){

          const city = data.data;
          const fechapub = city.allEditions[0].date+ ' 00:00:00';
          var tuDate2 = new Date(fechapub);

          var a = new Date(tuDate1.getFullYear(),tuDate1.getMonth(),tuDate1.getDate(),tuDate1.getUTCDate());
          var b = new Date(tuDate2.getFullYear(),tuDate2.getMonth(),tuDate2.getDate(),tuDate1.getUTCDate());

          if(a <= b){
            listado.push(<FormControlLabel
                control={
                <Checkbox onChange={handleChangeSub} name={city.cityslug}  />
                }
                label={city.cityname}
            />);
          }else{
            console.log(city.cityname,"tiene que tener fecha mayor a",a.toLocaleDateString(),"y tiene",b.toLocaleDateString());
          }
    }


    if(listado.length === 0){
      return null;
    }
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
                        <FormControl sx={{ m: 3 }} error={errorEdition} component="fieldset" variant="standard">
                            <FormGroup sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column'}}}>
                                {listado}
                            </FormGroup>
                            <FormHelperText>{errorEdition ? 'Error: Selecciona al menos una edición.' : ''}</FormHelperText>

                        </FormControl>
                    </Box>
                </Box>

            </Box>
            <Box>
                <Box sx={{display:'flex', flexDirection: {xs:'column', sm:'row'}}} component="form" noValidate autoComplete="off">
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>
                            <TextField id="inputNombre" error={errorNombre} helperText={errorNombre ? 'Error: Ingresa un nombre valido.' : ''} label="Nombre" variant="outlined" name="nombre" fullWidth onChange={handleChangeInfo} />
                        </Box>
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>
                            <TextField id="inputApellido" error={errorApellido} helperText={errorApellido ? 'Error: Ingresa un apellido valido.' : ''} label="Apellido" variant="outlined" name="apellido" fullWidth onChange={handleChangeInfo} />
                        </Box>
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>
                            <TextField id="inputMail" error={errorCorreo} helperText={errorCorreo ? 'Error: Ingresa un correo valido.' : ''} label="Mail" variant="outlined" name="correo" fullWidth onChange={handleChangeInfo} />
                        </Box>

                        <Box sx={{flexGrow: '1'}}>
                            <Button variant="contained" fullWidth onClick={(e) => enviarSuscripcion(e)}>Suscribir</Button>
                        </Box>

                </Box>
                <Box sx={{ p: 1 }} noValidate autoComplete="off">
                  <Collapse in={alertopen}>
                    <Alert severity={alertseverity} >{alertText}</Alert>
                  </Collapse>
                </Box>


            </Box>
        </Box>

        </AccordionDetails>
        </Accordion>

    )

}
