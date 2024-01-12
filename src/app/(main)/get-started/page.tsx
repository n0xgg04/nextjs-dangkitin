"use client";
import * as React from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

type PageProps = {
    searchParams: { error?: string };
};

export default React.memo(function Page({ searchParams }: PageProps) {
    const studentCodeRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const keyRef = React.useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

    const onSubmitForm = React.useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const studentCode = studentCodeRef.current!.value;
        const password = passwordRef.current!.value;
        const key = keyRef.current!.value;
        await signIn("credentials", {
            student_code: studentCode,
            password: password,
            key: key,
            callbackUrl: "/",
        });
        setIsSubmitting(false);
    }, []);

    return (
        <div className="w-full h-screen grid place-items-center text-black">
            <form onSubmit={onSubmitForm}>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-gray-800 dark:text-gray-200">
                            Bắt đầu
                        </h2>
                        <p className="text-sm dark:text-gray-400">
                            Bạn cần cung cấp một số thông tin trước khi bắt đầu
                            sử dụng công cụ
                        </p>
                        {!isSubmitting && searchParams.error && (
                            <div
                                role="alert"
                                className="alert alert-error my-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-sm dark:text-gray-800">
                                    Vui lòng kiểm tra lại tài khoản và key!
                                </span>
                            </div>
                        )}
                        <input
                            type="text"
                            name="student_code"
                            ref={studentCodeRef}
                            placeholder="Mã sinh viên"
                            className="input input-bordered w-full max-w-xs dark:text-gray-200"
                        />
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">
                                    Mật khẩu quản lý đào tạo
                                </span>
                                <span className="label-text-alt">(*)</span>
                            </div>
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                placeholder="Mật khẩu qldt"
                                className="input input-bordered w-full max-w-xs dark:text-gray-200"
                            />
                            <div className="label">
                                <span className="label-text-alt">
                                    Yên tâm, admin đéo lưu lại đâu...
                                </span>
                            </div>
                        </label>
                        <input
                            type="password"
                            ref={keyRef}
                            placeholder="Key"
                            name="key"
                            className="input input-bordered input-error w-full max-w-xs dark:text-gray-200"
                        />
                        <div className="card-actions">
                            <button
                                className="btn btn-primary text-white mt-2"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-infinity loading-sm"></span>
                                        Đang đăng nhập
                                    </>
                                ) : (
                                    "Tiếp tục"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
});
