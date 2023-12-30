"use client";
import * as React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useFormStatus } from "react-dom";

type Props = {};
export default function AddButtonRegister(props: Props) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="btn btn-success btn-sm"
            disabled={pending}
        >
            <IoAddCircleOutline className="text-lg" />
            Thêm
        </button>
    );
}
