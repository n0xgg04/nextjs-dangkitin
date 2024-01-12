"use server";
import axios from "lta/lib/axios";
import { Session } from "next-auth";
import { MonInterface } from "lta/types/monInterface";
export default async function getListSubject(data: Session) {
    try {
        const mon = await axios.post<{
            data: {
                addin_duyet_kqdk: boolean;
                dien_giai_enable_chung: string;
                ds_mon_hoc: any[];
                ds_nhom_to: MonInterface[];
            };
        }>(
            "/api/dkmh/w-locdsnhomto",
            {
                is_CVHT: false,
                additional: {
                    paging: {
                        limit: 8000,
                        page: 1,
                    },
                    ordering: [{ name: "", order_type: "" }],
                },
            },
            {
                headers: {
                    Authorization: "Bearer " + data?.user.token,
                    Idpc: data?.user.Idpc,
                },
            },
        );
        return mon.data.data;
    } catch (e) {
        return null;
    }
}
