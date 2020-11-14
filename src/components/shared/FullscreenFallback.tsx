import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: theme.spacing(48),
  },
}));

function FullscreenFallback(): JSX.Element {
  const classes = useStyles();

  return (
    <Paper>
      <Box className={classes.box}>
        <CircularProgress />
      </Box>
    </Paper>
  );
}

export default FullscreenFallback;
