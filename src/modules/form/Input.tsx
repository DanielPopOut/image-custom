import React, { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TextareaHTMLAttributes } from 'reactcss/node_modules/@types/react';
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

export const TextArea = ({
  register,
  name,
  label,
  ...rest
}: {
  name: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <>
      <Label label={label} />
      <textarea {...register(name)} {...rest} />
    </>
  );
};
