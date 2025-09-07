"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PulseLoader } from "react-spinners"

const formSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
})
type LoginForm = z.infer<typeof formSchema>

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<LoginForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: LoginForm) => {
        try {
            setIsLoading(true)
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: '/'
            })

            if (!res?.ok) {
                toast.error(res?.error || "Invalid credentials")
            } else {
                toast.success('Login successful')
                router.replace('/')
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
                    <h2 className="text-4xl font-bold mb-4">Login</h2>
                    <p className="text-gray-400">Don't have an account? <Link href="/register" className="text-primary underline">Register</Link></p>
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <PulseLoader color="#fff" size={8} />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                            <div className="text-center">
                                <Link href="/forget-password" className="text-primary underline">Forgot password?</Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}