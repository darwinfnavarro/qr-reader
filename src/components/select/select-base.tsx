import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface Option {
  value: string | number;
  label: string;
}

interface SelectBaseProps {
  options: Option[];
  handleSelection: (value: string | number) => void;
  label?: string;
  defaultValue?: string | number;
  fullWidth?: boolean;
  minWidth?: number;
}

export function SelectBase({
  options,
  handleSelection,
  label = 'Seleccione una opción',
  defaultValue = '',
  fullWidth = true,
  minWidth = 300,
}: SelectBaseProps) {
  const [value, setValue] = React.useState<string | number | undefined>(
    defaultValue
  );

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string | number;
    setValue(selectedValue);
    handleSelection(selectedValue);
  };

  return (
    <Box sx={{ minWidth: minWidth }}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id="select-base-label">{label}</InputLabel>
        <Select
          labelId="select-base-label"
          id="select-base"
          value={value?.toString()}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
