import {Table} from '../models/test.entity';
import {CodeType} from '../common/global';

export interface ListType {
    count: number;
    rows: Table[];
}

export interface StatusInfo<T> {
    code: CodeType;
    msg: string;
    data?: T;
}