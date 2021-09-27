import { Input } from '../../../../form/Input';

export const ColorInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (newColor: string) => void;
}) => {
  return (
    <Input
      name='color'
      type='color'
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        width: 30,
        height: 30,
      }}
      value={value}
      register={() => null}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
