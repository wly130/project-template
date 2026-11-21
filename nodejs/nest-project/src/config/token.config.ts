import {Injectable} from '@nestjs/common';
import {JwtService, type JwtSignOptions} from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async getAccessToken(user_id: number): Promise<string> {
        // use JwtModule's default signOptions (configured in AuthModule)
        return this.jwtService.signAsync({user_id});
    }

    async getRefreshToken(user_id: number): Promise<string> {
        // refresh token typically has a longer expiry
        return this.jwtService.signAsync(
            {user_id},
            {expiresIn: (process.env.REFRESH_TIME as JwtSignOptions['expiresIn']) || '7d'},
        );
    }
}
