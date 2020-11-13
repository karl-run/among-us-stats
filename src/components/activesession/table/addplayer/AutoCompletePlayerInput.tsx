import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { Player, UUID } from '../../../../store/stats/statsRedux';

const filter = createFilterOptions<AutoCompleteOption>();

interface AutoCompleteOption {
  value: UUID | null;
  label: string;
  newPlayerName?: string;
}

export interface PlayerOption {
  playerId: UUID | null;
  name: string;
}

interface Props {
  existingPlayers: Player[];
  onChange: (options: PlayerOption[]) => void;
}

function AutoCompletePlayerInput({ existingPlayers, onChange: handleOnChange }: Props): JSX.Element {
  const [autoCompleteValue, setAutoComplete] = React.useState<AutoCompleteOption[]>([]);

  const existingPlayersToSuggest: AutoCompleteOption[] = existingPlayers.map((it) => ({
    value: it.playerId,
    label: it.name,
  }));
  const freshPlayers: AutoCompleteOption[] = autoCompleteValue.filter((it) => it.value == null);

  useEffect(() => {
    handleOnChange(
      autoCompleteValue.map(
        (it): PlayerOption => {
          const name = it.newPlayerName ?? it.value;
          if (!name) throw Error('Illegal state: No name for player');
          return {
            playerId: it.value,
            name: name,
          };
        },
      ),
    );
  }, [autoCompleteValue]);

  return (
    <Autocomplete
      id="add-players"
      multiple
      disableCloseOnSelect
      openOnFocus
      value={autoCompleteValue}
      onChange={(event, newValue) => {
        const cleanedValues = newValue.map(
          (value): AutoCompleteOption => {
            if (typeof value === 'string') {
              return {
                value: null,
                label: `New player: ${value}`,
                newPlayerName: value,
              };
            }
            return value;
          },
        );
        setAutoComplete([...cleanedValues]);
      }}
      getOptionLabel={(option) => option.newPlayerName ?? option.label}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            value: null,
            label: `New player: ${params.inputValue}`,
            newPlayerName: params.inputValue,
          });
        }

        return filtered;
      }}
      getOptionSelected={(option) => {
        return option.value == null
          ? !!autoCompleteValue.find((it) => it.label === option.label)
          : !!autoCompleteValue.find((it) => it.value === option.value);
      }}
      options={[...freshPlayers, ...existingPlayersToSuggest]}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox color="primary" style={{ marginRight: 8 }} checked={selected} />
          {option.label}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Add players"
          placeholder="Start typing to add new players"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}

export default AutoCompletePlayerInput;
