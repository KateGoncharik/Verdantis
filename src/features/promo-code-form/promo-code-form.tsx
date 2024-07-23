import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, TextField } from '@mui/material';

export const PromocodeForm: FC = () => {
  const { formState, handleSubmit, register } = useForm<{ promocode: string }>({});

  return (
    <form
      className="mx-auto my-5 block"
      onSubmit={(event) =>
        void handleSubmit(({ promocode }) => {
          console.log(promocode);
        })(event)
      }
    >
      <TextField
        {...register('promocode')}
        error={Boolean(formState.errors.promocode?.message)}
        helperText={formState.errors.promocode?.message}
        label="Promocode"
        size="small"
      />
      <Button type="submit" variant="contained">
        Apply
      </Button>
    </form>
  );
};
