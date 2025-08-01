import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //全局参数验证
    app.useGlobalPipes(new ValidationPipe({
        transform: true, whitelist: true, forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
