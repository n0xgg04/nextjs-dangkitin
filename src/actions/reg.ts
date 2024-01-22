"use server";

import { Session } from "next-auth";
import axios from "lta/lib/axios";
import { LoginApiResponseType } from "lta/types/auth/user-payload";
type Res =
    | {
          result: "success";
          date: string;
      }
    | {
          result: "failed";
          message: string;
      };
export default async function Reg(data: Session, id: string): Promise<Res> {
    try {
        const d = await axios.post<{
            data: {
                thong_bao_loi: string;
                is_thanh_cong: boolean;
                ket_qua_dang_ky: {
                    ngay_dang_ky: string;
                };
            };
        }>(
            "/api/dkmh/w-xulydkmhsinhvien",
            {
                filter: {
                    id_to_hoc: id,
                    is_checked: true,
                    sv_nganh: 1,
                },
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
        if (d.data.data["is_thanh_cong"]) {
            return {
                result: "success",
                date: d.data["data"]["ket_qua_dang_ky"]["ngay_dang_ky"],
            };
        }
        return {
            result: "failed",
            message: d.data.data["thong_bao_loi"],
        };
    } catch (e) {
        try {
            const d = await reLogin({
                student_code: data.user.student_code,
                password: data.user.password,
            });
            if (d !== null) {
                data.user.token = d.data.access_token;
                data.user.Idpc = d.data.idpc;
                return {
                    result: "failed",
                    message: "Phiên đăng nhập hết hạn... Đã đăng nhập lại",
                };
            }
        } catch (e) {}
        return {
            result: "failed",
            message: "Hãy đăng xuất và thử lại!",
        };
    }
}

async function reLogin({
    student_code,
    password,
}: {
    student_code: string;
    password: string;
}) {
    const check = await axios.post<LoginApiResponseType>("/api/auth/login", {
        username: student_code,
        password: password,
        grant_type: "password",
    });
    if (check.status != 200) {
        console.log("Loi");
        return null;
    }
    return check;
}
