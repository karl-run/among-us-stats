import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

import impostor from '../images/impostor.png';

function NotFound(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Box pt={4}>
        <Paper>
          <Box p={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Avatar src={impostor} />
            <Typography variant="h4">Oops, nothing to see here.</Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default NotFound;
