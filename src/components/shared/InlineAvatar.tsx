import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
  },
  avatar: {
    width: `18px`,
    height: `18px`,
  },
}));

interface Props {
  src: string;
}

function InlineAvatar({ src }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Avatar src={src} className={classes.avatar} />
    </Box>
  );
}

export default InlineAvatar;
