"use server";

import { Session } from "next-auth";
import axios from "lta/lib/axios";
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
}
