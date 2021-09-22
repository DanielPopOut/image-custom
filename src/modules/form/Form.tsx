import React, { HTMLAttributes, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

// export const Form = () => {
//   const methods = useForm();
//   const onSubmit = (data) => console.log(data);

//   return (
//     <FormProvider {...methods}>
//       // pass all methods into the context
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         <input type='submit' />
//       </form>
//     </FormProvider>
//   );
// };

export default function Form({
  defaultValues,
  children,
  onSubmit,
  ...formProps
}) {
  const methods = useForm({ defaultValues });
  const { handleSubmit, register } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...formProps}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                control: methods.control,
                key: child.props.name,
              },
            })
          : child;
      })}
      <input type='submit' />
    </form>
  );
}

const Label = ({ label }) => <label>{label}</label>;

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

// const Input = ({ register, name, ...rest }: InputProps) => {
//   return <input {...register(name)} {...rest} />;
// };
