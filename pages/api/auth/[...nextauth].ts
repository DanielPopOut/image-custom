import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { getDb } from '../../../server/modules/database/database';

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter({
      db: await getDb(),
    }),
    // Configure one or more authentication providers
    providers: [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
      // ...add more providers here
    ],
    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `jwt` is automatically set to `true` if no database is specified.
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },

    callbacks: {
      session: async (params) => {
        return params.session;
      },
      jwt: async (data) => {
        if (data.user) {
          return data.user;
        }
        return data.token;
      },
      signIn: (data) => {
        return true;
      },
    },
  });
}
