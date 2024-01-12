import * as React from "react";

type Props = {
    children: React.ReactNode;
};

interface data {
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    date: Date;
}

const init = {
    setDate: () => {},
    date: new Date(),
};
const DateContext = React.createContext<data>(init);
export default function useDateContext() {
    return React.useContext(DateContext);
}

export function DateProvider({ children }: Props) {
    const [date, setDate] = React.useState<Date>(new Date());
    return (
        <DateContext.Provider
            value={{
                setDate,
                date,
            }}
        >
            {children}
        </DateContext.Provider>
    );
}
