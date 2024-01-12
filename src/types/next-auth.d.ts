import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserPayload } from "lta/types/auth/user-payload";

declare module "next-auth" {
    interface Session {
        user: UserPayload;
    }

    interface User extends UserPayload {}
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string;
        user_data: UserPayload;
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: sting;
        }
    }
}
