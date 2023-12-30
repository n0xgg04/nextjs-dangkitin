"use server";
import { revalidatePath } from "next/cache";
import prisma from "lta/lib/database";
import { getServerAuthSession } from "lta/services/auth";
import { PlanType } from "lta/types/global";
export async function addSubject(
    prevState: any,
    formData: FormData,
): Promise<any> {
    const session = await getServerAuthSession();
    const ma_mon = formData.get("ma_mon") as string;
    const nhom = formData.get("nhom") as string;
    const to = formData.get("to") as string;
    const lop = formData.get("lop") as string;
    const user_plan = (
        await prisma.users.findUnique({
            where: {
                student_code: session?.user.student_code,
            },
            select: {
                plan: true,
            },
        })
    )?.plan;

    if (!user_plan)
        return {
            message: "failed",
        };

    let new_plan: PlanType;
    try {
        new_plan = user_plan as PlanType;
    } catch (e) {
        new_plan = [];
    }

    new_plan.push({
        ma_mon,
        lop,
        to,
        nhom,
    });

    try {
        await prisma.users.update({
            where: {
                student_code: session?.user.student_code,
            },
            data: {
                plan: new_plan,
            },
        });

        revalidatePath("/dashboard");
        return {
            message: "success",
        };
    } catch (e) {
        return {
            message: "failed",
        };
    }
}
