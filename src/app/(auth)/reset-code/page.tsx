"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { resetCode } from "@/lib/api"
import { PulseLoader } from "react-spinners"

const FormSchema = z.object({
    resetCode: z.string().min(6),
})

type ResetCodeForm = z.infer<typeof FormSchema>

export default function ResetCode() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ResetCodeForm>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            resetCode: "",
        },
    })

    const onSubmit = async (formData: ResetCodeForm) => {

        try {
            setIsLoading(true)
            const res = await resetCode({
                resetCode: formData.resetCode,
            })

            if (res?.status === "Success") {
                toast.success(res?.message || "Reset code verified successfully!")
                router.push('/reset-password')
            } else {
                toast.error(res?.message || "Invalid reset code")
            }
        } catch (error: any) {
            console.error('Reset code error:', error)
            toast.error(error?.message || "Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className="container max-w-md mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center space-y-6 py-10 px-8 bg-white rounded-lg shadow-lg border">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-bold mb-2">Verify Reset Code</h2>
                            <p className="text-gray-600 text-sm">
                                Enter the 6-digit code sent to your email
                            </p>
                        </div>

                        <FormField
                            control={form.control}
                            name="resetCode"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-center block">One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            {...field}
                                            disabled={isLoading}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription className="text-center">
                                        Please enter the one-time password sent to your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <PulseLoader size={8} color="white" className="mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Code"
                            )}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                                onClick={() => router.push('/forget-password')}
                            >
                                Didn't receive code? Send again
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    )
}