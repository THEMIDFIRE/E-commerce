import NextAuth, { User } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        user: {
            id: string,
            name: string,
            email: string,
            password: string,
            role: string
        },
        token: string
    }
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            password: string,
            role: string
        },
        token: jwt
    }
}