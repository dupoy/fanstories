import { Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IRequest } from 'src/types/request.interface';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IRequest, res: Response, next: Function) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findOneById(decode.id);
      delete user.password;
      req.user = user;
    } catch (e) {
      req.user = null;
    }

    next();
  }
}
