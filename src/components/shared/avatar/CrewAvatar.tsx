import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import impostorImage from './impostor.png';

interface Props extends Omit<AvatarProps, 'src' | 'alt'> {
  type: 'crew' | 'impostor';
  inline?: boolean;
}

const useStyles = makeStyles((theme) => ({
  crew: {
    filter: 'hue-rotate(154deg) brightness(1.3) saturate(1.7)',
  },
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
      src={impostorImage}
      className={`${className} ${inline ? classes.inline : ''}`}
      classes={{
        img: `${type === 'crew' ? classes.crew : ''}`,
      }}
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
