import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { UseFormGetValues, UseFormSetValue, UseFormTrigger, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Collapse } from '@mui/material';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema.ts';

import { AccountDetails, accountSchema } from './account-details.schema.ts';
import { ProfileInfoContent } from './profile-information.tsx';
import { useAccountFormMutation } from './use-account-form-mutation.tsx';

const useResetFormData = ({
  getValues,
  isEditMode,
  prevFormData,
  setValue,
  trigger,
}: {
  getValues: UseFormGetValues<AccountDetails>;
  isEditMode: boolean;
  prevFormData: MutableRefObject<AccountDetails | null>;
  setValue: UseFormSetValue<AccountDetails>;
  trigger: UseFormTrigger<AccountDetails>;
}): void => {
  useEffect(() => {
    if (isEditMode) {
      prevFormData.current = { ...getValues() };
    } else {
      if (!prevFormData.current) {
        return;
      }
      const { dateOfBirth, email, firstName, lastName } = prevFormData.current;
      setValue('dateOfBirth', dateOfBirth);
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('email', email);
      void trigger();
    }
  }, [getValues, isEditMode, prevFormData, setValue, trigger]);
};

const CollapseElement: FC<{ isCollapsed: boolean; isDisabled: boolean }> = ({ isCollapsed, isDisabled }) => {
  return (
    <Collapse in={isCollapsed}>
      <Button className="mx-auto my-0 block" disabled={isDisabled} type="submit" variant="contained">
        Save changes
      </Button>
    </Collapse>
  );
};

export const AccountDetailsForm: FC<{ customer: Customer; isEditMode: boolean }> = ({ customer, isEditMode }) => {
  const { dateOfBirth, email, firstName, lastName } = customer;
  const { control, getValues, handleSubmit, setValue, trigger } = useForm<AccountDetails>({
    defaultValues: { dateOfBirth, email, firstName, lastName },
    mode: 'onChange',
    resolver: zodResolver(accountSchema),
  });
  const [accountMutation] = useAccountFormMutation();
  const prevFormData = useRef<AccountDetails | null>(null);
  useResetFormData({ getValues, isEditMode, prevFormData, setValue, trigger });
  return (
    <form
      className="mx-auto flex flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit((data): void => {
          accountMutation.mutate(data, {
            onSuccess: () => {
              prevFormData.current = null;
            },
          });
        })(e)
      }
    >
      <ProfileInfoContent {...{ control, isEditMode }} />
      <CollapseElement
        {...{
          isCollapsed: isEditMode,
          isDisabled: accountMutation.isPending,
        }}
      />
    </form>
  );
};
