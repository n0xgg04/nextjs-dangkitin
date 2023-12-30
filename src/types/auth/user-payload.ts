export type UserPayload = {
    student_code: string;
    password: string;
    key?: string;
    token: string;
    Idpc: string;
    name: string;
};

export type UserPayloadShape = {
    student_code: any;
    password: any;
    key?: any;
};

export type LoginApiResponseType = {
    access_token: string;
    idpc: string;
    name: string;
};
