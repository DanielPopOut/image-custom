import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
} from 'react';

export const WithCopyPaste = <P extends React.HTMLAttributes<HTMLDivElement>>(
  Component: ForwardRefExoticComponent<P & { ref: ForwardedRef<unknown> }>,
) =>
  forwardRef(({ onCopy, style, children, ...props }: P, ref) => {
    const componentProps = { ...props, style } as P;

    return (
      <Component ref={ref} {...componentProps} draggable>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            caretColor: 'transparent',
            outline: 'none',
          }}
          onKeyPress={(e) => e.preventDefault()}
          onCopy={(e) => {
            onCopy?.(e);
          }}
          contentEditable
        />
        {children}
      </Component>
    );
  });
