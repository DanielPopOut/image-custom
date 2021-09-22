import React, { HTMLAttributes, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { Label } from './Label';

export const DimensionInput = ({
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
        render={({ field }) => <DimensionInputBase {...field} />}
        control={control}
        name={name}
        defaultValue={10}
      />
      {/* <input {...register(name)} {...rest} /> */}
    </>
  );
};
type DimensionInputState = { value: number; dimension: string };
const DimensionInputBase = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (data) => void;
}) => {
  const [state, setState] = useState<DimensionInputState>({
    value: 0,
    dimension: 'px',
  });
  useEffect(() => {
    console.log(value);
    const matchedValues = ('' + value).match(/([\d.]+)(.*)/);
    if (matchedValues) {
      const value = +matchedValues[1];
      const dimension = matchedValues[2];
      setState({ value, dimension });
    }
    console.log(matchedValues);
  }, [value]);

  const onChangeFn = (newState: DimensionInputState) => {
    setState(newState);
    onChange(`${newState.value}${newState.dimension}`);
  };

  return (
    <div>
      <input
        type='number'
        onChange={(e) => onChangeFn({ ...state, value: +e.target.value })}
        value={state.value}
        min={1}
        step={0.1}
      />
      <select
        onChange={(e) => onChangeFn({ ...state, dimension: e.target.value })}
        value={state.dimension}
      >
        {['px', 'em', 'rem', '%'].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
