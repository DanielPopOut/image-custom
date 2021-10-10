import { isEqual } from 'lodash';
import React, { useState } from 'react';
import { AnglePicker } from 'react-linear-gradient-picker';
import { useDebounce } from 'react-use';
import { SizeInput } from '../SizeInput';

export const AngleSelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (data: number) => void;
}) => {
  const [angle, setAngle] = useState(0);
  useDebounce(
    () => {
      if (!isEqual(value, angle)) {
        onChange(angle);
      }
    },
    200,
    [angle],
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 2 }}>
        <SizeInput
          value={angle?.toString()}
          label='Angle °'
          onChange={(data) => setAngle(+data)}
          transformResult={(data) => data.toString()}
        />
      </div>
      <div style={{ flex: 1 }}>
        <AnglePicker angle={angle} setAngle={setAngle} />{' '}
      </div>
    </div>
  );
};
