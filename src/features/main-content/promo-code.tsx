import { FC, MouseEvent } from 'react';
import { toast } from 'react-toastify';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Stack, Typography } from '@mui/material';

import { Price, ProductImages } from '@/lib/axios/requests/get-product-by-id.types';

export const PromoCode: FC<{
  description: string;
  product: { description: string; images: ProductImages; name: string; prices: Price[] } | undefined;
  text: string;
}> = ({ description, product, text }) => {
  if (!product) {
    throw new Error('No  product');
  }
  const imageUrl = product.images[1].url;
  return (
    <Stack className="al flex w-96 flex-col items-center justify-between gap-2 ">
      <Stack className="flex flex-row gap-2">
        <Typography className="text-center" sx={{ fontSize: { lg: '30px', md: '26px', xs: '20px' } }}>
          {text}
        </Typography>
        <Button onClick={(e) => void writeClipboardText(e)} size="small" value={text} variant="contained">
          <ContentCopyIcon />
        </Button>
      </Stack>

      <Typography className="text-center" sx={{ fontSize: { lg: '24px', md: '20px', sm: '18px', xs: '16px' } }}>
        {description}
      </Typography>

      <img alt="promo code" className="align-self-start w-3/4 " src={imageUrl} />
    </Stack>
  );
};
const writeClipboardText = async (event: MouseEvent): Promise<void> => {
  const eventCurrentTarget = event?.currentTarget;
  if (!eventCurrentTarget || !(eventCurrentTarget instanceof HTMLButtonElement)) {
    throw new Error('Target expected');
  }
  const value = eventCurrentTarget.value;
  try {
    await navigator.clipboard.writeText(value);
    toast.success('Code is copied to clipboard!');
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};
