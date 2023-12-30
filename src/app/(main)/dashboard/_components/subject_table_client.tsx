"use client";
import * as React from "react";
import AddButtonRegister from "lta/app/(main)/dashboard/_components/add_button_register";
import { Nullable, PlanType } from "lta/types/global";
import { useFormState } from "react-dom";
import { addSubject } from "lta/actions/add-subject";
import DeleteSubjectBtn from "lta/app/(main)/dashboard/_components/delete_subject_btn";
import { useAppSelector } from "lta/hooks/redux";

type Props = {
    plan: PlanType;
};

type StateType = {
    message: Nullable<string>;
};

const initialState: StateType = {
    message: null,
};

export default function SubjectTableClient({ plan }: Props) {
    const [state, formAction] = useFormState(addSubject, initialState);
    const step = useAppSelector((state) => state.main).step;
    if (step != 1) return;
    return (
        <form action={formAction}>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã môn học</th>
                        <th>Nhóm</th>
                        <th>Tổ</th>
                        <th>Lớp</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {plan.map((d, i) => (
                        <tr key={"tb" + i}>
                            <th>{i + 1}</th>
                            <th>{d.ma_mon}</th>
                            <td>{d.nhom}</td>
                            <td>{d.to}</td>
                            <td>{d.lop}</td>
                            <td>
                                <DeleteSubjectBtn subject_code={d.ma_mon} />
                            </td>
                        </tr>
                    ))}
                    <tr className="text-sm">
                        <td>{plan.length + 1}</td>
                        <td>
                            <input
                                type="text"
                                name="ma_mon"
                                required
                                placeholder="Điền vào đây"
                                className="input input-ghost w-full max-w-xs text-sm"
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="nhom"
                                required
                                placeholder="Điền vào đây"
                                className="input input-ghost w-full max-w-xs text-sm"
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="to"
                                required
                                placeholder="Điền vào đây"
                                className="input input-ghost w-full max-w-xs text-sm"
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                required
                                name="lop"
                                placeholder="Điền vào đây"
                                className="input input-ghost w-full max-w-xs text-sm"
                            />
                        </td>
                        <td>
                            <AddButtonRegister />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
