import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserClient } from "~/lib/globals.types";
import { signJWTToken } from "~/lib/jwt";
import { prisma } from "~/lib/prisma";

import { apiUrl } from "~/service/api";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const res = await fetch(apiUrl + "login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user: UserClient = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    //let's save the user in the db if it doesn't exist
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user) {
        const userBody = {
          name: token.name,
          email: token.email,
          image: user.image,
          id: user.id,
          provider: "credentials",
          accessToken: "",
        };

        const newToken = signJWTToken(user);
        userBody.accessToken = newToken;
        token.accessToken = newToken;
        token.id = user.id;

        const newTokenBody: JWT = {
          name: token.name,
          email: token.email,
          picture: user.image,
          sub: user.id,
          accessToken: newToken,
          provider: "credentials",
        };

        return { ...newTokenBody, ...userBody };
      }

      if (account?.provider === "google" && user?.email) {
        const exixtingUser = await prisma.user.findUnique({
          where: {
            email: user?.email,
          },
        });
        if (!exixtingUser) {
          const newUser = await prisma.user.create({
            data: {
              name: user.name + "",
              email: user.email + "",
              imageUrl: user.image + "",
              provider: "google",
              providerId: user.id + "",
              password: "",
              phone: "",
            },
          });
          token.id = newUser.id;
          user.id = newUser.id;
        } else {
          token.id = exixtingUser.id;
          user.id = exixtingUser.id;
        }
      }

      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      return { ...session, ...token };
    },
  },

  pages: {
    signIn: "/",
    signOut: "/",
    verifyRequest: "/",
    newUser: "/",
  },
});

export { handler as GET, handler as POST };
