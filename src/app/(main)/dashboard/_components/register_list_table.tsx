import * as React from "react";
import prisma from "lta/lib/database";
import { getServerAuthSession } from "lta/services/auth";
import { PlanType } from "lta/types/global";
import SubjectTableClient from "lta/app/(main)/dashboard/_components/subject_table_client";

export default async function RegisterListTable() {
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
    )?.plan as PlanType;

    return <SubjectTableClient plan={plan} />;
}
