import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { PROTOCOL_AND_HOST } from 'server/shared/config/constants';
import { ROUTES } from '../routes/ROUTES';

export const AuthenticatedGuard = ({ children }) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Loading</div>;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  signIn(null, { callbackUrl: `${PROTOCOL_AND_HOST}${ROUTES.MY_TEMPLATES}` });
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
