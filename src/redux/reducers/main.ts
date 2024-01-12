import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RowTableData } from "lta/types/global";
import {
    setRegisteredData,
    setLoadingRegisteredData,
    reloadRegisteredData,
    setStep,
    setExpire,
} from "../actions/main";
import { getNewData } from "lta/actions/get-list";
import { fetchRegisteredData } from "lta/redux/thunks/main";
type ReducerType = {
    registered_data: RowTableData[];
    is_loading_registered_data: boolean;
    expired_session: boolean;
    step: number;
};

const initialState: ReducerType = {
    registered_data: [],
    is_loading_registered_data: true,
    expired_session: false,
    step: 1,
};

export const mainReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setRegisteredData, (state, action) => {
            state.registered_data = action.payload;
        })
        .addCase(setLoadingRegisteredData, (state, action) => {
            state.is_loading_registered_data = action.payload;
        })
        .addCase(fetchRegisteredData.fulfilled, (state, action) => {
            if (action.payload == null) {
                state.expired_session = true;
                return;
            }
            state.registered_data = action.payload;
            state.is_loading_registered_data = false;
        })
        .addCase(setStep, (state, payload) => {
            state.step = payload.payload;
        })
        .addCase(setExpire, (state, payload) => {
            state.expired_session = payload.payload;
        });
});
