import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField/TextField';

import type { RegistrationFormFields } from '@/lib/axios/requests/schemas/registration-form-schema';

export const ControllerSelectComponent = ({
  field,
  fieldState,
  label,
  placeholder,
}: {
  field: ControllerRenderProps<RegistrationFormFields>;
  fieldState: ControllerFieldState;
  label: string;
  placeholder: string;
}): JSX.Element => {
  return (
    <TextField
      error={fieldState.invalid}
      helperText={fieldState.error?.message ?? ' '}
      label={label}
      placeholder={placeholder}
      select
      size="small"
      {...field}
    >
      <MenuItem key={'US'} value={'US'}>
        US
      </MenuItem>
      <MenuItem key={'DE'} value={'DE'}>
        DE
      </MenuItem>
    </TextField>
  );
};
