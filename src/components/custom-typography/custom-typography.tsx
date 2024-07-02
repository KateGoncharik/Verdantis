import { FC } from 'react';

import { Typography, TypographyProps } from '@mui/material';

import { ComponentType } from './custom-typography.types';

export const CustomTypography: FC<{
  styles: Record<string, number | string>;
  tag: ComponentType;
  text?: string;
  variantField: TypographyProps['variant'];
}> = ({ styles, tag, text, variantField }) => {
  return (
    <Typography component={tag} gutterBottom sx={styles} variant={variantField}>
      {text}
    </Typography>
  );
};
