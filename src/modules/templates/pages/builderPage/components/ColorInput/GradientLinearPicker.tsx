import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { GradientPicker } from 'react-linear-gradient-picker';
import 'react-linear-gradient-picker/dist/index.css';
import { useDebounce } from 'react-use';
import { AngleSelector } from './AngleSelector';
import { colorUtils, PaletteAndAngleState } from './ColorUtils';

const WrappedSketchPicker = ({ onSelect, ...rest }: any) => {
  return (
    <SketchPicker
      {...rest}
      color={colorUtils.rgbToRgba(rest.color, rest.opacity)}
      onChange={(c) => {
        const { r, g, b, a } = c.rgb;
        onSelect(`rgb(${r}, ${g}, ${b})`, a);
      }}
    />
  );
};

const initialGradientData: PaletteAndAngleState = {
  colors: [
    { offset: '0.00', color: 'rgb(238, 241, 11)', opacity: 0.2 },
    { offset: '1.00', color: 'rgb(126, 32, 207)', opacity: 1 },
  ],
  angle: 0,
};

type GradientColorDefaultData = typeof initialGradientData;

export const GradientLinearPicker = ({
  value,
  onChange,
}: {
  value?: GradientColorDefaultData;
  onChange: (data: string) => void;
}) => {
  const valueInterpreted = colorUtils.linearGradientToPalette(value as any);
  const [paletteData, setPalette] = useState(valueInterpreted);

  const [, cancel] = useDebounce(
    () => {
      if (!isEqual(valueInterpreted, paletteData)) {
        onChange(
          colorUtils.generateLinearGradientFromPaletteAndAngle(paletteData),
        );
      }
    },
    100,
    [paletteData],
  );

  useEffect(() => {
    if (!isEqual(valueInterpreted, paletteData)) {
      setPalette(valueInterpreted);
    }
  }, [value]);

  return (
    <>
      <AngleSelector
        onChange={(newAngle) =>
          setPalette({
            ...initialGradientData,
            ...paletteData,
            angle: newAngle,
          })
        }
        value={paletteData?.angle}
      />
      <GradientPicker
        {...{
          width: 220,
          open,
          setOpen: () => null,
          paletteHeight: 32,
          palette: paletteData?.colors || initialGradientData.colors,
          onPaletteChange: (data) => {
            setPalette({
              ...initialGradientData,
              ...paletteData,
              colors: data,
            });
          },
          showAnglePicker: true,
        }}
      >
        <WrappedSketchPicker />
      </GradientPicker>
    </>
  );
};
