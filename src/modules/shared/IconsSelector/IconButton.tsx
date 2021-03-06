import styled from '@emotion/styled';
import type * as AllIcons from '@tabler/icons';
import { ButtonHTMLAttributes } from 'react';
import { Icon } from './Icon';

export const IconButtonContainer = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 5px;
  display: flex;
  align-items: center;
  &:hover {
    border: 1px solid #555;
    &.danger {
      color: red;
      border-color: red;
    }
  }
  &.disabled {
    color: #aaa;
    opacity: 0.5;
  }
`;

export const IconButton: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    disabled?: boolean;
    name: keyof typeof AllIcons;
  }
> = ({ className, name, disabled, children, ...props }) => {
  return (
    <IconButtonContainer
      className={`${className} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      {...props}
    >
      <Icon name={name}></Icon>
      {children}
    </IconButtonContainer>
  );
};
