import Tab from '@material-ui/core/Tab';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface LinkTabProps {
  label: string;
  to: LinkProps['to'];
}

function LinkTab({ to, label }: LinkTabProps): JSX.Element {
  return <Tab component={Link} to={to} label={label} />;
}

export default LinkTab;
