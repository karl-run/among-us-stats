import Tab from '@material-ui/core/Tab';
import React from 'react';
import Link, { LinkProps } from 'next/link';

interface LinkTabProps {
  label: string;
  to: LinkProps['to'];
}

function LinkTab({ to, label }: LinkTabProps): JSX.Element {
  return (
    <Link href={to} passHref>
      <Tab label={label} />
    </Link>
  );
}

export default LinkTab;
