import React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

interface Props extends Pick<ButtonProps, 'onClick' | 'startIcon' | 'endIcon' | 'disabled'> {
  text: string;
  label: string;
  noBreak?: boolean;
  size?: IconButtonProps['size'];
}

function BreakpointButton({
  text,
  onClick,
  startIcon,
  endIcon,
  disabled,
  label,
  size,
  noBreak = false,
}: Props): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  if (isSmallDevice && !noBreak) {
    return (
      <Tooltip title={label}>
        <IconButton aria-label={label} onClick={onClick} size={size} disabled={disabled}>
          {startIcon ?? endIcon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={label}>
      <span>
        <Button
          startIcon={startIcon}
          endIcon={endIcon}
          onClick={onClick}
          aria-label={label}
          size={size}
          disabled={disabled}
        >
          {text}
        </Button>
      </span>
    </Tooltip>
  );
}

export default BreakpointButton;
