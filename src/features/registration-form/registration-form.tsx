import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse, Stack, Typography } from '@mui/material';
import { ReactJSXElement } from 'node_modules/@emotion/react/types/jsx-namespace';

import { AddressControlPanel } from '../../components/registration/address/address-control-panel';
import { GeneralInputs } from '../../components/registration/general-inputs';
import { RegistrationFormFields, registrationSchema } from '../../lib/axios/requests/schemas/registration-form-schema';
import { getRegistrationData } from './get-registration-data';
import { registrationFormDefaultValues } from './registration-form-constants';
import { useRegistrationFormMutation } from './use-registration-form-mutation';

export const RegistrationForm: FC = () => {
  const { control, handleSubmit, watch } = useForm<RegistrationFormFields>({
    defaultValues: registrationFormDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
  });
  const submitHandler = (data: RegistrationFormFields): void => {
    const dataForRequest = getRegistrationData(data);
    registrationMutation.mutate(dataForRequest);
  };
  const [registrationMutation, errorMessage] = useRegistrationFormMutation();
  return (
    <form
      className="ml-auto mr-auto mt-0 flex max-w-80  flex-col gap-2 "
      onSubmit={(e) => void handleSubmit(submitHandler, (error) => console.log(error))(e)}
    >
      <GeneralInputs control={control} />
      <Stack sx={{ flexDirection: 'column' }} width={'100%'}>
        <AddressesTitle />
        <Stack sx={{ flexDirection: 'row' }} width={'100%'}>
          <AddressControlPanel control={control} isSingleAddress={!watch('isSingleAddress')} />
        </Stack>
      </Stack>
      {
        <Collapse in={!!errorMessage}>
          <Alert severity="warning">{errorMessage}</Alert>
        </Collapse>
      }
      <Button disabled={registrationMutation.isPending} type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
};

const AddressesTitle = (): ReactJSXElement => (
  <Typography component={'h3'} sx={{ fontSize: { lg: 40, md: 32, sm: 24 } }} textAlign={'center'}>
    Addresses
  </Typography>
);
