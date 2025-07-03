import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AllModules } from './modules/all.module';
import { DatabaseModule } from './config/database.config';

@Module({
    imports: [
        //加载环境变量
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
        DatabaseModule, //数据库连接
        AllModules, //模块
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
