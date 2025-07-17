import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { TaskBaseUrl } from "./faker";


interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/day13practice/login", // Custom sign-in page
  },
  session: {
    strategy: "jwt",
  },
  providers: [
   
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const res = await fetch(`${TaskBaseUrl}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials.email,
            password: credentials.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const tokens = await res.json();

        if (!res.ok) {
          throw new Error("UnAuthorized");
        }
        if (tokens) {
          // Return user object with accessToken and refreshToken
          return {
            id: tokens.loggedInUser.id,
            name: tokens.loggedInUser.name,
            email: tokens.loggedInUser.email,
            avatar: tokens.loggedInUser.avatar,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          } as UserType;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    
    async jwt({ token, user} : { token: JWT; user: User }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      const userObject: UserType = {
        id: token.id as string,
        avatar: (token.avatar as string) ?? "",
        name: (token.name as string) ?? "",
        accessToken: (token.accessToken as string) ?? "",
        refreshToken: (token.refreshToken as string) ?? "",
        email: (token.email as string) ?? "",
      };

      // Add the user object to the session
      session.user = userObject;
      return session;
    },
  },
};



declare module "next-auth" {
  interface User extends UserType {
  }
}

declare module "next-auth" {
  interface Session {
    user: UserType & {
      accessToken?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserType {}
}