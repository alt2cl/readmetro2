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
import {useSelector} from 'react-redux'


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

    const langData = useSelector(state => state.lang.dataCurrentLang)

    


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
              setAlerttext(langData.listWords.suscription.success);
              setAlertseverity("success");
            }else{
              setAlerttext(langData.listWords.suscription.errorSuscription);
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

    console.log('data.data.cities:',data.data.cities)


    if(data.data.cities != undefined){
      data.data.cities.forEach((city, i) => {


        // console.log("gg",city);

        if(city.allEditions.length > 0) {
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
        <Accordion sx={{ 
          mb: '3rem', 
          background: 'transparent', 
          border: (theme) => `2px dashed ${theme.palette.gray.level2}`, 
          boxShadow: 'none', 
          borderRadius: '5px'}}>
            <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundImage:'url("/img/bgSuscription.png")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top center',
                    backgroundSize:' auto 70px',
                  
                  }}
              >
                  <Box sx={{display:'flex', flexDirection:'column'}}>
                      <Typography sx={{color: (theme)=> theme.palette.primary.main}} variant="caption">{langData.listWords.suscription.excerpt}</Typography>
                      <Typography variant="h6" sx={{fontSize: ['1rem','1.2rem']}}>{langData.listWords.suscription.title}</Typography>
                  </Box>
          </AccordionSummary>
        <AccordionDetails>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', mb:'1rem',  flexDirection: {xs: 'column', sm: 'row'}}}>
                <Box sx={{border: '1px dashed #ccc',p: '10px', flexGrow: '1', borderRadius: {xs: '5px 5px 0px 0px', sm: '5px'}  }}>
                    <Box>{langData.listWords.suscription.instructions1}</Box>
                    <Box>
                        <FormControl sx={{ m: 3 }} error={errorEdition} component="fieldset" variant="standard">
                            <FormGroup sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column'}}}>
                                {listado}
                            </FormGroup>
                            <FormHelperText>{errorEdition ? langData.listWords.suscription.errorEdition : ''}</FormHelperText>

                        </FormControl>
                    </Box>
                </Box>

            </Box>
            <Box>
                <Box sx={{display:'flex', flexDirection: {xs:'column', sm:'row'}}} component="form" noValidate autoComplete="off">
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>
                            <TextField id="inputNombre" error={errorNombre} helperText={errorNombre ? langData.listWords.suscription.errorName : ''} label={langData.listWords.suscription.name} variant="outlined" name="nombre" fullWidth onChange={handleChangeInfo} />
                        </Box>
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>
                            <TextField id="inputApellido" error={errorApellido} helperText={errorApellido ? langData.listWords.suscription.errorlastName : ''} label={langData.listWords.suscription.lastName} variant="outlined" name="apellido" fullWidth onChange={handleChangeInfo} />
                        </Box>
                        <Box sx={{flexGrow: '2', pr: {sm:'1rem'}, mb: {xs:'1rem', sm: '0px'}}}>
                            <TextField id="inputMail" error={errorCorreo} helperText={errorCorreo ? langData.listWords.suscription.errorMail : ''} label={langData.listWords.suscription.mail} variant="outlined" name="correo" fullWidth onChange={handleChangeInfo} />
                        </Box>

                        <Box sx={{flexGrow: '1'}}>
                            <Button variant="contained" fullWidth onClick={(e) => enviarSuscripcion(e)}>{langData.listWords.suscription.callBtn}</Button>
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
