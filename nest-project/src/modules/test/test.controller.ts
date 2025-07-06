import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {TestService} from './test.service';
import {ListType, StatusInfo} from '../../common/global';
import {addInfoDto, delInfoDto, getInfoListDto, updateInfoDto} from '../../validator/test.validator';
import {Table} from '../../models/test.entity';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) {
    }

    @Post('addInfo')
    addInfo(@Body() body: addInfoDto): Promise<StatusInfo<null>> {
        return this.testService.addInfo(body);
    }

    @Delete('delInfo')
    delInfo(@Body() body: delInfoDto): Promise<StatusInfo<null>> {
        return this.testService.delInfo(body);
    }

    @Put('updateInfo')
    updateInfo(@Body() body: updateInfoDto): Promise<StatusInfo<null>> {
        return this.testService.updateInfo(body);
    }

    @Get('getInfoList')
    getInfoList(@Query() query: getInfoListDto): Promise<StatusInfo<ListType<Table> | null>> {
        return this.testService.getInfoList(query);
    }
}