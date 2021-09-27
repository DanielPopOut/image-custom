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

  const onChangeFn = (newValue: string) => {
    if (newValue.match(/^[\d.]+$/) || !newValue) {
      setInputValue(newValue);
      onChange(newValue + 'px');
    }
  };
  return (
    <div
      style={{
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
      }}
    >
      <label>
        {label && (
          <span style={{ marginRight: 2, fontWeight: 'bold' }}>{label}:</span>
        )}
        <Input
          size={3}
          style={{
            minWidth: 30,
            border: 'none',
            outline: 'none',
            textAlign: 'end',
            fontSize: 16,
          }}
          value={inputValue}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === 'ArrowDown') {
              onChangeFn((+inputValue - 1).toString());
            } else if (e.key === 'ArrowUp') {
              onChangeFn((+inputValue + 1).toString());
            }
            e.stopPropagation();
          }}
          name='fontSize'
          step='0.1'
          min={8}
          register={() => null}
          onChange={(event) => {
            onChangeFn(event.target.value);
          }}
        />
      </label>
    </div>
  );
};
