import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';

import { getSession } from '../../../store/stats/statsSelectors';

import TableContent from './TableContent';
import TableToolbar from './TableToolbar';
import TableFooter from './TableFooter';

function TableContainer(): JSX.Element {
  const session = useSelector(getSession);

  return (
    <Paper>
      <TableToolbar session={session} />
      <TableContent session={session} />
      <TableFooter session={session} />
    </Paper>
  );
}

export default TableContainer;
