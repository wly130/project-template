import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Table} from '../../models/test.entity';
import {TestController} from './test.controller';
import {TestService} from './test.service';

@Module({
    imports: [TypeOrmModule.forFeature([Table])],
    providers: [TestService],
    controllers: [TestController],
})
export class TestModule {
}