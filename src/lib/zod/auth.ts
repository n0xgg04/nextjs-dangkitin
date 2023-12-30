import z from "zod";

const err = {
    message: "Mã sinh viên không hợp lệ",
};
export const loginParse = z.object({
    student_code: z.string().min(9, err).max(12, err).startsWith("B", err),
    password: z.string().min(5, err).max(50, err),
    key: z.string().min(1, err),
});
