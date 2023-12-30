"use client";
import * as React from "react";
import { FaSave } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "lta/hooks/redux";
import { setStep } from "lta/redux/actions/main";

type Props = {};
export default function MainButtonGroup(props: Props) {
    const dispatch = useAppDispatch();
    const step = useAppSelector((state) => state.main).step;
    const handleNextStep = React.useCallback(() => {
        dispatch(setStep(2));
    }, [step, dispatch]);
    return (
        <div className="w-full flex justify-end mt-5 gap-x-2">
            <button className="btn btn-neutral btn-sm">
                <FaSave />
                Lưu
            </button>
            <button onClick={handleNextStep} className="btn btn-active btn-sm">
                <MdNavigateNext />
                Tiếp tục
            </button>
        </div>
    );
}
