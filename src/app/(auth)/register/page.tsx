"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "sonner"
import { useState } from "react"
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().regex(/^[A-Z](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 
        "Password must start with uppercase, contain lowercase, number, special character, and be at least 9 characters"),
    rePassword: z.string(),
    phone: z.string().min(8, "Phone must be at least 8 characters"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
})

type RegisterForm = z.infer<typeof formSchema>

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    
    const form = useForm<RegisterForm>({
        resolver: zodResolver(formSchema), 
        defaultValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }
    })

    const onSubmit = async (data: RegisterForm) => {
        console.log('data', data)
        try {
            setIsLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('res', res)
            
            const result = await res.json()
            
            if (res.ok) {
                toast.success("Account created successfully! Please login.")
                router.push('/login')
            } else {
                toast.error(result.message || "Failed to create account")
            }
        } catch (error) {
            console.error('Registration error:', error)
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="pt-10 pb-20">
            <div className="container max-w-4/5 md:max-w-1/2 lg:max-w-1/3 mx-auto">
                <div className="inner border-2 rounded-lg px-10 py-8">
                    <h2 className="text-4xl font-bold mb-4">Signup</h2>
                    <p className="text-gray-400">Have an account? <Link href="/login" className="text-primary underline">Login</Link></p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Phone" type="tel" {...field} />
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
                            <FormField
                                control={form.control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirm Password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <PulseLoader color="#fff" size={8} />
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}