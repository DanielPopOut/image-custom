import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Label } from './Label';

export function Select({
  register,
  options,
  name,
  label,
  ...rest
}: {
  options: string[];
  name: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
}) {
  return (
    <>
      <Label label={label} />
      <select {...register(name)} {...rest}>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
