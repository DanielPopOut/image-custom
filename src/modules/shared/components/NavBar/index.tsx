import styled from '@emotion/styled';
import { Container } from '../Container';
import { SignOutButton } from './SignOutButton';

const StyledNavBar = styled.div`
  border-bottom: 1px solid #eee;
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;

  .flex-separator {
    flex: 1;
  }
`;

export const NavBar = () => {
  return (
    <StyledNavBar>
      <Container>
        Custom images maker
        <div className='flex-separator'></div>
        <SignOutButton />
      </Container>
    </StyledNavBar>
  );
};
