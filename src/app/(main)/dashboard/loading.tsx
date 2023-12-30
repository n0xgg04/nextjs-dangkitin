import * as React from "react";

export default function Loading() {
    return (
        <div className="w-full min-h-full grid place-items-center">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
}
