
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.ExtractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try{
        const payload = this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
        request['user'] = payload;
    }
    catch{
        throw new UnauthorizedException();
    }
    return true;
  }
  ExtractTokenFromHeader(request: any): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
}