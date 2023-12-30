"use server";

import prisma from "lta/lib/database";
import { getServerAuthSession } from "lta/services/auth";
import { PlanType } from "lta/types/global";
import { revalidatePath } from "next/cache";
export default async function DeleteSubject(subject_code: string) {
    const session = await getServerAuthSession();
    const plan = (
        await prisma.users.findUnique({
            where: {
                student_code: session?.user.student_code,
            },
            select: {
                plan: true,
            },
        })
    )?.plan;
    let new_plan = plan as PlanType;
    new_plan = new_plan.filter((d) => d.ma_mon !== subject_code);
    await prisma.users.update({
        where: {
            student_code: session?.user.student_code,
        },
        data: {
            plan: new_plan,
        },
    });
    revalidatePath("/dashboard");
}
