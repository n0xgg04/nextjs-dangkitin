"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Page() {
    const { status } = useSession();
    const router = useRouter();
    if (status === "unauthenticated") router.push("/get-started");
    else if (status === "authenticated") {
        router.push("/dashboard");
    }
    return (
        <div className="w-full min-h-screen grid place-items-center fixed z-20">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
}
