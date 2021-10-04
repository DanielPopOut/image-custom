import { signOut } from 'next-auth/react';

export const SignOutButton = () => {
  return (
    <button className='button' onClick={() => signOut()}>
      Sign out
    </button>
  );
};
