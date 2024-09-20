'use client'

import * as React from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const SignInformSchema = z.object({
    emailId: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(64, { message: "Password can't be longer than 64 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
})

export default function SignInPage() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const router = useRouter()

    const form = useForm<z.infer<typeof SignInformSchema>>({
        resolver: zodResolver(SignInformSchema),
        defaultValues: {
            emailId: '',
            password: '',
        },
    })

    // Handle the submission of the sign-in form
    const handleSubmit = async () => {
        if (!isLoaded) {
            return
        }

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: form.getValues('emailId'),
                password: form.getValues('password'),
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.push('/dashboard')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
        }
    }



    function onSubmit(values: z.infer<typeof SignInformSchema>) {
        handleSubmit();
    }

    // Display a form to capture the user's email and password
    return (
        <div className="flex flex-col items-center justify-center text-slate-50">
            <div className='flex flex-col items-center justify-center space-y-2'>
                <h1 className='text-3xl font-bold'>Create an account</h1>
                <p className='text-sm text-gray-400'>Enter your email below to create your account</p>
            </div>
            <div className='w-full min-w-[24em] mt-8 space-y-6'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="emailId"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Email</FormLabel> */}
                                    <FormControl className='border-gray-800 ease-in-out duration-100 focus:border-gray-50'>
                                        <Input type='email' placeholder="name@example.com" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                    Enter your email address to sign in.
                                </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Password</FormLabel> */}
                                    <FormControl className='border-gray-800 ease-in-out duration-100 focus:border-gray-50'>
                                        <Input type='password' placeholder="password" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                    Enter your password to sign in.
                                </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full font-bold bg-white text-gray-800 hover:bg-gray-200'>Sign in with Email</Button>
                    </form>
                </Form>
                <div className='flex items-center justify-center space-x-2'>
                    <hr className='border-gray-800 flex flex-auto w-full' />
                    <p className='text-gray-500 text-sm font-light uppercase w-full text-center whitespace-nowrap'>or continue with</p>
                    <hr className='border-gray-800 flex flex-auto w-full' />
                </div>
                <div className='flex items-center justify-center space-x-2'>
                    <Button className='w-full bg-transparent space-x-1 border border-gray-800 ease-in-out duration-200 font-bold hover:bg-gray-800'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <span>
                            Google
                        </span>
                    </Button>
                </div>
                <div>
                    <p className='text-sm text-gray-400'>Enter your email below to create your account</p>
                    <p className='text-sm text-gray-400'>Enter your email below to create your account</p>
                </div>
            </div>
        </div>
    )
}