import { IconMinus, IconPlus } from '@tabler/icons';
import { ReactNode, useEffect, useState } from 'react';
import { Input } from '../../../../form/Input';

export const SizeInput = ({
  onChange,
  value,
  label,
  multiplicationCoeff = 1,
  transformResult = (value) => value + 'px',
  suffix = '',
}: {
  onChange: (data: string) => void;
  value: string;
  label?: string;
  multiplicationCoeff?: number;
  transformResult?: (value: number) => string;
  suffix?: ReactNode;
}) => {
  const [inputValue, setInputValue] = useState<string>(null);
  useEffect(() => {
    const matchedValues = ('' + value).match(/([\d.]+)/);
    if (matchedValues) {
      const valueNumber = matchedValues[1];
      setInputValue((+valueNumber * multiplicationCoeff)?.toString());
    }
  }, [value]);

  const onChangeFn = (newValue: string) => {
    if (newValue.match(/^[\d.]+$/) || !newValue) {
      setInputValue(newValue);
      onChange(transformResult(+newValue / multiplicationCoeff));
    }
  };
  const updateBy = (value: number) => {
    //This logic is to be able to update by 0.1 or by 1
    const updateProportion = !inputValue?.match(/\./) ? 1 : 0.1;
    onChangeFn(
      (+inputValue + value * updateProportion).toFixed(
        updateProportion === 1 ? 0 : 1,
      ),
    );
  };
  return (
    <label style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
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
            textAlign: 'center',
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
        {suffix}
        <IconPlus size='1em' onClick={() => updateBy(1)} />
      </span>
    </label>
  );
};
