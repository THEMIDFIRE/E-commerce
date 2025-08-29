import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


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
                    return { id: data.user.id, user: data.user, token: data.token }
                } else {
                    throw Error(data.message || 'Failed to login')
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            token.user = user.user
            token.token = user.token
            return token
        },
        async session({ session, token }) {
            session.user = token.user as {
                id: string;
                name: string;
                email: string;
                password: string;
                role: string;
            }
            session.token = token.token
            return session
        }
    }
})

export { handler as GET, handler as POST };
