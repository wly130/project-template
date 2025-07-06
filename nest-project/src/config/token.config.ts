import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {
    }

    async getAccessToken(user_id: number): Promise<string> {
        return await this.jwtService.signAsync({ user_id }, { expiresIn: process.env.ACCESS_TIME });
    }

    async getRefreshToken(user_id: number): Promise<string> {
        return await this.jwtService.signAsync({ user_id }, { expiresIn: process.env.REFRESH_TIME });
    }
}
