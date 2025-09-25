import "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        user: {
            id: string,
            name: string,
            email: string,
            phone: string,
            role: string
        },
        token: string
    }
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            role: string
        },
        token: string
        id: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: {
            id: string,
            name: string,
            email: string,
            phone: string,
            role: string
        },
        token?: string,
        id?: string
    }
}