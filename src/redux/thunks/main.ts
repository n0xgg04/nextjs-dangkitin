import { createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { getNewData } from "lta/actions/get-list";
import { RowTableData } from "lta/types/global";

export const fetchRegisteredData = createAsyncThunk(
    "fetchRegisteredData",
    async (session: Session) => {
        try {
            const res = await getNewData(session);
            return res.data.ds_kqdkmh.map((d) => ({
                so_tin: d.to_hoc.so_tc,
                lop: d.to_hoc.lop,
                ma_mon: d.to_hoc.ma_mon,
                ten_mon: d.to_hoc.ten_mon,
                nhom_to: d.to_hoc.nhom_to,
            }));
        } catch (e) {
            return null;
        }
    },
);
