import dynamic from 'next/dynamic';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { Label } from './Label';

const FontPicker = dynamic(
  //@ts-ignore
  () => import('font-picker-react'),
  { ssr: false },
);

export const FontSelect = ({
  register,
  control,
  name,
  label,
  defaultValue,
}: {
  name: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
  control?: Control<FieldValues>;
  defaultValue?: string;
}) => {
  return (
    <>
      <Label label={label} />
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => (
          //@ts-ignore
          <FontPicker
            apiKey={process.env.NEXT_PUBLIC_WEB_FONT_API_KEY}
            activeFontFamily={field.value}
            onChange={(nextFont) => field.onChange(nextFont.family)}
            variants={[
              'regular',
              'italic',
              '300',
              '300italic',
              '700',
              '700italic',
            ]}
          />
        )}
      />
    </>
  );
};
