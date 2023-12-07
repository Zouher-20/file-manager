import { getServerSession, Session, type NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import bcrypt from 'bcryptjs'
import { GetServerSidePropsContext } from "next";
import jwt from 'jsonwebtoken'
const KEY = process.env.NEXTAUTH_SECRET as string;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // @ts-ignore-nextline
      authorize: async (credentials, req) => {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user) {
          const providedPassword: string = credentials?.password || ''
          const isMatch = await bcrypt.compare(providedPassword, user?.password)
          if (!isMatch) return null;
          const payload = {
            id: user.id,
            email: user.email,
          };
          var token = ''
          try {
            token = jwt.sign(payload, KEY, { expiresIn: '1d' });
          } catch (e) {
            return null;
          }
          return { ...user, token };
        } else {
          return null;
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

