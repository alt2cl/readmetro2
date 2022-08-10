import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ mr: 1, minWidth: 180 }} size="small">
      <InputLabel id="demo-select-small"> Ciudad de México</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Ciudad de México"
        onChange={handleChange}
        
      >
        <MenuItem value="">
          <em>Ciudad de Mexico</em>
        </MenuItem>
        <MenuItem value={10}>Chiapas</MenuItem>
        <MenuItem value={20}>Guerrero</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
