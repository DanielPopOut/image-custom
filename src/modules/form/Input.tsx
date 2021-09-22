import React, { HTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Label } from './Label';

export const Input = ({
  register,
  name,
  label,
  ...rest
}: HTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
}) => {
  return (
    <>
      <Label label={label} />
      <input {...register(name)} {...rest} />
    </>
  );
};
