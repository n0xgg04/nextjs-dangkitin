"use client";
import * as React from "react";
import { ThemeProvider } from "lta/hooks/use-theme";
import { ModalProvider } from "lta/providers/modal-manager";
import { Provider } from "react-redux";
import { store } from "lta/redux/store";

type Props = {
    children: React.ReactNode;
};
export default function Layout({ children }: Props) {
    return (
        <ThemeProvider>
            <ModalProvider>
                <Provider store={store}>{children}</Provider>
            </ModalProvider>
        </ThemeProvider>
    );
}
