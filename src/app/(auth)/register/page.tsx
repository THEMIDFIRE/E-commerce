"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const formSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
    rePassword: z.string().min(8),
    phone: z.string(),
})
type RegisteerForm = z.infer<typeof formSchema>

export default function Login() {
    const form = useForm({
        resolver: zodResolver(formSchema), defaultValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }
    })

    const onSubmit = (data: RegisteerForm) => {
        console.log('data', data)
    }

    return (
        <section className="pt-10 pb-20">
            <div className="container max-w-2/3 md:max-w-1/3 mx-auto">
                <div className="inner border-2 rounded-lg px-10 py-8">
                    <h2 className="text-4xl font-bold mb-4">Signup</h2>
                    <p className="text-gray-400">Have an account? <Link href="/login" className="text-primary underline">Login</Link></p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10 text-center">
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
                                            <Input placeholder="Your Phone" type="text" {...field} />
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
                            <Button type="submit" className="w-full">Create Account</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}