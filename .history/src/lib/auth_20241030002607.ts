import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
interface Credentials {
  email: string;
  password: string;
}
const config = {
  pages: {
    signIn: "/log-in",
  },
  providers: [
    Credentials({
      async authorize(credentials: Partial<Credentials>) {
        // runs on every login
        const { email, password } = credentials;
        if (!email || !password) {
          console.log("Email or password is missing");
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        // check if there is a user with an email in db
        if (!user) {
          console.log("no user found in database");
          return null;
        }
        // check if their pswrd match
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordsMatch) {
          console.log("passwords dont match");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      // runs on every request with middleware
      const isTryingToAccessApp =
        request.nextUrl.pathname.includes("mode") ||
        request.nextUrl.pathname.includes("challenge");
      const isTryingToAccessLogin = request.nextUrl.pathname.includes("log-in");
      if (isTryingToAccessApp && !isLoggedIn) return false;
      if (isTryingToAccessLogin && isLoggedIn) {
        return NextResponse.redirect(new URL("/account", request.url));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(config);
