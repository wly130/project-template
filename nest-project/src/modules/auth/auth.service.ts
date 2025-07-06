import {Injectable, UnauthorizedException} from '@nestjs/common';
import {StatusInfo} from '../../common/global';
import {LoginDto} from '../../validator/auth.validator';
import {LoginInfo, RefreshToken} from '../../interface/auth.interface';
import {TokenService} from '../../config/token.config';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly tokenService: TokenService, private readonly jwtService: JwtService,
    ) {
    }

    async login(body: LoginDto): Promise<StatusInfo<LoginInfo>> {
        const access_token = await this.tokenService.getAccessToken(1);
        const refresh_token = await this.tokenService.getRefreshToken(1);
        return {code: 200, msg: '登录成功', data: {access_token, refresh_token, user_id: 1}};
    }

    async refreshToken(): Promise<StatusInfo<RefreshToken>> {
        try {
            let info = this.jwtService.verify('');
            const access_token = await this.tokenService.getAccessToken(1);
            return {code: 200, msg: '登录成功', data: {access_token: ''}};
        } catch (error) {
            if (error.name === 'TokenExpiredError') throw new UnauthorizedException('Token已过期');
            throw new UnauthorizedException('无效Token');
        }
    }
}