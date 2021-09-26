import dynamic from 'next/dynamic';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { Label } from '../Label';

const FontPicker = dynamic(
  //@ts-ignore
  () => import('font-picker-react'),
  { ssr: false },
);

export const BasicFontPicker = ({
  activeFontFamily,
  onChange,
}: {
  activeFontFamily;
  onChange: (nextFont: string) => void;
}) => {
  return (
    //@ts-ignore
    <FontPicker
      apiKey={process.env.NEXT_PUBLIC_WEB_FONT_API_KEY}
      activeFontFamily={activeFontFamily}
      limit={100}
      onChange={(data) => onChange(data.family)}
      variants={['regular', 'italic', '300', '300italic', '700', '700italic']}
    />
  );
};

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
          <BasicFontPicker
            activeFontFamily={field.value}
            onChange={(nextFontFamily) => field.onChange(nextFontFamily)}
          />
        )}
      />
    </>
  );
};
