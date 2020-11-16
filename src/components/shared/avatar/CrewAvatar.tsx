import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

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

const CrewAvatar = forwardRef(
  ({ type, inline, className, ...rest }: Props, ref): JSX.Element => {
    const classes = useStyles();

    const avatar = (
      <Avatar
        ref={ref}
        src="/impostor.png"
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
  },
);

export default CrewAvatar;
