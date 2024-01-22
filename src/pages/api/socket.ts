import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";
import { Session } from "next-auth";
import prisma from "lta/lib/database";
import { PlanType } from "lta/types/global";
import { MonInterface } from "lta/types/monInterface";
import Reg from "lta/actions/reg";
import _ from "lodash";

export const config = {
    api: {
        bodyParser: false,
    },
};

const delay = (ms: number): Promise<boolean> =>
    new Promise((resolve) => {
        setTimeout(() => resolve(true), ms);
    });

interface SocketServer extends HTTPServer {
    io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO;
}
export default function SocketHandler(
    _req: NextApiRequest,
    res: NextApiResponseWithSocket,
) {
    if (res.socket.server.io) {
        res.status(200).json({
            success: true,
            message: "Socket is already running",
            socket: `:${Number(process.env.PORT) + 1}`,
        });
        return;
    }

    console.log(
        "Starting Socket.IO server on port:",
        Number(process.env.PORT) + 1,
    );
    const io = new Server({
        path: "/api/socket",
        addTrailingSlash: false,
        cors: { origin: "*" },
    }).listen(Number(process.env.PORT) + 1);

    io.on("connect", (socket) => {
        const _socket = socket;
        // console.log("socket connect", socket.id);
        _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`);
        socket.on("disconnect", async () => {
            //  console.log("socket disconnect");
        });

        socket.on(
            "reg",
            async function (
                data: Session,
                list: MonInterface[],
                mon: {
                    ma: string;
                    ten: string;
                }[],
            ) {
                let dataCopy: Session = { ...data };
                const plan = (
                    await prisma.users.findUnique({
                        where: {
                            student_code: data?.user.student_code,
                        },
                        select: {
                            plan: true,
                        },
                    })
                )?.plan as PlanType;
                let ok = 0;
                for await (let el of plan) {
                    const tri = [1, 2, 3, 4, 5, 6];
                    const idd = list.find(
                        (m) =>
                            m.ma_mon === el.ma_mon &&
                            m.to === el.to &&
                            el.lop === m.lop &&
                            el.nhom === m.nhom_to,
                    );
                    const te = mon.find((el) => el.ma === idd?.ma_mon)?.ten;
                    for (let i of tri) {
                        socket.emit(
                            "send-log",
                            `Đang đăng ký môn ${te} - ${idd?.nhom_to} - ${idd?.to} ${idd?.lop}`,
                        );
                        await delay(500 + _.random(1000, false));
                        const res = await Reg(dataCopy, idd?.id_to_hoc!);
                        socket.emit(
                            "send-log",
                            `[${i}] Đã đăng ký môn ${te} - ${idd?.nhom_to} - ${idd?.to} ${idd?.lop} ${
                                res.result === "success"
                                    ? ` thành công (${res.date})`
                                    : ` thất bại (${res.message})`
                            }`,
                        );
                        if (res.result === "success") {
                            ok++;
                            break;
                        }
                    }
                }
                socket.emit(
                    "send-log",
                    `Đã đăng ký ${ok}/${plan.length} môn thành công!`,
                );
            },
        );

        socket.on("run", async function (data: Session) {
            try {
                socket.emit("run-success");
            } catch (e) {
                socket.to(_socket.id).emit("run-failed");
            }
        });
    });

    res.socket.server.io = io;
    res.status(201).json({
        success: true,
        message: "Socket is started",
        socket: `:${Number(process.env.PORT) + 1}`,
    });
}
