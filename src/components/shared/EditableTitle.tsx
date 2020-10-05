import { useDispatch } from 'react-redux';
import React, { ChangeEvent, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Session, statsSlice } from '../../store/statsRedux';

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: '1px solid transparent',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}));

interface Props extends Pick<TypographyProps, 'variant'> {
  session: Session;
}

function EditableTitle({ session, variant = 'h6' }: Props): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(session.name);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    dispatch(statsSlice.actions.setSessionName({ sessionId: session.sessionId, newName: value || undefined }));
    setEdit(false);
    setValue(value);
  };

  if (edit) {
    return (
      <ClickAwayListener onClickAway={handleSave}>
        <TextField
          value={value}
          onChange={handleOnChange}
          onBlur={handleSave}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSave();
            }
          }}
          autoFocus
        />
      </ClickAwayListener>
    );
  }

  return (
    <Typography
      onClick={() => {
        setEdit(true);
      }}
      variant={variant}
      className={classes.title}
    >
      {session.name ?? 'Unnamed session'}
    </Typography>
  );
}

export default EditableTitle;
