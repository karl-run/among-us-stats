import React, { Component } from 'react';
import GA from 'react-ga';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';

import { reportError } from '../utils/reportError';
import impostor from '../images/impostor.png';

interface Props {
  children: JSX.Element;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error): void {
    GA.exception({ description: `Error boundary: ${error.message}`, fatal: true });
    reportError('error boundary', error);
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <Box pt={2} />
          <Paper>
            <Box p={2}>
              <Box display="flex" mb={2} alignItems="center" justifyContent="center">
                <Box mr={2}>
                  <Avatar src={impostor} />
                </Box>
                <Typography variant="h5">Seems we have an impostor among us. Something went terribly wrong.</Typography>
              </Box>
              <Typography variant="body1">
                If this error persists, please submit a bug on{' '}
                <Link
                  href="https://github.com/karl-run/among-us-stats/issues/new/choose"
                  target="blank"
                  rel="noreferrer noopener"
                >
                  github
                </Link>{' '}
                or send me an email at <Link href="mailto:k@rl.run">k@rl.run</Link>
              </Typography>
              <Box mb={4} />
              <Typography variant="body2">
                If everything else fails, you can click this button to{' '}
                <Box color="red" fontWeight="bold" display="inline">
                  delete
                </Box>{' '}
                everything. Warning: This will remove ALL your sessions and games.
              </Typography>
              <Box m={8} display="flex" justifyContent="center">
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<WarningIcon />}
                  endIcon={<WarningIcon />}
                  onClick={() => {
                    localStorage.removeItem('persist:root');
                    window.location.reload();
                  }}
                >
                  DELETE ALL MY DATA
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
