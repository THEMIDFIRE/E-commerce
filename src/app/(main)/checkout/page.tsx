"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { z } from "zod";
import { checkoutCOD } from "@/lib/api";
import { useCart } from "@/context/UserContext";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const formSchema = z.object({
    details: z.string().min(10),
    phone: z.string(),
    city: z.string(),
})
type CheckoutForm = z.infer<typeof formSchema>


export default function Checkout() {
    const [isLoading, setIsLoading] = useState(false)
    const { cart } = useCart()
    const cartId = cart?.cartId
    
    const form = useForm<CheckoutForm>({
        resolver: zodResolver(formSchema),
    })
    
    const handleCheckout = async (data: CheckoutForm) => {
        const formData = {"shippingAddress": data}
        checkoutCOD(cartId, formData)
        toast.success("Order placed successfully")
        redirect('/allorders')
    }
    return (
        <section>
            <div className="container max-w-4/5 mx-auto">
                <div className="inner max-w-4/5 md:max-w-2/3 mx-auto my-10">
                    <h3 className="text-2xl font-bold">Checkout</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-8 mt-10">
                            <FormField
                                control={form.control}
                                name="details"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Details</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe street" type="text" {...field} />
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
                                            <Input placeholder="Your phone number" type="tel" {...field} />
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
                                            <Input placeholder="Your city" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <PulseLoader color="#fff" size={8} />
                                ) : (
                                    "Proceed"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}
