"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export const getUserToken = async () => {
    const userToken = (await cookies()).get('next-auth.session-token')?.value
    const token = await decode({
        token: userToken,
        secret: process.env.AUTH_SECRET!
    })
    return token?.token as string
}