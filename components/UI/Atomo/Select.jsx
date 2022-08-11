import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall(props) {
  const [city, setCity] = React.useState('');
  const {options, defaultValue} = props

  console.log('defaultSelectoption', defaultValue)

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const opciones = options.map((menuitem) => (
    <MenuItem value={menuitem.link}>{menuitem.item}</MenuItem>

  ))

  return (
    <FormControl sx={{ mr: 1, minWidth: 180 }} size="small" fullWidth>
      {/* <InputLabel id="demo-select-small"> {defaultValue.item}</InputLabel> */}
      <Select
        id="select-city"
        value={city}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={handleChange}
      >
        <MenuItem value="">
            <em>{defaultValue.item}</em>
          </MenuItem>
        {opciones}
      </Select>
    </FormControl>
  );
}
