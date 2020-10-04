import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    opacity: 0.2,
  },
}));

function Watermark(): JSX.Element {
  const classes = useStyles();

  return <Box className={classes.root}>Tracked with impostor.rl.run</Box>;
}

export default Watermark;
