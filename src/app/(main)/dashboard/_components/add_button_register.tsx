"use client";
import * as React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import { MonInterface } from "lta/types/monInterface";
import { toast } from "react-toastify";

type Props = {
    appref: {
        mamonRef: React.RefObject<HTMLInputElement>;
        nhomRef: React.RefObject<HTMLInputElement>;
        toRef: React.RefObject<HTMLInputElement>;
        formRef: React.RefObject<HTMLFormElement>;
        lopRef: React.RefObject<HTMLInputElement>;
    };
};
export default function AddButtonRegister({ appref }: Props) {
    const { pending } = useFormStatus();
    const submitForm = () => {
        if (pending) return;

        const ma = appref.mamonRef.current?.value;
        const nhom = appref.nhomRef.current?.value;
        const lop = appref.lopRef.current?.value;
        const to = appref.toRef.current?.value;
        const data: MonInterface[] = JSON.parse(
            localStorage.getItem("monOk") || "{}",
        );
        const fil = data.filter(
            (m) =>
                m.lop == lop &&
                m.to == to &&
                m.nhom_to == nhom &&
                m.ma_mon == ma,
        );
        if (fil.length === 0) {
            toast.error("Thông tin bạn nhập không chính xác!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            appref.formRef.current?.requestSubmit();
            appref.formRef.current?.reset();
        }
    };

    return (
        <button
            type="button"
            onClick={submitForm}
            className="btn btn-success btn-sm"
            disabled={pending}
        >
            <IoAddCircleOutline className="text-lg" />
            Thêm
        </button>
    );
}
