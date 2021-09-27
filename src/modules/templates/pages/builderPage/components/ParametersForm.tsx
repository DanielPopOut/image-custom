import { CSSProperties } from 'react';
import { BackgroundInput } from '../../../../form/BackgroundInput';
import { DimensionInput } from '../../../../form/DimensionInput';
import { FontSelect } from '../../../../form/FontSelector';
import Form from '../../../../form/Form';
import { Input } from '../../../../form/Input';
import { Select } from '../../../../form/Select';
import { Template } from '../../../models/template.model';

export const PageParameters = ({
  defaultValues,
  onChange,
}: {
  defaultValues?;
  onChange: (data) => void;
}) => {
  return (
    <Form<Template['page']>
      defaultValues={defaultValues}
      onChange={(data) => {
        onChange(data);
      }}
      onSubmit={() => null}
      style={containerStyle}
    >
      <h4 style={{ marginTop: 0 }}>Page parameters</h4>
      <DimensionInput name='width' label='width' />
      <DimensionInput name='height' label='height' />
      <Input label='Background color' name='backgroundColor' type='color' />
    </Form>
  );
};

export const ParametersForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?;
  onSubmit: (data) => void;
}) => {
  return (
    <Form<Template['page']>
      defaultValues={defaultValues}
      onSubmit={(data) => {
        onSubmit(data);
      }}
      style={containerStyle}
    >
      <h4 style={{ marginTop: 0 }}>Page parameters</h4>
      <DimensionInput name='width' label='width' />
      {/* <Input name='width' label='width'></Input> */}
      <DimensionInput name='height' label='height' />

      <BackgroundInput name='background' />

      <Input label='Background color' name='backgroundColor' type='color' />
      <Select
        label='Background size'
        name='backgroundSize'
        options={['auto', 'contain', 'cover']}
      />
      <Select
        label='Background repeat'
        name='backgroundRepeat'
        options={['no-repeat', 'repeat-x', 'repeat-y', 'round']}
      />
      <Select
        label='Background size'
        name='backgroundPosition'
        options={['center', 'left', 'right', 'top', 'bottom', 'unset']}
      />
      {/* <Input name='height' label='height'></Input> */}
    </Form>
  );
};
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 250,
  padding: 20,
};
const TextInputFormFields = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?;
  onSubmit: (data) => void;
}) => {
  return (
    <Form
      defaultValues={defaultValues}
      onChange={({ top, left, ...data }) => {
        onSubmit(data);
      }}
      onSubmit={({ top, left, ...data }) => {
        onSubmit(data);
      }}
      style={{ display: 'flex', flexDirection: 'column', maxWidth: 200 }}
    >
      <FontSelect name='fontFamily' label='font' />
      <DimensionInput name='width' label='width' />
      <DimensionInput name='height' label='height' />
      <Select
        name='justifyContent'
        label='Horizontal alignment'
        defaultValue='start'
        options={['center', 'start', 'end']}
      />
      <Select
        name='alignItems'
        label='Vertical alignment'
        defaultValue='start'
        options={['center', 'start', 'end']}
      />
      <Select
        name='textAlign'
        label='Text alignment'
        defaultValue='initial'
        options={['initial', 'center', 'justify', 'start', 'end']}
      />
      <Input label='Color' name='color' type='color' />
      <Select
        label='Font weight'
        name='fontWeight'
        defaultValue='normal'
        options={['normal', 'bolder', 'bold', 'lighter']}
      />
      <DimensionInput label='Font size' name='fontSize' />
    </Form>
  );
};
