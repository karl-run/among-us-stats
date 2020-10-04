import React from 'react';
import Box from '@material-ui/core/Box';

import TableContainer from './table/TableContainer';
import Footer from './Footer';

const Stats = (): JSX.Element => {
  return (
    <Box pt={4}>
      <TableContainer />
      <Footer />
    </Box>
  );
};

export default Stats;
