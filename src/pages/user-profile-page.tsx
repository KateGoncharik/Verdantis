import { type FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, FormControlLabel, Link, Switch, Typography } from '@mui/material';

import { AccountDetailsForm } from '@/features/account-details-form';
import { AddressDisplay } from '@/features/address-display';
import { EditAddresses } from '@/features/edit-addresses/edit-addresses';
import { FormDialog } from '@/features/password-form';
import { useCustomerStore } from '@/stores/customer-store';

const UserProfilePage: FC = () => {
  const store = useCustomerStore();
  const customer = store.customer;
  if (!customer) {
    throw Error('no customer data');
  }
  const [isEditMode, setEditMode] = useState(false);
  return (
    <div className="flex flex-col items-center" id="error-page">
      <Typography component={'h1'} sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }} textAlign={'center'}>
        User Profile
      </Typography>
      <FormDialog />
      <FormControlLabel
        className="m-0 flex justify-center"
        control={
          <Switch
            checked={isEditMode}
            color="primary"
            onChange={() => {
              setEditMode((value) => !value);
            }}
          />
        }
        label="Edit mode"
        labelPlacement="start"
      />

      <AccountDetailsForm {...{ customer, isEditMode }} />
      {isEditMode ? (
        <>
          <Typography component={'h3'} sx={{ fontSize: { lg: 30, md: 25, sm: 20 } }} textAlign={'center'}>
            Addresses
          </Typography>
          <EditAddresses customer={customer} />
        </>
      ) : (
        <AddressDisplay {...{ customer: customer }} />
      )}

      <Link className="mx-auto block p-2 text-center" component={RouterLink} to="/">
        <Button>Back to main</Button>
      </Link>
    </div>
  );
};

export default UserProfilePage;
