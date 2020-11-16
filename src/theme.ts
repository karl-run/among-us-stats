import { createMuiTheme } from '@material-ui/core';
import common from '@material-ui/core/colors/common';
import grey from '@material-ui/core/colors/grey';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fede29',
    },
    secondary: {
      main: '#f31717',
    },
    type: 'dark',
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: common['white'],
        backgroundColor: grey['800'],
      },
    },
  },
});
