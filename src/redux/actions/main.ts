import { createAction } from "@reduxjs/toolkit";
import { RowTableData } from "lta/types/global";
import { Session } from "next-auth";

export const setRegisteredData =
    createAction<RowTableData[]>("setRegisteredData");
export const setLoadingRegisteredData = createAction<boolean>(
    "setLoadingRegisteredData",
);

export const setExpire = createAction<boolean>("setExpire");
export const setStep = createAction<number>("setStep");

export const reloadRegisteredData = createAction<Session>(
    "reloadRegisteredData",
);
