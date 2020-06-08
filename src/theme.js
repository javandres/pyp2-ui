import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {

      main: '#252730'
    },
    secondary: {
      main: '#6b7385',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#0a0f1d',
    }
  },
});

export default theme;
