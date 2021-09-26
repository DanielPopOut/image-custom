import styled from '@emotion/styled';
import type * as AllIcons from '@tabler/icons';
import { HTMLAttributes } from 'react';
import { Icon } from './Icon';

const IconButtonContainer = styled.div`
  &.disabled {
    color: #aaa;
    opacity: 0.5;
  }
`;

export const IconButton: React.FC<
  HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean;
    name: keyof typeof AllIcons;
  }
> = ({ className, name, disabled, children, ...props }) => {
  return (
    <IconButtonContainer
      className={`${className} ${disabled ? 'disabled' : ''}`}
      {...props}
    >
      <Icon name={name}></Icon>
      {children}
    </IconButtonContainer>
  );
};
