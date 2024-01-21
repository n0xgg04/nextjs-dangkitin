"use client";
import * as React from "react";
import AddButtonRegister from "lta/app/(main)/dashboard/_components/add_button_register";
import { Nullable, PlanType } from "lta/types/global";
import { useFormState } from "react-dom";
import { addSubject } from "lta/actions/add-subject";
import DeleteSubjectBtn from "lta/app/(main)/dashboard/_components/delete_subject_btn";
import { useAppDispatch, useAppSelector } from "lta/hooks/redux";
import { useSession } from "next-auth/react";
import getListSubject from "lta/actions/req_list";
import { setExpire } from "lta/redux/actions/main";
import * as string_decoder from "string_decoder";

type Props = {
    plan: PlanType;
};

type StateType = {
    message: Nullable<string>;
};

const initialState: StateType = {
    message: null,
};

export default React.memo(function SubjectTableClient({ plan }: Props) {
    const [state, formAction] = useFormState(addSubject, initialState);
    const [mon, setMon] = React.useState<
        {
            ten: string;
            ma: string;
        }[]
    >([]);
    const step = useAppSelector((state) => state.main).step;
    const { data, status } = useSession();
    const dispatch = useAppDispatch();
    React.useLayoutEffect(() => {
        data &&
            getListSubject(data).then((d) => {
                if (d) {
                    const dd = d?.ds_nhom_to.filter(
                        (n) => n.is_ctdt || n.is_chctdt,
                    );
                    localStorage.setItem(
                        "tenMon",
                        JSON.stringify(d?.ds_mon_hoc),
                    );
                    localStorage.setItem("monOk", JSON.stringify(dd));
                } else {
                    setMon([]);
                }
            });

        setMon(JSON.parse(localStorage.getItem("tenMon") || "[]"));
    }, []);

    const mamonRef = React.useRef<HTMLInputElement>(null);
    const nhomRef = React.useRef<HTMLInputElement>(null);
    const toRef = React.useRef<HTMLInputElement>(null);
    const lopRef = React.useRef<HTMLInputElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);

    if (step != 1) return;

    return (
        <div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 grid place-items-center rounded-lg mb-5">
                <span className="text-[0.8rem] text-gray-600 dark:text-gray-400 text-center block">
                    Bạn chỉ cần nhập thông tin 1 lần và ấn lưu, hệ thống sẽ lưu
                    danh sách môn của bạn lại. Gần sát giờ đăng ký, bạn chỉ cần
                    ấn nút Bắt đầu đăng ký...
                </span>
            </div>
            <form action={formAction} ref={formRef}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên môn</th>
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
                                <th>
                                    {mon.find((e) => e.ma === d.ma_mon)?.ten}
                                </th>
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
                            <td></td>
                            <td>
                                <input
                                    ref={mamonRef}
                                    type="text"
                                    name="ma_mon"
                                    required
                                    placeholder="Điền vào đây"
                                    className="input input-ghost w-full max-w-xs text-sm"
                                />
                            </td>
                            <td>
                                <input
                                    ref={nhomRef}
                                    type="text"
                                    name="nhom"
                                    required
                                    placeholder="Điền vào đây"
                                    className="input input-ghost w-full max-w-xs text-sm"
                                />
                            </td>
                            <td>
                                <input
                                    ref={toRef}
                                    type="text"
                                    name="to"
                                    placeholder="(trống)"
                                    className="input input-ghost w-full max-w-xs text-sm"
                                />
                            </td>
                            <td>
                                <input
                                    ref={lopRef}
                                    type="text"
                                    required
                                    name="lop"
                                    placeholder="Điền vào đây"
                                    className="input input-ghost w-full max-w-xs text-sm"
                                />
                            </td>
                            <td>
                                <AddButtonRegister
                                    appref={{
                                        mamonRef,
                                        nhomRef,
                                        toRef,
                                        lopRef,
                                        formRef,
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
});
