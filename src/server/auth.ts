import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import bcrypt from 'bcryptjs'
import { GetServerSidePropsContext } from "next";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  session: {},
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // @ts-ignore
      authorize: async (credentials , req) => {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user) {
          const providedPassword: string = credentials?.password || ''
          const isMatch = await bcrypt.compare(providedPassword, user?.password)
          if (isMatch) return user;
          return null;
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

