import { CSSProperties } from 'react';
import { BackgroundInput } from '../../../../form/BackgroundInput';
import { DimensionInput } from '../../../../form/DimensionInput';
import { FontSelect } from '../../../../form/FontSelector';
import Form from '../../../../form/Form';
import { Input } from '../../../../form/Input';
import { Select } from '../../../../form/Select';
import { Template } from '../../../models/template.model';
import { ColorInput } from './ColorInput';
import { SizeInput } from './SizeInput';

export const PageParameters = ({
  defaultValues,
  onChange,
}: {
  defaultValues?: CSSProperties;
  onChange: (data) => void;
}) => {
  return (
    <div
      style={{ padding: 10 }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      <h4 style={{ marginTop: 0 }}>Page parameters</h4>

      <SizeInput
        value={defaultValues.width as string}
        onChange={(data) => onChange({ width: data })}
        label='Width'
      />
      <SizeInput
        value={defaultValues.height as string}
        onChange={(data) => onChange({ height: data })}
        label='Height'
      />
      <ColorInput
        value={defaultValues.backgroundColor}
        onChange={(newColor) => onChange({ backgroundColor: newColor })}
      />
    </div>
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
