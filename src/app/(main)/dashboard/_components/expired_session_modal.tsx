"use client";
import * as React from "react";
import { useAppSelector } from "lta/hooks/redux";
import { useRouter } from "next/navigation";

type Props = {};
export default function ExpiredModal(props: Props) {
    const router = useRouter();
    const modelRef = React.useRef<HTMLDialogElement>(null);
    const openDialog = React.useCallback(() => {
        modelRef.current?.showModal();
    }, []);

    const isExpired = useAppSelector((state) => state.main).expired_session;

    React.useEffect(() => {
        isExpired && openDialog();
    }, [isExpired]);

    const loginAgain = React.useCallback(() => {
        router.replace("/get-started");
    }, [router]);
    return (
        <div>
            <dialog ref={modelRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Phiên đăng nhập đã hết hạn!
                    </h3>
                    <p className="py-4">Vui lòng đăng nhập lại</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={loginAgain} className="btn">
                                Hiểu rồi
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
