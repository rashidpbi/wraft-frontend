import React from 'react';
import { Box } from 'theme-ui';
import { Label, Textarea } from 'theme-ui';

interface Props {
  register: any,
  label: string,
  name: string,
  defaultValue: string,
}

const Field: React.FC<Props> = ({ name, label, register, defaultValue }) => {
  return (
    <Box width={1} pb={2}>
      <Label htmlFor="description" mb={1}>
        {label}
      </Label>
      <Textarea
        rows={3}
        id={name}
        name={name}
        defaultValue={defaultValue}
        ref={register({ required: true })}
      />
    </Box>
  );
};


export default Field;
