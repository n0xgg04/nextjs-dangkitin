"use client";
import * as React from "react";
import type { Dayjs } from "dayjs";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import TimeKeeper, { TimeOutput } from "react-timekeeper";
import { FaClock } from "react-icons/fa";
import useDateContext from "lta/providers/set-date-context";

type Props = {};
export default function Modal(props: Props) {
    const [selected, setSelected] = React.useState<Date>();
    const [isShowHourPicker, setIsShowHourPicker] =
        React.useState<boolean>(false);

    const [time, setTime] = React.useState<string>("12:00");
    const modelRef = React.useRef<HTMLDialogElement>(null);
    const openDialog = React.useCallback(() => {
        modelRef.current?.showModal();
    }, []);
    React.useEffect(() => {
        setTimeout(() => openDialog(), 1000);
    }, []);

    const { setDate } = useDateContext();

    const handleSave = React.useCallback(() => {
        selected?.setHours(Number(time.split(":")[0]));
        selected?.setMinutes(Number(time.split(":")[1]));
        localStorage.setItem("timedangky", selected?.toString()!);
        setDate(selected!);
        modelRef.current?.close();
    }, [modelRef.current, selected, time, setDate]);

    let footer = <p>Chọn ngày bắt đầu mở hệ thống đăng ký.</p>;
    if (selected) {
        footer = (
            <p className="text-sm">Bạn đã chọn {format(selected, "PP")}.</p>
        );
    }
    return (
        <div>
            <dialog ref={modelRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Chọn thời điểm đăng ký tín
                    </h3>
                    <div className="w-full flex flex-col  items-center">
                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                            onDayClick={(e) => {
                                setSelected(e);
                            }}
                            footer={footer}
                        />
                        <div className="w-full flex justify-center flex-row">
                            <div
                                onClick={(e: React.MouseEvent) => {
                                    setIsShowHourPicker((pre) => !pre);
                                }}
                                className="p-3 relative cursor-pointer font-bold border-2 border-gray-400 border-solid inline rounded-lg"
                            >
                                <span className="flex items-center gap-x-2">
                                    <FaClock />
                                    {time}
                                </span>
                                {isShowHourPicker && (
                                    <div
                                        className="absolute bottom-0 z-9999"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <TimeKeeper
                                            hour24Mode
                                            time={time}
                                            onChange={(time) => {
                                                setTime(time.formatted24);
                                            }}
                                            doneButton={(newTime) => (
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        padding: "10px 0",
                                                    }}
                                                    onClick={() => {
                                                        setTime(
                                                            newTime.formatted24,
                                                        );
                                                        setIsShowHourPicker(
                                                            false,
                                                        );
                                                    }}
                                                >
                                                    Xong
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="py-4">Ấn ESC hoặc ấn nút Đóng để hoàn tất</p>
                    <div className="modal-action">
                        <button className="btn" onClick={handleSave}>
                            Đóng
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
