import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (): Promise<TypeOrmModuleOptions> => ({
                type: 'mysql' as const,
                host: process.env.DB_HOST,
                port: 3306,
                username: process.env.DB_HOST_NAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATE_BASE_NAME,
                entities: [__dirname + '/../models/*.entity{.ts,.js}'],
                synchronize: false, retryAttempts: 5, retryDelay: 3000,
                logging: true, autoLoadEntities: true,
                extra: { connectTimeout: 15000 },
            }),
            dataSourceFactory: async (options: DataSourceOptions) => {
                const dataSource = new DataSource(options);
                try {
                    await dataSource.initialize();
                    console.log(`✅ 数据库已连接`);
                } catch (err) {
                    console.error(`❌ 数据库连接失败`, err);
                }
                return dataSource;
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {
}
