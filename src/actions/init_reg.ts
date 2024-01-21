"use server";

import { Session } from "next-auth";
import axios from "lta/lib/axios";

export default async function initReg(data: Session) {
    try {
        const a = await axios.get("/#/dangkymonhoc", {
            headers: {
                Authorization: "Bearer " + data?.user.token,
                Idpc: data?.user.Idpc,
            },
            timeout: 120000,
        });
        //   console.log("b");
        const b = await axios.post(
            "/api/dkmh/w-checkvaliddangkymonhoc",
            {},
            {
                headers: {
                    Authorization: "Bearer " + data?.user.token,
                    Idpc: data?.user.Idpc,
                    "Content-Type": "text/plain",
                },
                timeout: 120000,
            },
        );
        //   console.log("c");
        const c = await axios.post(
            "/api/sms/w-locketquaduyetsinhvien",
            {
                ma_sv: data.user.student_code,
            },
            {
                headers: {
                    Authorization: "Bearer " + data?.user.token,
                    Idpc: data?.user.Idpc,
                    "Content-Type": "application/json",
                },
                timeout: 120000,
            },
        );
        //  console.log("d");
        const d = await axios.post(
            "/api/srm/w-kiemtrasettinghoanthanhdg",
            {
                ma_sinh_vien: data.user.student_code,
                is_cam_xem_dkmh: true,
            },
            {
                headers: {
                    Authorization: "Bearer " + data?.user.token,
                    Idpc: data?.user.Idpc,
                    "Content-Type": "application/json",
                },
                timeout: 30000 * 2,
            },
        );
        //   console.log("e");
        const e = await axios.post(
            "/api/dkmh/w-locdsdieukienloc",
            {},
            {
                headers: {
                    Authorization: "Bearer " + data?.user.token,
                    Idpc: data?.user.Idpc,
                    "Content-Type": "text/plain",
                },
                timeout: 30000 * 2,
            },
        );
        return [a.status, b.status, c.status, d.status, e.status];
    } catch (e) {
        console.log(e);
        return null;
    }
}
