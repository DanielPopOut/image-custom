import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useDebounce } from 'react-use';
import { IconButtonMenu } from 'src/modules/shared/IconsSelector/IconButtonMenu';

const hexToRGBA = (hex: string = '') => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  const alphaPart = hex.slice(7, 9);
  let alphaValue = 1;
  if (alphaPart) {
    alphaValue = parseInt(alphaPart, 16) / 255;
  }

  return { r, g, b, a: alphaValue };
};

export const ColorInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (newColor: string) => void;
}) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    if (!isEqual(value, state)) {
      setState(value);
    }
  }, [value]);
  const [, cancel] = useDebounce(
    () => {
      if (!isEqual(value, state)) {
        console.log({ data: 'change', value, state });
        onChange(state);
      }
    },
    200,
    [state],
  );
  return (
    <IconButtonMenu
      Icon={
        <span
          style={{
            width: 30,
            height: 30,
            backgroundColor: value || 'transparent',
            border: '1px solid black',
          }}
        />
      }
    >
      <SketchPicker
        color={hexToRGBA(state)}
        onChange={(data) => {
          const alphaValue = data.hsl.a;
          let alphatValueInHex = '';
          if (alphaValue) {
            alphatValueInHex = (alphaValue * 255)
              .toString(16)
              .padStart(2, '0')
              .substr(0, 2);
          }
          setState(data?.hex + alphatValueInHex);
        }}
      />
    </IconButtonMenu>
  );
};
