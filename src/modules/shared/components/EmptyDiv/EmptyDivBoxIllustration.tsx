import { HTMLAttributes } from 'react';

export const EmptyDivBoxIllustration = ({
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      <img src='/emptyBox.svg' style={{ width: '100%', height: '100%' }} />
      <a
        href='https://storyset.com/work'
        style={{ fontSize: 10, position: 'absolute', bottom: 10, right: 0 }}
      >
        Work illustrations by Storyset
      </a>
    </div>
  );
};
