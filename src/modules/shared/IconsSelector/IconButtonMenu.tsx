import styled from '@emotion/styled';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconButtonContainer } from './IconButton';

const IconButtonMenuContainer = styled.div`
  position: relative;
  .menu {
    background-color: white;
    padding: 5px 10px;
    border: 1px solid #aaa;
    border-radius: 5px;
    min-width: 100px;
    display: none;
    position: absolute;
    top: 100%;
    z-index: 1000;
  }

  &:hover {
    .menu {
      display: block;
    }
  }
`;

export const IconButtonMenu: React.FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    Icon: ReactNode;
    title?: string;
  }
> = ({ Icon, title, children, ...props }) => {
  return (
    <IconButtonMenuContainer>
      <IconButtonContainer title={title} {...props}>
        {Icon}
      </IconButtonContainer>
      <div className='menu'>{children}</div>
    </IconButtonMenuContainer>
  );
};
