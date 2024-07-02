import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

import { PasswordInput } from '../login-form/password-input';
import { Passwords, passwordsSchema } from './passwords.schema';
import { usePasswordFormMutation } from './use-password-form-mutation';

export const PasswordForm: FC = () => {
  const { control, handleSubmit } = useForm<Passwords>({
    defaultValues: { currentPassword: '', newPassword: '', repeatPassword: '' },
    mode: 'onChange',
    resolver: zodResolver(passwordsSchema),
  });
  const [passwordMutation] = usePasswordFormMutation();
  return (
    <form
      className="mx-auto flex flex-col gap-2 p-2"
      onSubmit={(e) =>
        void handleSubmit((data): void => {
          passwordMutation.mutate(data);
        })(e)
      }
    >
      <PasswordInput {...{ control, label: 'Current password', name: 'currentPassword' }} />
      <PasswordInput {...{ control, label: 'New password', name: 'newPassword' }} />
      <PasswordInput {...{ control, label: 'Repeat password', name: 'repeatPassword' }} />
      <Button disabled={passwordMutation.isPending} type="submit" variant="contained">
        Save Changes
      </Button>
    </form>
  );
};

export const FormDialog: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button className="mx-auto block text-center" onClick={handleClickOpen} variant="outlined">
        Change password
      </Button>
      <Dialog PaperProps={{ sx: { backgroundColor: 'white' } }} onClose={handleClose} open={open}>
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <PasswordForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
