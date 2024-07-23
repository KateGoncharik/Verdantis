import { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import { ColorFilter } from './filters';

export const ColorFilters: FC<{ setter: (value: ColorFilter) => void }> = ({ setter }) => {
  const [colors, setColors] = useState({ blue: false, green: false, pink: false, white: false, yellow: false });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setColors({ ...colors, [event.target.name]: event.target.checked });
    setter(colors);
  };

  const setterRef = useRef(setter);
  useEffect(() => {
    const setter = setterRef.current;
    setter(colors);
  }, [colors]);

  return (
    <Accordion component="div" sx={{ bgcolor: 'primary.contrastText' }}>
      <AccordionSummary aria-controls="panel1-content" expandIcon={<ExpandMoreIcon />} id="panel1-header">
        <Typography sx={{ color: 'primary.main' }}>Color</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack className="justify-between gap-2">
          <FormGroup className=" flex-row" sx={{ bgcolor: 'secondary.main', padding: '2%' }}>
            <ColorCheckbox color="white" handleChange={handleChange} />
            <ColorCheckbox color="pink" handleChange={handleChange} />
            <ColorCheckbox color="blue" handleChange={handleChange} />
            <ColorCheckbox color="green" handleChange={handleChange} />
            <ColorCheckbox color="yellow" handleChange={handleChange} />
            <ColorCheckbox color="red" handleChange={handleChange} />
            <ColorCheckbox color="gold" handleChange={handleChange} />
            <ColorCheckbox color="silver" handleChange={handleChange} />
          </FormGroup>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const ColorCheckbox: FC<{
  children?: ReactNode;
  color: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ color, handleChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={color}
          onChange={handleChange}
          sx={{
            '&.Mui-checked': {
              color,
            },
            color: 'gray',
          }}
        />
      }
      label={color}
    />
  );
};
