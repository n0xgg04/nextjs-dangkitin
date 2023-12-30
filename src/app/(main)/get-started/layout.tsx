import * as React from "react";

type Props = {
    children: React.ReactNode;
};
export default function Layout({ children }: Props) {
    return <div className="w-screen min-h-screen">{children}</div>;
}
