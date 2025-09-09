"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { newPassword } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PulseLoader } from "react-spinners"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.email("Please enter a valid email"),
    newPassword: z.string().min(8, "Password must be at least 8 characters")
})
type NewPasswordForm = z.infer<typeof formSchema>

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<NewPasswordForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            newPassword: ''
        }
    })

    const onSubmit = async (formData: NewPasswordForm) => {
        try {
            setIsLoading(true)
            const res = await newPassword({
                email: formData.email,
                newPassword: formData.newPassword,
            })
            
            if (res?.token) {
                toast.success(res?.message || "Password successfully changed")
                router.push('/login')
            } else {
                toast.error(res?.message || "Invalid credentials")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="py-20">
            <div className="container max-w-4/5 md:max-w-1/2 lg:max-w-1/3 mx-auto">
                <div className="inner border-2 rounded-lg px-10 py-8">
                    <h2 className="text-4xl font-bold mb-4">Password Reset</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@host.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your New Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <PulseLoader color="#fff" size={8} />
                                ) : (
                                    "Change Password"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}