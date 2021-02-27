import React from 'react';
import { TableCell, IconButton, Menu } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

import useAnchor from '../../shared/hooks/useAnchor';

import DeleteGameButton from './DeleteGameButton';

const useStyles = makeStyles((theme) => ({
  gameCell: {
    minWidth: '100px',
    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > button': {
        visibility: 'hidden',
        marginLeft: theme.spacing(1),
      },
    },
    '&:hover > div': {
      '& > button': {
        visibility: 'visible',
      },
    },
  },
}));

interface Props {
  gameId: string;
  gameNumber: number;
  isCurrentGame: boolean;
}

function TableHeaderCell({ gameId, gameNumber, isCurrentGame }: Props): JSX.Element {
  const classes = useStyles();
  const [anchorEl, anchorActions] = useAnchor();

  return (
    <TableCell className={classes.gameCell} width="150px" align="center">
      <div>
        <Typography variant={isCurrentGame ? 'body1' : 'body2'}>Game {gameNumber}</Typography>
        <IconButton size="small" onClick={anchorActions.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={anchorActions.handleClose}
        >
          <DeleteGameButton gameId={gameId} gameNumber={gameNumber} onDelete={anchorActions.handleClose} />
        </Menu>
      </div>
    </TableCell>
  );
}

export default TableHeaderCell;
