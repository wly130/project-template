import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TokenService} from '../../config/token.config';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true, envFilePath: ['.env']}),
        JwtModule.register({
            secret: process.env.TOKEN_ACCESS_KEY,
            signOptions: {expiresIn: process.env.ACCESS_TIME},
        })
    ],
    providers: [AuthService, TokenService],
    controllers: [AuthController],
    exports: [JwtModule],
})
export class AuthModule {
}