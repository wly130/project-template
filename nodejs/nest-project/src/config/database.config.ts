import {Module} from '@nestjs/common';
import {TypeOrmModule, type TypeOrmModuleOptions} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (): TypeOrmModuleOptions => ({
                type: 'mysql' as const,
                host: process.env.DB_HOST || '127.0.0.1',
                port: Number(process.env.DB_PORT) || 3306,
                // support both DB_USERNAME and legacy DB_HOST_NAME env names
                username: process.env.DB_USERNAME || process.env.DB_HOST_NAME || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATE_BASE_NAME || 'project',
                entities: [__dirname + '/../models/*.entity{.ts,.js}'],
                synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
                retryAttempts: 5,
                retryDelay: 3000,
                logging: process.env.TYPEORM_LOGGING === 'true',
                autoLoadEntities: true,
                extra: {connectTimeout: 15000},
            }),
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
