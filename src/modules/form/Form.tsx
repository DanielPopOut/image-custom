import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Form = <FormData extends unknown>({
  defaultValues,
  children,
  onSubmit,
  onChange,
  ...formProps
}: Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'defaultValues' | 'onSubmit' | 'onChange'
> & {
  defaultValues: FormData;
  onSubmit: (data: FormData) => void;
  onChange?: (data: FormData) => void;
  children;
}) => {
  const methods = useForm<FormData>({ defaultValues: defaultValues as any });
  const { handleSubmit, register } = methods;

  useEffect(() => {
    methods.reset(defaultValues as any);
  }, [defaultValues]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data as FormData))}
      onChange={() => {
        if (!onChange) {
          return;
        }
        handleSubmit((data) => onChange(data as FormData))();
      }}
      {...formProps}
    >
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
};

export default Form;
