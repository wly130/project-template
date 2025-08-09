import {IsString} from 'class-validator';

export class LoginDto {
    @IsString({message: '请传入用户名'})
    username: string;

    @IsString({message: '请传入密码'})
    password: string;
}

export class RefreshTokenDto {
    @IsString({message: '请传入刷新Token'})
    refresh_token: string;
}