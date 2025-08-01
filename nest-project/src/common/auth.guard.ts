import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard as PassportAuthGuard} from '@nestjs/passport';
import {JwtService} from '@nestjs/jwt';
import {ALLOW_ANON_KEY} from '../decorators/auth.decorator';

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
        if (!access_token) return this.jwtError('NotBeforeError');
        try {
            request.user = this.jwtService.verify(access_token);
        } catch (error) {
            this.jwtError(error.name);
        }
        return true;
    }

    private extractToken(req: Request): string | null {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return null;

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : null;
    }

    private jwtError(name: string): never {
        switch (name) {
            case 'TokenExpiredError':
                throw new UnauthorizedException('Token已过期');
            case 'JsonWebTokenError':
                throw new UnauthorizedException('无效Token');
            case 'NotBeforeError':
                throw new UnauthorizedException('Token未提供');
            default:
                throw new UnauthorizedException('认证失败');
        }
    }
}
