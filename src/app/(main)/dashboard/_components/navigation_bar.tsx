"use client";
import * as React from "react";
import { useSession } from "next-auth/react";
import ThemeSwitcher from "lta/app/(main)/dashboard/_components/theme-switcher";
import useModalManager from "lta/providers/modal-manager";
import { useAppDispatch } from "lta/hooks/redux";
import { fetchRegisteredData } from "lta/redux/thunks/main";
import { MdLogout } from "react-icons/md";
import { setLoadingRegisteredData } from "lta/redux/actions/main";
import { signOut } from "next-auth/react";
import LogoutBtn from "lta/app/(main)/dashboard/_components/logout_btn";

export default function NavigationBar() {
    const { data, status } = useSession();
    const { registeredModal, guideModal } = useModalManager();
    const dispatch = useAppDispatch();
    const onOpen = React.useCallback(async () => {
        data && dispatch(setLoadingRegisteredData(true));
        data && dispatch(fetchRegisteredData(data));
        registeredModal?.current?.openModal();
    }, [registeredModal?.current]);

    const openGuide = React.useCallback(() => {
        guideModal?.current?.openModal();
    }, []);

    return (
        <div className="w-full flex justify-center sticky md:top-3 p-3 md:p-0">
            <ul className="menu bg-base-200 menu-horizontal rounded-box">
                <li onClick={openGuide}>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Hướng dẫn sử dụng
                    </a>
                </li>
                <li onClick={onOpen}>
                    <a>Xem môn đã đăng ký</a>
                </li>
                <li>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {data?.user.student_code}
                        <span className="badge badge-sm badge-warning">
                            VIP
                        </span>
                    </a>
                </li>
                <li>
                    <a>
                        {data?.user?.name}
                        <span className="badge badge-xs badge-info"></span>
                    </a>
                </li>
                <li>
                    <ThemeSwitcher />
                </li>
                <LogoutBtn />
            </ul>
        </div>
    );
}
