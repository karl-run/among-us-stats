import React from 'react';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';

import TableContainer from './table/TableContainer';
import Footer from './Footer';

const Stats = (): JSX.Element => {
  return (
    <Container maxWidth="xl">
      <Box pt={4}>
        <TableContainer />
        <Footer />
      </Box>
    </Container>
  );
};

export default Stats;
