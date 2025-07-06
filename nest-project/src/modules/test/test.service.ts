import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Table} from '../../models/test.entity';
import {ListType, StatusInfo} from '../../common/global';
import {addInfoDto, delInfoDto, getInfoListDto, updateInfoDto} from '../../validator/test.validator';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Table)
        private table: Repository<Table>,
    ) {
    }

    async addInfo(body: addInfoDto): Promise<StatusInfo<null>> {
        try {
            const {name} = body;
            await this.table.save({name});
            return {code: 200, msg: '添加成功'};
        } catch (err) {
            console.log(err);
            return {code: 500, msg: '添加失败'};
        }
    }

    async delInfo(body: delInfoDto): Promise<StatusInfo<null>> {
        try {
            const {id, name} = body;
            let res = await this.table.delete({id, name});
            if (!res.affected || res.affected === 0) return {code: 500, msg: '删除失败'};
            return {code: 200, msg: '删除成功'};
        } catch (err) {
            console.log(err);
            return {code: 500, msg: '删除失败'};
        }
    }

    async updateInfo(body: updateInfoDto): Promise<StatusInfo<null>> {
        try {
            const {id, name} = body;
            let res = await this.table.update({id}, {name});
            if (!res.affected || res.affected === 0) return {code: 500, msg: '删除失败'};
            return {code: 200, msg: '修改成功'};
        } catch (err) {
            console.log(err);
            return {code: 500, msg: '修改失败'};
        }
    }

    async getInfoList(query: getInfoListDto): Promise<StatusInfo<ListType<Table> | null>> {
        try {
            const {page, pageSize, searchText} = query;
            const startPage = (page - 1) * pageSize;
            const table = this.table.createQueryBuilder('b');

            if (searchText) table.where('b.name LIKE :search', {search: `%${searchText}%`});
            table.orderBy('b.id', 'ASC').skip(startPage).take(pageSize);
            const [rows, count] = await table.getManyAndCount();

            return {code: 200, msg: '查询成功', data: {count, rows}};
        } catch (err) {
            console.log(err);
            return {code: 500, msg: '查询失败'};
        }
    }
}