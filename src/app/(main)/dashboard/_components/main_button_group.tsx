"use client";
import * as React from "react";
import { FaRunning, FaSave } from "react-icons/fa";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "lta/hooks/redux";
import { setStep } from "lta/redux/actions/main";
import { toast } from "react-toastify";
import initReg from "lta/actions/init_reg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};
export default function MainButtonGroup(props: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [startTransition, pending] = React.useTransition();
    const step = useAppSelector((state) => state.main).step;
    const handleNextStep = React.useCallback(() => {
        dispatch(setStep(2));
    }, [step, dispatch]);

    const handleBack = React.useCallback(() => {
        dispatch(setStep(1));
    }, [step, dispatch]);
    const { data } = useSession();

    const handleSave = React.useCallback(() => {
        toast.success("Đã lưu thông tin!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }, []);

    const handleRun = React.useCallback(() => {
        toast.info("Đang khởi tạo...", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        data &&
            initReg(data)
                .then((d) => {
                    console.log(d);
                    toast.success(
                        "Khởi tạo dữ liệu thành công, bạn có thể bắt đầu đăng ký môn!",
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        },
                    );
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Khởi tạo thất bại! Hãy thử đăng nhập lại", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                });
    }, [data]);

    return (
        <div className="w-full flex justify-end mt-5 gap-x-2">
            {step != 2 ? (
                <>
                    <button
                        className="btn btn-neutral btn-sm"
                        onClick={handleSave}
                    >
                        <FaSave />
                        Lưu
                    </button>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleRun}
                    >
                        <FaRunning />
                        Khởi tạo
                    </button>
                    <button
                        onClick={handleNextStep}
                        className="btn btn-active btn-sm"
                    >
                        <MdNavigateNext />
                        Bắt đầu đăng ký
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={handleBack}
                        className="btn btn-active btn-sm"
                    >
                        <MdNavigateBefore />
                        Huỷ và quay lại
                    </button>
                </>
            )}
        </div>
    );
}
