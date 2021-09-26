import React, { HTMLAttributes, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { UploadFileComponent } from '../components/uploadFileComponent';
import { Label } from './Label';

export const BackgroundInput = ({
  register,
  control,
  name,
  label,
  ...rest
}: HTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  register?: UseFormRegister<FieldValues>;
  control?: Control<FieldValues>;
}) => {
  return (
    <>
      <Label label={label} />
      <Controller
        render={({ field }) => <BackgroundInputBase {...field} />}
        control={control}
        name={name}
        defaultValue={10}
      />
      {/* <input {...register(name)} {...rest} /> */}
    </>
  );
};
type BackgroundInputState = { backgroundUrl: string };
const BackgroundInputBase = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (data) => void;
}) => {
  const [state, setState] = useState<BackgroundInputState>({
    backgroundUrl: '',
  });
  useEffect(() => {
    const matchedValues = ('' + value).match(/url\((.*)\)/);
    if (matchedValues) {
      const backgroundUrl = matchedValues[1];
      setState({ backgroundUrl });
    }
  }, [value]);

  const onChangeFn = (newState: BackgroundInputState) => {
    setState(newState);
    onChange(`url(${newState.backgroundUrl})`);
  };

  return (
    <UploadFileComponent
      url={state.backgroundUrl}
      onChange={(data) => onChangeFn({ backgroundUrl: data })}
    />
  );
};
