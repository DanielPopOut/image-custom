import { useEffect, useState } from 'react';
import { Input } from '../../../../form/Input';

export const SizeInput = ({
  onChange,
  value,
  label,
}: {
  onChange: (data: string) => void;
  value: string;
  label?: string;
}) => {
  const [inputValue, setInputValue] = useState<string>(null);
  useEffect(() => {
    const matchedValues = ('' + value).match(/([\d.]+)/);
    if (matchedValues) {
      const valueNumber = matchedValues[1];
      setInputValue(valueNumber);
    }
  }, [value]);
  return (
    <div style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>
      <label>
        <Input
          style={{
            width: 30,
            border: 'none',
            outline: 'none',
            textAlign: 'end',
          }}
          value={inputValue}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          name='fontSize'
          step='0.1'
          min={8}
          register={() => null}
          onChange={(event) => {
            const newValue = event.target.value;
            if (newValue.match(/^[\d.]+$/) || !newValue) {
              setInputValue(newValue);
              onChange(newValue + 'px');
            }
          }}
        />
        {label}
      </label>
    </div>
  );
};
