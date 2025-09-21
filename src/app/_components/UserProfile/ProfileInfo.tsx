"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateProfile } from "@/lib/api"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Please enter a valid email"),
    phone: z.string().min(11, "Phone number must be at least 10 characters long"),
})
type profileInfo = z.infer<typeof formSchema>

export default function ProfileInfo() {

    const form = useForm<profileInfo>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
        }
    })


    const onSubmit = async (data: profileInfo) => {
        toast.promise(updateProfile(data), {
            loading: 'Updating profile...',
            success: 'Profile updated successfully',
            error: 'Email already exists'
        })
        form.reset()
    }


    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4/5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
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
                                        <Input placeholder="01123456789" type="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
        </div>
    )
}