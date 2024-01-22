"use client";
import * as React from "react";
import { useAppSelector } from "lta/hooks/redux";
import { io } from "socket.io-client";
import { cn } from "lta/lib/classnames";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MonInterface } from "lta/types/monInterface";
type Logs = {
	type: "warning" | "success" | "error";
	message: string;
};
export default function Step2() {
	const step_now = useAppSelector((state) => state.main).step;
	const [log, setLog] = React.useState<Logs[]>([]);
	const { data } = useSession();
	const scrollToBottom = React.useCallback(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
	}, []);
	const [status, setStatus] = React.useState<
		"pending" | "connected" | "error"
	>("pending");
	React.useEffect(() => {
		if (step_now == 1) return;
		setLog([]);
		const socket = io(`${Number(process.env.NEXT_PUBLIC_SOCKET_URL)}`, {
			path: process.env.NEXT_PUBLIC_SOCKET_PATH,
			addTrailingSlash: false,
			transports: ["websocket"],
		});

        socket.on("connect", () => {
            setLog((pre) => [
                ...pre,
                {
                    message: "Đã kết nối với máy chủ!",
                    type: "success",
                },
                {
                    message: "Đang khởi tạo...",
                    type: "warning",
                },
            ]);
            setTimeout(() => {
                socket.emit("run", data);
            }, 2000);
            setStatus("connected");
        });

        socket.on("disconnect", () => {
            setLog((pre) => [
                ...pre,
                {
                    message: "Đã ngắt với máy chủ!",
                    type: "warning",
                },
            ]);
        });

        socket.on("run-success", () => {
            setLog((pre) => [
                ...pre,
                {
                    message: "Khởi tạo thành công!",
                    type: "success",
                },
            ]);
            socket.emit(
                "reg",
                data,
                JSON.parse(
                    localStorage.getItem("monOk") || "{}",
                ) as MonInterface[],
                JSON.parse(localStorage.getItem("tenMon") || "{}"),
            );
        });

		socket.on("send-log", (data) => {
			setLog((pre) => [
				...pre,
				{
					message: data,
					type: "warning",
				},
			]);
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "smooth",
			});
		});

		socket.on("run-failed", () => {
			setLog((pre) => [
				...pre,
				{
					message: "Khởi tạo thất bại!",
					type: "error",
				},
			]);
		});

        socket.on("connect_error", async (err) => {
            setLog((pre) => [
                ...pre,
                {
                    message: "Kết nối máy chủ thất bại!" + err.toString(),
                    type: "error",
                },
            ]);
            axios.get("/api/socket").then();
            setStatus("error");
        });

        return () => {
            setLog([]);
            socket.close();
        };
    }, [step_now]);
    if (step_now != 2) return;

    return (
        <div className="mockup-code w-full">
            <Log data={log} />
        </div>
    );
}

function Log({ data }: { data: Logs[] }) {
    const id = React.useId();

    return (
        <>
            {data.map((e, i) => (
                <pre
                    key={id + i}
                    data-prefix=">"
                    className={cn(`text-${e.type}`)}
                >
                    <code>{e.message}</code>
                </pre>
            ))}
        </>
    );
}
