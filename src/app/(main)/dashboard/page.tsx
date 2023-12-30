import * as React from "react";
import { Metadata } from "next";
import RegisterListTable from "lta/app/(main)/dashboard/_components/register_list_table";
import Stepper, { StepperArrayType } from "lta/components/stepper";
import MainButtonGroup from "lta/app/(main)/dashboard/_components/main_button_group";

type Props = {};

export const metadata: Metadata = {
    title: "Đăng ký môn",
};
export default function Page(props: Props) {
    const stepper = React.useMemo<StepperArrayType>(
        () => [
            {
                label: "Chọn môn",
                content: "1",
            },
            {
                label: "Tiến hành đăng ký",
                content: "2",
            },
        ],
        [],
    );
    return (
        <div className="w-full h-full mt-5 flex flex-col items-center justify-center">
            <div className="min-h-1/2 w-full flex flex-col items-center mt-4 sm:mt-10 md:mt-16">
                <div className="w-1/3 mb-4 sm:mb-10 md:mb-16">
                    <Stepper step={stepper} />
                </div>
                <div className="mockup-window  bg-base-300">
                    <div className="flex justify-center bg-base-200 p-5">
                        <div className="overflow-x-auto">
                            <RegisterListTable />
                            <MainButtonGroup />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
