import * as React from "react";
import { MdLogout } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
type Props = {};
export default function LogoutBtn(props: Props) {
    const { data } = useSession();
    const onLogout = React.useCallback(async () => {
        await axios.get("/api/qldt/logout", {
            headers: {
                Authorization: data?.user.token,
            },
        });
        await signOut({
            redirect: true,
            callbackUrl: "/get-started",
        });
    }, []);
    return (
        <li onClick={onLogout}>
            <a>
                <MdLogout className="text-md sm:text-lg md:text-xl" /> Đăng xuất
            </a>
        </li>
    );
}
