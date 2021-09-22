import React from 'react';
import { useForm } from 'react-hook-form';

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
