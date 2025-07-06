import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../validator/auth.validator';
import { StatusInfo } from '../../common/global';
import { LoginInfo, RefreshToken } from '../../interface/auth.interface';
import { AllowAnon } from '../../common/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @AllowAnon()
    @Post('login')
    login(@Body() body: LoginDto): Promise<StatusInfo<LoginInfo>> {
        return this.authService.login(body);
    }

    @Post('refreshToken')
    refreshToken(): Promise<StatusInfo<RefreshToken>> {
        return this.authService.refreshToken();
    }
}