import { twMerge } from "tailwind-merge";

export function cn(...classnames: string[]) {
    return twMerge(...classnames);
}
