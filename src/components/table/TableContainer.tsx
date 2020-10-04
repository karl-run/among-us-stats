import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/redux';

import TableContent from './TableContent';
import TableToolbar from './TableToolbar';
import TableFooter from './TableFooter';

TableContainer.propTypes = {};

function TableContainer(): JSX.Element {
  const session = useSelector((state: RootState) => state.stats.session);

  return (
    <Paper>
      <TableToolbar />
      <TableContent session={session} />
      <TableFooter session={session} />
    </Paper>
  );
}

export default TableContainer;
