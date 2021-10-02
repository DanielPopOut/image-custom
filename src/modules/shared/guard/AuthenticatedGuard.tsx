import { signIn, useSession } from 'next-auth/react';

export const AuthenticatedGuard = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  signIn();
  return null;
};
