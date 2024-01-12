"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

type Props = {};
export default function NotFound(props: Props) {
    const router = useRouter();
    const onGoBack = React.useCallback(() => {
        router.replace("/");
    }, [router]);

    return (
        <div className="hero min-h-screen bg-base-200" data-theme="dark">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">404 Not Found</h1>
                    <p className="py-6">
                        Bạn đang truy cập vào trang không có sẵn.
                    </p>
                    <button onClick={onGoBack} className="btn btn-primary">
                        Trở lại
                    </button>
                </div>
            </div>
        </div>
    );
}
