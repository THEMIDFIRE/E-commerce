"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import GoBack from "@/app/_components/shared/GoBack"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { forgetPassword } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PulseLoader } from "react-spinners"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.email("Please enter a valid email"),
})

type UserEmail = z.infer<typeof formSchema>

export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<UserEmail>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '' }
    })

    const onSubmit = async (formData: UserEmail) => {
        try {
            setIsLoading(true)
            const res = await forgetPassword(formData)

            // Fixed: Corrected the success/error logic
            if (res.success || res.message) {
                toast.success(res.message || "Reset code sent successfully!")
                router.push('/resetCode')
            } else {
                const errorMessage = res.error ||
                    res.message ||
                    "Failed to send reset code"
                toast.error(errorMessage)
            }
        } catch (error: any) {
            console.error('Forget password error:', error)
            toast.error("Network error. Please check your connection and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="py-20">
            <div className="container max-w-4/5 md:max-w-1/2 lg:max-w-1/3 mx-auto">
                <div className="inner border-2 rounded-lg px-10 py-8">
                    <h2 className="text-4xl font-bold mb-4">Forget Password</h2>
                    <p className="text-gray-600 mb-6">
                        Enter your email address and we'll send you a code to reset your password.
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@host.com"
                                                type="email"
                                                {...field}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <PulseLoader size={8} color="white" className="mr-2" />
                                        Sending Code...
                                    </>
                                ) : (
                                    "Send Reset Code"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6 text-center">
                        <GoBack>Back to Sign In</GoBack>
                    </div>
                </div>
            </div>
        </section>
    )
}