import { IconMinus, IconPlus } from '@tabler/icons';
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
  const updateBy = (value: number) => {
    //This logic is to be able to update by 0.1 or by 1
    const updateProportion = inputValue.match(/\./) ? 0.1 : 1;
    onChangeFn(
      (+inputValue + value * updateProportion).toFixed(
        updateProportion === 1 ? 0 : 1,
      ),
    );
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
      <label style={{ display: 'flex', alignItems: 'center' }}>
        {label && (
          <span style={{ marginRight: 2, fontWeight: 'bold' }}>{label}:</span>
        )}
        <span
          style={{
            border: '1px solid #aaa',
            borderRadius: 3,
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 16,
          }}
        >
          <IconMinus size='1em' onClick={() => updateBy(-1)} />
          <Input
            size={(+inputValue).toString().length}
            style={{
              border: 'none',
              outline: 'none',
              textAlign: 'end',
              fontSize: 16,
            }}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                updateBy(-1);
              } else if (e.key === 'ArrowUp') {
                updateBy(1);
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
          <IconPlus size='1em' onClick={() => updateBy(1)} />
        </span>
      </label>
    </div>
  );
};
