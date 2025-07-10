import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Response} from 'express';
import {StatusInfo} from '../../common/global';
import {LoginDto} from '../../validator/auth.validator';
import {LoginInfo, RefreshToken} from '../../interface/auth.interface';
import {TokenService} from '../../config/token.config';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly jwtService: JwtService,
    ) {
    }

    async login(body: LoginDto, res: Response): Promise<StatusInfo<LoginInfo>> {
        const access_token = await this.tokenService.getAccessToken(1);
        const refresh_token = await this.tokenService.getRefreshToken(1);
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true, secure: false, sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, path: '/',
        });
        return {code: 200, msg: '登录成功', data: {access_token, user_id: 1}};
    }

    async refreshToken(refresh_token: string): Promise<StatusInfo<RefreshToken>> {
        try {
            let {user_id} = this.jwtService.verify(refresh_token);
            const access_token = await this.tokenService.getAccessToken(user_id);
            return {code: 200, msg: '获取成功', data: {access_token}};
        } catch (error) {
            if (error.name === 'TokenExpiredError') throw new UnauthorizedException('refresh_token已过期');
            throw new UnauthorizedException('无效refresh_token');
        }
    }

    async logout(refresh_token: string, res: Response): Promise<StatusInfo<any>> {
        try {
            let {user_id} = this.jwtService.verify(refresh_token);
            res.clearCookie(refresh_token, {httpOnly: true, path: '/', secure: false, sameSite: 'lax'});
            return {code: 200, msg: '注销成功', data: {}};
        } catch (error) {
            if (error.name === 'TokenExpiredError') throw new UnauthorizedException('refresh_token已过期');
            throw new UnauthorizedException('无效refresh_token');
        }
    }
}