export enum CodeType {
    '成功' = 200,
    '服务器错误' = 500
}

export interface ListType<T> {
    count: number;
    rows: T[];
}

export interface StatusInfo<T> {
    code: CodeType;
    msg: string;
    data?: T;
}