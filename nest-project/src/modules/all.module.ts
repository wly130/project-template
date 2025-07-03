import { Global, Module } from '@nestjs/common';
import { TestModule } from './test/test.module';

@Global()
@Module({
    imports: [
        TestModule,
    ],
    exports: [
        TestModule,
    ],
})
export class AllModules {
}
