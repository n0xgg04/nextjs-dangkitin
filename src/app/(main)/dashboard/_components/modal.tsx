"use client";
import * as React from "react";

type Props = {};
export default function Modal(props: Props) {
    const modelRef = React.useRef<HTMLDialogElement>(null);
    const openDialog = React.useCallback(() => {
        modelRef.current?.showModal();
    }, []);
    React.useEffect(() => {
        setTimeout(() => openDialog(), 1000);
    }, []);
    return (
        <div>
            <dialog ref={modelRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Chọn thời điểm đăng ký tín
                    </h3>
                    <p className="py-4">Ấn ESC hoặc ấn nút Đóng để hoàn tất</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Đóng</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
