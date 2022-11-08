import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PropaneSharp } from '@mui/icons-material';
import Link from '@/src/Link';

export default function BasicMenu(props) {
    const {options} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{minWidth: '40px'}}
      >
        < MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
            options &&
            options.map((data)=> (
                <MenuItem key={data.item} onClick={handleClose} >
                  <Link href={data.link} target={data.target ? data.target : '_top'}>
                  {data.item}
                  </Link>
                </MenuItem>
            ))
        }
     
      </Menu>
    </div>
  );
}
