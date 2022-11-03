import { createTheme } from '@mui/material/styles';

const appYellow = '#FCC436';
const appPurple = '#41197F';

const theme = createTheme({
  palette: {
    primary: {
      main: appYellow,
    },
    secondary: {
      main: appPurple,
    },
  },
});

export default theme;
