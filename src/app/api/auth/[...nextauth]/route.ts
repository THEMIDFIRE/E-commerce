import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode } from "next-auth/jwt";


const handler = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "email" },
                password: { label: "password", type: "password", placeholder: "password" }
            },
            authorize: async (credentials) => {
                const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                const data = await res.json()
                if (res.ok) {                    
                    let userId = null
                    try {
                        const decodedToken = await decode({
                            token: data.token,
                            secret: process.env.AUTH_SECRET!
                        })
                        userId = decodedToken?.id
                    } catch (error) {
                        console.log('Error decoding token:', error)
                        try {
                            const payload = JSON.parse(atob(data.token.split('.')[1]))
                            userId = payload.id
                        } catch (manualError) {
                            console.log('Manual extraction also failed:', manualError)
                        }
                    }
                    
                    return { id: userId, user: data.user, token: data.token }
                } else {
                    throw Error(data.message || 'Failed to login')
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user
                token.token = user.token
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...(token.user as any),
                id: token.id
            } as {
                id: string;
                name: string;
                email: string;
                role: string;
            }
            session.token = token.token
            return session
        }
    }
})

export { handler as GET, handler as POST };
