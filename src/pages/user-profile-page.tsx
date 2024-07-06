import { type FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, FormControlLabel, Link, Switch, Typography } from '@mui/material';

import { FormDialog } from '@/features/password-form';

const UserProfilePage: FC = () => {
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

      <Link className="mx-auto block p-2 text-center" component={RouterLink} to="/">
        <Button>Back to main</Button>
      </Link>
    </div>
  );
};

export default UserProfilePage;
