import styled from '@emotion/styled';
import { Container } from '../Container';
import { NavBar, NavBarProps } from '../NavBar';

const PageLayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;

  .content {
    flex: 1;
    flex-direction: column;
    padding: 20px;
  }
`;

export const PageLayout: React.FC<{ navBarProps?: NavBarProps }> = ({
  children,
  navBarProps,
}) => {
  return (
    <PageLayoutDiv>
      <NavBar {...navBarProps} />
      <Container className='content'>{children}</Container>
    </PageLayoutDiv>
  );
};
