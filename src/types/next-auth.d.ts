import "next-auth"

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
        token: jwt
    }
}