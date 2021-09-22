import React, { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Label } from './Label';

export const Input = ({
  register,
  name,
  label,
  ...rest
}: {
  name: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <Label label={label} />
      <input {...register(name)} {...rest} />
    </>
  );
};
