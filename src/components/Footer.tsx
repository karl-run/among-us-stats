import React from 'react';
import Box from '@material-ui/core/Box';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

import IconInfoText from './shared/IconInfoText';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  clearButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(8),
    },
  },
}));

function Footer(): JSX.Element {
  const classes = useStyles();

  return (
    <Box m={2} display="flex" justifyContent="space-between" className={classes.wrapper}>
      <IconInfoText
        text="Remember to mark the winners for each game by clicking the tick mark below a game"
        icon={<InfoIcon />}
      />
    </Box>
  );
}

export default Footer;
