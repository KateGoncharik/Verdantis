import { z } from 'zod';

import { CanadaPostalCodeFormatRegularExpression } from '../../../../features/registration-form/registration-form-constants';

export const registrationSchema = z.object({
  cityBilling: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, 'City must contain only alphabetic characters'),
  cityShipping: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, 'City must contain only alphabetic characters'),
  countryBilling: z.string(),
  countryShipping: z.string(),
  dateOfBirth: z
    .string()
    .date()
    .refine((value) => {
      const currentDate = new Date();
      const userDateOfBirth = new Date(value);
      const userAge = currentDate.getFullYear() - userDateOfBirth.getFullYear();
      return userAge >= 13;
    }, 'You must be at least 13 years old'),
  email: z.string().email(),
  firstName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, 'First name must contain only alphabetic characters'),
  isSingleAddress: z.boolean(),
  lastName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only alphabetic characters'),

  password: z
    .string()
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least 1 number')
    .min(8, { message: 'Your password cannot be less than 8 characters' }),
  postalCodeBilling: z.string().regex(CanadaPostalCodeFormatRegularExpression),
  postalCodeShipping: z.string().regex(CanadaPostalCodeFormatRegularExpression),
  setBillingAsDefault: z.boolean().optional(),
  setShippingAsDefault: z.boolean().optional(),
  streetBilling: z.string().min(1),
  streetShipping: z.string().min(1),
});

export type RegistrationFormFields = z.infer<typeof registrationSchema>;
