import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import bcrypt from 'bcryptjs'
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
