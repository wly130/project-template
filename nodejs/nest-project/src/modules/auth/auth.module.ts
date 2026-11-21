import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TokenService} from '../../config/token.config';
import {JwtModule, type JwtSignOptions} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        // Use global ConfigModule from AppModule; register JwtModule asynchronously to read config values
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('TOKEN_ACCESS_KEY'),
                signOptions: {
                    expiresIn: configService.get<JwtSignOptions['expiresIn']>('ACCESS_TIME') || '1h',
                },
            }),
        }),
    ],
    providers: [AuthService, TokenService],
    controllers: [AuthController],
    exports: [JwtModule],
})
export class AuthModule {}
