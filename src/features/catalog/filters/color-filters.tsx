import { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';

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
    <FormGroup className="w-48" sx={{ flexDirection: 'row' }}>
      <ColorCheckbox color="white" handleChange={handleChange} />
      <ColorCheckbox color="pink" handleChange={handleChange} />
      <ColorCheckbox color="blue" handleChange={handleChange} />
      <ColorCheckbox color="green" handleChange={handleChange} />
      <ColorCheckbox color="yellow" handleChange={handleChange} />
    </FormGroup>
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
