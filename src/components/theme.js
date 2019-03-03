import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6ab7ff',
      main: '#1e88e5',
      dark: '#005cb2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#60ad5e',
      main: '#2e7d32',
      dark: '#005005',
      contrastText: '#000',
    },
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
  zIndex: { drawer: 0 },
});

export default theme;
