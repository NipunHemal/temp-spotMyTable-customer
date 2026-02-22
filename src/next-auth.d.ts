import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      name: string;
      email: string;
      phone: string,
      is_ban : boolean
    
    };
  }

  interface User {
    id: string;
    token: string;
    phone:string
    is_ban : boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
  
  }
}
