import { Resizable } from 're-resizable';
import React, { forwardRef, useEffect } from 'react';

export const WithResize = <
  P extends React.HTMLAttributes<HTMLDivElement> & { isSelected?: boolean },
>(
  Component: React.ForwardRefExoticComponent<P>,
) =>
  forwardRef(({ style, onChange, ...rest }: P, ref) => {
    const [debouncedStyle, setDebouncedValue] = React.useState(style);
    const [initialWidthAndHeight, setInitialWidthAndHeight] =
      React.useState<{ width: number; height: number }>(null);
    useEffect(() => {
      setDebouncedValue(style);
    }, [style]);
    const componentProps = { ...rest, style: debouncedStyle, onChange } as P;
    const isSelected = rest.isSelected;
    return (
      <Resizable
        style={{
          position: 'absolute',
          top: debouncedStyle.top,
          left: debouncedStyle.left,
          zIndex: debouncedStyle.zIndex,
        }}
        size={{
          width: debouncedStyle.width,
          height: debouncedStyle.height,
        }}
        enable={{
          top: false,
          right: isSelected,
          bottom: isSelected,
          left: false,
          topRight: false,
          bottomRight: isSelected,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setInitialWidthAndHeight({
            width: +debouncedStyle.width,
            height: +debouncedStyle.height,
          });
        }}
        onResize={(e, direction, ref, d) => {
          setDebouncedValue({
            ...debouncedStyle,
            width: +initialWidthAndHeight.width + d.width,
            height: +initialWidthAndHeight.height + d.height,
          });
        }}
        onResizeStop={(e, direction, ref, d) => {
          onChange({
            //@ts-ignore
            style: {
              width: +initialWidthAndHeight.width + d.width,
              height: +initialWidthAndHeight.height + d.height,
            },
          });
        }}
      >
        <Component ref={ref} {...componentProps} />
      </Resizable>
    );
  });
