import { ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

export const ALLOW_ANON_KEY = 'ALLOW_ANON';
export const AllowAnon = () => SetMetadata(ALLOW_ANON_KEY, true);

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard('jwt') {
    constructor(private reflector: Reflector, private jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const allowAnon = this.reflector.getAllAndOverride<boolean>(ALLOW_ANON_KEY, [context.getHandler(), context.getClass()]);
        if (allowAnon) return true;

        const request = context.switchToHttp().getRequest();
        const access_token = this.extractToken(request);
        if (!access_token) throw new UnauthorizedException('未提供Token');
        try {
            request.user = this.jwtService.verify(access_token);
        } catch (error) {
            if (error.name === 'TokenExpiredError') throw new UnauthorizedException('Token已过期');
            throw new UnauthorizedException('无效Token');
        }
        return true;
    }

    private extractToken(req: Request): string | null {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return null;

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : null;
    }
}
