
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const bodyColor = "#546e7a"
const titleColor = "#2C4958"
const linkColor = "#067134"

// https://mui.com/material-ui/customization/default-theme/#explore
// https://bareynol.github.io/mui-theme-creator/


// Create a theme instance.
const theme = createTheme({
  palette: {
    mode:'light',
    primary: {
      main: '#2A9858',
      contrastText: '#fff'
    },
    secondary: {
      main: '#028270',
    },
    error: {
      main: red.A400,
    },
    background: {
      default:'#F8FAFD',

    },
    fayerwayer: {
        primary:{
            main: '#ff3200',
        }
    },
    nuevamujer: {
        primary:{
            main: '#4abfbf',
        }
    },
    autosrpm: {
        primary:{
            main: '#CD192C',
        }
    },

  },
  typography: {
    color: bodyColor
  }
});

export default theme;