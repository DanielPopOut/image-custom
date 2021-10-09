import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useDebounce } from 'react-use';
import { IconButtonMenu } from 'src/modules/shared/IconsSelector/IconButtonMenu';
import { colorUtils } from './ColorUtils';

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
        color={colorUtils.hexToRGBA(state)}
        onChange={(data) => {
          const alphaValue = data.hsl.a;
          setState(colorUtils.createHexWithAlpha(data?.hex, alphaValue));
        }}
      />
    </IconButtonMenu>
  );
};
