"use client";
import * as React from "react";

type ThemeType = "light" | "dark";
type ThemeContextType = {
    theme: ThemeType;
    setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};
const ThemeContext = React.createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => {},
});
export default function useTheme() {
    return React.useContext(ThemeContext);
}

type ThemeProviderType = {
    children: React.ReactNode;
};
//@ts-nocheck
//@ts-ignore

export function ThemeProvider({ children }: ThemeProviderType) {
    const [theme, setTheme] = React.useState<ThemeType>("dark");

    React.useLayoutEffect(() => {
        const themeDefault = ((window.localStorage &&
            window.localStorage.getItem("app-theme")) ||
            "dark") as ThemeType;
        setTheme(themeDefault);
    }, []);

    React.useLayoutEffect(() => {
        window.localStorage.setItem("app-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div data-theme={theme} className="w-screen overflow-none">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
