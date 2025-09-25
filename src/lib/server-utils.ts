"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export const getUserToken = async (returnDecoded = false) => {
    const userToken = (await cookies()).get('*next-auth.session-token')?.value
    if (!userToken) return null
    
    const decoded = await decode({
        token: userToken,
        secret: process.env.AUTH_SECRET!
    })
    
    return returnDecoded ? decoded : (decoded?.token as string)
}