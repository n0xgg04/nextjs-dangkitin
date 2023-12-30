"use client";
import * as React from "react";
import { RowTableData } from "lta/types/global";
import { useAppSelector } from "lta/hooks/redux";

type TableData = RowTableData[];

export default function RegisteredSubjectTable() {
    const kid = React.useId();
    const isLoading = useAppSelector(
        (state) => state.main,
    ).is_loading_registered_data;
    const data = useAppSelector((state) => state.main).registered_data;
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã môn học</th>
                        <th>Số tín</th>
                        <th>Tên môn</th>
                        <th>Nhóm</th>
                        <th>Lớp</th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading &&
                        data.map((d, i) => (
                            <tr key={kid + i}>
                                <th>{i + 1}</th>
                                <th>{d.ma_mon}</th>
                                <td>{d.so_tin}</td>
                                <td>{d.ten_mon}</td>
                                <td>{d.nhom_to}</td>
                                <td>{d.lop}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {isLoading && (
                <div className="w-full flex justify-center mt-2">
                    <span className="loading loading-spinner loading-sm"></span>
                </div>
            )}
        </div>
    );
}
