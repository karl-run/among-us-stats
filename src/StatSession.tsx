import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/PlusOne";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { RootState } from "./redux";
import Checkbox from "@material-ui/core/Checkbox";
import { Game, Player, statsSlice } from "./reducers";
import { Avatar, IconButton, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DoneIcon from "@material-ui/icons/Done";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import DialogActions from "@material-ui/core/DialogActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InfoIcon from "@material-ui/icons/Info";

import crewmate from "./crewmate.png";
import impostor from "./impostor.png";

const useStyles = makeStyles({
  table: {},
});

const StatSession = (): JSX.Element => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.stats.session);

  if (!session) return <div>No session</div>;

  return (
    <Box pt={4}>
      <Paper>
        <Toolbar>
          <Typography variant="h5" style={{ flex: "1 1 100%" }}>
            Among Us Stats Tracker
          </Typography>
          <Tooltip title="New game">
            <Button
              endIcon={<AddIcon />}
              aria-label="add new game"
              onClick={() => {
                dispatch(statsSlice.actions.newGame());
              }}
              style={{ minWidth: "150px" }}
            >
              Add a game
            </Button>
          </Tooltip>
        </Toolbar>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  width="20%"
                  style={{ minWidth: "250px" }}
                  align="center"
                >
                  Player
                </TableCell>
                {session.games.map((game, index) => (
                  <TableCell
                    key={index}
                    width="10%"
                    style={{ minWidth: "100px" }}
                    align="center"
                  >
                    Game {index + 1}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {session.players.map((player) => (
                <TableRow key={player.name}>
                  <TableCell component="th" scope="row">
                    <ListItem>
                      <PlayerAvatar player={player} />
                      <ListItemText
                        primary={player.name}
                        secondary={`${Math.round(
                          player.impostorRate * 100
                        )}% impostor
                      `}
                      />
                    </ListItem>
                  </TableCell>
                  {session.games.map((game, index) => {
                    return (
                      <TableCell key={game.gameId} align="center" width="10%">
                        <Tooltip title="Set impostor status in game">
                          <Checkbox
                            checked={game.impostors.includes(player.name)}
                            onChange={() => {
                              dispatch(
                                statsSlice.actions.toggleImpostor({
                                  gameId: game.gameId,
                                  player: player.name,
                                })
                              );
                            }}
                            color="secondary"
                          />
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                  <TableCell />
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center">
                  <NewPlayerButton />
                </TableCell>
                {session.games.map((game) => (
                  <CompleteGameButton key={game.gameId} game={game} />
                ))}
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
          <Box p={2} display="flex">
            <Box pr={2}>
              <Tooltip title="Games won by impostors">
                <Badge
                  badgeContent={
                    session.games
                      .map((it) => it.winner)
                      .filter((it) => it === "impostor").length
                  }
                  color="secondary"
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar src={impostor} />
                </Badge>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title="Games won by crew">
                <Badge
                  badgeContent={
                    session.games
                      .map((it) => it.winner)
                      .filter((it) => it === "crew").length
                  }
                  color="secondary"
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar src={crewmate} />
                </Badge>
              </Tooltip>
            </Box>
          </Box>
        </TableContainer>
      </Paper>
      <Box m={2} display="flex" justifyContent="space-between">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ opacity: 0.7 }}
        >
          <Box mr={1} pt={0.5}>
            <InfoIcon />
          </Box>
          <Typography variant="subtitle2">
            Remember to mark the winners for each game by clicking the tick mark
            below a game
          </Typography>
        </Box>
        <Tooltip title="DANGER! No warning will pop up">
          <Button
            endIcon={<DeleteForeverIcon />}
            onClick={() => {
              dispatch(statsSlice.actions.resetSession());
            }}
          >
            Clear everything
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

function PlayerAvatar({ player }: { player: Player }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemAvatar>
        <IconButton
          aria-controls="player-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar>{player.name.slice(0, 2).toUpperCase()}</Avatar>
        </IconButton>
      </ListItemAvatar>
      <Menu
        id="player-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(statsSlice.actions.removePlayer(player.name));
          }}
        >
          Remove
        </MenuItem>
      </Menu>
    </>
  );
}

function NewPlayerButton() {
  const dispatch = useDispatch();
  const [show, set] = useState(false);
  const [value, setValue] = React.useState("");
  const newPlayers = value.split(",").filter((it) => !!it);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const addPlayers = () => {
    dispatch(statsSlice.actions.newPlayers(newPlayers));
    set(false);
    setValue("");
  };

  return (
    <>
      <Tooltip title="Add players">
        <Button
          aria-label="add new player"
          onClick={() => {
            set(true);
          }}
        >
          Add players
        </Button>
      </Tooltip>
      {show && (
        <Dialog
          onClose={() => set(false)}
          aria-labelledby="simple-dialog-title"
          open
        >
          <DialogTitle id="simple-dialog-title">Add players</DialogTitle>
          <Box p={2} pt={0}>
            <TextField
              color="primary"
              id="standard-basic"
              label="Players to add"
              helperText="Separated by commas"
              value={value}
              onChange={handleChange}
              onKeyDown={(event) => {
                console.log(event.key);
                if (event.key === "Enter") {
                  event.preventDefault();
                  addPlayers();
                }
              }}
              fullWidth
            />
          </Box>
          <Box
            p={2}
            pt={0}
            display="flex"
            flexWrap="wrap"
            style={{ maxWidth: "350px" }}
          >
            {newPlayers.map((it) => (
              <Box key={it} mr={1} mt={1}>
                <Chip label={it} />
              </Box>
            ))}
          </Box>
          <DialogActions>
            <Button onClick={() => set(false)}>Cancel</Button>
            <Button color="secondary" onClick={addPlayers}>
              Add {newPlayers.length} players
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

function CompleteGameButton({ game }: { game: Game }) {
  const dispatch = useDispatch();
  const [show, set] = useState(false);

  return (
    <>
      <TableCell align="center">
        <Tooltip title="Set winner">
          <IconButton aria-label="add new game" onClick={() => set(true)}>
            {game.winner === "impostor" && <Avatar src={impostor} />}
            {game.winner === "crew" && <Avatar src={crewmate} />}
            {game.winner === null && <DoneIcon />}
          </IconButton>
        </Tooltip>
      </TableCell>
      {show && (
        <Dialog
          onClose={() => set(false)}
          aria-labelledby="simple-dialog-title"
          open
        >
          <DialogTitle id="simple-dialog-title">Who won?</DialogTitle>
          <List>
            <ListItem
              autoFocus
              button
              onClick={() => {
                dispatch(
                  statsSlice.actions.finishGame({
                    gameId: game.gameId,
                    winner: "impostor",
                  })
                );
                set(false);
              }}
            >
              <ListItemAvatar>
                <Avatar src={impostor} />
              </ListItemAvatar>
              <ListItemText primary="Impostor" />
            </ListItem>
            <ListItem
              autoFocus
              button
              onClick={() => {
                dispatch(
                  statsSlice.actions.finishGame({
                    gameId: game.gameId,
                    winner: "crew",
                  })
                );
                set(false);
              }}
            >
              <ListItemAvatar>
                <Avatar src={crewmate} />
              </ListItemAvatar>
              <ListItemText primary="Crewmates" />
            </ListItem>
            <ListItem
              autoFocus
              button
              onClick={() => {
                dispatch(
                  statsSlice.actions.finishGame({
                    gameId: game.gameId,
                    winner: null,
                  })
                );
                set(false);
              }}
            >
              <ListItemAvatar>
                <Avatar>?</Avatar>
              </ListItemAvatar>
              <ListItemText primary="No one" />
            </ListItem>
          </List>
        </Dialog>
      )}
    </>
  );
}

export default StatSession;
