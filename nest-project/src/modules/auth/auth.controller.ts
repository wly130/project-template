import {Body, Controller, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {AuthService} from './auth.service';
import {LoginDto} from '../../validator/auth.validator';
import {StatusInfo} from '../../common/global';
import {LoginInfo, RefreshToken} from '../../interface/auth.interface';
import {AllowAnon} from '../../decorators/auth.decorator';
import {Cookie} from '../../decorators/cookie.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @AllowAnon()
    @Post('login')
    login(@Body() body: LoginDto, @Res({passthrough: true}) res: Response): Promise<StatusInfo<LoginInfo>> {
        return this.authService.login(body, res);
    }

    @AllowAnon()
    @Post('refreshToken')
    refreshToken(@Cookie('refresh_token') refresh_token: string): Promise<StatusInfo<RefreshToken>> {
        return this.authService.refreshToken(refresh_token);
    }

    @AllowAnon()
    @Post('logout')
    logout(@Cookie('refresh_token') refresh_token: string, @Res({passthrough: true}) res: Response): Promise<StatusInfo<RefreshToken>> {
        return this.authService.logout(refresh_token, res);
    }
}