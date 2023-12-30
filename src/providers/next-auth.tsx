"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
    children: React.ReactNode;
};
export default function NextAuthSession({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}
