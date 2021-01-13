import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import impostorImage from './impostor.png';
import crewImage from './crew.png';

interface Props extends Omit<AvatarProps, 'src' | 'alt'> {
  type: 'crew' | 'impostor';
  inline?: boolean;
}

const useStyles = makeStyles((theme) => ({
  inlineRoot: {
    display: 'inline-flex',
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
  },
  inline: {
    width: `${theme.spacing(2)}px !important`,
    height: `${theme.spacing(2)}px !important`,
  },
}));

const CrewAvatar = ({ type, inline, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  const avatar = (
    <Avatar
      src={type === 'crew' ? crewImage : impostorImage}
      className={`${className} ${inline ? classes.inline : ''}`}
      alt={`avatar of ${type}`}
      {...rest}
    />
  );

  if (!inline) {
    return avatar;
  }

  return <Box className={classes.inlineRoot}>{avatar}</Box>;
};

export default CrewAvatar;
