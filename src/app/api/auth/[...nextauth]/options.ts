import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  phone : string;
  is_ban: boolean;
}

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        const res = await fetch(`${backend_url}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });



        // if (user) {
        //   return {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,  
        //     token: user.token,
        //     phone : user.phone,
        //     is_ban: user.is_ban,
        //   };
        // } else {
        //   throw new Error("Invalid credentials");
        // }

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.msg || "Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
          phone: user.phone,
          is_ban: user.is_ban,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user , trigger, session }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.email = user.email
        token.name = user.name
        token.phone = user.phone
        token.is_ban = user.is_ban;
      }
        

      // newly added line 
      if (trigger === "update" && session) {
        token.name = session.name;
       
        token.phone = session.phone;
      }
      // newly added line 


      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.token = token.token;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.phone = token.phone as string
        session.user.is_ban = token.is_ban as boolean;
      }
      return session;
    },
  },
};
