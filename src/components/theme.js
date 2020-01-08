import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7c43bd',
      main: '#4a148c',
      dark: '#12005e',
      contrastText: '#fff'
    },
    secondary: {
      light: '#fff350',
      main: '#ffc107',
      dark: '#c79100',
      contrastText: '#000'
    },
    type: 'light'
  },
  typography: {
    useNextVariants: true
  },
  zIndex: { drawer: 0 }
});

export default theme;
