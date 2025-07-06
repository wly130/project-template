import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDto {
    @Type(() => String)
    @IsString({ message: '请传入用户名' })
    username: string;

    @Type(() => String)
    @IsString({ message: '请传入密码' })
    password: string;
}

export class RefreshTokenDto {
    @Type(() => String)
    @IsString({ message: '请传入刷新Token' })
    refresh_token: string;
}