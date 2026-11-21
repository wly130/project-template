import {Module} from '@nestjs/common';
import {ConditionalModule, ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AllModules} from './modules/all.module';
import {ItemsController} from './modules/items/items.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env.' + (process.env.NODE_ENV ?? 'development'), '.env'],
        }),
        ConditionalModule.registerWhen(AllModules, (env) => env.ENABLE_MYSQL === 'true'),
    ],
    controllers: [AppController, ItemsController],
    providers: [AppService],
})
export class AppModule {}
