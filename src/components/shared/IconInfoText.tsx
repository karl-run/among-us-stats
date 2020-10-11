import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography, TypographyProps } from '@material-ui/core';

interface Props {
  text: string;
  icon: JSX.Element;
  variant?: TypographyProps['variant'];
  opacity?: number;
}

function IconInfoText({ icon, text, variant = 'subtitle2', opacity = 0.7 }: Props): JSX.Element {
  return (
    <Box display="flex" alignItems="center" style={{ opacity }}>
      <Box mr={1} pt={0.5} pl={1}>
        {icon}
      </Box>
      <Typography variant={variant}>{text}</Typography>
    </Box>
  );
}

export default IconInfoText;
