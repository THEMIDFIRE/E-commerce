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

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})
type LoginForm = z.infer<typeof formSchema>

export default function Login() {

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema), defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: LoginForm) => {
        const res = await signIn('credentials', { email: data.email, password: data.password, redirect: false, callbackUrl: '/' })
        if (!res?.ok) {
            toast.error(res?.error)
        } else {
            toast.success('Login successful')
            router.replace('/')
        }
        console.log('res', res)
    }

    return (
        <section className="py-20">
            <div className="container max-w-2/3 md:max-w-1/2 lg:max-w-1/3 mx-auto">
                <div className="inner border-2 rounded-lg px-10 py-8">
                    <h2 className="text-4xl font-bold mb-4">Login</h2>
                    <p className="text-gray-400">Don't have an account? <Link href="/register" className="text-primary underline">Register</Link></p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10 text-center">
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
                            <Button type="submit" className="w-full">Login</Button>
                            <Link href="/forgot-password" className="text-primary underline">Forgot password?</Link>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}