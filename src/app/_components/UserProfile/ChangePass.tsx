"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { changePassword } from "@/lib/api"
import { toast } from "sonner"

const formSchema = z.object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    rePassword: z.string().min(8, "Password must be at least 8 characters long"),
})
type passwordForm = z.infer<typeof formSchema>

export default function ChangePass() {

    const form = useForm<passwordForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        }
    })


    const onSubmit = async (data: passwordForm) => {
        toast.promise(changePassword(data), {
            loading: 'Updating password...',
            success: 'Password updated successfully',
            error: 'Password can\'t be the same as the old password'
        })
    }


    return (
        <div className="space-y-8">
            <h4 className="font-bold text-xl">Change Password</h4>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[400px]">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Current Password" type="password" {...field} />
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
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="New Password" type="password" {...field} />
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
                                <FormLabel>Re-Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Re-Password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
        </div>
    )
}