import styled from '@emotion/styled';
import { Container } from '../Container';
import { NavBar } from '../NavBar';

const PageLayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;

  .content {
    flex: 1;
    flex-direction: column;
  }
`;

export const PageLayout = ({ children }) => {
  return (
    <PageLayoutDiv>
      <NavBar />
      <Container className='content'>{children}</Container>
    </PageLayoutDiv>
  );
};
