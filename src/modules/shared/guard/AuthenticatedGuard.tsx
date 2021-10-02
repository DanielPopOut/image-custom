import { signIn, useSession } from 'next-auth/react';
import React from 'react';

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

export const withAuthenticatedGuard =
  <ComponentProps,>(Component: React.FC<ComponentProps>) =>
  (props: ComponentProps) => {
    return (
      <AuthenticatedGuard>
        <Component {...props} />
      </AuthenticatedGuard>
    );
  };
