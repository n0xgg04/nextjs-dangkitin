import * as React from "react";
import useDateContext from "lta/providers/set-date-context";

type Props = {};
export default function CountDown(props: Props) {
    const { date } = useDateContext();

    React.useEffect(() => {
        if (!date) return;
        let now = Math.round((date.getTime() - new Date().getTime()) / 1000); // Calculate remaining time in seconds

        if (now <= 0) {
            dRef.current?.style.setProperty("--value", "--");
            hRef.current?.style.setProperty("--value", "--");
            mRef.current?.style.setProperty("--value", "--");
            sRef.current?.style.setProperty("--value", "--");
            return;
        }

        const intervalId = setInterval(() => {
            const daysLeft = Math.floor(now / (24 * 60 * 60));
            const hoursLeft = Math.floor((now % (24 * 60 * 60)) / 3600);
            const minutesLeft = Math.floor((now % 3600) / 60);
            const secondsLeft = now % 60;

            dRef.current?.style.setProperty("--value", daysLeft.toString());
            hRef.current?.style.setProperty("--value", hoursLeft.toString());
            mRef.current?.style.setProperty("--value", minutesLeft.toString());
            sRef.current?.style.setProperty("--value", secondsLeft.toString());

            now--;
        }, 1000);

        return () => clearInterval(intervalId); // Clear the interval when the component unmounts
    }, [date]);
    const dRef = React.useRef<HTMLSpanElement>();
    const hRef = React.useRef<HTMLSpanElement>();
    const mRef = React.useRef<HTMLSpanElement>();
    const sRef = React.useRef<HTMLSpanElement>();
    // @ts-ignore
    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max fixed z-10 bottom-4 left-4">
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span ref={dRef} style={{ "--value": 20 }}></span>
                </span>
                days
            </div>
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span ref={hRef} style={{ "--value": 10 }}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span ref={mRef} style={{ "--value": 24 }}></span>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-gray-50 dark:bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-xl xs:text-2xl sm:text-3xl md:text-4xl">
                    {/*@ts-ignored*/}
                    <span ref={sRef} style={{ "--value": 53 }}></span>
                </span>
                sec
            </div>
        </div>
    );
}
