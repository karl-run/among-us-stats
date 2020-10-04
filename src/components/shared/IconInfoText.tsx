import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

interface Props {
  text: string;
  icon: JSX.Element;
  opacity?: number;
}

function IconInfoText({ icon, text, opacity = 0.7 }: Props): JSX.Element {
  return (
    <Box display="flex" alignItems="center" style={{ opacity }}>
      <Box mr={1} pt={0.5} pl={1}>
        {icon}
      </Box>
      <Typography variant="subtitle2">{text}</Typography>
    </Box>
  );
}

export default IconInfoText;
