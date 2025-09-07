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
import { forgetPassword } from "@/lib/api"

const formSchema = z.object({
    email: z.email("Please enter a valid email"),
})
type EmailForm = z.infer<typeof formSchema>

export default function ForgetPassword() {

    const form = useForm<EmailForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = async () => {
        try {
            const res = await forgetPassword(email)
            if (!res?.ok) {
                toast.error(res?.error || "Invalid credentials")
            } else {
                toast.success('Code Sent to the email')
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <section className="py-20">
            <div className="container max-w-4/5 md:max-w-1/2 lg:max-w-1/3 mx-auto">
                <div className="inner border-2 rounded-lg px-10 py-8">
                    <h2 className="text-4xl font-bold mb-4">Forget Passsword</h2>
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
                            <Button type="submit" className="w-full">
                                Send Code
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}