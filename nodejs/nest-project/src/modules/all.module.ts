import {Global, Module} from '@nestjs/common';
import {TestModule} from './test/test.module';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from '../config/database.config';

@Global()
@Module({
    imports: [DatabaseModule, AuthModule, TestModule],
    exports: [AuthModule, TestModule],
})
export class AllModules {}
