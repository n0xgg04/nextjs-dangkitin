import * as React from "react";
import { useImperativeHandle } from "react";
import axios from "lta/lib/axios";
import { useSession } from "next-auth/react";
import RegisteredSubjectTable from "lta/app/(main)/dashboard/_components/registered_subject_table";

type Props = {};
export type ModalAction = {
    openModal: () => void;
    closeModal: () => void;
};
export default React.forwardRef(function RegisteredModel(
    props: Props,
    ref: React.ForwardedRef<ModalAction>,
) {
    const modalRef = React.useRef<HTMLDialogElement>(null);
    useImperativeHandle(
        ref,
        () => {
            return {
                openModal: () => {
                    modalRef?.current?.showModal();
                },
                closeModal: () => modalRef?.current?.close(),
            };
        },
        [],
    );

    return (
        <>
            <dialog ref={modalRef} id="registered" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Môn học đã đăng ký</h3>
                    <div className="py-4">
                        <RegisteredSubjectTable />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Đóng</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
});
