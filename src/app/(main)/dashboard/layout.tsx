"use client";
import * as React from "react";
import NavigationBar from "lta/app/(main)/dashboard/_components/navigation_bar";
import CountDown from "lta/components/count-down";
import Modal from "lta/app/(main)/dashboard/_components/modal";
import RegisteredModal from "lta/app/(main)/dashboard/_components/registered_model";
import useModalManager from "lta/providers/modal-manager";
import ExpiredModal from "lta/app/(main)/dashboard/_components/expired_session_modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingScreen from "lta/components/loading-screen";
import { DateProvider } from "lta/providers/set-date-context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import GuideModel from "lta/app/(main)/dashboard/_components/guide_modal";

type Props = {
    children: React.ReactNode;
};
export default function Layout({ children }: Props) {
    const { registeredModal, guideModal } = useModalManager();
    const { status } = useSession();
    const router = useRouter();
    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/get-started");
        }
    }, [status]);
    if (status === "loading") return <LoadingScreen />;
    return (
        status === "authenticated" && (
            <div className="w-screen min-h-screen">
                <NavigationBar />
                <ToastContainer />
                <DateProvider>
                    <CountDown />
                    <ExpiredModal />
                    <RegisteredModal ref={registeredModal} />
                    <Modal />
                    <GuideModel ref={guideModal} />
                </DateProvider>

                {children}
            </div>
        )
    );
}
