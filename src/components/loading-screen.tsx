import * as React from "react";

type Props = {};
export default function LoadingScreen(props: Props) {
    return (
        <div className="h-screen w-screen grid place-items-center">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
}
