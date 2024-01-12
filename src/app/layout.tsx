import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { cn } from "../lib/classnames";
import "./globals.css";
import NextAuthSession from "lta/providers/next-auth";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Đăng ký tín chỉ",
    description: "Đăng ký tín chỉ PTIT v1.1",
    authors: {
        name: "n0xgg04",
        url: "htts://github.com/n0xgg04",
    },
    keywords: ["ptit", "dangky"],
};

type RootLayoutType = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutType) {
    return (
        <html lang="vi" data-theme="dark">
            <body className={cn(inter.className, "min-h-screen w-screen")}>
                <NextAuthSession>{children}</NextAuthSession>
                <Toaster />
            </body>
        </html>
    );
}
