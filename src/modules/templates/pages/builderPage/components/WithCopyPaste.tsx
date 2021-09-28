import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
} from 'react';

// Ce composant est une combine pour capter les events
// copy and paste sur des élémnents qui sont pas contentEditable
export const WithCopyPaste = <
  P extends React.HTMLAttributes<HTMLDivElement> & {
    shouldCatchPasteBubbling?: boolean;
  },
>(
  Component: ForwardRefExoticComponent<P & { ref: ForwardedRef<unknown> }>,
) =>
  forwardRef(
    (
      {
        onCopy,
        onPaste,
        style,
        children,
        shouldCatchPasteBubbling,
        ...props
      }: P,
      ref,
    ) => {
      const componentProps = { ...props, style } as P;

      return (
        <Component
          ref={ref}
          onPaste={(e) => {
            if (shouldCatchPasteBubbling) {
              onPaste?.(e); //Here we handle paste events bubbling from children
              e.stopPropagation();
            }
          }}
          {...componentProps}
          draggable
        >
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
            onPaste={(e) => {
              e.preventDefault();
              onPaste?.(e);
              if (shouldCatchPasteBubbling) {
                e.stopPropagation(); //Here we avoid the propagation, otherwise the other paste would be triggered
              }
            }}
            contentEditable
          />
          {children}
        </Component>
      );
    },
  );
