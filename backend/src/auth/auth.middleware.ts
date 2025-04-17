import { UserService } from '@/user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // 開発用に決め打ちのユーザーID（例：1）を使用
    const user = await this.userService.findOne(1);

    if (!user) {
      throw new Error('ユーザーが見つかりません');
    }
    req.currentUser = user;
    next();
  }
}
