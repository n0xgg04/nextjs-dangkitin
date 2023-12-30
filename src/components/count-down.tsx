import * as React from "react";

type Props = {};
export default function CountDown(props: Props) {
    // @ts-ignore
    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max fixed z-10 bottom-4 right-4">
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span style={{ "--value": 15 }}></span>
                </span>
                days
            </div>
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span style={{ "--value": 10 }}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span style={{ "--value": 24 }}></span>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span style={{ "--value": 53 }}></span>
                </span>
                sec
            </div>
        </div>
    );
}
