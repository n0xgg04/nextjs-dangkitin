import NextAuth, { AuthOptions, getServerSession, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginParse } from "lta/lib/zod/auth";
import { LoginApiResponseType, UserPayload } from "lta/types/auth/user-payload";
import axios from "lta/lib/axios";
import prisma from "lta/lib/database";

const authOptions: AuthOptions = {
    session: {
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/get-started",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                student_code: { type: "text" },
                password: { type: "password" },
                key: {},
            },
            async authorize(credentials): Promise<any> {
                const user_data = loginParse.safeParse(credentials);
                if (user_data.success) {
                    try {
                        const check = await axios.post<LoginApiResponseType>(
                            "/api/auth/login",
                            {
                                username: user_data.data.student_code,
                                password: user_data.data.password,
                                grant_type: "password",
                            },
                        );
                        if (check.status != 200) {
                            console.log("Loi");
                            return null;
                        }
                        const key_data = await prisma.keys.findUnique({
                            where: {
                                key: user_data.data.key,
                            },
                        });
                        if (!key_data) {
                            await prisma.logs.create({
                                data: {
                                    student_code: user_data.data.student_code,
                                    key: user_data.data.key,
                                    log: "Wrong key",
                                },
                            });
                            return null;
                        } else {
                            if (key_data.left <= 0) {
                                await prisma.logs.create({
                                    data: {
                                        student_code:
                                            user_data.data.student_code,
                                        key: user_data.data.key!,
                                        log: "Key expired",
                                    },
                                });
                                return null;
                            }
                        }
                        try {
                            const isExists = await prisma.users.count({
                                where: {
                                    student_code: user_data.data.student_code,
                                },
                            });
                            if (!isExists) {
                                await prisma.users.create({
                                    data: {
                                        student_code:
                                            user_data.data.student_code,
                                        password: user_data.data.password,
                                        Idpc: check.data.idpc,
                                        qldt_token: check.data.access_token,
                                        plan: [],
                                        student_name: check.data.name,
                                    },
                                });
                            } else {
                                await prisma.users.update({
                                    where: {
                                        student_code:
                                            user_data.data.student_code,
                                    },
                                    data: {
                                        password: user_data.data.password,
                                        Idpc: check.data.idpc,
                                        qldt_token: check.data.access_token,
                                        student_name: check.data.name,
                                    },
                                });
                            }
                            await prisma.keys.update({
                                where: {
                                    key: user_data.data.key,
                                },
                                data: {
                                    left: key_data.left - 1,
                                },
                            });
                            await prisma.logs.create({
                                data: {
                                    student_code: user_data.data.student_code,
                                    key: user_data.data.key!,
                                    log: "Logged In",
                                },
                            });
                            return {
                                student_code: user_data.data.student_code,
                                password: user_data.data.password,
                                token: check.data.access_token,
                                Idpc: check.data.idpc,
                                name: check.data.name,
                            } as UserPayload;
                        } catch (e) {
                            console.log(e);
                            throw e;
                        }
                    } catch (e) {
                        if (process.env.NODE_ENV === "development")
                            console.log(e);
                        return null;
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            user && (token.user_data = user as UserPayload);
            return token;
        },
        async session({ session, token }) {
            session.user = token.user_data;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export const getServerAuthSession = () => getServerSession(authOptions); //(6)

export { handler };
