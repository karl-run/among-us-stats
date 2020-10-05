import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  text: string;
  onClick: () => void;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  label: string;
  noBreak?: boolean;
}

function BreakpointButton({ text, onClick, startIcon, endIcon, label, noBreak = false }: Props): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  if (isSmallDevice && !noBreak) {
    return (
      <Tooltip title={label}>
        <IconButton aria-label={label} onClick={onClick}>
          {startIcon ?? endIcon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={label}>
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={onClick}
        aria-label={label}
        style={{ minWidth: '150px' }}
      >
        {text}
      </Button>
    </Tooltip>
  );
}

type LinkButtonProps = Omit<Props, 'onClick'> & Pick<LinkProps, 'to'>;

export function BreakpointLinkButton({ text, to, startIcon, endIcon, label, noBreak }: LinkButtonProps): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  if (isSmallDevice && !noBreak) {
    return (
      <Tooltip title={label}>
        <IconButton aria-label={label} component={Link} to={to}>
          {startIcon ?? endIcon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={label}>
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        aria-label={label}
        to={to}
        component={Link}
        style={{ minWidth: '150px' }}
      >
        {text}
      </Button>
    </Tooltip>
  );
}

export default BreakpointButton;
