import { ROLES_KEY } from '@/auth/decorators/roles.decorator';
import { Role } from '@/auth/enum/role.enum';
import { IContext } from '@/auth/types/context.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<IContext>().currentUser;

    if (!user) {
      throw new Error('ユーザーが認証されていません');
    }

    return requiredRoles.includes(user.role);
  }
}
