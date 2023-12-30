import * as React from "react";
import { ModalAction } from "lta/app/(main)/dashboard/_components/registered_model";
import { Undefable } from "lta/types/global";

type ModalContextType = {
    registeredModal: Undefable<React.RefObject<ModalAction>>;
};
const ModalContext = React.createContext<ModalContextType>({
    registeredModal: undefined,
});
export default function useModalManager() {
    return React.useContext<ModalContextType>(ModalContext);
}
type ModalProviderProps = {
    children: React.ReactNode;
};
export function ModalProvider({ children }: ModalProviderProps) {
    const registeredModal = React.useRef<ModalAction>(null);

    return (
        <ModalContext.Provider value={{ registeredModal }}>
            {children}
        </ModalContext.Provider>
    );
}
