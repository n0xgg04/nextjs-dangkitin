"use client";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "lta/hooks/redux";
import { cn } from "lta/lib/classnames";
import { setStep } from "lta/redux/actions/main";

type StepperProps = {
    step: StepperArrayType;
};

export type StepperArrayType = { content: string; label: string }[];
export default React.memo(function Stepper({ step }: StepperProps) {
    const kid = React.useId();
    const step_now = useAppSelector((state) => state.main).step;
    const dispatch = useAppDispatch();
    const goToStep = React.useCallback(
        (step: number) => {
            dispatch(setStep(step));
        },
        [step_now, dispatch],
    );

    return (
        <ul className="steps w-full">
            {step.map((d, i) => (
                <li
                    key={kid + i}
                    data-content={d.content}
                    className={cn(
                        "step step-neutral text-sm cursor-pointer",
                        i + 1 === step_now ? "text-blue-400 font-bold" : "",
                    )}
                    onClick={goToStep.bind(null, i + 1)}
                >
                    {d.label}
                </li>
            ))}
        </ul>
    );
});
