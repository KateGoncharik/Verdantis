import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';

export const PasswordInput = <T extends FieldValues>({
  control,
  label = 'password',
  name,
}: {
  control: Control<T>;
  label?: string;
  name: Path<T>;
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseUp={(event) => event.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message ?? ' '}
            label={label}
            size="small"
            type={showPassword ? 'text' : 'password'}
          />
        );
      }}
    />
  );
};
