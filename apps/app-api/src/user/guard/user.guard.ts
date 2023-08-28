import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const sub = request.user?.sub;
    const userId = parseInt(request.params.userId, 10);
    if (!sub || sub !== userId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
