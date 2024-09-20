"use client";
import Image from "next/image";

import { useUser } from '@clerk/nextjs'

export default function Dashboard() {

    const { isLoaded, isSignedIn, user } = useUser()

    if (!isLoaded || !isSignedIn) {
        return null
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-8">
                Welcome to your Dashboard, {user.fullName}!
            </h1>
            <div className="relative w-64 h-64 mb-8">
                <Image
                    src="https://img1.picmix.com/output/stamp/normal/6/9/6/8/1778696_f509f.gif"
                    alt="Revolving Sphere"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
            </div>
            <p className="text-xl text-gray-600">
                Explore the endless possibilities within Innosphere
            </p>
        </div>
    );
}
