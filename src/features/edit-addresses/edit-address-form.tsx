import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, List, ListItem, ListItemText } from '@mui/material';

import { ControlledSwitch } from '@/components/controlled-switch/controlled-switch';
import { ControlledTextField } from '@/components/controlled-text-field';

import { RegistrationAddress } from '../registration-form/registration-form-types';
import { EditAddress, editAddressSchema } from './edit-address.shema';
import { useEditAddressMutation } from './use-edit-address-mutation';

export const EditAddressForm: FC<{
  address: RegistrationAddress;
  id: string;
  isBilling: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  isShipping: boolean;
}> = ({ address, id, isBilling, isDefaultBilling, isDefaultShipping, isShipping }) => {
  const { city, country, postalCode, streetName } = address;
  const { control, handleSubmit } = useForm<EditAddress>({
    defaultValues: {
      city,
      country,
      isBilling,
      isDefaultBilling,
      isDefaultShipping,
      isShipping,
      postalCode,
      streetName,
    },
    mode: 'onChange',
    resolver: zodResolver(editAddressSchema),
  });
  const [editMutation] = useEditAddressMutation();
  return (
    <Card className="max-w-[390px] bg-white p-3">
      <form
        onSubmit={(e) =>
          void handleSubmit((data): void => {
            editMutation.mutate({ address: data, id });
          })(e)
        }
      >
        <List>
          <ListItem className="items-start">
            <ListItemText className="whitespace-nowrap p-1" primary="Country:" />
            <ControlledTextField {...{ control, name: 'country' }} />
          </ListItem>
          <ListItem className="items-start">
            <ListItemText className="whitespace-nowrap p-1" primary="City:" />
            <ControlledTextField {...{ control, name: 'city' }} />
          </ListItem>
          <ListItem className="items-start">
            <ListItemText className="whitespace-nowrap p-1" primary="Street:" />
            <ControlledTextField {...{ control, name: 'streetName' }} />
          </ListItem>
          <ListItem className="items-start">
            <ListItemText className="p-1" primary="Postal code:" />
            <ControlledTextField {...{ control, name: 'postalCode' }} />
          </ListItem>
        </List>
        <ControlledSwitch {...{ control, label: 'Set as billing', name: 'isBilling' }} />
        <ControlledSwitch {...{ control, label: 'Set as shipping', name: 'isShipping' }} />
        <ControlledSwitch {...{ control, label: 'Set as default shipping', name: 'isDefaultBilling' }} />
        <ControlledSwitch {...{ control, label: 'Set as default Billing', name: 'isDefaultShipping' }} />
        <Button className="mx-auto my-0 block" type="submit" variant="contained">
          Save changes
        </Button>
      </form>
    </Card>
  );
};
