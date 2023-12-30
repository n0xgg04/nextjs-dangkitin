"use server";
import axios from "lta/lib/axios";
import { Session } from "next-auth";
import { MonHocType } from "lta/types/global";
type ResponseType = {
    data: {
        total_items: number;
        total_pages: number;
        so_tin_chi_min: number;
        ngay_in: string;
        is_show_nganh_hoc: boolean;
        ds_kqdkmh: MonHocType[];
    };
};
export const getNewData = async (data: Session) => {
    const res = await axios.post<ResponseType>(
        "/api/dkmh/w-locdskqdkmhsinhvien",
        {
            is_CVHT: false,
            is_Clear: false,
        },
        {
            headers: {
                Authorization: "Bearer " + data?.user.token,
                Idpc: data?.user.Idpc,
            },
        },
    );
    return res.data;
};
