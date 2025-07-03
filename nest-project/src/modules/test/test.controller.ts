import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {TestService} from './test.service';
import {ListType, StatusInfo} from '../../interface/test.interface';
import {addInfoDto, delInfoDto, getInfoListDto, updateInfoDto} from '../../validator/test.validator';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) {
    }

    @Post('addInfo')
    addInfo(@Body() body: addInfoDto): Promise<StatusInfo<null>> {
        return this.testService.addInfo(body);
    }

    @Post('delInfo')
    delInfo(@Body() body: delInfoDto): Promise<StatusInfo<null>> {
        return this.testService.delInfo(body);
    }

    @Post('updateInfo')
    updateInfo(@Body() body: updateInfoDto): Promise<StatusInfo<null>> {
        return this.testService.updateInfo(body);
    }

    @Get('getInfoList')
    getInfoList(@Query() query: getInfoListDto): Promise<StatusInfo<ListType | null>> {
        return this.testService.getInfoList(query);
    }
}