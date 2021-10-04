import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextHandler } from 'next-connect';
import { User } from 'server/modules/users/user.model';

const secret = process.env.JWT_SECRET;

const getUserToken = async (req: NextApiRequest) => {
  return getToken({
    req,
    secret,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith('https://') ??
      process.env.VERCEL_ENV === 'preview' ??
      process.env.VERCEL_ENV === 'production',
  });
};

export type NextApiRequestWithUserInfo = NextApiRequest & {
  connectedUser?: User;
};

type ROLES = 'admin';

export const authenticationHandler = async (
  req: NextApiRequestWithUserInfo,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const token = await getUserToken(req);
  if (!token?.id) {
    res.status(401).json({ error: 'Should be connected' });
    return;
  }
  req.connectedUser = token as unknown as User;
  next();
};
