import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { FormControlLabel, Switch } from '@mui/material';

type Props<T extends FieldValues> = { control: Control<T>; label: string; name: Path<T> };

export const ControlledSwitch = <T extends FieldValues>({ control, label, name }: Props<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          checked={field.value}
          className="m-0 flex justify-center"
          control={<Switch color="primary" />}
          label={label}
          labelPlacement="start"
          {...field}
        />
      )}
    />
  );
};
