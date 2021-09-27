import React, { RefCallback, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RefCallBack,
  UseFormRegister,
} from 'react-hook-form';
import { Label } from './Label';

export const DimensionInput = ({
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
        render={({ field }) => <DimensionInputBase {...field} />}
        control={control}
        name={name}
        defaultValue={defaultValue}
      />
    </>
  );
};
type DimensionInputState = { value: number; dimension: string };
const DEFAULT_DIMENSION = 'px';
const DimensionInputBase = React.forwardRef(
  (
    { value, onChange }: { value: string; onChange: (data) => void },
    ref: RefCallBack,
  ) => {
    const [state, setState] = useState<DimensionInputState>({
      value: 0,
      dimension: 'px',
    });
    useEffect(() => {
      const matchedValues = ('' + value).match(/([\d.]+)(.*)/);
      if (matchedValues) {
        const valueNumber = +matchedValues[1];
        const dimension = matchedValues[2] || DEFAULT_DIMENSION;
        setState({ value: valueNumber, dimension });
      } else {
        setState({ value: 0, dimension: 'px' });
      }
    }, [value]);

    const onChangeFn = (newState: DimensionInputState) => {
      setState(newState);
      onChange(`${newState.value}${newState.dimension}`);
    };

    return (
      <div ref={ref}>
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
            <option key={value} value={value} defaultValue={DEFAULT_DIMENSION}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
