import styled from '@emotion/styled';
import { useRouter } from 'next/router';
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

export type NavBarProps = { goBackButton?: boolean };

export const NavBar: React.FC<NavBarProps> = ({ goBackButton }) => {
  return (
    <StyledNavBar>
      <Container>
        {goBackButton ? <GoBackButton /> : null}
        Custom images maker
        <div className='flex-separator'></div>
        <SignOutButton />
      </Container>
    </StyledNavBar>
  );
};

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      className='button'
      onClick={() => router.back()}
      style={{ marginRight: 5 }}
    >
      Go back
    </button>
  );
};
