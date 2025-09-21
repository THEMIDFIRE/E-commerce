"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AddUserAddress } from "@/lib/api"
import { toast } from "sonner"
import { useAddresses } from "@/context/UserContext"

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    details: z.string().min(3, "Details must be at least 3 characters long"),
    phone: z.string().min(11, "Phone number must be at least 10 characters long"),
    city: z.string().min(3, "City must be at least 3 characters long"),
})
type addressInfo = z.infer<typeof formSchema>

export default function UserAddresses() {
    const { getAddressesData } = useAddresses()

    const form = useForm<addressInfo>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            details: '',
            phone: '',
            city: ''
        }
    })


    const onSubmit = async (data: addressInfo) => {
        toast.promise(AddUserAddress(data), {
            loading: 'Adding address...',
            success: 'Address added successfully',
            error: 'Failed to add address'
        })
        form.reset()
        getAddressesData()
    }


    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4/5">
                    <div className="grid grid-cols-2 gap-4">
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
                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Details</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address Details" type="text" {...field} />
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
                                        <Input placeholder="Phone Number" type="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="City" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">
                        Add Address
                    </Button>
                </form>
            </Form>
        </div>
    )
}