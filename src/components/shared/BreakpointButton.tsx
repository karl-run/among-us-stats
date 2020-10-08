import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import ExternalLink from '@material-ui/core/Link';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

interface Props extends Pick<ButtonProps, 'onClick' | 'startIcon' | 'endIcon'> {
  text: string;
  label: string;
  noBreak?: boolean;
  size?: IconButtonProps['size'];
}

function BreakpointButton({ text, onClick, startIcon, endIcon, label, size, noBreak = false }: Props): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  if (isSmallDevice && !noBreak) {
    return (
      <Tooltip title={label}>
        <IconButton aria-label={label} onClick={onClick} size={size}>
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
        size={size}
        style={{ minWidth: '150px' }}
      >
        {text}
      </Button>
    </Tooltip>
  );
}

type LinkButtonProps = Omit<Props, 'onClick'> &
  Pick<LinkProps, 'to'> & {
    external?: boolean;
  };

export function BreakpointLinkButton({
  text,
  to,
  startIcon,
  endIcon,
  label,
  noBreak,
  external,
}: LinkButtonProps): JSX.Element {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

  const linkProps = getLinkProps(external, to);

  if (isSmallDevice && !noBreak) {
    return (
      <Tooltip title={label}>
        <IconButton aria-label={label} {...linkProps}>
          {startIcon ?? endIcon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={label}>
      <Button startIcon={startIcon} endIcon={endIcon} aria-label={label} {...linkProps} style={{ minWidth: '150px' }}>
        {text}
      </Button>
    </Tooltip>
  );
}

interface ExternalLinkProps {
  component: typeof ExternalLink;
  href: string;
  target: '_blank';
  rel: string;
}

interface InternalLinkProps {
  component: typeof Link;
  to: LinkButtonProps['to'];
}

function getLinkProps(external: boolean | undefined, to: LinkButtonProps['to']): InternalLinkProps | ExternalLinkProps {
  if (external) {
    return {
      component: ExternalLink,
      href: `${to}`,
      target: '_blank',
      rel: 'noreferrer noopener',
    };
  }

  return {
    component: Link,
    to,
  };
}

export default BreakpointButton;
