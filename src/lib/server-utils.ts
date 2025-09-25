"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const getUserToken = async (returnDecoded = false) => {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) return null
        
        if (returnDecoded) {
            return session
        }
        
        // Return the API token stored in the session
        return session.token as string
    } catch (error) {
        console.error('Error getting session:', error)
        return null
    }
}