import { IRequest } from '../../../types/request.interface';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();

    if (!request.user) {
      throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
