import {Global, Module} from '@nestjs/common';
import {TestModule} from './test/test.module';
import {AuthModule} from './auth/auth.module';

@Global()
@Module({
    imports: [
        AuthModule, TestModule
    ],
    exports: [
        AuthModule, TestModule
    ],
})
export class AllModules {
}
